"use client";

import React, { useState } from "react";
import ReactPlayer from "react-player";

const LaptopAnimation = () => {
  const [playedOnce, setPlayedOnce] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full h-[500px] flex justify-center items-center laptop-section-container">
      {/* Laptop Wrapper */}
      <div className="relative w-[900px] max-w-[90vw]">
        
        {/* Laptop Frame Image */}
        <img
          src="/assets/laptop.webp" // Ensure this path is correct
          className="relative  w-full h-auto pointer-events-none select-none block"
          alt="Laptop Frame"
        />

        {/* SCREEN AREA (Overlay) */}
        <div
          className="absolute z-0 bg-black"
          style={{
            // 1. Center horizontally relative to the parent
            left: "50%",
            transform: "translateX(-50%)",
            
            // 2. Adjust these slightly based on your specific laptop.webp image bezel thickness
            top: "6.5%",   // Top bezel offset
            width: "76.5%", // Screen width relative to laptop image width
            height: "88%",  // Screen height relative to laptop image height
            
            // 3. Visual fixes
            overflow: "hidden",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            borderBottomLeftRadius: "4px", // Bottom corners are usually sharper on laptops
            borderBottomRightRadius: "4px",
            zIndex: 1,
          }}
        >
          <ReactPlayer
            src="/assets/placeholder.mp4" // changed 'src' to 'url' for ReactPlayer standard
            playing={isPlaying}
            light={playedOnce ? false : "/assets/video-poster.jpg"}
            width="100%"
            height="100%"
            controls={true}
            // This ensures the video covers the whole area without black bars
            style={{ objectFit: "cover" }} 
            playIcon={
              <div
                className="relative group cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={() => {
                  setPlayedOnce(true);
                  setIsPlaying(true);
                }}
              >
                 {/* YouTube Style Button */}
                <img
                  src="/assets/youtube-play-icon.png"
                  width={80}
                  alt="Play"
                  className="drop-shadow-2xl opacity-90 group-hover:opacity-100"
                />
              </div>
            }
            onPlay={() => {
              setPlayedOnce(true);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default LaptopAnimation;