import HorizontalScroller from "@/ReactBits/ScrollVelocity/ScrollVelocity";
import React from "react";

function Infiniteslider() {
  const texts = [
    {
      title: "4 BHK/2200",
      description: "Sq.Ft Villas Starting",
    },
    {
      title: "6.04 Acres",
      description: "Of Green Living",
    },
    {
      title: "109 Units",
      description: "G+2.5 Floors",
    },
    {
      title: "240 Sq.Ft",
      description: "Of Extra breathing space",
    },
  ];
  return (
    <div className="scroll-section">
      {/* <img
        width={958}
        src="assets/left-flower-in-scroll.png"
        alt="infiniteslider"
      /> */}

      <HorizontalScroller
        data={[texts]}
        renderCard={(item:any, index) => (
          <div
            key={index + 1}
            style={{ margin: "0 32px" }} // 8px horizontal margin (equivalent to mx-2)
          >
            <div className="slide-content w-[100%]">
              <div>
                <h3 >
                  {item.title}
                </h3>
                <p >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        )}
      />
      {/* <img
        width={958}
        style={{ position: "relative", right: "0px" }}
        src="assets/right-flower-in-scroll.png"
        alt="infiniteslider"
      /> */}
    </div>
  );
}

export default Infiniteslider;
