"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

// Types

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  animationType?:
    | "scaleDown"
    | "rotate"
    | "gallery"
    | "catch"
    | "opacity"
    | "fixed"
    | "parallax";
  hijacking?: "on" | "off";
  index?: number;
  totalSections?: number;
};

type ScrollAnimationComponentProps = {
  children: React.ReactNode;
  animationType?:
    | "scaleDown"
    | "rotate"
    | "gallery"
    | "catch"
    | "opacity"
    | "fixed"
    | "parallax";
  hijacking?: "on" | "off";
  className?: string;
};

// Scroll Animation Section Component

const ScrollAnimationSection = ({
  children,
  className = "",
  animationType = "parallax",
  hijacking = "off",
  index = 0,
  totalSections = 1,
}: SectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  return (
    <motion.section
      ref={sectionRef}
      className={`cd-section sticky top-0 h-screen ${className}`}
      data-animation={animationType}
      data-hijacking={hijacking}
      style={{ translateY }}
    >
      <div className="w-full h-full">{children}</div>
    </motion.section>
  );
};

// Scroll Stacking Cards Component

const ScrollStackingCards = ({
  children,
  animationType = "parallax",
  hijacking = "off",
  className = "",
}: ScrollAnimationComponentProps) => {
  const sections = React.Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isAnimating = false;

    const handleWheel = (e: WheelEvent) => {
      const scrollTop = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const totalHeight = sectionHeight * sections.length;

      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop >= totalHeight - sectionHeight && e.deltaY > 0;

      // Let scroll continue to outer sections
      if (atTop || atBottom) {
        return; // allow native scroll to hero/footer
      }

      e.preventDefault(); // block native scroll only inside the section

      if (isAnimating) return;
      isAnimating = true;

      const currentIndex = Math.round(scrollTop / sectionHeight);
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(currentIndex + direction, sections.length - 1));
      const nextScrollTop = nextIndex * sectionHeight;

      container.scrollTo({ top: nextScrollTop, behavior: "smooth" });

      setTimeout(() => {
        isAnimating = false;
      }, 800);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [sections.length]);

  return (
    <div
      ref={containerRef}
      className={`scroll-stack-container relative h-screen overflow-y-scroll snap-y snap-mandatory ${className}`}
    >
      {sections.map((child, i) => (
        <ScrollAnimationSection
          key={i}
          animationType={animationType}
          hijacking={hijacking}
          index={i}
          totalSections={sections.length}
          className="snap-start"
        >
          {child}
        </ScrollAnimationSection>
      ))}
    </div>
  );
};

export default ScrollStackingCards;
