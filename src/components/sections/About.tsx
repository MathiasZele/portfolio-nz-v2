"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Marquee } from "@/components/core/Marquee";
import { MagneticElement } from "@/components/core/MagneticElement";
import { portfolioData } from "@/data/portfolio";
import { TbBrandLinkedin, TbBrandWhatsapp, TbMail, TbDownload } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax on image
      if (imageRef.current) {
        const img = imageRef.current.querySelector("img");
        if (img) {
          gsap.to(img, {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      // Text paragraphs slide up
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll("[data-reveal]");
        gsap.from(paragraphs, {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
          },
        });
      }

      // Section heading
      const heading = sectionRef.current?.querySelector("[data-heading]");
      if (heading) {
        gsap.from(heading, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  const skillCategories = [
    { label: "Frontend", skills: portfolioData.skills.frontend, direction: "left" as const },
    { label: "Backend", skills: portfolioData.skills.backend, direction: "right" as const },
    { label: "Mobile", skills: portfolioData.skills.mobile, direction: "left" as const },
    { label: "Outils", skills: portfolioData.skills.tools, direction: "right" as const },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-24 lg:py-32 px-6 lg:px-12 bg-bg-secondary/40">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] bg-accent/4 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-purple-700/4 rounded-full blur-[140px]" />
      </div>
      <div className="max-w-7xl mx-auto">
        <p
          data-heading
          className="text-sm uppercase tracking-[0.3em] text-text-muted mb-16 font-body"
        >
          A propos
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Image with parallax */}
          <div ref={imageRef} className="relative overflow-hidden rounded-lg aspect-[4/5]">
            <Image
              src={portfolioData.profileImage}
              alt={portfolioData.name}
              fill
              className="object-cover scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Text */}
          <div ref={textRef} className="flex flex-col justify-center">
            <h2
              data-reveal
              className="font-display text-3xl lg:text-5xl font-bold mb-8 leading-tight"
            >
              Développeur passionné par le web et le digital
            </h2>
            <p data-reveal className="text-text-secondary text-lg leading-relaxed mb-6">
              {portfolioData.about}
            </p>
            <div data-reveal className="flex flex-col gap-3">
              {portfolioData.experience[0] && (
                <p className="text-text-muted">
                  <span className="text-text-primary font-medium">
                    {portfolioData.experience[0].company}
                  </span>{" "}
                  — {portfolioData.experience[0].role}
                </p>
              )}
              <div className="flex items-center gap-3 mt-6">
                <a
                  href="/files/CV_Mathias_ZELE.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-full text-sm uppercase tracking-widest hover:bg-accent-light transition-colors duration-300"
                >
                  <TbDownload size={18} />
                  Télécharger CV
                </a>
                <a
                  href="https://wa.me/237698497839"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-text-secondary hover:border-green-500 hover:text-green-500 transition-colors duration-300"
                >
                  <TbBrandWhatsapp size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mathias-zele-6ba015218/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-text-secondary hover:border-blue-500 hover:text-blue-500 transition-colors duration-300"
                >
                  <TbBrandLinkedin size={20} />
                </a>
                <a
                  href="mailto:mathiaszele3@gmail.com"
                  aria-label="Email"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  <TbMail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills marquees */}
        <div className="space-y-4">
          {skillCategories.map((cat) => (
            <Marquee key={cat.label} speed={35} direction={cat.direction} pauseOnHover>
              {cat.skills.map((skill, i) => (
                <span
                  key={i}
                  className="mx-3 px-5 py-2.5 rounded-full border border-border text-text-secondary text-sm font-body whitespace-nowrap hover:border-accent/50 hover:text-text-primary transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
}
