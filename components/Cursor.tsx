"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };

    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      const t = e.target as HTMLElement;
      const interactive = !!t.closest("a, button, [data-hover]");
      setHovering(interactive);
    };

    let raf: number;
    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.15;
      ring.y += (pos.y - ring.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const leave = () => setHidden(true);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s" }}
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-foreground"
        style={{
          transform: "translate(-100px,-100px)",
          transition: "width .25s, height .25s, opacity .25s",
          opacity: hovering ? 0 : 1,
        }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-foreground/60"
        style={{
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
          marginLeft: hovering ? -28 : -14,
          marginTop: hovering ? -28 : -14,
          transform: "translate(-100px,-100px)",
          transition:
            "width .3s ease, height .3s ease, margin .3s ease, background-color .3s",
          backgroundColor: hovering
            ? "rgb(var(--accent) / 0.12)"
            : "transparent",
          borderColor: hovering
            ? "rgb(var(--accent) / 0.7)"
            : "rgb(var(--foreground) / 0.5)",
        }}
      />
    </div>
  );
}
