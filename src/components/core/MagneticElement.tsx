"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticElementProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticElement({
  children,
  strength = 0.3,
  className = "",
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = !useMediaQuery("(hover: hover)");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;

    gsap.to(ref.current, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (isTouch || !ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
