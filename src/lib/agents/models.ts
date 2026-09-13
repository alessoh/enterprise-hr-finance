/**
 * Open-weight model registry.
 *
 * Meridian is model-agnostic by design: the only integration surface is the
 * OpenAI-compatible /v1/chat/completions API, which every serving stack below speaks.
 * Swapping providers is an environment change, not a code change — which is the point
 * the product makes about governance sitting below the model.
 *
 * Nothing here calls a proprietary model. Defaults are open weights you can run
 * yourself.
 */

export type Tier = "triage" | "judgment";

export interface ServingPreset {
  id: string;
  label: string;
  /** OpenAI-compatible base URL. */
  baseUrl: string;
  /** Whether an API key is expected. Local runtimes need none. */
  needsKey: boolean;
  local: boolean;
  notes: string;
}

/**
 * Where the weights can run. All OpenAI-compatible, so the client code is identical.
 */
export const SERVING_PRESETS: ServingPreset[] = [
  {
    id: "ollama",
    label: "Ollama",
    baseUrl: "http://localhost:11434/v1",
    needsKey: false,
    local: true,
    notes: "Simplest local option. Supports JSON-constrained output via response_format.",
  },
  {
    id: "vllm",
    label: "vLLM",
    baseUrl: "http://localhost:8000/v1",
    needsKey: false,
    local: true,
    notes: "Production self-hosting. Guided decoding gives hard JSON-schema conformance.",
  },
  {
    id: "llamacpp",
    label: "llama.cpp server",
    baseUrl: "http://localhost:8080/v1",
    needsKey: false,
    local: true,
    notes: "CPU-friendly. GBNF grammars constrain output to the schema.",
  },
  {
    id: "tgi",
    label: "Hugging Face TGI",
    baseUrl: "http://localhost:8080/v1",
    needsKey: false,
    local: true,
    notes: "Text Generation Inference with an OpenAI-compatible route.",
  },
  {
    id: "together",
    label: "Together AI",
    baseUrl: "https://api.together.xyz/v1",
    needsKey: true,
    local: false,
    notes: "Hosted open weights. Useful when you want scale without running GPUs.",
  },
  {
    id: "groq",
    label: "Groq",
    baseUrl: "https://api.groq.com/openai/v1",
    needsKey: true,
    local: false,
    notes: "Hosted open weights, very low latency.",
  },
  {
    id: "fireworks",
    label: "Fireworks AI",
    baseUrl: "https://api.fireworks.ai/inference/v1",
    needsKey: true,
    local: false,
    notes: "Hosted open weights with JSON mode.",
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    needsKey: true,
    local: false,
    notes: "Routes to many open-weight providers behind one key.",
  },
];

export interface ModelSuggestion {
  /** Model id as the serving stack names it. */
  id: string;
  family: string;
  license: string;
  tier: Tier;
  /** Rough VRAM at 4-bit quantisation, for the local case. */
  approxVram: string;
  why: string;
}

/**
 * Suggested open-weight models. This list is documentation, not a hard dependency:
 * MERIDIAN_MODEL / MERIDIAN_MODEL_JUDGMENT accept any id your endpoint serves, so a
 * newer model needs no code change.
 */
export const SUGGESTED_MODELS: ModelSuggestion[] = [
  {
    id: "qwen2.5:3b-instruct",
    family: "Qwen2.5",
    license: "Apache-2.0",
    tier: "triage",
    approxVram: "~2 GB",
    why: "Small and reliable at structured extraction. Good default for laptop runs.",
  },
  {
    id: "llama3.1:8b-instruct",
    family: "Llama 3.1",
    license: "Llama Community License",
    tier: "triage",
    approxVram: "~5 GB",
    why: "Strong general instruction following at a size most machines can host.",
  },
  {
    id: "mistral-nemo:12b-instruct",
    family: "Mistral NeMo",
    license: "Apache-2.0",
    tier: "triage",
    approxVram: "~7 GB",
    why: "Permissive licence, long context, solid JSON adherence.",
  },
  {
    id: "qwen2.5:32b-instruct",
    family: "Qwen2.5",
    license: "Apache-2.0",
    tier: "judgment",
    approxVram: "~20 GB",
    why: "Best open accuracy-per-GB we would trust on finance judgment calls.",
  },
  {
    id: "llama3.3:70b-instruct",
    family: "Llama 3.3",
    license: "Llama Community License",
    tier: "judgment",
    approxVram: "~40 GB",
    why: "Judgment tier when the hardware or a hosted endpoint is available.",
  },
  {
    id: "deepseek-v3",
    family: "DeepSeek",
    license: "DeepSeek Model License",
    tier: "judgment",
    approxVram: "hosted",
    why: "Mixture-of-experts reasoning, typically consumed through a hosted endpoint.",
  },
];

export interface ModelConfig {
  baseUrl: string;
  apiKey?: string;
  triageModel: string;
  judgmentModel: string;
  /** Milliseconds before a single request is abandoned. */
  timeoutMs: number;
  /** Deterministic by default: finance work should not vary run to run. */
  temperature: number;
  configured: boolean;
}

const DEFAULT_BASE_URL = "http://localhost:11434/v1";
const DEFAULT_TRIAGE = "qwen2.5:3b-instruct";

/**
 * Reads model configuration from the environment.
 *
 * `configured` is false when no endpoint is reachable-by-intent. Callers must fail
 * closed rather than fabricate output — see runtime.ts.
 */
export function getModelConfig(): ModelConfig {
  const baseUrl = process.env.MERIDIAN_MODEL_BASE_URL?.replace(/\/+$/, "") ?? DEFAULT_BASE_URL;
  const apiKey = process.env.MERIDIAN_MODEL_API_KEY;
  const triageModel = process.env.MERIDIAN_MODEL ?? DEFAULT_TRIAGE;
  const judgmentModel = process.env.MERIDIAN_MODEL_JUDGMENT ?? triageModel;
  return {
    baseUrl,
    apiKey,
    triageModel,
    judgmentModel,
    timeoutMs: Number(process.env.MERIDIAN_MODEL_TIMEOUT_MS ?? 120_000),
    temperature: Number(process.env.MERIDIAN_MODEL_TEMPERATURE ?? 0),
    // Explicit opt-in. Without it the runtime refuses to run rather than guessing.
    configured: process.env.MERIDIAN_MODEL_ENABLED === "1",
  };
}

export function modelFor(tier: Tier, cfg = getModelConfig()): string {
  return tier === "judgment" ? cfg.judgmentModel : cfg.triageModel;
}
