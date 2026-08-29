import Hero from '@/components/Hero';
import ProjectPortfolio from '@/components/ProjectPortfolio';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectPortfolio />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
