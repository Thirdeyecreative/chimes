"use client";
import { useAuthContext } from "../AuthContext/AuthContext";

const FixedEnquiryButton = () => {
  const { setIsOpen } = useAuthContext();

  return (
    <div className="fixed-enquiry-container">
      <button
        className="enquiry-button-in-fixed-enquiry"
        onClick={() => setIsOpen(true)}
        style={{
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#2c6c22",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <span>Enquire Now</span>
      </button>

      <style jsx>{`
        .fixed-enquiry-container {
          position: fixed;
          top: 12%;
          right: 0;
          z-index: 9999;
          transition: transform 0.3s ease-in-out;

          /* Use writing-mode for sharp vertical text instead of rotate */
          writing-mode: vertical-lr;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default FixedEnquiryButton;
