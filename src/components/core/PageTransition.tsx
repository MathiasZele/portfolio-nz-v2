"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function PageTransition() {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!panelRef.current) return;

    gsap.set(panelRef.current, { scaleY: 1, transformOrigin: "top" });

    gsap.to(panelRef.current, {
      scaleY: 0,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.2,
    });
  }, []);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 bg-bg-primary z-[100] pointer-events-none"
    />
  );
}
