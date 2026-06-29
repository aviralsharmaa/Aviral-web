"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const marqueeItems = [
  "Agentic AI",
  "Computer Vision",
  "MLOps",
  "LLM Orchestration",
  "RAG Systems",
  "Production ML",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const line = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 2.5 + i * 0.12,
      },
    }),
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-32 md:pt-28"
    >
      <motion.div style={{ y, opacity }} className="px-6 md:px-12">
        <div className="mb-8 flex items-center gap-4 text-xs uppercase tracking-tighter text-muted">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7 }}
          >
            ( Bangalore, India — 2026 )
          </motion.span>
        </div>

        <h1 className="display text-[15vw] leading-[0.92] tracking-tightest md:text-[12.5vw]">
          <span className="block overflow-hidden pt-[0.12em] pb-[0.24em] -mt-[0.12em] -mb-[0.24em]">
            <motion.span
              custom={0}
              variants={line}
              initial="hidden"
              animate="show"
              className="block"
            >
              Full-Stack
            </motion.span>
          </span>
          <span className="block overflow-hidden pt-[0.12em] pb-[0.24em] -mt-[0.12em] -mb-[0.24em]">
            <motion.span
              custom={1}
              variants={line}
              initial="hidden"
              animate="show"
              className="block"
            >
              <span className="font-serif italic text-muted">Applied</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pt-[0.12em] pb-[0.24em] -mt-[0.12em] -mb-[0.24em]">
            <motion.span
              custom={2}
              variants={line}
              initial="hidden"
              animate="show"
              className="block"
            >
              <span className="text-accent">AI</span> Engineer
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.8 }}
          className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-balance text-base text-muted md:text-lg">
            I design end-to-end AI systems — from autonomous agents and computer
            vision models to the MLOps pipelines that keep them reliable in
            production.
          </p>
          <a
            href="#work"
            data-hover
            className="group flex items-center gap-3 text-sm uppercase tracking-tighter"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:text-accent">
              ↓
            </span>
            Scroll to explore
          </a>
        </motion.div>
      </motion.div>

      {/* marquee */}
      <div className="mt-16 select-none border-y border-line py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-8 text-2xl font-light text-muted md:text-3xl"
            >
              {item}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
