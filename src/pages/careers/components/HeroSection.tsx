import React from "react";

function HeroSection() {
  return (
    <div className="hero-section ">
      <img
        src="/assets/Hero Section.webp"
        alt="hero"
        className="hero-image-background"
      />

      <div className="text-section overflow-hidden ">
        <div className="w-full">
          <span>Careers at Raise Infra</span>
          {/* <img
            src="assets/Chimes Logo in White.svg"
            alt="logo of chimes"
            className="w-[92vw] mx-auto block hero-the-chimes-logo-white"
          /> */}
          <h2 style={{fontSize:"12vw"}}>WORK WITH US</h2>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
