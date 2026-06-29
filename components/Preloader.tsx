"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame: number;
    let current = 0;
    const tick = () => {
      // ease toward 100 with diminishing steps
      const step = Math.max(1, Math.round((100 - current) * 0.04));
      current = Math.min(100, current + step);
      setCount(current);
      if (current < 100) {
        frame = window.setTimeout(tick, 28);
      } else {
        setTimeout(() => setDone(true), 450);
      }
    };
    frame = window.setTimeout(tick, 300);
    return () => clearTimeout(frame);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col justify-end bg-background px-6 pb-10 md:px-12 md:pb-12"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-end justify-between">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-lg italic text-muted md:text-2xl"
            >
              Full-Stack Applied AI Engineer
            </motion.span>
            <span className="display text-[18vw] leading-none tracking-tighter md:text-[12vw]">
              {count}
            </span>
          </div>
          <div className="mt-6 h-px w-full origin-left bg-line">
            <motion.div
              className="h-px bg-foreground"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
