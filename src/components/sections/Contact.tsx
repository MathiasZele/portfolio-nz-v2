"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MagneticElement } from "@/components/core/MagneticElement";
import { portfolioData } from "@/data/portfolio";
import { TbBrandLinkedin, TbBrandWhatsapp, TbMail } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  LinkedIn: TbBrandLinkedin,
  WhatsApp: TbBrandWhatsapp,
  Email: TbMail,
};

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.refresh();

      const items = sectionRef.current?.querySelectorAll("[data-reveal]");
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 lg:py-32 px-6 lg:px-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[30%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-purple-600/4 rounded-full blur-[150px]" />
      </div>
      <div className="max-w-7xl mx-auto text-center">
        <p
          data-reveal
          className="text-sm uppercase tracking-[0.3em] text-text-muted mb-6 font-body"
        >
          Contact
        </p>

        <h2
          data-reveal
          className="font-display text-3xl lg:text-5xl font-bold mb-6"
        >
          Un projet en tête ?
        </h2>

        <p data-reveal className="text-text-secondary text-lg mb-12 max-w-md mx-auto">
          N&apos;hésitez pas à me contacter pour discuter de votre projet ou simplement échanger.
        </p>

        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <MagneticElement>
            <a
              href="mailto:mathiaszele3@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full font-body text-sm uppercase tracking-widest hover:bg-accent-light transition-colors duration-300"
            >
              <TbMail size={20} />
              Envoyer un mail
            </a>
          </MagneticElement>

          <MagneticElement>
            <a
              href="https://wa.me/237698497839"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-border text-text-primary rounded-full font-body text-sm uppercase tracking-widest hover:border-accent hover:text-accent transition-colors duration-300"
            >
              <TbBrandWhatsapp size={20} />
              WhatsApp
            </a>
          </MagneticElement>
        </div>

        <div data-reveal className="flex items-center justify-center gap-6">
          {portfolioData.social.map((social) => {
            const Icon = socialIcons[social.platform];
            if (!Icon) return null;
            return (
              <MagneticElement key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="text-text-muted hover:text-text-primary transition-colors duration-300"
                >
                  <Icon size={24} />
                </a>
              </MagneticElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}
