"use client";

import Link from "next/link";

const blogPosts = [
  {
    id: "ai-email-agent",
    title: "AI Email Agent – Autonomous Outreach System",
    projectTitle: "AI Email Agent – Autonomous Outreach System",
    date: "2024",
    excerpt: "Building an intelligent AI agent that converts natural language into fully automated email actions using NLP, domain intelligence, and tool orchestration.",
    slug: "ai-email-agent-autonomous-outreach-system",
  },
  {
    id: "trading-agent",
    title: "Autonomous Financial Analysis & Trading Agent",
    projectTitle: "Autonomous Financial Analysis & Trading Agent",
    date: "2024",
    excerpt: "A self-learning trading agent built with LangGraph that autonomously analyzes market data, reasons with LLMs, and executes trades with continuous improvement.",
    slug: "autonomous-financial-analysis-trading-agent",
  },
  {
    id: "research-agent",
    title: "AI Research Agent – Semantic Document Intelligence Platform",
    projectTitle: "AI Research Agent – Semantic Document Intelligence Platform",
    date: "2024",
    excerpt: "A RAG system that transforms research papers into an interactive, queryable knowledge base using Sentence Transformers, FAISS, and LangChain.",
    slug: "ai-research-agent-semantic-document-intelligence",
  },
];

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="py-16 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Blogs
        </h2>
        <p className="text-white/80 mb-12">
          Detailed documentation of my projects, covering what I built and how I built it.
        </p>
        
        <div className="space-y-8">
          {blogPosts.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="block border-l-2 border-white/20 pl-6 hover:border-white/40 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-2 hover:opacity-80 transition-opacity">
                {blog.title}
              </h3>
              <p className="text-white/60 text-sm mb-3">{blog.date}</p>
              <p className="text-white/80 leading-relaxed">
                {blog.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

