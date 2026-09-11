"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { AgentEvent, LiveMetrics, LiveSnapshot, LiveStatus } from "./types";

const MAX_EVENTS = 50;
const POLL_MS = 5_000;
const MAX_BACKOFF_MS = 30_000;
const FAILURES_BEFORE_POLLING = 3;

export interface UseLiveEventsResult {
  events: AgentEvent[];
  metrics: LiveMetrics;
  status: LiveStatus;
  /** Epoch ms of the most recent inbound message, or null before the first. */
  lastEventAt: number | null;
}

function subscribeVisibility(onChange: () => void): () => void {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

/** True while the tab is in the foreground. Server and first client render assume visible. */
function useTabVisible(): boolean {
  return useSyncExternalStore(
    subscribeVisibility,
    () => !document.hidden,
    () => true,
  );
}

/**
 * Subscribes to /api/live/events. Falls back to polling /api/live/snapshot when
 * EventSource is unavailable or the stream keeps failing. The connection is torn down
 * while the tab is hidden, so a backgrounded page costs nothing.
 */
export function useLiveEvents(initial: LiveSnapshot): UseLiveEventsResult {
  const [events, setEvents] = useState<AgentEvent[]>(initial.events);
  const [metrics, setMetrics] = useState<LiveMetrics>(initial.metrics);
  const [connection, setConnection] = useState<Exclude<LiveStatus, "paused">>("connecting");
  const [lastEventAt, setLastEventAt] = useState<number | null>(null);

  const visible = useTabVisible();

  const mergeEvents = useCallback((incoming: AgentEvent[]) => {
    setEvents((previous) => {
      const seen = new Set(previous.map((event) => event.id));
      const fresh = incoming.filter((event) => !seen.has(event.id));
      if (fresh.length === 0) return previous;
      return [...fresh, ...previous].slice(0, MAX_EVENTS);
    });
    setLastEventAt(Date.now());
  }, []);

  // Keeps the latest merge callback reachable from the long-lived effect below.
  const mergeRef = useRef(mergeEvents);
  useEffect(() => {
    mergeRef.current = mergeEvents;
  }, [mergeEvents]);

  useEffect(() => {
    if (!visible) return;

    let source: EventSource | null = null;
    let poll: ReturnType<typeof setInterval> | null = null;
    let retry: ReturnType<typeof setTimeout> | null = null;
    let failures = 0;
    let disposed = false;

    const pollOnce = async () => {
      try {
        const response = await fetch("/api/live/snapshot", { cache: "no-store" });
        if (!response.ok || disposed) return;
        const snapshot = (await response.json()) as LiveSnapshot;
        if (disposed) return;
        mergeRef.current(snapshot.events);
        setMetrics(snapshot.metrics);
        setConnection("live");
      } catch {
        if (!disposed) setConnection("reconnecting");
      }
    };

    const startPolling = () => {
      if (poll) return;
      void pollOnce();
      poll = setInterval(() => void pollOnce(), POLL_MS);
    };

    const connect = () => {
      if (disposed) return;
      if (typeof window.EventSource === "undefined") {
        startPolling();
        return;
      }

      source = new EventSource("/api/live/events");

      source.addEventListener("open", () => {
        failures = 0;
        setConnection("live");
      });

      source.addEventListener("snapshot", (raw) => {
        const snapshot = JSON.parse((raw as MessageEvent<string>).data) as LiveSnapshot;
        mergeRef.current(snapshot.events);
        setMetrics(snapshot.metrics);
        setConnection("live");
      });

      source.addEventListener("agent-event", (raw) => {
        mergeRef.current([JSON.parse((raw as MessageEvent<string>).data) as AgentEvent]);
      });

      source.addEventListener("metrics", (raw) => {
        setMetrics(JSON.parse((raw as MessageEvent<string>).data) as LiveMetrics);
        setLastEventAt(Date.now());
      });

      source.addEventListener("error", () => {
        source?.close();
        source = null;
        if (disposed) return;
        failures += 1;
        setConnection("reconnecting");
        if (failures >= FAILURES_BEFORE_POLLING) {
          startPolling();
          return;
        }
        retry = setTimeout(connect, Math.min(MAX_BACKOFF_MS, 1000 * 2 ** failures));
      });
    };

    connect();

    return () => {
      disposed = true;
      source?.close();
      if (poll) clearInterval(poll);
      if (retry) clearTimeout(retry);
    };
  }, [visible]);

  return { events, metrics, status: visible ? connection : "paused", lastEventAt };
}
