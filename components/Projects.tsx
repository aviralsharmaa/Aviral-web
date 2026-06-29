"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealWords, Rise } from "./Reveal";

const projects = [
  {
    index: "01",
    title: "Accessibility Audit Agent",
    subtitle: "Autonomous WCAG 2.2 Auditor",
    tags: ["LangGraph", "LLM Vision", "WCAG 2.2", "AWS S3", "Async @ Scale"],
    year: "2026",
    confidential: true,
    image: null,
    blurb:
      "A 14-node LangGraph agent auditing Android apps across 56 WCAG A/AA criteria — fusing deterministic pixel math, accessibility event-log parsing and multimodal LLM vision. Production-scaled with adaptive 10→25 worker concurrency, circuit breaker, checkpoint/resume and a Dockerized S3 watcher; ~60% fewer wasted vision calls via pre-filters and a per-session cost ledger.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "02",
    title: "Metering & Entitlements",
    subtitle: "LLM FinOps Platform",
    tags: ["Go 1.23", "OpenMeter", "Postgres", "Redis Outbox", "React"],
    year: "2026",
    confidential: true,
    image: null,
    blurb:
      "A stateless Go microservice bridging compliance agents to OpenMeter for per-customer / per-agent / per-model token metering, quotas, RPM-TPM limits and billing-readiness. Resilient by design: fail-open admission, a durable Redis outbox with idempotent at-least-once delivery, and Postgres advisory locks across replicas — surfaced through a React + Vite + Recharts console behind Dex/OIDC.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "03",
    title: "Reporting & MIS",
    subtitle: "Regulatory Disclosure Workflow",
    tags: ["Next.js", "MongoDB", "Qdrant", "Calendar Workflow"],
    year: "2026",
    confidential: true,
    image: null,
    blurb:
      "A recurring regulatory Reporting & Disclosure (MIS) module — table and calendar tracking of periodic filings with due dates, frequency, owners and SPOC, scoped per business unit and regulator and traced back to source circulars. Backed by a MongoDB + Qdrant store with semantic search and AI-agent integration.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "04",
    title: "Platform & GitOps Delivery",
    subtitle: "ComplianceOS Cloud Infrastructure",
    tags: ["EKS", "ArgoCD", "Kustomize", "ALB · Dex OIDC", "RabbitMQ"],
    year: "2026",
    confidential: true,
    image: null,
    blurb:
      "GitOps delivery for the ComplianceOS platform on EKS — Kustomize overlays reconciled by ArgoCD across staging, UAT and prod. Publicly exposed and OIDC-secured the metering console (ALB + ACM TLS + Dex, secrets via External Secrets / AWS Secrets Manager), environment-locked metering on shared OpenMeter + Postgres, and shipped a RabbitMQ checklist pipeline (poller → agent → Bedrock/LiteLLM) plus an investigation views-refresh service.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "05",
    title: "AI Email Agent",
    subtitle: "Autonomous Outreach System",
    tags: ["NLP", "Tool Orchestration", "Gmail API"],
    year: "2025",
    confidential: false,
    image: "/job-mailer.png",
    blurb:
      "An agent that turns natural-language instructions like “send my resume to Microsoft” into fully automated, personalised email actions — intent parsing, contact discovery, composition, and secure delivery with live analytics.",
    github: "https://github.com/aviralsharmaa/AI-Agent-Job",
    demo: "https://ai-agent-job.streamlit.app/",
    slug: "ai-email-agent-autonomous-outreach-system",
  },
  {
    index: "06",
    title: "Trading Agent",
    subtitle: "Autonomous Financial Analysis",
    tags: ["LangGraph", "LLM Reasoning", "Backtesting"],
    year: "2025",
    confidential: false,
    image: "/finance.png",
    blurb:
      "A self-learning, utility-based trading agent built on LangGraph: ingest market data, reason with LLMs, synthesise strategies, backtest, paper-trade, and refine through feedback — a complete risk-aware agent loop.",
    github: "https://github.com/aviralsharmaa/Trading_agent",
    demo: "https://trading-agent-ai.streamlit.app/",
    slug: "autonomous-financial-analysis-trading-agent",
  },
  {
    index: "07",
    title: "AI Research Agent",
    subtitle: "Semantic Document Intelligence",
    tags: ["RAG", "FAISS", "LangChain"],
    year: "2025",
    confidential: false,
    image: "/Ai resreach.png",
    blurb:
      "A retrieval-augmented platform that turns research papers into a queryable knowledge base — embedding with Sentence Transformers, vector search over FAISS, and source-grounded answers orchestrated by LangGraph.",
    github: "https://github.com/aviralsharmaa/AI_research_agent",
    demo: "https://research-agent-ai.streamlit.app/",
    slug: "ai-research-agent-semantic-document-intelligence",
  },
  {
    index: "08",
    title: "OneARVO Vision",
    subtitle: "Anti-Counterfeiting & MLOps Platform",
    tags: ["Vision Transformers", "SageMaker", "MLOps"],
    year: "2024",
    confidential: false,
    image: "/website.png",
    blurb:
      "An industrial-scale CV + MLOps system for QR and copy-detection-pattern authentication — ViT and contrastive models trained on 200K+ images, with distributed training, CI/CD, drift monitoring, and a retraining feedback loop.",
    github: null,
    demo: null,
    slug: null,
  },
];

