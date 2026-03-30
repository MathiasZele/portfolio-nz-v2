"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Marquee } from "@/components/core/Marquee";
import { portfolioData } from "@/data/portfolio";
import { TbChevronDown } from "react-icons/tb";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 1 });

      // Name word reveal
      const words = nameRef.current?.querySelectorAll("[data-word]");
      if (words) {
        tl.from(words, {
          y: "110%",
          rotateX: -40,
          opacity: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: "power4.out",
        });
      }

      // Role fade in
      tl.from(
        roleRef.current,
        { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // Badge
      tl.from(
        badgeRef.current,
        { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(2)" },
        "-=0.3"
      );

      // Scroll indicator bounce
      if (scrollRef.current) {
        gsap.to(scrollRef.current, {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "power1.inOut",
          delay: 2.5,
        });
      }
    },
    { scope: sectionRef }
  );

  const allSkills = [
    ...portfolioData.skills.frontend,
    ...portfolioData.skills.backend,
    ...portfolioData.skills.mobile,
    ...portfolioData.skills.tools,
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-[700px] h-[700px] bg-accent/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-indigo-500/6 rounded-full blur-[150px]" />
        <div className="absolute top-[60%] left-[50%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg-secondary/60 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full pt-32 pb-16">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm uppercase tracking-widest text-text-secondary">
            Disponible pour de nouveaux projets
          </span>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-display font-bold uppercase leading-[0.9] text-[clamp(3rem,12vw,10rem)] mb-6"
        >
          {portfolioData.name.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <span data-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Role */}
        <p
          ref={roleRef}
          className="text-xl lg:text-2xl text-text-secondary max-w-xl font-body"
        >
          {portfolioData.role}
        </p>
      </div>

      {/* Marquee ticker */}
      <div className="absolute bottom-20 left-0 w-full border-y border-border py-4">
        <Marquee speed={40}>
          {allSkills.map((skill, i) => (
            <span
              key={i}
              className="mx-6 text-sm uppercase tracking-[0.2em] text-text-muted font-body whitespace-nowrap"
            >
              {skill}
              <span className="ml-6 text-accent">&#x2022;</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-muted"
      >
        <TbChevronDown size={24} />
      </div>
    </section>
  );
}
