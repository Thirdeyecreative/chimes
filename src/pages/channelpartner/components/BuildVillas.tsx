import ScrollReveal from "@/ReactBits/ScrollReveal/ScrollReveal";

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
          Building Homes Together
          <br /> <span>Growing Together</span>
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
        The Chimes Channel Partner Program is designed to build long-term,
        meaningful associations with trusted real estate professionals who share
        our vision of responsible development. We invite experienced property
        consultants and channel partners in Bengaluru to collaborate with us in
        presenting eco-conscious, thoughtfully designed villas to discerning
        homebuyers.
      </ScrollReveal>
    </div>
  );
}

export default BuildVillas;
