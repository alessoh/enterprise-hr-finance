"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;
const MAX_STAGGERED = 6;

export interface RevealProps extends HTMLMotionProps<"div"> {
  /** Seconds. Hero sub/CTAs use <= 0.12. */
  delay?: number;
  /** Pixels, clamped to 16. */
  y?: number;
}

/** Opacity 0→1 and translateY 12px→0, 400ms ease-out-quart, once, at -10% viewport margin. */
export function Reveal({ delay = 0, y = 12, className, children, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  const offset = Math.min(Math.max(y, 0), 16);
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.4, ease: EASE_OUT_QUART, delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface RevealGroupProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /** Seconds between siblings; applied to the first six children only. */
  stagger?: number;
  delay?: number;
  children?: React.ReactNode;
}

const groupVariants: Variants = { hidden: {}, show: {} };

/**
 * Staggers direct <RevealItem> children by 60ms. After six, the rest animate together
 * with the sixth (DESIGN.md §5).
 */
export function RevealGroup({ stagger = 0.06, delay = 0, className, children, ...props }: RevealGroupProps) {
  const reduce = useReducedMotion();
  const items: React.ReactNode = React.Children.map(children, (child, index) => {
    if (!React.isValidElement<RevealItemProps>(child) || child.type !== RevealItem) return child;
    const step = Math.min(index, MAX_STAGGERED - 1);
    return React.cloneElement(child, { delay: child.props.delay ?? delay + step * stagger });
  });
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
      variants={groupVariants}
      className={cn(className)}
      {...props}
    >
      {items}
    </motion.div>
  );
}

export interface RevealItemProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
}

export function RevealItem({ delay = 0, y = 12, className, children, ...props }: RevealItemProps) {
  const offset = Math.min(Math.max(y, 0), 16);
  const variants: Variants = {
    hidden: { opacity: 0, y: offset },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_QUART, delay } },
  };
  return (
    <motion.div variants={variants} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
