import Image from "next/image";
import ScrollReveal from "@/ReactBits/ScrollReveal/ScrollReveal";

function BuildVillas() {
  return (
    <div className="build-villas-content-holder ">
      <Image
        src="/assets/build-villas-image1.webp"
        id="about-us"
        width={140}
        height={140}
        alt="build-villas"
        quality={100}
      />
      <div className="build-villas-text-holder">
        <div className="coma-icon">
          <Image
            src="/assets/build-villas-image3.svg"
            alt="coma icon"
            width={40}
            height={40}
            quality={100}
          />
        </div>
        <h4>
          Building with Purpose
          <br /> <span>Growing with People</span>
        </h4>
        <div className="coma-icon2">
          <Image
            src="/assets/build-villas-image2.svg"
            alt="coma icon"
            width={40}
            height={40}
            quality={100}
          />
        </div>
      </div>
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
      >
        At The Chimes, we believe great spaces are built by people who think
        thoughtfully and act responsibly. We’re always looking for passionate
        individuals who care about design, sustainability and meaningful work.
        If you’re driven by purpose, value collaboration and want to contribute
        to building greener, smarter communities, we’d love to work with you.
        Together, let’s shape homes and careers that make a lasting impact.
      </ScrollReveal>
    </div>
  );
}

export default BuildVillas;
