"use client";

import { Github, Calendar } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#home" className="text-lg font-medium text-white hover:opacity-80 transition-opacity">
              Aviral Sharma
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#blogs"
              className="text-white hover:opacity-80 transition-opacity"
            >
              Blogs
            </a>
            <a
              href="https://cal.com/aviral-sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-80 transition-opacity flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span className="hidden sm:inline">Book Meeting</span>
            </a>
            <a
              href="https://github.com/aviralsharmaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-80 transition-opacity flex items-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">Github</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1d9D74cI4rLI-iI0AC2L9tImxGyWf-Ify/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-80 transition-opacity"
            >
              Résumé
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

