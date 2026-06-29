import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navigation />
      <main className="relative min-h-screen">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
