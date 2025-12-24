"use client";

import { useState } from "react";

export default function WhatMatters() {
  const address = "Chikkatirupati Rd, Sarjapura, Bengaluru, Karnataka 562125";
  const mapLink = "https://maps.app.goo.gl/UYCxebpZkefztAgLA"; // Your map link

  // Toggle for showing the address card when clicking the marker
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="what-matters-content-holder-parent" id="nearby">
      <h3>
        Connected to What <br /> <span>Matters</span>
      </h3>
      <p className="desktop-view">
        Discover a location that balances convenience with calm, close to top
        schools, malls and city hubs.
      </p>
      <p className="mobile-view-text">
        Discover a location that balances convenience with calm, close to top
        schools, malls and city hubs.
      </p>

      <div className="left-and-right-padding-in-content">
        {/* CONTAINER: Must be relative so we can place the pin inside it */}
        <div
          className="map-container relative w-full h-[300px] overflow-hidden rounded-lg"
          style={{ isolation: "isolate" }}
        >
          {/* 1. THE LOCAL MAP IMAGE */}
          <img
            src="/assets/Chimes-map-bg-logo.webp"
            alt="Location Map"
            className="w-full h-full object-cover"
          />

          {/* 2. THE MARKER (Centered) */}
          {/* We use absolute positioning to place it. Adjust top/left % if the location isn't dead center in your screenshot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            onClick={() => setShowPopup(!showPopup)}
          ></div>

          {/* 3. THE POPUP CARD (Simulated) */}
          {showPopup && (
            <div
              className="chimes-map-popup-card"
              onClick={() => window.open(mapLink, "_blank")}
            >
              <div className="chimes-map-popup-content">
                <img
                  src="/assets/Chimes green logo.webp"
                  className="chimes-map-popup-logo"
                  alt="logo"
                />
                <p className="chimes-map-popup-address">{address}</p>
              </div>

              {/* Little triangle arrow at bottom of popup */}
              <div className="chimes-map-popup-arrow"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
