"use client";

import type React from "react";
import { motion, type Variants } from "motion/react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Fallback for when animations don't work
const fallbackVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export default function AnimatedSection({
  children,
  className = "",
  disableAnimation = false,
}: {
  children: React.ReactNode;
  className?: string;
  disableAnimation?: boolean;
}) {
  return (
    <motion.section
      className={className}
      variants={disableAnimation ? fallbackVariants : variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
    >
      {children}
    </motion.section>
  );
}
