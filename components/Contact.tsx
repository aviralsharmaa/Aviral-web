"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RevealWords } from "./Reveal";
import Magnetic from "./Magnetic";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aviral31/" },
  { label: "GitHub", href: "https://github.com/aviralsharmaa" },
  {
    label: "Résumé",
    href: "https://drive.google.com/file/d/1d9D74cI4rLI-iI0AC2L9tImxGyWf-Ify/view?usp=sharing",
  },
];

export default function Contact() {
  const [now, setNow] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col justify-between pt-24"
    >
      <div className="px-6 md:px-12">
        <p className="mb-8 text-sm uppercase tracking-tighter text-muted">
          ( Contact )
        </p>
        <h2 className="display text-[13vw] leading-[0.9] tracking-tightest md:text-[10vw]">
          <RevealWords text="Let's build" />
          <span className="block">
            <RevealWords text="something" delay={0.1} />{" "}
            <span className="font-serif italic text-accent">meaningful.</span>
          </span>
        </h2>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center">
          <Magnetic strength={0.3}>
            <a
              href="mailto:aviralsharma5531@gmail.com"
              data-hover
              className="group inline-flex items-center gap-4 rounded-full border border-line px-8 py-5 text-lg transition-colors hover:border-accent hover:text-accent"
            >
              aviralsharma5531@gmail.com
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="https://cal.com/aviral-sharma"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-5 text-lg text-accent-ink transition-transform hover:scale-[1.02]"
            >
              Book a meeting
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 border-t border-line px-6 py-8 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {s.label}
              </a>
            ))}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="flex items-center text-muted transition-opacity hover:opacity-70"
              aria-label="X (Twitter)"
            >
              <Image src="/x.png" alt="X" width={16} height={16} className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted">
            <span>Bangalore, India — {now} IST</span>
            <span>© {new Date().getFullYear()} Aviral Sharma</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
