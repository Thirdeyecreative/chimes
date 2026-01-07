import React, { useRef, useState, useEffect } from "react";
import VideoShowcase from "./VideoShowcase";

const sections = [
  { name: "ENTRANCE & BUS PICKUP POINT", image: "assets/Entrance.webp" },
  { name: "PLAZA", image: "assets/Plaza.webp" },
  { name: "WATER FEATURE", image: "assets/Water Feature.webp" },
  { name: "SWIMMING POOL", image: "assets/Swimming Pool.webp" },
  { name: "BADMINTON/ PICKLEBALL", image: "assets/Badminton.webp" },
  { name: "MUSICAL WALL", image: "assets/Musical Wall.webp" },
  { name: "REFLEXOLOGY PATHWAY", image: "assets/Reflexology Pathway.webp" },
  { name: "PARTY LAWN", image: "assets/Party Lawn.webp" },
  { name: "AMPHITHEATER", image: "assets/Amphitheater.webp" },      
  { name: "EARTHMOUND", image: "assets/Earth Mound.webp" },
  { name: "KIDS PLAY AREA", image: "assets/Kids Play Area.webp" },
];

const defaultImage = "assets/Master Plan.webp";

function AcreofTheChimes() {
  // 1. State to track which index is currently active
  const [activeIndex, setActiveIndex] = useState(0);

  // 2. State to pause the auto-play when user is hovering
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3. The Auto-Rotation Logic
  useEffect(() => {
    // If the user is hovering over the list, do not rotate
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        // Cycle to the next index, resetting to 0 if at the end
        return (prevIndex + 1) % sections.length;
      });
    }, 2500); // Change image every 2.5 seconds

    return () => clearInterval(interval);
  }, [isHovered]); // Re-run effect if hover state changes

  // Determine which image to show based on index
  const currentImage = sections[activeIndex]?.image || defaultImage;

  return (
    <div className=" acreo-of-the-chimes-section ">
      <img
        src="assets/drawing-tree-with-green-yellow-leaves copy 1.webp"
        id="acreo-of-the-chimes-tree-logo-image"
        alt=""
        className="w-[8.125rem]"
      />
      <p className="mb-[2rem] md:mb-[5rem]">
        {isMobile ? (
          <>
            Experience <span>thoughtful design</span> <br /> and natural
            serenity woven <br /> into every acre of <br /> "The Chimes"
          </>
        ) : (
          <>
            Experience <span>thoughtful design</span> and natural serenity woven
            into every acre of The Chimes
          </>
        )}
      </p>

      <VideoShowcase
        videoUrl="/assets/acreo-of-the-chimes-video.mp4"
        thumbnailUrl={
          isMobile
            ? "assets/overlay-thumpnail-mobile.webp"
            : "assets/overlay-thumpnail.webp"
        }
      />

      <div
        ref={containerRef}
        className="acreo-of-the-chimes-text-and-image-container left-and-right-padding-in-content max-w-[1339px] mx-auto"
      >
        {/* Sidebar */}
        {/* 4. Added onMouseEnter/Leave to the container to handle pausing */}
        <div
          className="space-y-4 text-lg font-medium text-gray-800 lg:w-[90%] tab-section-width-in-acreo-of-the-chimes w-[100%]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {sections.map((section, index) => (
            <div
              key={section.name}
              onClick={() => {
                setActiveIndex(index);
                containerRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              // When hovering a specific item, switch to it immediately
              onMouseEnter={() => setActiveIndex(index)}
              className={`cursor-pointer flex align-middle justify-between hover:text-blue-600 transition-colors text-area-inside-text-and-image-container ${
                // 5. Highlight logic: Check if this index matches the activeIndex
                activeIndex === index
                  ? "selected-text-in-acreo-of-the-chimes text-blue-600"
                  : ""
              }`}
            >
              {section.name}
            </div>
          ))}
        </div>

        {/* Image Viewer */}
        <div className="">
          <img
            src={currentImage}
            alt="Map Section Preview"
            className="w-full scale-100 md:scale-100 rounded-xl transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}

export default AcreofTheChimes;
