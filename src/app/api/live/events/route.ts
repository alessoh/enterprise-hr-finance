import { currentTick, eventAtTick, getInitialSnapshot, metricsAt } from "@/lib/live/generator";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/** Close before Vercel's function ceiling; EventSource reconnects on its own. */
const STREAM_MS = 55_000;
const EVENT_MIN_MS = 1_500;
const EVENT_MAX_MS = 4_000;
const METRICS_MS = 5_000;
const PING_MS = 15_000;

function frame(event: string, data: unknown, id?: string): string {
  const lines = [`event: ${event}`, `data: ${JSON.stringify(data)}`];
  if (id) lines.unshift(`id: ${id}`);
  return `${lines.join("\n")}\n\n`;
}

export async function GET(request: Request): Promise<Response> {
  const encoder = new TextEncoder();
  const timers: ReturnType<typeof setTimeout>[] = [];
  let closed = false;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (chunk: string) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          closed = true;
        }
      };

      const shutdown = () => {
        if (closed) return;
        closed = true;
        for (const timer of timers) clearTimeout(timer);
        try {
          controller.close();
        } catch {
          // Already closed by the runtime.
        }
      };

      // Tell proxies to start streaming immediately.
      send(": open\n\n");
      send(frame("snapshot", getInitialSnapshot(Date.now())));

      let lastTick = currentTick(Date.now());

      const scheduleEvent = () => {
        const delay = EVENT_MIN_MS + Math.random() * (EVENT_MAX_MS - EVENT_MIN_MS);
        timers.push(
          setTimeout(() => {
            if (closed) return;
            lastTick += 1;
            const event = eventAtTick(lastTick);
            send(frame("agent-event", event, event.id));
            scheduleEvent();
          }, delay),
        );
      };
      scheduleEvent();

      const metricsInterval = setInterval(() => {
        if (closed) return;
        send(frame("metrics", metricsAt(Date.now())));
      }, METRICS_MS);

      const pingInterval = setInterval(() => {
        if (closed) return;
        send(": ping\n\n");
      }, PING_MS);

      const stopAll = () => {
        clearInterval(metricsInterval);
        clearInterval(pingInterval);
        shutdown();
      };

      timers.push(setTimeout(stopAll, STREAM_MS));
      request.signal.addEventListener("abort", stopAll);
    },
    cancel() {
      closed = true;
      for (const timer of timers) clearTimeout(timer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
