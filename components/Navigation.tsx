"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex items-center justify-between px-6 transition-all duration-500 md:px-12 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <a
          href="#home"
          className="group flex items-center gap-3 text-sm font-medium uppercase tracking-tighter"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent transition-transform group-hover:scale-150" />
          Aviral Sharma
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Magnetic key={l.href} strength={0.25}>
              <a
                href={l.href}
                className="relative px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
                data-hover
              >
                {l.label}
              </a>
            </Magnetic>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Magnetic strength={0.3}>
            <a
              href="https://cal.com/aviral-sharma"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-foreground/40"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="hidden sm:inline">Available for work</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  );
}
