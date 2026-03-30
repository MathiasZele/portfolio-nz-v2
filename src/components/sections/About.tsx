"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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

      ScrollTrigger.refresh();

      // Text paragraphs slide up
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll("[data-reveal]");
        gsap.fromTo(
          paragraphs,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Section heading
      const heading = sectionRef.current?.querySelector("[data-heading]");
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Terminal animation
      const terminal = sectionRef.current?.querySelector("[data-terminal]");
      if (terminal) {
        // Terminal container reveal
        gsap.fromTo(
          terminal,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: terminal,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        // Lines appear one by one with typing effect
        const lines = terminal.querySelectorAll("[data-line]");
        gsap.fromTo(
          lines,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.12,
            duration: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: terminal,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: 0.3,
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const commands = [
    { cmd: "skills --frontend", skills: portfolioData.skills.frontend, color: "text-blue-400" },
    { cmd: "skills --backend", skills: portfolioData.skills.backend, color: "text-emerald-400" },
    { cmd: "skills --mobile", skills: portfolioData.skills.mobile, color: "text-amber-400" },
    { cmd: "skills --tools", skills: portfolioData.skills.tools, color: "text-purple-400" },
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

        {/* Terminal */}
        <div
          data-terminal
          className="rounded-xl border border-border overflow-hidden bg-[#0c0c0c] shadow-2xl shadow-black/50"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary/80 border-b border-border">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[11px] text-text-muted font-mono ml-2 tracking-wide">
              mathias@portfolio ~ /skills
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 sm:p-6 font-mono text-sm leading-relaxed space-y-4 overflow-x-auto">
            {/* Intro */}
            <div data-line className="text-text-muted">
              <span className="text-emerald-400">$</span> cat welcome.txt
            </div>
            <div data-line className="text-text-secondary pl-4">
              Bienvenue dans mon stack technique. Voici les technologies que je maîtrise.
            </div>

            <div data-line className="h-px bg-border/50 my-2" />

            {/* Commands */}
            {commands.map((block) => (
              <div key={block.cmd} className="space-y-2">
                <div data-line>
                  <span className="text-emerald-400">$</span>{" "}
                  <span className="text-text-primary">{block.cmd}</span>
                </div>
                <div data-line className="pl-4 flex flex-wrap gap-2">
                  {block.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded text-xs border border-current/20 bg-current/5 ${block.color} hover:bg-current/10 transition-colors duration-200 cursor-default`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div data-line className="h-px bg-border/50 my-2" />

            {/* Summary */}
            <div data-line className="text-text-muted">
              <span className="text-emerald-400">$</span> echo $TOTAL_SKILLS
            </div>
            <div data-line className="pl-4">
              <span className="text-accent font-bold">
                {commands.reduce((acc, c) => acc + c.skills.length, 0)}
              </span>{" "}
              <span className="text-text-muted">technologies maîtrisées</span>
            </div>

            {/* Blinking cursor */}
            <div data-line className="flex items-center gap-1">
              <span className="text-emerald-400">$</span>
              <span className="w-2 h-4 bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
