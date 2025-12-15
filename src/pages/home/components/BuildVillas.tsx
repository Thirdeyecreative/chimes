import ScrollReveal from "@/ReactBits/ScrollReveal/ScrollReveal";
import React from "react";

function BuildVillas() {
  return (
    <div className="build-villas-content-holder ">
      <img
        src="/assets/build-villas-image1.webp"
        id="about-us"
        width={140}
        height={140}
        alt="build-villas"
      />
      <div className="build-villas-text-holder">
        <div className="coma-icon">
          <img src="/assets/build-villas-image3.svg" alt="coma icon" />
        </div>
        <h4>
          We build Villas that think
          <br /> and <span>Breathe</span>
        </h4>
        <div className="coma-icon2">
          <img src="/assets/build-villas-image2.svg" alt="coma icon" />
        </div>
      </div>
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
      >
        At The Chimes, we don’t just build homes. We engineer living, breathing
        spaces that are kinder to the planet and smarter for you. Every villa is
        powered by the sun, cooled by interlocking mud bricks, and certified by
        the world’s most trusted green bodies. Less cement, less carbon, more
        soul. It’s architecture with a conscience and comfort that lasts for
        generations.
      </ScrollReveal>
      <div className="build-villas-line-content-holder">
        <div className="build-villas-line-holder">
          <img
            src="/assets/Built for Green Greatness.gif"
            className="w-[55px]"
            alt=""
          />
          <h5>Built for Green Greatness</h5>
          {/* <p>
            LEED Platinum Certified for <br /> Sustainable Excellence
          </p> */}
        </div>
        <div className="build-villas-line-holder">
          <img
            src="/assets/Precision in Every Brick.gif"
            alt=""
            className="w-[125px]"
          />
          <h5>Precision in Every Brick</h5>
          {/* <p>
            ISO 9001:2015 Certified for <br /> Uncompromised Quality
          </p> */}
        </div>
        <div className="build-villas-line-holder">
          <img
            src="/assets/Zero Guilt. Pure Living.gif"
            className="w-[125px]"
            alt=""
          />
          <h5>Zero Guilt, Pure Living</h5>
          {/* <p>
            Carbon Neutral with an Ultra Low <br /> Environmental Footprint
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default BuildVillas;
