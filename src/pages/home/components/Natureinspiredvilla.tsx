"use client";
import TiltedCard from "@/ReactBits/TiltedCard/TiltedCard";
import React from "react";
function Natureinspiredvilla() {
  const images = [
    {
      id: 1,
      img: "assets/Eco-friendly villa made with mud interlocking bricks, close-up of sustainable wall material, architectural design.png",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
    },
  ];

  const [ismobile, setIsmobile] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      setIsmobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="natureinspiredvilla" id="highlights">
      <img
        className="background-image"
        src={
          ismobile
            ? "/assets/Frame_1618874524[1].png"
            : "/assets/nature inspired villa background image (2).webp"
        }
        alt="nature inspired villa background image"
      />

      <div className="natureinspiredvilla-text-holder-and-content-holder">
        <h3>
          Bricks that <span>Breathe</span> <br /> in and out with you
        </h3>

        <div className="natureinspiredvilla-content-holder-image"></div>

        <div className="natureinspiredvilla-sub-container-content-holder left-and-right-padding-in-content">
          <div className="natureinspiredvilla-sub-container">
            <TiltedCard
              mainBodyClassName="natureinspiredvilla-content-holder-image-2"
              className="section-overlay border-r-2"
              imageSrc="assets/Modern eco-luxury villa private lounge.webp"
              altText="Powered by the Sun, Not the Grid"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={0}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <section className="natureinspiredvilla-content-holder-text ">
                  <h4>
                    Your own <br /> Private Sanctuary
                  </h4>
                  <p>240 Sq.ft of space for wellness and quiet luxury</p>
                </section>
              }
            />
            <TiltedCard
              mainBodyClassName="natureinspiredvilla-content-holder-image-2"
              className="section-overlay"
              imageSrc="assets/Modern-servant’s-quarter-in-a-luxury eco-vill –clean.webp"
              altText="Powered by the Sun, Not the Grid"
              captionText="Kendrick Lamar - GNX"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={0}
              scaleOnHover={1}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <section className="natureinspiredvilla-content-holder-text ">
                  <h4>
                    Space that Respects <br /> every role
                  </h4>
                  <p>Provision for 400 Sq.ft of maid's room</p>
                </section>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Natureinspiredvilla;
