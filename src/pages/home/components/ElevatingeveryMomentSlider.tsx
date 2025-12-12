import React, { useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AmenitiesHoverSlider from "../hooks/AmenitiesHoverSlider";
import SendEnquiryPopup from "@/pages/components/SendEnquiryPopupcopy";

const slides = [
  {
    image:
      "assets/Ecumene_Chimes_(2773_N)_Cam 02_Aerial Day_Ver 02_05-07-2025.webp",
    title: "Rear Aerial Layout View",
  },
  {
    image:
      "assets/Ecumene_Chimes_(2773_N)_Cam 03_East Villa Day_Ver 03_03-07-2025.webp",
    title: "East-Facing Villa",
  },
  {
    image:
      "assets/Ecumene_Chimes_(2773_N)_Cam 04_West Villa Day_Ver 04_03-07-2025.webp",
    title: "West-Facing Villa",
  },
  {
    image: "assets/Ecumene_Chimes_(2773_N)_Cam 05_Entry_Ver 04_03-07-2025.webp",
    title: "Main Entrance",
  },
  // {
  //   image:
  //     "assets/Ecumene_Chimes_(2773_N)_Cam 06_Street Day_Ver 03_03-07-2025.webp",
  //   title: "Gourmet Dining",
  //   subtitle: "Culinary excellence awaits",
  // },
  {
    image:
      "assets/Ecumene_Chimes_(2773_N)_Cam 07_Street Dusk_Ver 03_03-07-2025.webp",
    title: "12M Road Night View",
  },
  {
    image: "assets/Ecumene_Chimes_(2773_N)_Cam 09_Park_Ver 02_03-07-2025.webp",
    title: "The Park",
  },
  {
    image:
      "assets/Ecumene_Chimes_(2773_N)_Cam 10_Clubhouse Day_Ver 02_16-07-2025.webp",
    title: "Club House",
  },
  {
    image:
      "assets/Ecumene_Chimes_(2773_N)_Cam 10_Pool Dusk_Ver 02_03-07-2025.webp",
    title: "Swimming Pool",
  },
  {
    image:
      "assets/Ecumene_Chimes_(2773_N)_Cam 13_Master Bedroom_Ver 01_25-07-2025.webp",
    title: "Bedroom",
  },
];

function ElevatingEveryMomentSlider() {
  const sliderRef = React.useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    className: "center",
    centerMode: true,
    centerPadding: "180px",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable auto scroll
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "10px",
          centerMode: false,
        },
      },
    ],
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="relative px-4 md:px-10 lg:px-20 overflow-hidden  py-10"
      id="gallery"
    >
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="mx-4">
              <div className="relative rounded-[0] md:rounded-[32px] overflow-hidden  ">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-[248px] sm:h-[400px] rounded-[16px] md:rounded-[32px] overflow-hidden md:h-[600px] lg:h-[600px] xl:h-[600px] object-cover transform transition-transform duration-500 group-hover:scale-105 custom-image-large"
                  loading="lazy"
                />

                <svg
                  width="1034"
                  height="307"
                  viewBox="0 0 1034 307"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-5 left-0 w-full h-[50%] object-cover slider-background-svg"
                  preserveAspectRatio="none"
                  style={{
                    transform: "translateY(0)",
                  }}
                >
                  <path
                    d="M1034 275C1034 292.673 1019.67 307 1002 307L32 307C14.3269 307 1.2525e-06 292.673 2.79753e-06 275L2.68388e-05 1.15758e-06L1034 9.15527e-05L1034 275Z"
                    fill="url(#paint0_linear_448_9500)"
                    fillOpacity="0.85"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_448_9500"
                      x1="517"
                      y1="307"
                      x2="517"
                      y2="4.63552e-05"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopOpacity="0.8" />
                      <stop offset="0.65" stopOpacity="0.4" />
                      <stop offset="1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute bottom-10 left-5 right-5 text-white rounded-xl px-4 py-4 elevating-every-moment-slider-image-text slider-content-holder-in-gallery">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-xl">{slide.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        {/* Navigation Buttons */}
        <div className="absolute bottom-[15%]  right-[18%] z-10 flex justify-center gap-2 space-x-3 button-in-slider-element-holder">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="w-[50px] h-[50px] cursor-pointer rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg flex items-center justify-center transition"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_130_9432)">
                <path
                  d="M8.54974 11.933L14.2713 6.21139L12.7631 4.70312L4.46654 12.9997L12.7631 21.2962L14.2713 19.7879L8.54974 14.0663H21.5332V11.933H8.54974Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_130_9432">
                  <rect
                    width="25.6"
                    height="25.6"
                    fill="white"
                    transform="matrix(-1 0 0 1 25.8008 0.200195)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="w-[50px] h-[50px] rounded-full cursor-pointer bg-white/90 hover:bg-white text-gray-800 shadow-lg flex items-center justify-center transition"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_233_29)">
                <path
                  d="M17.4503 11.933L11.7287 6.21139L13.2369 4.70312L21.5335 12.9997L13.2369 21.2962L11.7287 19.7879L17.4503 14.0663H4.4668V11.933H17.4503Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_233_29">
                  <rect
                    width="25.6"
                    height="25.6"
                    fill="white"
                    transform="translate(0.199219 0.200195)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      <div
        className="elevating-every-moment-slider-text-button-and-text-holder left-and-right-padding-in-content"
        id="amenities"
      >
        <h3>
          Elevating every <span>Moment</span>
        </h3>
        <p className="desktop-view">
          The Chimes offers thoughtful amenities from serene club spaces to
          playful outdoor zones. Whether it’s wellness, celebration, or quiet
          retreat, every corner is designed to enrich your everyday living.
        </p>
        <p className="mobile-view-text">
          “The Chimes” offers thoughtful amenities, from serene club spaces to
          playful outdoor zones
        </p>
        <button onClick={() => setIsOpen(true)}>Download Brochure</button>
      </div>
      <SendEnquiryPopup open={isOpen} setOpen={setIsOpen} />

      <div className="elevatingeverymomentslider-text-holder-bottom-area">
        <AmenitiesHoverSlider />
      </div>
    </div>
  );
}

export default ElevatingEveryMomentSlider;
