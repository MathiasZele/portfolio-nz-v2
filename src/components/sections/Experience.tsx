"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolioData } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Small delay to let Lenis sync with ScrollTrigger
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

      const items = sectionRef.current?.querySelectorAll("[data-item]");
      if (items) {
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
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
    <section ref={sectionRef} id="experience" className="relative py-24 lg:py-32 px-6 lg:px-12 bg-bg-secondary/30">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-accent/3 rounded-full blur-[170px]" />
        <div className="absolute bottom-[20%] left-[15%] w-[350px] h-[350px] bg-blue-700/4 rounded-full blur-[130px]" />
      </div>
      <div className="max-w-7xl mx-auto">
        <p
          data-heading
          className="text-sm uppercase tracking-[0.3em] text-text-muted mb-16 font-body"
        >
          Parcours
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Experience */}
          <div>
            <h3 className="font-display text-2xl font-bold uppercase mb-10 text-text-primary">
              Expérience
            </h3>
            <div className="relative pl-8 border-l border-accent/30">
              {portfolioData.experience.map((exp, i) => (
                <div
                  key={i}
                  data-item
                  className="relative pb-10 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[calc(2rem+4px)] top-1 w-2 h-2 rounded-full bg-accent" />

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs uppercase tracking-wider text-accent px-3 py-1 border border-accent/30 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-semibold text-text-primary mb-1">
                    {exp.role}
                  </h4>
                  <p className="text-text-secondary text-sm mb-3">{exp.company}</p>

                  <ul className="space-y-1.5">
                    {exp.description.map((desc, j) => (
                      <li key={j} className="text-text-muted text-sm flex items-start gap-2">
                        <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-display text-2xl font-bold uppercase mb-10 text-text-primary">
              Formation
            </h3>
            <div className="relative pl-8 border-l border-accent/30">
              {portfolioData.education.map((edu, i) => (
                <div
                  key={i}
                  data-item
                  className="relative pb-10 last:pb-0"
                >
                  <div className="absolute -left-[calc(2rem+4px)] top-1 w-2 h-2 rounded-full bg-accent" />

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs uppercase tracking-wider text-accent px-3 py-1 border border-accent/30 rounded-full">
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-semibold text-text-primary mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-text-secondary text-sm mb-2">{edu.school}</p>

                  {edu.description && (
                    <p className="text-text-muted text-sm">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
