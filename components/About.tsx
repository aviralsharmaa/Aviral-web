"use client";

export default function About() {
  return (
    <section
      id="about"
      className="py-16 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">About Me</h2>
        
        <div className="space-y-8">
          <div>
            <p className="text-white/80 leading-relaxed mb-4">
              I am a Machine Learning Engineer specializing in building autonomous AI systems, computer vision models, and production-grade MLOps pipelines. My work focuses on designing end-to-end solutions that combine data, models, and cloud infrastructure into reliable, scalable, and self-improving systems.
            </p>
            <p className="text-white/80 leading-relaxed">
              I have hands-on experience with Agentic AI, LLM orchestration, and computer vision, and I enjoy working on problems that involve perception, reasoning, and decision-making at scale. From research-driven model development to real-time deployment and monitoring, I like owning the complete lifecycle of AI systems in production.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Education
            </h3>
            <p className="text-white/80 leading-relaxed mb-2">
              <strong className="text-white">Bachelor of Technology in Information Technology</strong>
            </p>
            <p className="text-white/80 leading-relaxed mb-2">
              ABES Institute of Technology (ABESIT) — 2024
            </p>
            <p className="text-white/80 leading-relaxed">
              During my undergraduate studies, I worked on deep learning and computer vision research, leading to a Springer-published paper titled "Deep Learning-Based Accurate and Efficient Human Tracking and Identification." I was also actively involved in technical communities and served as Treasurer of the Bit-Brain Club.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