export default function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const cursor = useRef({ x: 0, y: 0 });
  const imgWrap = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    cursor.current = { x: e.clientX, y: e.clientY };
    if (imgWrap.current) {
      imgWrap.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  };

  return (
    <section id="work" className="relative py-24 md:py-36" onMouseMove={onMove}>
      <div className="px-6 md:px-12">
        <div className="mb-16 flex items-end justify-between border-b border-line pb-8">
          <h2 className="display text-5xl md:text-7xl">
            <RevealWords text="Selected Work" />
          </h2>
          <span className="hidden text-sm uppercase tracking-tighter text-muted md:block">
            ( 08 Projects )
          </span>
        </div>

        <div className="flex flex-col">
          {projects.map((p, i) => {
            const Wrapper: any = p.slug ? Link : "div";
            const wrapperProps = p.slug ? { href: `/blog/${p.slug}` } : {};
            return (
              <Rise key={p.index} delay={i * 0.05}>
                <Wrapper
                  {...wrapperProps}
                  data-hover
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="group relative grid grid-cols-12 items-center gap-4 border-b border-line py-8 transition-colors hover:border-foreground/30 md:py-10"
                >
                  <span className="col-span-2 text-sm text-muted md:col-span-1">
                    {p.index}
                  </span>
                  <div className="col-span-10 md:col-span-5">
                    <h3 className="display text-3xl transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">
                      {p.title}
                    </h3>
                    <p className="mt-1 font-serif text-lg italic text-muted">
                      {p.subtitle}
                    </p>
                    {p.confidential && (
                      <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-tighter text-accent">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        Confidential · OnFinance AI
                      </span>
                    )}
                  </div>
                  <div className="col-span-8 hidden flex-wrap gap-2 md:col-span-4 md:flex">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-4 text-sm text-muted md:col-span-2">
                    <span>{p.year}</span>
                    <span className="text-xl transition-transform duration-500 group-hover:translate-x-1 group-hover:text-accent">
                      {p.confidential ? "▪" : "↗"}
                    </span>
                  </div>
                </Wrapper>
              </Rise>
            );
          })}
        </div>

        {/* External links row */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          {projects
            .filter((p) => p.github || p.demo)
            .map((p) => (
              <div key={p.index} className="flex items-center gap-3">
                <span className="text-foreground">{p.title}:</span>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    className="underline-offset-4 hover:text-foreground hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    className="underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Floating preview image that tracks the cursor */}
      <div
        ref={imgWrap}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ transform: "translate(-100px,-100px)" }}
      >
        <AnimatePresence>
          {active !== null && projects[active].image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative -ml-[180px] -mt-[120px] h-[240px] w-[360px] overflow-hidden rounded-lg border border-line"
            >
              <Image
                src={projects[active].image as string}
                alt={projects[active].title}
                fill
                sizes="360px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
