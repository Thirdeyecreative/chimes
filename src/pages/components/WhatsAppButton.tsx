import GlassSurface from "@/ReactBits/GlassSurface/GlassSurface";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // TODO: Update with your actual WhatsApp business phone number (with country code)
    // Format: "+919876543210" for India, "+11234567890" for USA, etc.
    const phoneNumber = "+917624999594"; // Replace with actual number
    const message = "Hi, I'm interested in The Chimes";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <GlassSurface
      width={"fit-content"}
      height={"fit-content"}
      borderRadius={40}
      className="desktop-enquire-button"
    >
      <button
        onClick={handleWhatsAppClick}
        className={`
            cursor-pointer relative z-2 button button-padding-remove music-icon-in-nav 
            transition-colors duration-300 ease-in-out
            active-link
          `}
        title="Chat with us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="relative z-1"
        >
          <path
            d="M13.6046 2.35156C12.1391 0.876562 10.1297 0.0371094 8.00313 0.0371094C3.63125 0.0371094 0.128125 3.54031 0.128125 7.9125C0.128125 9.36562 0.546875 10.7906 1.33438 12.0031L0.403125 15.1969C0.240625 15.7531 0.675 16.1875 1.23125 16.025L4.425 15.0938C5.6375 15.8625 7.0625 16.2844 8.50938 16.2844H8.51563C12.8875 16.2844 16.3906 12.7812 16.3906 8.40938C16.3906 6.28281 15.55 4.27344 13.6046 2.35156ZM8.50938 14.9875C7.35313 14.9875 6.23438 14.6281 5.32813 13.9594L5.10938 13.7969L2.76875 14.4656L3.4375 12.2156L3.2625 11.9969C2.53438 11.0656 2.1875 9.93281 2.1875 8.70625C2.1875 5.18438 5.00938 2.36562 8.53125 2.36562C10.1609 2.36562 11.6656 3.00625 12.75 4.08906C13.8344 5.17188 14.4688 6.6875 14.4688 8.31094C14.4719 11.8344 11.6438 14.9875 8.50938 14.9875ZM11.6219 10.0094C11.4031 9.89219 10.4281 9.39688 10.225 9.31875C10.0219 9.24375 9.88438 9.2 9.74688 9.41875C9.60938 9.6375 9.21875 10.0562 9.09688 10.1969C8.975 10.3312 8.85313 10.3469 8.63438 10.2344C8.41563 10.1219 7.79375 9.91406 7.05625 9.25C6.475 8.74063 6.06563 8.10625 5.94375 7.88438C5.82188 7.66563 5.92188 7.55938 6.03438 7.44844C6.13438 7.3531 6.25625 7.2 6.36875 7.0875C6.48125 6.96563 6.525 6.87813 6.6 6.74063C6.675 6.60313 6.63125 6.49063 6.5625 6.37813C6.49375 6.26563 6.08438 5.28438 5.90313 4.85625C5.73125 4.44688 5.55625 4.50938 5.425 4.50313H5.025C4.8875 4.50313 4.67813 4.55 4.475 4.75313C4.27187 4.95625 3.7 5.45 3.7 6.43125C3.7 7.41094 4.49375 8.35938 4.60625 8.49375C4.71875 8.63125 6.06563 10.6 8.05313 11.5031C8.54063 11.7344 8.90938 11.8625 9.175 11.9281C9.66563 12.0531 10.1219 12.0281 10.475 11.9656C10.8656 11.8938 11.6719 11.4969 11.8531 11.05C12.0344 10.6031 12.0344 10.2219 11.9656 10.1344C11.8969 10.0375 11.7594 10.1219 11.6219 10.0094Z"
            fill="#FFFFFF"
          />
        </svg>
      </button>
    </GlassSurface>
  );
};

export default WhatsAppButton;
