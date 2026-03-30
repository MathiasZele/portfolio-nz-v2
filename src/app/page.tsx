import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import type { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${portfolioData.name} - ${portfolioData.role}`,
  description: `Portfolio professionnel de ${portfolioData.name}, ${portfolioData.role} basé à Douala. Spécialisé en développement web, React, Laravel, WordPress et E-commerce.`,
  openGraph: {
    title: `${portfolioData.name} - ${portfolioData.role}`,
    description: `Portfolio de ${portfolioData.name}. Webmaster et Développeur Junior spécialisé en création de sites fonctionnels.`,
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
