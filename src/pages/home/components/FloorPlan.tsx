import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import GlassDropdown from "../hooks/CustomDropdown";
import { AnimatePresence, motion } from "framer-motion";
import GlassSurface from "@/ReactBits/GlassSurface/GlassSurface";
import SendEnquiryPopup from "@/pages/components/SendEnquiryPopupcopy";
const directions = ["East", "West"];
const isInMobileView = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth <= 768; // Example breakpoint for mobile
  }
  return false;
};

// Default floor data that matches your existing structure
const defaultFloors1 = [
  {
    numberId: 1,
    id: "ground-floor",
    name: isInMobileView() ? "Ground" : "Ground",
    backgroundImage: "assets/floor-plan-background-image.webp",
    sliderContent: [
      {
        image: "assets/EAST_FACING_VILLA-_R2_-_Stilt_Plan[1].webp",
        alt: "Open concept design",
        caption: "Main Floor - 1,800 sq.ft",
      },
    ],
  },
  {
    numberId: 2,
    id: "first-floor",
    name: isInMobileView() ? "First" : "First",
    backgroundImage:
      "assets/ECUMENE_CHIMES(2773-V)DINING_V2_25-07-2025-1st-flore.webp",
    sliderContent: [
      {
        image: "assets/EAST_FACING_VILLA-_R2_-_First_Floor[1].webp",
        alt: "Luxury penthouse layout",
        caption: "Penthouse - 2,400 sq.ft",
      },
    ],
  },
  {
    numberId: 3,
    id: "second-floor",
    name: isInMobileView() ? "Second" : "Second",
    backgroundImage:
      "assets/ECUMENE_CHIMES(2773-V)LIVING_V2_25-07-2025-2nd-flore.webp",
    sliderContent: [
      {
        image: "assets/EAST_FACING_VILLA-_R2_-_Second_Floor[1].webp",
        alt: "Contemporary house layout",
        caption: "Second Floor - 1,050 sq.ft",
      },
    ],
  },
  {
    numberId: 4,
    id: "third-floor",
    name: isInMobileView() ? "Third" : "Third",
    backgroundImage:
      "assets/Ecumene_Chimes_(2773_N)_Cam 13_Master Bedroom_Ver 01_25-07-2025-3rd-flore.webp",
    sliderContent: [
      {
        image: "assets/EAST_FACING_VILLA-_R2_-_Terrace_Floor[1].webp",
        alt: "Open concept design",
        caption: "Main Floor - 1,800 sq.ft",
      },
    ],
  },
];
const defaultFloors2 = [
  {
    numberId: 1,
    id: "ground-floor",
    name: isInMobileView() ? "Ground" : "Ground",
    backgroundImage: "assets/floor-plan-background-image.webp",
    sliderContent: [
      {
        image: "assets/WEST_FACING_VILLA_R2_-_Stilt_Floor[1].webp",
        alt: "Open concept design",
        caption: "Main Floor - 1,800 sq.ft",
      },
    ],
  },
  {
    numberId: 2,
    id: "first-floor",
    name: isInMobileView() ? "First" : "First",
    backgroundImage:
      "assets/ECUMENE_CHIMES(2773-V)DINING_V2_25-07-2025-1st-flore.webp",
    sliderContent: [
      {
        image: "assets/WEST_FACING_VILLA_R2_-_First_Floor[1].webp",
        alt: "Luxury penthouse layout",
        caption: "Penthouse - 2,400 sq.ft",
      },
    ],
  },
  {
    numberId: 3,
    id: "second-floor",
    name: isInMobileView() ? "Second" : "Second",
    backgroundImage:
      "assets/ECUMENE_CHIMES(2773-V)LIVING_V2_25-07-2025-2nd-flore.webp",
    sliderContent: [
      {
        image: "assets/WEST_FACING_VILLA_R2_-_Second_Floor[1].webp",
        alt: "Contemporary house layout",
        caption: "Second Floor - 1,050 sq.ft",
      },
    ],
  },
  {
    numberId: 4,
    id: "third-floor",
    name: isInMobileView() ? "Third" : "Third",
    backgroundImage:
      "assets/Ecumene_Chimes_(2773_N)_Cam 13_Master Bedroom_Ver 01_25-07-2025-3rd-flore.webp",
    sliderContent: [
      {
        image: "assets/WEST_FACING_VILLA_R2_-_Terrace_Floor[1].webp",
        alt: "Open concept design",
        caption: "Main Floor - 1,800 sq.ft",
      },
    ],
  },
];

