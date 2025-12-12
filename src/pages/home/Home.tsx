"use client";
import dynamic from "next/dynamic";
import React from "react";
import HeroSection from "./components/HeroSection";
import BuildVillas from "./components/BuildVillas";
const Natureinspiredvilla = dynamic(
  () => import("@/pages/home/components/Natureinspiredvilla"),
  {
    ssr: false, // Optional: disable SSR if the component uses browser-only APIs
    loading: () => <p>Loading...</p>, // Optional: fallback while loading
  }
);
const Infiniteslider = dynamic(() => import("./components/Infiniteslider"), {
  ssr: false, // Optional: disable SSR if the component uses browser-only APIs
  loading: () => <p>Loading...</p>, // Optional: fallback while loading
});
import ElevatingeveryMomentSlider from "./components/ElevatingeveryMomentSlider";
const NaturallybuiltArea = dynamic(
  () => import("./components/NaturallybuiltArea"),
  {
    ssr: false, // Optional: disable SSR if the component uses browser-only APIs
    loading: () => <p>Loading...</p>, // Optional: fallback while loading
  }
);
const AcreofTheChimes = dynamic(() => import("./components/AcreofTheChimes"), {
  ssr: false, // Optional: disable SSR if the component uses browser-only APIs
  loading: () => <p>Loading...</p>, // Optional: fallback while loading
});

// Dynamically import the FloorPlan component
const FloorPlan = dynamic(() => import("./components/FloorPlan"), {
  ssr: false, // Optional: disable SSR if the component uses browser-only APIs
  loading: () => <p>Loading...</p>, // Optional: fallback while loading
});
import WhatMatters from "./components/WhatMatters";
import NearbyHighlights from "./components/NearbyHighlights";
const LaptopAnimation = dynamic(() => import("./components/LaptopAnimation"), {
  ssr: false, // Optional: disable SSR if the component uses browser-only APIs
  loading: () => <p>Loading...</p>, // Optional: fallback while loading
});

function HomeSection() {
  return (
    <div className="overflow-hidden md:overflow-visible">
      <HeroSection />
      <BuildVillas />
      <Natureinspiredvilla />
      <Infiniteslider />
      {/* <ScrollEffects  /> */}
      <NaturallybuiltArea />
      <ElevatingeveryMomentSlider />
      <AcreofTheChimes />
      <FloorPlan />
      <WhatMatters />
      <NearbyHighlights />
      {/* <ConnectedtoWhatMatters /> */}
      {/* <LaptopAnimation /> */}
    </div>
  );
}

export default HomeSection;
