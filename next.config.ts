import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. React Settings */
  reactStrictMode: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* 2. Transpilation */
  transpilePackages: [
    "gsap",
    "react-leaflet",
    "leaflet",
    "react-slick",
    "react-player",
    "date-fns",
    "lodash",
    "react-use",
    "react-intersection-observer",
    "react-icons",
  ],

  /* 3. Experimental & Performance Features */
  experimental: {
    // ❌ REMOVED: forceSwcTransforms (Not needed with Turbopack)

    // ✅ Optimization: Automatically tree-shakes these libraries
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "lodash",
      "react-use",
      "react-intersection-observer",
      "react-icons",
      "react-leaflet",
      "react-slick",
      "react-player",
      "gsap",
      "leaflet",
    ],
  },

  /* 4. Images */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  /* 5. Build Options */
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
