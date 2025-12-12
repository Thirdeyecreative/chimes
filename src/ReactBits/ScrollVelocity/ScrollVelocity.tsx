"use client";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

/* ------------------------------------------------------------
   UTILITY: Measure width of element
------------------------------------------------------------ */
function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) setWidth(ref.current.offsetWidth);
    }
    updateWidth();
    requestAnimationFrame(updateWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

/* ------------------------------------------------------------
   VELOCITY SCROLLER (always moves right → left)
------------------------------------------------------------ */
const VelocityScroller: React.FC<{
  items: unknown[];
  renderCard: (item: unknown, index: number) => React.ReactNode;
  baseVelocity: number;
  numCopies?: number;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}> = ({
  items,
  renderCard,
  baseVelocity,
  numCopies = 6,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  /* ------------------------------------------------------------
     1. ADD HOVER REF
     We use a Ref instead of State to avoid re-rendering the component
     every time the mouse enters/leaves, keeping animation smooth.
  ------------------------------------------------------------ */
  const isHovered = useRef(false);

  /* ------------------------------------------------------------
     CONSTANT RIGHT → LEFT MOVEMENT
  ------------------------------------------------------------ */
  const baseX = useMotionValue(0);

  /* ------------------------------------------------------------
     WRAP SETUP
  ------------------------------------------------------------ */
  const copyRef = useRef<HTMLDivElement | null>(null);
  const copyWidth = useElementWidth(copyRef);
  const [measured, setMeasured] = useState(false);

  const wrap = (min: number, max: number, v: number): number =>
    ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

  const x = useMotionValue(0);

  useEffect(() => {
    if (copyWidth > 0 && !measured) {
      baseX.set(wrap(-copyWidth, 0, baseX.get()));
      setMeasured(true);
    }
  }, [copyWidth]);

  /* ------------------------------------------------------------
     ANIMATION LOOP (constant right → left)
  ------------------------------------------------------------ */
  useAnimationFrame((t, delta) => {
    if (!measured || !copyWidth) return;

    /* ------------------------------------------------------------
       2. CHECK HOVER STATUS
       If hovered, we simply return early, effectively pausing
       the calculation of the new position.
    ------------------------------------------------------------ */
    if (isHovered.current) return;

    const moveBy = -baseVelocity * (delta / 1000); // Always RIGHT → LEFT
    baseX.set(baseX.get() + moveBy);

    x.set(wrap(-copyWidth, 0, baseX.get()));
  });

  /* ------------------------------------------------------------
     COPY BUILDER
  ------------------------------------------------------------ */
  const blocks = [];
  for (let i = 0; i < numCopies; i++) {
    blocks.push(
      <div
        key={i}
        ref={i === 0 ? copyRef : null}
        style={{ display: "flex", alignItems: "center" }}
      >
        {items.map((item, idx) => (
          <div key={`${i}-${idx}`} style={{ transition: "200ms ease" }}>
            {renderCard(item, idx)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={parallaxClassName}
      /* ------------------------------------------------------------
         3. ATTACH EVENT HANDLERS
         Update the ref immediately on interaction.
      ------------------------------------------------------------ */
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
      style={{
        overflow: "hidden",
        width: "100%",
        position: "relative",
        ...parallaxStyle,
      }}
    >
      <motion.div
        className={scrollerClassName}
        style={{
          display: "flex",
          willChange: "transform",
          x,
          ...scrollerStyle,
        }}
      >
        {blocks}
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------
   HORIZONTAL SCROLLER (Multiple rows)
------------------------------------------------------------ */
const HorizontalScroller: React.FC<{
  data: unknown[][];
  renderCard: (item: unknown, index: number) => React.ReactNode;
  velocity?: number;
  numCopies?: number;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}> = ({
  data,
  renderCard,
  velocity = 50,
  numCopies = 6,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  return (
    <section>
      {data.map((items, idx) => (
        <div key={idx} style={{ marginBottom: idx !== data.length - 1 ? "20px" : "0" }}>
          <VelocityScroller
            items={items}
            baseVelocity={velocity} // always same direction
            renderCard={(item, i) => renderCard(item, i)}
            numCopies={numCopies}
            parallaxClassName={parallaxClassName}
            scrollerClassName={scrollerClassName}
            parallaxStyle={parallaxStyle}
            scrollerStyle={scrollerStyle}
          />
        </div>
      ))}
    </section>
  );
};

export default HorizontalScroller;