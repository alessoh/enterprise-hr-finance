"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Glow } from "@/components/ui/patterns";
import { cn } from "@/lib/utils";

const MeridianScene = dynamic(() => import("./meridian-scene"), { ssr: false });

const MOBILE_BREAKPOINT = 768;

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ?? canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

function idle(callback: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(callback, { timeout: 1200 });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = window.setTimeout(callback, 200);
  return () => window.clearTimeout(handle);
}

export interface HeroMeridianProps {
  className?: string;
  /** Fires with the agent index each time a node passes the governed line. */
  onCross?: (agentIndex: number) => void;
}

/**
 * The hero object. The poster paints immediately (so it carries LCP and there is no
 * layout shift); WebGL mounts only on capable desktop viewports once the container is
 * in view, then fades in over its first frame. Rendering pauses offscreen and when the
 * tab is hidden. Reduced motion, small screens, and missing WebGL all keep the poster.
 */
export function HeroMeridian({ className, onCross }: HeroMeridianProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [interactive, setInteractive] = useState(true);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setInteractive(!coarse);

    const eligible = () =>
      !motionQuery.matches && window.innerWidth >= MOBILE_BREAKPOINT && webglAvailable();

    if (!eligible()) return;

    let cancelIdle: (() => void) | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisible(entry.intersectionRatio > 0.1);
          if (entry.isIntersecting && !cancelIdle) {
            cancelIdle = idle(() => setMount(true));
          }
        }
      },
      { threshold: [0, 0.1, 0.5] },
    );
    observer.observe(element);

    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      cancelIdle?.();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const active = visible && !hidden;

  return (
    <div ref={containerRef} className={cn("relative isolate aspect-square w-full", className)}>
      <Glow position="center" opacity={0.5} className="h-[78%] w-[78%] max-w-none" />
      <Image
        src="/brand/hero-poster.svg"
        alt=""
        aria-hidden
        width={1000}
        height={1000}
        priority
        unoptimized
        className={cn(
          "size-full select-none transition-opacity duration-500",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
      {mount ? (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
            ready ? "opacity-100" : "opacity-0",
            active ? "" : "pointer-events-none",
          )}
        >
          {active || ready ? (
            <MeridianScene
              interactive={interactive && active}
              onReady={() => setReady(true)}
              onCross={onCross}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
