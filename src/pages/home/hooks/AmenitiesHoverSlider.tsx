import { useEffect, useState } from "react";

interface AmenitiesItemProps {
  text: string;
  image: string;
}

const AmenitiesHoverSlider = () => {
  const amenities = [
    {
      text: "Squash Court",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31606.webp",
    },
    { text: "Gym", image: "assets/Gym.webp" },
    {
      text: "Kids Pool",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31601.webp",
    },
    { text: "Multipurpose Hall", image: "assets/Multipurpose-hall.webp" },
    { text: "Outdoor Gym", image: "assets/outdoor-gym.webp" },
    {
      text: "Multipurpose Court",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31600.webp",
    },
    {
      text: "Billiards",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31604.webp",
    },
    {
      text: "Cafeteria",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31603.webp",
    },
    {
      text: "Table Tennis",
      image:
        "assets/freepik__candid-photography-with-natural-textures-and-highl__31605.webp",
    },
    { text: "Foosball", image: "assets/Foosball.webp" },
    { text: "Steam & Sauna", image: "assets/Steam & Sauna.webp" },
    { text: "Walking Track", image: "assets/Walking track.webp" },
    { text: "Work Pods", image: "assets/work pods.webp" },
  ];

  // -----------------------------
  // ACTIVE ROTATION STATE ADDED
  // -----------------------------
  const [activeIndex, setActiveIndex] = useState(0);

  const [hoveredItem, setHoveredItem] = useState<AmenitiesItemProps | null>(
    amenities[0]
  );

  // -----------------------------
  // AUTO ROTATE EVERY 2 SECONDS
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % amenities.length;
        setHoveredItem(amenities[nextIndex]);
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center w-full min-h-[500px] ">
      <div className="relative w-full max-w-[1339px] min-h-[500px] left-and-right-padding-in-content all-image-section-container-every-moment overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-0 justify-between items-center">
        {/* ---------- TEXT LIST ---------- */}
        <div className="relative z-10 h-full flex items-start pb-8">
          <div className="mx-auto px-4 w-full">
            <div className="flex flex-wrap ">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <span
                    className={`
                      inline-block 
                      font-family-2 
                      font-normal 
                      text-left 
                      text-[24px]
                      md:text-[32px]
                      lg:text-[40px]
                      xl:text-[52px]
                      leading-[140%]
                      tracking-tighter 
                      transition-opacity 
                      duration-300 
                      cursor-pointer
                      text-[#010701]
                      ${
                        hoveredItem?.text && hoveredItem.text !== amenity.text
                          ? "opacity-50"
                          : "opacity-100"
                      }
                    `}
                    onMouseEnter={() => {
                      setHoveredItem(amenity);
                      setActiveIndex(index);
                    }}
                  >
                    {amenity.text}
                  </span>

                  {index < amenities.length - 1 && (
                    <span className="text-[24px] md:text-[32px] lg:text-[40px] xl:text-[52px] mx-1 text-[#010701] opacity-50">
                      ,&nbsp;
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- IMAGE DISPLAY ---------- */}
        {hoveredItem && (
          <div className="w-full flex justify-center lg:justify-end">
            <img
              src={hoveredItem.image}
              alt="Amenity"
              className="max-w-[450px] md:max-w-[500px] w-full h-[300px] md:h-[500px] object-cover transition-opacity duration-500 ease-in-out rounded-[32px]"
            />
          </div>
        )}

        {/* Global Font */}
        <style jsx global>{`
          .font-family-2 {
            font-family: var(--font-family-2);
          }
        `}</style>
      </div>
    </div>
  );
};

export default AmenitiesHoverSlider;
