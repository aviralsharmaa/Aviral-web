"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import Magnetic from "./Magnetic";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <Magnetic strength={0.3}>
      <button
        type="button"
        onClick={toggle}
        data-hover
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line transition-colors hover:border-foreground/40"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ y: 14, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
          >
            {isDark ? (
              // moon
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // sun
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="4.2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19" />
                </g>
              </svg>
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </Magnetic>
  );
}
