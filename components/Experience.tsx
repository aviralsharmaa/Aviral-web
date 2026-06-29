"use client";

import { Fragment } from "react";
import { RevealWords, Rise } from "./Reveal";

const roles = [
  {
    role: "Full Stack Engineer",
    company: "OnFinance AI",
    location: "Bengaluru, IN",
    period: "Feb 2026 — Present",
    note: "Generative-AI compliance platform (ComplianceOS) for the BFSI sector.",
    points: [
      "Architected an autonomous **WCAG 2.1/2.2** (Level A & AA) accessibility-audit agent — a 14-node **LangGraph** pipeline that audits Android apps across 56 success criteria by fusing deterministic pixel math (contrast, target-size), accessibility event-log parsing, and **multimodal LLM vision** (screenshot + UI hierarchy).",
      "Scaled that agent to production: adaptive **async** concurrency (10→25 workers by load), a circuit breaker, per-node checkpoint/resume, and a fire-and-forget **S3** watcher daemon (**Docker** / **Kubernetes**) that auto-dispatches one audit per capture session.",
      "Cut false positives with confidence gating, two-pass **LLM** verification, and hierarchy pre-filters that remove ~60% of wasted vision calls; cross-screen dedup collapses repeated defects into one canonical finding, with a per-session LLM cost ledger for **FinOps**.",
      "Built an **LLM usage-metering & entitlements** platform — a stateless **Go 1.23** microservice bridging the compliance agents to **OpenMeter** for per-customer / per-agent / per-model token metering, quotas, RPM/TPM rate limits and billing-readiness, backed by **Postgres (pgx)**.",
      "Engineered the metering platform for resilience: fail-open admission (a metering outage never blocks an agent run), a durable **Redis** outbox with at-least-once delivery and idempotent dedup, and **Postgres** advisory locks serializing usage across replicas — surfaced through a **React + Vite + Recharts** admin console behind **Dex/OIDC**.",
      "Delivered the recurring regulatory Reporting & Disclosure (MIS) module — table + calendar tracking of periodic filings with due dates, frequency, owners and SPOC, scoped per business unit and regulator and traced to source circulars, backed by **MongoDB + Qdrant** semantic search.",
      "Owned **GitOps** delivery for ComplianceOS on **EKS** — **Kustomize** overlays reconciled by **ArgoCD** across staging, UAT and prod; exposed and OIDC-secured the metering console via **ALB + ACM TLS + Dex**, with secrets pulled at runtime from **AWS Secrets Manager** (**External Secrets**) and **Namecheap DNS** pointed at the shared ALB.",
      "Hardened and operated platform services: environment-locked metering so shared **OpenMeter + Postgres** never cross-contaminate across envs, removed the admin API from the edge (proxied in-cluster), and shipped a **RabbitMQ** checklist pipeline (poller → agent → **Bedrock** via **LiteLLM**) plus an investigation views-refresh service with health probes, spot scheduling and read-only root filesystems.",
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