function FloorPlan({
  backgroundImage = "assets/floor-plan-background-image.webp",
  floorPlans = [],
  sliderSettings = {},
  containerClassName = "",
  sliderClassName = "",
  buttonText = "Download Floor Plan",
  onDownloadClick = () => {},
  showDownloadButton = true,
  // New prop for dynamic floors
  floors = defaultFloors1,
  defaultActiveFloor = "ground-floor",
}) {
  const [clickedValue, setClickedValue] = useState(defaultActiveFloor);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState("East");

  // ⭐ NEW → State for dynamically selected floors
  const [currentFloors, setCurrentFloors] = useState(defaultFloors1);

  // Update floors when dropdown changes
  useEffect(() => {
    setCurrentFloors(
      selectedOption === "East" ? defaultFloors1 : defaultFloors2
    );
    setClickedValue("ground-floor"); // reset floor to ground for UX
  }, [selectedOption]);

  // Active floor
  const activeFloor =
    currentFloors.find((floor) => floor.id === clickedValue) ||
    currentFloors[0];

  // Decide slider content
  const plansToShow =
    floorPlans.length > 0 ? floorPlans : activeFloor.sliderContent;

  const defaultSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      className={`relative w-full h-[733px] flex justify-center items-center overflow-hidden  ${containerClassName} `}
      id="floor-plans"
    >
      {/* Use either the passed backgroundImage or the active floor's background */}
      <AnimatePresence mode="wait">
        {(backgroundImage || activeFloor.backgroundImage) && (
          <motion.img
            key={activeFloor.id + activeFloor.backgroundImage + "bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            src={activeFloor.backgroundImage}
            alt="floor plan background"
            className="w-full h-screen object-cover floor-plan-background-image will-change-transform"
          />
        )}
      </AnimatePresence>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.22) 65%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none", // allows click-through
          zIndex: 1,
        }}
      ></div>

      <div className="floor-plan-container-holder left-and-right-padding-in-content ">
        <div className="bottom-8 left-0 right-0 mx-auto w-full h-full max-w-[569px] flex flex-col gap-5 md:gap-0 px-4 slider-content-holder">
          <h3 className="mobile-text-top-designed-for-life">
            Designed for Life,
            <br />
            <span> Measured in Space</span>
          </h3>
          <div className="bg-white bg-opacity-90 p-4 rounded-[16px] shadow-lg  w-full h-full slider-contener-parent">
            {plansToShow.length > 0 ? (
              <Slider {...defaultSettings} className={sliderClassName}>
                {plansToShow.map(
                  (
                    plan: { image: string; alt?: string; caption?: string },
                    index
                  ) => (
                    <div key={index} className="px-2">
                      <AnimatePresence mode="wait">
                        <img
                          src={plan.image}
                          alt={plan.alt || `Floor plan ${index + 1}`}
                          className="w-full h-100 object-contain scale-125 object-center mx-auto mb-4  floor-plan-section-optimization-image"
                        />
                      </AnimatePresence>
                      {/* {plan.caption && (
                        <p className="text-center mt-2 text-sm">
                          {plan.caption}
                        </p>
                      )} */}
                    </div>
                  )
                )}
              </Slider>
            ) : (
              <div className="text-center py-8">No floor plans available</div>
            )}

            {showDownloadButton && (
              <div
                className="text-center w-[90%]  mt-4"
                style={{ marginInline: "auto" }}
              >
                <button
                  className="download-button"
                  onClick={() => setIsOpen(true)}
                >
                  {buttonText}
                </button>
              </div>
            )}
          </div>
        </div>
        <section className="right-side-section-inFloor-plan">
          <h3 className="bouttom-h3-in-designed-for-life">
            Designed for Life,
            <br />
            <span> Measured in Space</span>
          </h3>
          <GlassSurface
            width={"fit-content"}
            height={"fit-content"}
            borderRadius={16}
            className="flex justify-center items-center overflow-visible px-2 desktop-view floor-plan-text-container-parent"
          >
            <div className="clickid-item-holder-in-floor-plan">
              <div className="floor-item and-this-is-dropdown-floor-plan">
                <GlassDropdown
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  options={directions}
                  defaultLabel="Choose facing"
                />
              </div>
              {/* Dynamically render floor items while preserving your exact styling */}
              {floors.map((floor) => (
                <div
                  key={floor.id}
                  className={
                    "floor-item" +
                    " " +
                    (clickedValue === floor.id ? " floor-active" : "")
                  }
                  onClick={() => setClickedValue(floor.id)}
                >
                  {floor.name}
                </div>
              ))}
            </div>
          </GlassSurface>

          <div className="mobile-view clickid-item-holder-in-floor-plan grid grid-cols-3 grid-rows-2 gap-4 items-stretch  overflow-visible px-2">
            <div className="floor-item and-this-is-dropdown-floor-plan row-span-2 flex justify-start items-start">
              <GlassDropdown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                options={directions}
                defaultLabel="Choose facing"
              />
            </div>
            {/* Dynamically render floor items while preserving your exact styling */}
            {floors.slice(0, 4).map((floor, index) => (
              <div
                key={floor.id}
                className={
                  "floor-item flex justify-center items-center " +
                  (clickedValue === floor.id ? "floor-active" : "")
                }
                onClick={() => setClickedValue(floor.id)}
              >
                {floor.name}
              </div>
            ))}
          </div>
        </section>
        <SendEnquiryPopup open={isOpen} setOpen={setIsOpen} />
      </div>
    </div>
  );
}

FloorPlan.propTypes = {
  backgroundImage: PropTypes.string,
  floorPlans: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string,
      caption: PropTypes.string,
    })
  ),
  sliderSettings: PropTypes.object,
  containerClassName: PropTypes.string,
  sliderClassName: PropTypes.string,
  buttonText: PropTypes.string,
  onDownloadClick: PropTypes.func,
  showDownloadButton: PropTypes.bool,
  // New prop types
  floors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string,
      sliderContent: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.string.isRequired,
          alt: PropTypes.string,
          caption: PropTypes.string,
        })
      ).isRequired,
    })
  ),
  defaultActiveFloor: PropTypes.string,
};

export default FloorPlan;
