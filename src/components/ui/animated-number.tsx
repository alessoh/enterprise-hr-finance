"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface AnimatedNumberProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "prefix"> {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Milliseconds. DESIGN.md: 1200ms ease-out-expo. */
  duration?: number;
  /** Custom formatter; receives the in-flight value. */
  format?: (value: number) => string;
}

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Counts from 0 to `value` once, when 50% visible. SSR renders the final value.
 * Elements already on screen at hydration keep the final value (no jump to zero);
 * reduced motion also renders the final value.
 */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1200,
  format,
  className,
  ...props
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = React.useState(value);
  const armedRef = React.useRef<boolean | null>(null);

  // Decide once, before the first client paint, whether this instance should animate.
  React.useLayoutEffect(() => {
    if (armedRef.current !== null) return;
    const node = ref.current;
    if (!node || reduce) {
      armedRef.current = false;
      return;
    }
    const rect = node.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    armedRef.current = !alreadyVisible;
    if (armedRef.current) setDisplay(0);
  }, [reduce]);

  React.useEffect(() => {
    if (!inView || !armedRef.current) return;
    armedRef.current = false;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(value * easeOutExpo(progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const formatter = React.useMemo(
    () =>
      format ??
      ((n: number) =>
        new Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(n)),
    [format, decimals],
  );

  return (
    <span ref={ref} className={cn("tabular", className)} {...props}>
      {prefix}
      {formatter(display)}
      {suffix}
    </span>
  );
}
