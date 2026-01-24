import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import Background from "@/components/Background";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Background />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Blogs />
      <Contact />
    </main>
  );
}

