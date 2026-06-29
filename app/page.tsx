import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Blogs from "@/components/Blogs";
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
        <Blogs />
        <Contact />
      </main>
    </>
  );
}
