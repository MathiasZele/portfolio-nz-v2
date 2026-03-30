"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolioData } from "@/data/portfolio";
import { TbArrowUpRight } from "react-icons/tb";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.refresh();

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

      const rows = sectionRef.current?.querySelectorAll("[data-project-row]");
      if (rows) {
        rows.forEach((row) => {
          gsap.fromTo(
            row,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 lg:py-32 px-6 lg:px-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] left-[5%] w-[500px] h-[500px] bg-indigo-600/4 rounded-full blur-[160px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] bg-violet-600/3 rounded-full blur-[150px]" />
      </div>
      <div className="max-w-7xl mx-auto">
        <p
          data-heading
          className="text-sm uppercase tracking-[0.3em] text-text-muted mb-16 font-body"
        >
          Projets en vedette
        </p>

        <div className="flex flex-col">
          {portfolioData.projects.map((project, index) => (
            <ProjectRow key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof portfolioData.projects)[0];
  index: number;
}) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const isDesktop = useMediaQuery("(hover: hover) and (min-width: 1024px)");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktop || !imageRef.current || !rowRef.current) return;
      const rect = rowRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 160;
      const y = e.clientY - rect.top - 100;
      gsap.to(imageRef.current, { x, y, duration: 0.4, ease: "power2.out" });
    },
    [isDesktop]
  );

  return (
    <a
      ref={rowRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-project-row
      data-cursor="pointer"
      className="relative group block py-8 lg:py-10 border-b border-border first:border-t"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-baseline gap-6">
          <span className="text-text-muted text-sm font-body tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl lg:text-4xl font-bold uppercase group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="flex gap-2 flex-wrap">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="text-xs uppercase tracking-wider text-text-muted px-3 py-1 border border-border rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <TbArrowUpRight
            size={24}
            className="text-text-muted group-hover:text-accent group-hover:rotate-45 transition-all duration-300 shrink-0"
          />
        </div>
      </div>

      {/* Hover image (desktop only) */}
      {isDesktop && (
        <div
          ref={imageRef}
          className="absolute top-0 left-0 w-[320px] aspect-video rounded-lg overflow-hidden pointer-events-none z-10 shadow-2xl"
          style={{
            opacity: hovering ? 1 : 0,
            clipPath: hovering ? "inset(0%)" : "inset(100% 0 0 0)",
            transition: "opacity 0.3s, clip-path 0.4s cubic-bezier(0.77,0,0.18,1)",
          }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="320px"
          />
        </div>
      )}

      {/* Mobile thumbnail */}
      {!isDesktop && (
        <div className="mt-4 w-full aspect-video rounded-lg overflow-hidden relative">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
    </a>
  );
}
