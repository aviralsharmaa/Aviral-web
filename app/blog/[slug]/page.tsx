import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";

type Post = {
  title: string;
  date: string;
  image?: string;
  github?: string;
  demo?: string;
  content: string;
};

const blogPosts: Record<string, Post> = {
  "ai-email-agent-autonomous-outreach-system": {
    title: "AI Email Agent",
    date: "2025",
    image: "/job-mailer.png",
    github: "https://github.com/aviralsharmaa/AI-Agent-Job",
    demo: "https://ai-agent-job.streamlit.app/",
    content: `
## Overview

An AI agent that turns plain-English requests like *"send my resume to Microsoft"* into fully automated, personalised email actions — no manual address hunting, no copy-paste.

## How it works

- **Intent parsing** — NLP/regex extracts the company, subject, body and attachments from your prompt.
- **Contact discovery** — matches the company to its official domains and filters out personal inboxes.
- **Composition & delivery** — builds a MIME message, attaches your documents, and sends securely via the Gmail API.
- **Tracking** — logs every send to CSV/Excel with rate-limit handling and delivery analytics.

## Interfaces

A command-line tool for power users, plus a Streamlit dashboard with live progress, a preview, and an explicit confirm step before anything is sent.

## Stack

Python · Gmail API (OAuth2) · NLP intent parsing · Streamlit

## Highlights

- A complete agent loop: perceive → plan → act → verify → log.
- Exact-domain company matching (case-insensitive, personal-domain filtering).
- Multi-attachment support with per-recipient delivery tracking.
`.trim(),
  },
  "autonomous-financial-analysis-trading-agent": {
    title: "Trading Agent",
    date: "2025",
    image: "/finance.png",
    github: "https://github.com/aviralsharmaa/Trading_agent",
    demo: "https://trading-agent-ai.streamlit.app/",
    content: `
## Overview

A self-learning, utility-based trading agent built on LangGraph that observes market data, reasons with LLMs, simulates strategies, executes paper trades, and improves from feedback.

## The agent loop

1. **Fetch data** — historical OHLCV via Alpaca (yFinance fallback) plus technical indicators.
2. **Analyse** — an LLM scores sentiment and confidence per symbol.
3. **Build strategy** — allocates capital by sentiment/confidence with entry & exit rules.
4. **Backtest** — simulates day-by-day with targets and stop-losses.
5. **Execute** — places paper trades on Alpaca only when the backtest is positive.
6. **Evaluate** — computes portfolio metrics.
7. **Self-improve** — the LLM proposes refinements for the next run.

## Stack

Python · LangGraph · multi-LLM (OpenAI / Groq / Ollama / HuggingFace) · Alpaca + yFinance

## Highlights

- Stateful, risk-aware decision pipeline with persistent memory.
- Provider-agnostic LLM layer and a polished CLI.
- Backtest gating so only validated strategies ever trade.
`.trim(),
  },
  "ai-research-agent-semantic-document-intelligence": {
    title: "AI Research Agent",
    date: "2025",
    image: "/Ai resreach.png",
    github: "https://github.com/aviralsharmaa/AI_research_agent",
    demo: "https://research-agent-ai.streamlit.app/",
    content: `
## Overview

A retrieval-augmented (RAG) platform that turns a pile of research papers into an interactive, queryable knowledge base — ask a question, get a source-grounded answer.

## How it works

- **Ingest** — extract text from uploaded PDFs.
- **Analyse** — a LangGraph workflow evaluates each paper against your query and scores relevance.
- **Synthesise** — a second node summarises the matches into a final verdict with reasoning.

## Stack

Python · LangChain + LangGraph · Groq (Llama 3.3) · Sentence Transformers + FAISS · Streamlit

## Highlights

- Stateful two-node graph: per-paper analysis → cross-paper summary.
- Low-temperature, structured prompts for consistent relevance scoring.
- Per-paper error isolation and large-context handling for long documents.
`.trim(),
  },
};

function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const out: JSX.Element[] = [];
  let inCode = false;
  let code: string[] = [];
  let key = 0;

  const flushCode = () => {
    out.push(
      <pre
        key={`code-${key++}`}
        className="my-6 overflow-x-auto rounded-lg border border-line bg-foreground/5 p-4"
      >
        <code className="font-mono text-sm text-foreground/90 whitespace-pre">
          {code.join("\n")}
        </code>
      </pre>
    );
    code = [];
  };

  const inline = (text: string) =>
    text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      if (part.startsWith("`") && part.endsWith("`"))
        return (
          <code
            key={i}
            className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm"
          >
            {part.slice(1, -1)}
          </code>
        );
      if (part.startsWith("*") && part.endsWith("*"))
        return (
          <em key={i} className="italic text-muted">
            {part.slice(1, -1)}
          </em>
        );
      return part;
    });

  lines.forEach((line, i) => {
    const t = line.trim();

    if (t.startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        inCode = true;
      }
      return;
    }
    if (inCode) {
      code.push(line);
      return;
    }
    if (!t) return;

    if (t.startsWith("#### "))
      out.push(
        <h4 key={i} className="mt-8 mb-3 text-lg font-semibold text-foreground">
          {inline(t.slice(5))}
        </h4>
      );
    else if (t.startsWith("### "))
      out.push(
        <h3 key={i} className="mt-10 mb-4 text-xl font-semibold text-foreground">
          {inline(t.slice(4))}
        </h3>
      );
    else if (t.startsWith("## "))
      out.push(
        <h2
          key={i}
          className="display mt-12 mb-5 text-2xl md:text-3xl text-foreground"
        >
          {inline(t.slice(3))}
        </h2>
      );
    else if (t.startsWith("# "))
      out.push(
        <h1 key={i} className="display mt-12 mb-6 text-3xl text-foreground">
          {inline(t.slice(2))}
        </h1>
      );
    else if (/^\d+\.\s/.test(t))
      out.push(
        <li key={i} className="ml-6 mb-2 list-decimal text-muted">
          {inline(t.replace(/^\d+\.\s/, ""))}
        </li>
      );
    else if (t.startsWith("- "))
      out.push(
        <li key={i} className="ml-6 mb-2 list-disc text-muted">
          {inline(t.slice(2))}
        </li>
      );
    else
      out.push(
        <p key={i} className="mb-4 leading-relaxed text-muted">
          {inline(t)}
        </p>
      );
  });

  return out;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];
  if (!post) notFound();

  return (
    <main className="min-h-screen">
      <Navigation />
      <article className="px-6 pb-24 pt-36 md:px-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#work"
            data-hover
            className="mb-10 inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
          >
            ← Back to Work
          </Link>

          <p className="mb-3 text-sm uppercase tracking-tighter text-muted">
            ( Case Study · {post.date} )
          </p>
          <h1 className="display mb-6 text-4xl md:text-6xl">{post.title}</h1>

          {(post.github || post.demo) && (
            <div className="mb-10 flex flex-wrap items-center gap-3">
              {post.github && (
                <a
                  href={post.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-foreground/40"
                >
                  View on GitHub ↗
                </a>
              )}
              {post.demo && (
                <a
                  href={post.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="rounded-full bg-accent px-4 py-2 text-sm text-accent-ink transition-transform hover:scale-[1.02]"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          )}

          {post.image && (
            <div className="relative mb-12 aspect-[16/10] w-full overflow-hidden rounded-lg border border-line">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="max-w-none">{renderMarkdown(post.content)}</div>
        </div>
      </article>
    </main>
  );
}
