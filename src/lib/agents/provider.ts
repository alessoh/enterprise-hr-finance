/**
 * OpenAI-compatible chat client.
 *
 * This is the only place in the codebase that talks to a model. Everything else goes
 * through `complete()`, which means switching from Ollama to vLLM to a hosted
 * open-weight endpoint is an environment change.
 *
 * There is no vendor SDK here on purpose: /v1/chat/completions is the lingua franca of
 * open-weight serving stacks, and depending on one vendor's client would undercut the
 * model-agnostic claim the product makes.
 */
import { getModelConfig, type ModelConfig } from "./models";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface CompleteOptions {
  model: string;
  messages: ChatMessage[];
  /**
   * When set, the request asks the server to constrain output to JSON. Ollama, vLLM,
   * llama.cpp and the hosted providers all honour some form of this; servers that do
   * not simply ignore it, and zod validation downstream still protects us.
   */
  json?: boolean;
  maxTokens?: number;
  signal?: AbortSignal;
}

export interface CompleteResult {
  text: string;
  promptTokens?: number;
  completionTokens?: number;
  latencyMs: number;
}

export class ModelUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ModelUnavailableError";
  }
}

interface ChatCompletionResponse {
  choices?: { message?: { content?: string } }[];
  usage?: { prompt_tokens?: number; completion_tokens?: number };
  error?: { message?: string };
}

/** One chat completion against an OpenAI-compatible endpoint. */
export async function complete(
  opts: CompleteOptions,
  cfg: ModelConfig = getModelConfig(),
): Promise<CompleteResult> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
  if (opts.signal) {
    opts.signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (cfg.apiKey) headers.Authorization = `Bearer ${cfg.apiKey}`;

  const body: Record<string, unknown> = {
    model: opts.model,
    messages: opts.messages,
    temperature: cfg.temperature,
    stream: false,
  };
  if (opts.maxTokens) body.max_tokens = opts.maxTokens;
  if (opts.json) body.response_format = { type: "json_object" };

  let response: Response;
  try {
    response = await fetch(`${cfg.baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (cause) {
    const reason = cause instanceof Error && cause.name === "AbortError" ? "timed out" : "unreachable";
    throw new ModelUnavailableError(`Model endpoint ${reason} at ${cfg.baseUrl}`);
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new ModelUnavailableError(
      `Model endpoint returned ${response.status}${detail ? `: ${detail.slice(0, 200)}` : ""}`,
    );
  }

  const payload = (await response.json()) as ChatCompletionResponse;
  if (payload.error?.message) throw new ModelUnavailableError(payload.error.message);

  const text = payload.choices?.[0]?.message?.content ?? "";
  if (!text) throw new ModelUnavailableError("Model returned an empty completion");

  return {
    text,
    promptTokens: payload.usage?.prompt_tokens,
    completionTokens: payload.usage?.completion_tokens,
    latencyMs: Date.now() - started,
  };
}

export interface ProviderHealth {
  ok: boolean;
  configured: boolean;
  baseUrl: string;
  /** Models the endpoint reports, when it supports /v1/models. */
  models: string[];
  triageModel: string;
  judgmentModel: string;
  /** Present when the endpoint is reachable but the configured model is not served. */
  warning?: string;
  error?: string;
}

/** Health probe used by the API route and the lab page. Never throws. */
export async function checkHealth(cfg: ModelConfig = getModelConfig()): Promise<ProviderHealth> {
  const base: ProviderHealth = {
    ok: false,
    configured: cfg.configured,
    baseUrl: cfg.baseUrl,
    models: [],
    triageModel: cfg.triageModel,
    judgmentModel: cfg.judgmentModel,
  };
  if (!cfg.configured) {
    return { ...base, error: "MERIDIAN_MODEL_ENABLED is not set to 1" };
  }
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5_000);
    const headers: Record<string, string> = {};
    if (cfg.apiKey) headers.Authorization = `Bearer ${cfg.apiKey}`;
    const res = await fetch(`${cfg.baseUrl}/models`, {
      headers,
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timer);
    if (!res.ok) return { ...base, error: `Endpoint returned ${res.status}` };
    const data = (await res.json()) as { data?: { id?: string }[] };
    const models = (data.data ?? []).map((m) => m.id).filter((id): id is string => Boolean(id));
    const served = (id: string) => models.some((m) => m === id || m.startsWith(`${id.split(":")[0]}`));
    const warning =
      models.length > 0 && !served(cfg.triageModel)
        ? `Endpoint is up but does not list ${cfg.triageModel}`
        : undefined;
    return { ...base, ok: true, models, warning };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    return { ...base, error: `Cannot reach ${cfg.baseUrl}: ${message}` };
  }
}
