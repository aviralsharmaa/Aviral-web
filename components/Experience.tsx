"use client";

import { Fragment } from "react";
import { RevealWords, Rise } from "./Reveal";

const roles = [
  {
    role: "Full-Stack AI Engineer",
    company: "OnFinance AI",
    location: "Bengaluru, IN",
    period: "Feb 2026 — Present",
    note: "Generative-AI compliance platform (ComplianceOS) for the BFSI sector.",
    points: [
      "Built an AI MIS reporting workspace end-to-end — a **LangGraph** agent on **Claude Sonnet 4.6 + Haiku 4.5 (AWS Bedrock)** with tool calling over 16 compliance registers, 30+ **FastAPI** endpoints with **SSE** streaming, and a **Next.js / React** UI that generates versioned dashboards, sheets, decks and docs; launched to all production tenants.",
      "Eliminated fabricated figures with a deterministic compute layer, a **numeric-reconciliation gate** and server-side dataset handles so the LLM never re-types values — fixing a headline KPI from 89.1% to the true 4.2%.",
      "Cut a **28-minute report to ~40s** with parallel read-only **subagents** (fan-out 4) and a single-call aggregation API over a 12k-task register; collapsed ~1,500 downstream calls per list request into 3 batched queries.",
      "Grounded the agent with **agentic RAG** — **OpenSearch** full-text retrieval, a Claude Haiku query planner and fail-closed per-user ACLs — and an **S3 → Lambda → OpenSearch** ingestion pipeline whose idempotent reconciler restored search over 1,546 documents.",
      "Productionized a regulatory-feed pipeline — **Go** scheduler → **FastAPI / OpenSearch** feeds → **Claude agents** in per-run **EKS Fargate** sandboxes writing to tenant databases — and re-engineered its failure handling (oldest-first backlog replay, per-tenant backlog, bounded retries, stale-if-error cache) to **zero failed sweeps**.",
      "Shipped an in-VPC global-ID **Lambda** (**AWS SAM**, **EventBridge**) that unblocked feed publishing, and opened feeds to external subscribers via **HMAC**-derived per-client keys with rotation.",
      "Took the **LLM metering & admission-control** platform (**Go, PostgreSQL, OpenMeter, ClickHouse, React**) to production — RPM/TPM limits, soft/hard per-org and per-agent token budgets, fail-open admission, cost reconciliation against the Bedrock bill, and per-tenant routing that pins a bank's LLM traffic to **self-hosted Qwen / GPT-OSS** models.",
      "Traced dropped token counts to socket exhaustion; a per-event-loop **httpx** pool cut p50 latency **3.3×** (3.64s → 1.09s) and socket churn 62% at 250 concurrent LLM calls, backed by a durable, idempotent **Redis** outbox.",
      "Designed and built a **multi-tenant Go control plane** that gives every client an isolated data plane (dedicated **MongoDB / PostgreSQL** database, **S3** bucket, scoped **IAM** role, search index), plus **Python / Go / TypeScript** tenant-routing middleware (58 cross-language conformance tests) serving ~660k requests/week across 10 services.",
      "Migrated production tenants off a shared MongoDB via resumable, verify-gated cut-over with **zero users locked out**; 0 cross-tenant leaks in 1,729 isolation probes; verified per-tenant backups every 6h.",
      "Root-caused production incidents with **SigNoz / OpenTelemetry** traces and logs, removed noise that was 99% of API error spans, and audited 68 alert rules against 14 days of history.",
      "Built a **WCAG 2.1/2.2** accessibility-audit platform — a **Kotlin / Jetpack Compose** AccessibilityService capture app (hand-rolled AWS SigV4) feeding a 14-node **LangGraph** agent with XPath rules, pixel checks and **Claude vision** over 50+ criteria.",
    ],
  },
  {
    role: "Machine Learning Engineer",
    company: "OneARVO Ventures",
    location: "Noida, IN",
    period: "Feb 2025 — Feb 2026",
    points: [
      "Built **Vision Transformer** and **contrastive-learning** models on 200K+ images for QR and copy-detection-pattern verification, reaching 97.9% accuracy.",
      "Designed automated **data curation** and perception pipelines to detect, crop and augment QR regions for large-scale training on **AWS SageMaker**.",
      "Architected end-to-end **ML pipelines** with distributed training, hyperparameter tuning and experiment tracking via **SageMaker**, **MLflow** and **Airflow**.",
      "Built **real-time inference** with **model versioning** and monitoring, cutting average prediction latency by 65%.",
      "Implemented **MLOps** and observability — **CI/CD**, drift monitoring and feedback loops with **GitHub Actions**, **CloudWatch** and **Grafana**.",
    ],
  },
  {
    role: "Flutter Developer",
    company: "BlueTrans",
    location: "Noida, IN",
    period: "Jun 2024 — Nov 2024",
    points: [
      "Integrated the **Razorpay** payment gateway into an **Android** app for secure transactions, improving successful payments by up to 70%.",
      "Designed **app UI** to enhance user experience and engagement.",
      "Implemented **authentication**, improving security and reducing unauthorised access.",
      "Increased app speed by 30% for a smoother experience across 400 daily active users.",
    ],
  },
];

// Render **bold** spans as emphasized (brighter) text.
function withEmphasis(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-medium text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div className="px-6 md:px-12">
        <div className="mb-16 flex items-end justify-between border-b border-line pb-8">
          <h2 className="display text-5xl md:text-7xl">
            <RevealWords text="Experience" />
          </h2>
          <span className="hidden text-sm uppercase tracking-tighter text-muted md:block">
            ( Career )
          </span>
        </div>

        <div className="flex flex-col">
          {roles.map((r, i) => (
            <Rise key={i} delay={i * 0.05}>
              <div className="grid grid-cols-1 gap-6 border-b border-line py-12 md:grid-cols-12">
                <div className="md:col-span-4">
                  <h3 className="display text-2xl md:text-3xl">{r.role}</h3>
                  <p className="mt-2 font-serif text-lg italic text-accent">
                    {r.company}
                  </p>
                  {r.note && (
                    <p className="mt-2 max-w-xs text-sm text-muted">{r.note}</p>
                  )}
                  <p className="mt-3 text-sm text-muted">{r.location}</p>
                  <p className="text-sm text-muted">{r.period}</p>
                </div>
                <ul className="space-y-4 md:col-span-8 md:pl-8">
                  {r.points.map((p, j) => (
                    <li
                      key={j}
                      className="flex gap-4 text-base text-muted md:text-lg"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{withEmphasis(p)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
