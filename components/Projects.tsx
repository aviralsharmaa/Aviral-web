"use client";

import Link from "next/link";

const projects = [
  {
    title: "AI Email Agent – Autonomous Outreach System",
    slug: "ai-email-agent-autonomous-outreach-system",
    description:
      "An intelligent AI agent that converts natural language instructions into fully automated email actions. The system understands user intent (e.g., \"Send my resume to Microsoft\"), identifies relevant company domains, discovers official contacts, composes personalized emails, attaches documents, and sends them securely using Gmail API. The agent uses NLP-based intent parsing, domain intelligence, and tool orchestration to perform multi-step reasoning: extracting entities, validating recipients, generating content, invoking external APIs, and tracking delivery. It features both a command-line interface and a Streamlit web dashboard with real-time progress, error handling, rate-limit management, and detailed delivery analytics (CSV/Excel logs). This project demonstrates end-to-end agent design: perception, planning, action, verification, and memory.",
  },
  {
    title: "Autonomous Financial Analysis & Trading Agent",
    slug: "autonomous-financial-analysis-trading-agent",
    description:
      "A utility-based, self-learning trading agent built using LangGraph that autonomously observes market data, reasons with LLMs, simulates strategies, executes trades, and improves over time. The agent operates as a multi-node stateful workflow: market data ingestion → LLM-based analysis → strategy synthesis → historical backtesting → paper trade execution → performance evaluation → feedback-driven strategy refinement. It integrates multiple LLM providers (OpenAI, Ollama, Groq, HuggingFace), supports real-time and historical OHLCV data via Alpaca and yFinance, and maintains persistent agent state for memory and learning. The system follows a full agent loop with risk-aware decision making, portfolio optimization, and production-grade logging. This project showcases practical Agentic AI, tool-calling, and autonomous decision pipelines in finance.",
  },
  {
    title: "AI Research Agent – Semantic Document Intelligence Platform",
    slug: "ai-research-agent-semantic-document-intelligence",
    description:
      "A Retrieval-Augmented Generation (RAG) system that transforms research papers into an interactive, queryable knowledge base. The platform ingests PDFs, segments and embeds them using Sentence Transformers, stores vectors in FAISS, and enables semantic search and reasoning with LLMs. Users can upload papers, ask natural language questions, compare methodologies, generate summaries, and receive source-grounded answers through a Streamlit interface. The backend uses LangChain and LangGraph to orchestrate retrieval, ranking, reasoning, and citation generation in a stateful agent workflow. The system includes persistent vector memory, multi-model LLM support, modular pipelines, and production-ready fallback mechanisms, making it suitable for large-scale research analysis and enterprise document intelligence.",
  },
  {
    title: "Vision-Based Anti-Counterfeiting & MLOps Platform (OneARVO)",
    slug: null,
    description:
      "An industrial-scale computer vision and MLOps system for QR and copy-detection pattern (CDP) based product authentication. Built Vision Transformer and contrastive learning models trained on 200K+ images to detect forged, distorted, and tampered labels with high accuracy. Designed automated data curation agents that locate, crop, clean, and augment QR regions for training. Built distributed training, hyperparameter tuning, and experiment tracking pipelines on AWS SageMaker with MLflow. Deployed real-time and batch inference services using Docker, implemented CI/CD, and created monitoring and drift detection dashboards using CloudWatch and Grafana. The platform operates as an autonomous ML pipeline with feedback loops for retraining, validation gating, and continuous performance improvement.",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          My life goal is to help people with code.
        </h2>
        
        <div className="mt-12 space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="border-l-2 border-white/20 pl-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                {project.slug && (
                  <Link
                    href={`/blog/${project.slug}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    Read Blog →
                  </Link>
                )}
              </div>
              <p className="text-white/80 leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

