"use client";

import Image from "next/image";
import { RevealWords, Rise } from "./Reveal";

const stats = [
  { value: "97.9%", label: "CV verification accuracy" },
  { value: "56", label: "Compliance criteria auto-audited" },
  { value: "65%", label: "Inference latency reduced" },
];

const stack = [
  "Python",
  "Go",
  "TypeScript",
  "PyTorch",
  "LangGraph",
  "LangChain",
  "LLM Vision",
  "RAG",
  "LiteLLM",
  "OpenMeter",
  "Redis",
  "Postgres",
  "MongoDB",
  "Qdrant",
  "FAISS",
  "AWS (S3 · SageMaker)",
  "Docker",
  "Kubernetes",
  "MLflow",
  "Langfuse",
  "Next.js · React",
  "Vision Transformers",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Sticky photo + label */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Rise>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line grayscale transition-all duration-700 hover:grayscale-0">
                  <Image
                    src="/aviral.png"
                    alt="Aviral Sharma"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Rise>
              <div className="mt-6 flex items-center justify-between text-sm text-muted">
                <span>Aviral Sharma</span>
                <span className="animate-spin-slow text-accent">✦</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-7 md:pl-8">
            <p className="mb-6 text-sm uppercase tracking-tighter text-muted">
              ( About )
            </p>
            <h2 className="display text-3xl leading-tight md:text-5xl">
              <RevealWords text="I build autonomous AI agents — and the production systems that keep them reliable, governed and scalable." />
            </h2>

            <div className="mt-10 space-y-6 text-base text-muted md:text-lg">
              <Rise delay={0.1}>
                <p>
                  I'm a Full-Stack Applied AI Engineer. I design end-to-end
                  systems that pair LLM-driven agents and computer-vision models
                  with the backend that makes them production-grade —
                  orchestration, usage metering, observability and MLOps.
                </p>
              </Rise>
              <Rise delay={0.15}>
                <p>
                  Recently I've built multimodal agentic pipelines on LangGraph
                  (deterministic checks fused with LLM vision), an LLM
                  token-metering and entitlements platform for cost governance,
                  and retrieval-augmented document systems — owning the full
                  lifecycle from research and modelling to real-time deployment,
                  resilience and monitoring.
                </p>
              </Rise>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-y border-line py-8">
              {stats.map((s, i) => (
                <Rise key={s.label} delay={i * 0.08}>
                  <div>
                    <div className="display text-3xl text-foreground md:text-5xl">
                      {s.value}
                    </div>
                    <div className="mt-2 text-xs text-muted md:text-sm">
                      {s.label}
                    </div>
                  </div>
                </Rise>
              ))}
            </div>

            {/* Education */}
            <Rise delay={0.1}>
              <div className="mt-12">
                <p className="mb-3 text-sm uppercase tracking-tighter text-muted">
                  ( Education )
                </p>
                <h3 className="text-xl text-foreground">
                  B.Tech, Information Technology
                </h3>
                <p className="mt-1 text-muted">
                  ABES Institute of Technology (ABESIT) — 2024
                </p>
                <p className="mt-4 max-w-xl text-muted">
                  Focused on deep learning and computer-vision research, and
                  served as Treasurer of the Bit-Brain Club.
                </p>
              </div>
            </Rise>

            {/* Publication */}
            <Rise delay={0.1}>
              <div className="mt-12">
                <p className="mb-3 text-sm uppercase tracking-tighter text-muted">
                  ( Publication )
                </p>
                <a
                  href="https://link.springer.com/chapter/10.1007/978-981-96-3102-5_53"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="group block max-w-xl rounded-lg border border-line p-5 transition-colors hover:border-foreground/40"
                >
                  <h3 className="text-lg leading-snug text-foreground md:text-xl">
                    Deep Learning-Based Accurate and Efficient Human Tracking
                    and Identification
                  </h3>
                  <p className="mt-2 font-serif text-lg italic text-accent">
                    Springer · 2025
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    DOI: 10.1007/978-981-96-3102-5_53
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-foreground">
                    Read on SpringerLink
                    <span className="transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>
                </a>
              </div>
            </Rise>

            {/* Stack */}
            <Rise delay={0.1}>
              <div className="mt-12">
                <p className="mb-4 text-sm uppercase tracking-tighter text-muted">
                  ( Toolkit )
                </p>
                <div className="flex flex-wrap gap-2">
                  {stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
                      data-hover
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  );
}
