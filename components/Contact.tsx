"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-16 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-2xl md:text-3xl font-medium text-white/90 mb-4 italic">
            "All our dreams can come true if we have the courage to pursue them."
          </p>
          <p className="text-white/70">— Walt Disney</p>
        </div>

        <div className="mt-16">
          <p className="text-lg text-white/80 mb-6">
            If you'd like to get in touch, you can email me or schedule a meeting.
          </p>
          
          {/* Cal.com Booking Button */}
          <div className="mb-8">
            <a
              href="https://cal.com/aviral-sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book a Meeting
            </a>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:aviralsharma5531@gmail.com"
              className="text-white hover:opacity-80 transition-opacity underline"
            >
              aviralsharma5531@gmail.com
            </a>
            <div className="flex space-x-6 mt-6 items-center">
              <a
                href="https://www.linkedin.com/in/aviral31/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/aviralsharmaa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
              >
                GitHub
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity flex items-center"
              >
                <Image
                  src="/x.png"
                  alt="X (Twitter)"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Aviral Sharma</p>
          <p className="mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

