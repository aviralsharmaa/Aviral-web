"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealWords, Rise } from "./Reveal";

type Project = {
  index: string;
  title: string;
  subtitle: string;
  tags: string[];
  year: string;
  confidential: boolean;
  org?: string;
  image: string | null;
  impact: string;
  blurb: string;
  github: string | null;
  demo: string | null;
  slug: string | null;
};

const projects: Project[] = [
  {
    index: "01",
    title: "MIS AI Agent",
    subtitle: "Multi-Agent Reporting Workspace",
    tags: ["LangGraph", "Claude · Bedrock", "Subagents", "FastAPI · SSE", "Next.js"],
    year: "2026",
    confidential: true,
    image: null,
    impact: "28-min report → ~40s · numbers grounded, never invented",
    blurb:
      "A LangGraph agent on Claude (AWS Bedrock) that turns compliance registers into versioned dashboards, sheets, decks and docs — parallel read-only subagents, exact server-side datasets and a numeric-reconciliation gate so the LLM never invents a figure. Live for every production tenant.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "02",
    title: "LLM Governance",
    subtitle: "Metering, Budgets & Admission Control",
    tags: ["Go", "OpenMeter", "Token Budgets", "RPM / TPM", "Self-Hosted LLMs"],
    year: "2026",
    confidential: true,
    image: null,
    impact: "3.3× lower p50 latency at 250 concurrent LLM calls",
    blurb:
      "Took the LLM metering and admission-control platform to production: per-org and per-agent token budgets, RPM/TPM limits, fail-open admission, per-tenant routing to self-hosted Qwen/GPT-OSS models, and cost reconciliation against the AWS Bedrock bill — with a durable, idempotent Redis outbox for usage events.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "03",
    title: "Regulatory Feed Agents",
    subtitle: "Subscription Delivery Pipeline",
    tags: ["Go", "OpenSearch", "Claude Agents", "EKS Fargate", "HMAC Keys"],
    year: "2026",
    confidential: true,
    image: null,
    impact: "Circulars processed once, delivered to every client · zero failed sweeps",
    blurb:
      "A Go scheduler, FastAPI/OpenSearch feeds and Claude agents in per-run EKS Fargate sandboxes that deliver regulatory circulars, clauses and tasks into each subscribed client's database. Re-engineered failure handling (backlog replay, retry budgets, stale-if-error cache) and opened feeds to external subscribers with HMAC-derived per-client keys.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "04",
    title: "Accessibility Audit Agent",
    subtitle: "Autonomous WCAG 2.2 Auditor",
    tags: ["LangGraph", "Claude Vision", "Kotlin · Compose", "WCAG 2.2", "AWS S3"],
    year: "2026",
    confidential: true,
    image: null,
    impact: "14-node agent · 50+ WCAG criteria · ~1,700 screens audited",
    blurb:
      "A Kotlin / Jetpack Compose capture app (hand-rolled AWS SigV4 uploads) feeding a 14-node LangGraph agent that audits Android apps against WCAG A/AA criteria — fusing XPath rules, deterministic pixel checks, accessibility event-log parsing and Claude vision, with UI-fingerprint pre-filters to skip wasted vision calls.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "05",
    title: "Agentic RAG",
    subtitle: "Grounded Enterprise Document Search",
    tags: ["OpenSearch", "Haiku Planner", "S3 → Lambda", "Fail-Closed ACLs"],
    year: "2026",
    confidential: true,
    image: null,
    impact: "Restored search over 1,546 documents across 24 tenants",
    blurb:
      "Grounded agent retrieval over each tenant's documents and a regulatory library: OpenSearch full-text search, a Claude Haiku query planner, fail-closed per-user access control, and an S3 → Lambda → OpenSearch ingestion pipeline with an idempotent reconciler.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "06",
    title: "Multi-Tenant Control Plane",
    subtitle: "Per-Client Data Isolation",
    tags: ["Go", "PostgreSQL", "AWS IAM · STS", "Tenant Routing", "10 Services"],
    year: "2026",
    confidential: true,
    image: null,
    impact: "0 cross-tenant leaks in 1,729 isolation probes",
    blurb:
      "A Go control plane that gives every client an isolated data plane — dedicated database, S3 bucket, scoped IAM role and search index — plus Python/Go/TypeScript tenant-routing middleware across 10 services, kept in lockstep by 58 cross-language conformance tests. Migrated production tenants with zero users locked out.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "07",
    title: "Platform Reliability",
    subtitle: "GitOps Delivery & Observability",
    tags: ["EKS", "ArgoCD", "SigNoz", "OpenTelemetry", "Incident RCA"],
    year: "2026",
    confidential: true,
    image: null,
    impact: "Removed noise that was 99% of API error spans · 68 alert rules audited",
    blurb:
      "GitOps delivery on EKS (Kustomize + ArgoCD across staging, UAT and prod) and production observability on SigNoz / OpenTelemetry — root-causing incidents from traces, logs and audit trails, removing error-span noise, and auditing every alert rule against 14 days of history.",
    github: null,
    demo: null,
    slug: null,
  },
  {
    index: "08",
    title: "AI Email Agent",
    subtitle: "Autonomous Outreach System",
    tags: ["NLP", "Tool Orchestration", "Gmail API"],
    year: "2025",
    confidential: false,
    image: "/job-mailer.png",
    impact: "Plain-English request → personalised, automated outreach",
    blurb:
      "An agent that turns natural-language instructions like “send my resume to Microsoft” into fully automated, personalised email actions — intent parsing, contact discovery, composition, and secure delivery with live analytics.",
    github: "https://github.com/aviralsharmaa/AI-Agent-Job",
    demo: "https://ai-agent-job.streamlit.app/",
    slug: "ai-email-agent-autonomous-outreach-system",
  },
  {
    index: "09",
    title: "Trading Agent",
    subtitle: "Autonomous Financial Analysis",
    tags: ["LangGraph", "LLM Reasoning", "Backtesting"],
    year: "2025",
    confidential: false,
    image: "/finance.png",
    impact: "Reason → strategise → backtest → paper-trade, in one agent loop",
    blurb:
      "A self-learning, utility-based trading agent built on LangGraph: ingest market data, reason with LLMs, synthesise strategies, backtest, paper-trade, and refine through feedback — a complete risk-aware agent loop.",
    github: "https://github.com/aviralsharmaa/Trading_agent",
    demo: "https://trading-agent-ai.streamlit.app/",
    slug: "autonomous-financial-analysis-trading-agent",
  },
  {
    index: "10",
    title: "AI Research Agent",
    subtitle: "Semantic Document Intelligence",
    tags: ["RAG", "FAISS", "LangChain"],
    year: "2025",
    confidential: false,
    image: "/Ai resreach.png",
    impact: "Research papers → a source-grounded, queryable knowledge base",
    blurb:
      "A retrieval-augmented platform that turns research papers into a queryable knowledge base — embedding with Sentence Transformers, vector search over FAISS, and source-grounded answers orchestrated by LangGraph.",
    github: "https://github.com/aviralsharmaa/AI_research_agent",
    demo: "https://research-agent-ai.streamlit.app/",
    slug: "ai-research-agent-semantic-document-intelligence",
  },
  {
    index: "11",
    title: "OneARVO Vision",
    subtitle: "Anti-Counterfeiting & MLOps Platform",
    tags: ["Vision Transformers", "SageMaker", "MLOps"],
    year: "2025",
    confidential: true,
    org: "OneARVO Ventures",
    image: null,
    impact: "97.9% verification accuracy on 200K+ images",
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
            ( {String(projects.length).padStart(2, "0")} Projects )
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
                    <p className="mt-2 text-sm text-foreground/80">
                      {p.impact}
                    </p>
                    {p.confidential && (
                      <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-tighter text-accent">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        Confidential · {p.org ?? "OnFinance AI"}
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
