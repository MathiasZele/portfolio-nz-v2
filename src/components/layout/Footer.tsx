"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MagneticElement } from "@/components/core/MagneticElement";
import { portfolioData } from "@/data/portfolio";
import { TbBrandLinkedin, TbBrandWhatsapp, TbMail, TbArrowUp } from "react-icons/tb";
import { useLenis } from "@/components/core/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  LinkedIn: TbBrandLinkedin,
  WhatsApp: TbBrandWhatsapp,
  Email: TbMail,
};

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (!headingRef.current) return;

      const words = headingRef.current.querySelectorAll("[data-word]");

      gsap.from(words, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      const line = sectionRef.current?.querySelector("[data-divider]");
      if (line) {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  const backToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const headingText = "LET'S WORK TOGETHER";

  return (
    <footer ref={sectionRef} className="relative py-24 lg:py-32 px-6 lg:px-12">
      <div data-divider className="h-px bg-border mb-16 lg:mb-24" />

      <div className="max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="font-display font-bold uppercase leading-none text-[clamp(2.5rem,8vw,7rem)] mb-12"
        >
          {headingText.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <span data-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h2>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <MagneticElement>
            <a
              href="mailto:mathiaszele3@gmail.com"
              className="relative inline-block text-xl lg:text-2xl text-accent font-body group"
            >
              mathiaszele3@gmail.com
              <span className="absolute left-0 bottom-0 w-full h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </a>
          </MagneticElement>

          <div className="flex items-center gap-6">
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
                    className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    <Icon size={24} />
                  </a>
                </MagneticElement>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>

          <MagneticElement>
            <button
              onClick={backToTop}
              className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 text-sm uppercase tracking-widest"
              aria-label="Back to top"
            >
              Top <TbArrowUp size={16} />
            </button>
          </MagneticElement>
        </div>
      </div>
    </footer>
  );
}
