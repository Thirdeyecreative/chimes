"use client";
import React from "react";

import ChannelPartnerRegistrationPopup from "@/pages/components/ChanalPartnerPopup";
import Image from "next/image";
import LeadRegistrationPopup from "@/pages/components/LeadRegistrationPopup";

export default function PartnerLeadCards() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = React.useState(false);
  return (
    <section className="partner-section">
      <ChannelPartnerRegistrationPopup
        open={isPopupOpen}
        setOpen={setIsPopupOpen}
      />
      <LeadRegistrationPopup open={isPopupOpen2} setOpen={setIsPopupOpen2} />
      <div className="partner-container">
        <div className="partner-grid">
          {/* Card 1 */}
          <div className="partner-card">
            <div>
              <div className="partner-image">
                <Image
                  src="/assets/channel-partner.webp"
                  alt="Channel Partner Registration"
                  fill
                />
              </div>

              <div className="partner-content">
                <h3>Channel Partner Registration</h3>
                <p>
                  Join hands with The Chimes & represent villas that stand for
                  space, sustainability & thoughtful design. Partner with us
                  to create long term value, for your clients & your business.
                </p>
              </div>
            </div>
            <div className="partner-content">
              <button onClick={() => setIsPopupOpen(true)}>
                Register as a Partner
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="partner-card">
            <div>
              <div className="partner-image">
                <Image
                  src="/assets/lead-registration-2.webp"
                  alt="Lead Registration"
                  fill
                />
              </div>

              <div className="partner-content">
                <h3>Lead Registration</h3>
                <p>
                  Share your details with us, and our team will help you explore
                  villas crafted for comfort, efficiency, and conscious living,
                  at your own pace, with complete clarity.
                </p>
              </div>
            </div>
            <div className="partner-content">
              <button onClick={() => setIsPopupOpen2(true)}>
                Submit Lead Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
