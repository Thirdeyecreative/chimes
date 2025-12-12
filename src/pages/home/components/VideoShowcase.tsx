"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";
import { useAuthContext } from "@/pages/AuthContext/AuthContext";

interface VideoShowcaseProps {
  videoUrl: string;
  thumbnailUrl: string;
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  videoUrl,
  thumbnailUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useAuthContext().audioRef;

  // Type the ref correctly for a standard video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync React state 'isPlaying' with the HTML video element
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.error("Video play failed:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div
      className="relative w-[95%] md:w-full h-[220px] md:h-[700px] 2xl:h-[900px] video-showcase-container bg-black mt-[28px] md:mt-[5rem]"
      onContextMenu={(e) => e.preventDefault()} // Block right-click on container
    >
      {/* Inject CSS to hide the download button in WebKit browsers (Chrome/Edge/Safari).
         This is the most robust way to do it for native tags.
      */}
      <style jsx global>{`
        video::-webkit-media-controls-enclosure {
          overflow: hidden !important;
        }
        video::-webkit-media-controls-panel {
          width: calc(100% + 30px); /* Push the download button off-screen */
        }
      `}</style>

      {/* Video Layer */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          isPlaying ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          controls
          // This native attribute hides the download button in Chrome/Edge
          controlsList="nodownload"
          // Prevents the "Picture in Picture" button
          disablePictureInPicture
          // Stops automatic fullscreen on iOS
          playsInline
          onPlay={() => {
            // Pause background audio when video starts
            audioRef.current?.pause();
            setIsPlaying(true);
          }}
          onPause={() => {
           if (videoRef.current) {
             videoRef.current.pause();
           }
          }}
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      {/* Thumbnail Layer (unchanged) */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-500 ${
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-black/40 overlay-in-video-show-case"></div>

        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <h2 className="relative z-10 text-white text-4xl md:text-6xl font-light text-center video-showcase-title drop-shadow-lg">
          See <span className="font-bold italic font-serif">The Chimes</span>
          <br />
          come alive
        </h2>

        {/* Desktop Play Button */}
        <button
          onClick={() => {
            setIsPlaying(true);
            audioRef.current?.pause();
          }}
          className="hidden md:inline-flex mt-6 group relative video-showcase-button items-center gap-3 px-8 py-3 bg-white/20 hover:bg-[#2B851D] backdrop-blur-md border border-white/30 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Play className="w-5 h-5 text-white" />
          <span className=" text-white">Play Walkthrough</span>
        </button>

        {/* Mobile Play Button */}
        <div className="absolute bottom-5 right-5 md:right-10 md:bottom-10 block md:hidden">
          <button
            onClick={() => {
              setIsPlaying(true);
              audioRef.current?.pause();
            }}
            className="group inline-flex items-center video-showcase-button gap-3 px-6 py-2 md:px-8 md:py-3 bg-white/20 hover:bg-[#2B851D] backdrop-blur-md border border-white/30 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className=" text-white">Play</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoShowcase;
