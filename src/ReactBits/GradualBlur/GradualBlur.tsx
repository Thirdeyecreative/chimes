import React, { CSSProperties, useEffect, useRef, useState, useMemo, PropsWithChildren } from 'react';
import * as math from 'mathjs';

type GradualBlurProps = PropsWithChildren<{
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: boolean | 'scroll';
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  responsive?: boolean;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  mobileWidth?: string;
  tabletWidth?: string;
  desktopWidth?: string;
  preset?: string;
  gpuOptimized?: boolean;
  hoverIntensity?: number;
  target?: 'parent' | 'page';
  onAnimationComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}>;

/* ---------------- DEFAULT + PRESETS ------------------- */

const DEFAULT_CONFIG: Partial<GradualBlurProps> = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {}
};

const PRESETS: Record<string, Partial<GradualBlurProps>> = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true }
};

const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const mergeConfigs = (...configs: Partial<GradualBlurProps>[]) =>
  configs.reduce((acc, conf) => ({ ...acc, ...conf }), {});

/* --------------------- NEW CODE ------------------------
   Hide blur when user reaches the bottom of page
--------------------------------------------------------- */

const usePageBottom = () => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const check = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      // When user is 40px from bottom, treat as bottom
      setIsBottom(scrollY + viewportHeight >= pageHeight - 40);
    };

    check();
    window.addEventListener("scroll", check);
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return isBottom;
};

/* ------------------------------------------------------ */

const getGradientDirection = (position: string): string => {
  const d: any = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  };
  return d[position] || 'to bottom';
};

const GradualBlur: React.FC<GradualBlurProps> = props => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isPageBottom = usePageBottom(); // 👈 NEW

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props) as Required<GradualBlurProps>;
  }, [props]);

  /* ------------ Responsive height/width hook --------------- */

  const useResponsiveDimension = (key: keyof GradualBlurProps) => {
    const [val, setVal] = useState<any>(config[key]);
    useEffect(() => {
      if (!config.responsive) return;

      const update = () => {
        const w = window.innerWidth;
        let v: any = config[key];

        const upper = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

        if (w <= 480 && (config as any)[`mobile${upper(key)}`])
          v = (config as any)[`mobile${upper(key)}`];

        if (w <= 768 && (config as any)[`tablet${upper(key)}`])
          v = (config as any)[`tablet${upper(key)}`];

        if (w > 768 && (config as any)[`desktop${upper(key)}`])
          v = (config as any)[`desktop${upper(key)}`];

        setVal(v);
      };

      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);

    return config.responsive ? val : config[key];
  };

  const responsiveHeight = useResponsiveDimension("height");
  const responsiveWidth = useResponsiveDimension("width");

  /* ------------ Blur Divs Rendering ------------------ */

  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / config.divCount;

    const curve = CURVE_FUNCTIONS[config.curve];

    for (let i = 1; i <= config.divCount; i++) {
      const progress = curve(i / config.divCount);
      const blurValue = 0.0625 * (progress * config.divCount + 1) * config.strength;

      const p1 = (increment * (i - 1)).toFixed(1);
      const p2 = (increment * i).toFixed(1);

      const direction = getGradientDirection(config.position);

      const divStyle: CSSProperties = {
        maskImage: `linear-gradient(${direction}, transparent ${p1}%, black ${p2}%)`,
        WebkitMaskImage: `linear-gradient(${direction}, transparent ${p1}%, black ${p2}%)`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity
      };

      divs.push(<div key={i} className="absolute inset-0" style={divStyle} />);
    }
    return divs;
  }, [config]);

  /* -------------- Container style -------------------- */

  const containerStyle: CSSProperties = {
    pointerEvents: "none",
    position: config.target === "page" ? "fixed" : "absolute",
    opacity: isPageBottom ? 0 : 1, // 👈 HIDE when at page bottom
    transition: "opacity 0.4s ease-out",
    zIndex: config.zIndex,
    ...(config.position === "bottom" && {
      bottom: 0,
      width: "100%",
      height: responsiveHeight
    }),
    ...(config.position === "top" && {
      top: 0,
      width: "100%",
      height: responsiveHeight
    }),
    ...(config.position === "left" && {
      left: 0,
      height: "100%",
      width: responsiveWidth || responsiveHeight
    }),
    ...(config.position === "right" && {
      right: 0,
      height: "100%",
      width: responsiveWidth || responsiveHeight
    }),
    ...config.style
  };

  return (
    <div
      ref={containerRef}
      className={`gradual-blur relative isolate  ${config.className}`}
      style={containerStyle}
    >
      <div className="relative w-full h-full -bottom-[50%]">{blurDivs}</div>
      {props.children}
    </div>
  );
};

export default React.memo(GradualBlur);
