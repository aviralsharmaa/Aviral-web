"use client";

import Link from "next/link";
import { RevealWords, Rise } from "./Reveal";

const posts = [
  {
    title: "AI Email Agent — Autonomous Outreach System",
    date: "2025",
    excerpt:
      "Turning natural language into automated email actions with NLP intent parsing, domain intelligence and tool orchestration.",
    slug: "ai-email-agent-autonomous-outreach-system",
  },
  {
    title: "Autonomous Financial Analysis & Trading Agent",
    date: "2025",
    excerpt:
      "A self-learning LangGraph agent that analyses market data, reasons with LLMs and executes trades with continuous improvement.",
    slug: "autonomous-financial-analysis-trading-agent",
  },
  {
    title: "AI Research Agent — Semantic Document Intelligence",
    date: "2025",
    excerpt:
      "A RAG system that turns research papers into a queryable knowledge base with Sentence Transformers, FAISS and LangChain.",
    slug: "ai-research-agent-semantic-document-intelligence",
  },
];

export default function Blogs() {
  return (
    <section id="journal" className="relative py-24 md:py-36">
      <div className="px-6 md:px-12">
        <div className="mb-16 flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-5xl md:text-7xl">
            <RevealWords text="Journal" />
          </h2>
          <p className="max-w-sm text-muted">
            Deep dives into what I built and how — architecture, trade-offs and
            lessons learned.
          </p>
        </div>

        <div className="flex flex-col">
          {posts.map((post, i) => (
            <Rise key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                data-hover
                className="group grid grid-cols-1 gap-3 border-b border-line py-10 transition-colors hover:border-foreground/30 md:grid-cols-12 md:items-baseline"
              >
                <span className="text-sm text-muted md:col-span-1">
                  {post.date}
                </span>
                <h3 className="display text-2xl transition-transform duration-500 group-hover:translate-x-3 md:col-span-7 md:text-4xl">
                  {post.title}
                </h3>
                <p className="text-muted md:col-span-3">{post.excerpt}</p>
                <span className="text-right text-xl text-muted transition-all duration-500 group-hover:text-accent md:col-span-1">
                  ↗
                </span>
              </Link>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
