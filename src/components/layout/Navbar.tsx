"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@/components/core/SmoothScroll";
import { MagneticElement } from "@/components/core/MagneticElement";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "A propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Expérience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (!navRef.current) return;

      ScrollTrigger.create({
        start: "top -80",
        onEnter: () => {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(12px)",
            duration: 0.3,
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            duration: 0.3,
          });
        },
      });
    },
    { scope: navRef }
  );

  const scrollTo = useCallback(
    (href: string) => {
      setMenuOpen(false);
      if (lenis) {
        lenis.scrollTo(href, { offset: -80 });
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis]
  );

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-5 flex items-center justify-between transition-none"
        style={{ backgroundColor: "transparent" }}
      >
        <MagneticElement>
          <button
            onClick={() => scrollTo("#hero")}
            className="font-display text-2xl font-bold tracking-tight text-text-primary"
          >
            MZ<span className="text-accent">.</span>
          </button>
        </MagneticElement>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="relative text-sm uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-full h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 w-8 z-[60]"
          aria-label="Menu"
        >
          <span
            className={`block h-px w-full bg-text-primary transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block h-px w-full bg-text-primary transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <MobileMenu open={menuOpen} links={NAV_LINKS} onNavigate={scrollTo} />
    </>
  );
}

function MobileMenu({
  open,
  links,
  onNavigate,
}: {
  open: boolean;
  links: typeof NAV_LINKS;
  onNavigate: (href: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const linkEls = containerRef.current.querySelectorAll("[data-nav-link]");

      if (open) {
        gsap.to(containerRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
        gsap.fromTo(
          linkEls,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out", delay: 0.1 }
        );
      } else {
        gsap.to(containerRef.current, { opacity: 0, pointerEvents: "none", duration: 0.3 });
      }
    },
    { scope: containerRef, dependencies: [open] }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-bg-primary z-50 flex flex-col items-center justify-center gap-8 opacity-0 pointer-events-none"
    >
      {links.map((link) => (
        <button
          key={link.href}
          data-nav-link
          onClick={() => onNavigate(link.href)}
          className="font-display text-4xl font-bold uppercase tracking-wide text-text-primary hover:text-accent transition-colors"
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}
