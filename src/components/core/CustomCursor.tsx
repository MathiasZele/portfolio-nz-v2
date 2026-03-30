"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const isTouch = !useMediaQuery("(hover: hover)");

  useEffect(() => {
    if (isTouch || !dotRef.current || !outlineRef.current) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;

    document.body.classList.add("cursor-active");

    const moveDot = gsap.quickTo(dot, "css", { duration: 0.15, ease: "power2.out" });
    const moveOutline = gsap.quickTo(outline, "css", { duration: 0.5, ease: "power3" });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });
    const xOutline = gsap.quickTo(outline, "x", { duration: 0.5, ease: "power3" });
    const yOutline = gsap.quickTo(outline, "y", { duration: 0.5, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xOutline(e.clientX);
      yOutline(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      gsap.to(dot, { scale: 0, duration: 0.3 });
      gsap.to(outline, { scale: 2, borderColor: "rgba(79,70,229,0.5)", backgroundColor: "rgba(79,70,229,0.08)", duration: 0.3 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(outline, { scale: 1, borderColor: "rgba(240,239,233,0.5)", backgroundColor: "transparent", duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll("a, button, [data-cursor='pointer']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.classList.remove("cursor-active");
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-text-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 w-10 h-10 border border-text-primary/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
