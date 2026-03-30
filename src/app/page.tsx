import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import type { Metadata } from "next";
import { portfolioData } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${portfolioData.name} - ${portfolioData.role}`,
  description: `Portfolio de ${portfolioData.name}, Webmaster & Développeur Web basé à Douala. Conception de sites vitrines, e-commerce et applications web sur mesure avec React, Laravel, WordPress et Shopify. Disponible pour vos projets digitaux.`,
  openGraph: {
    title: `${portfolioData.name} - ${portfolioData.role}`,
    description: `${portfolioData.name} — Webmaster & Développeur Web à Douala. Sites vitrines, e-commerce et applications web sur mesure. Contactez-moi pour donner vie à votre projet digital.`,
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
