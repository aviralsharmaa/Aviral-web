"use client";

import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      className="pt-32 pb-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-2 border-white/20 bg-white/5 flex items-center justify-center">
            {!imageError ? (
              <Image
                src="/profile.png"
                alt="Aviral Sharma"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-5xl text-white font-bold">AS</div>
            )}
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Aviral Sharma
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-3">
            Machine Learning Engineer
          </p>
        </div>
      </div>
    </section>
  );
}

