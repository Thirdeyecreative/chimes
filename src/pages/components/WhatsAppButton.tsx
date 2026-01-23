import GlassSurface from "@/ReactBits/GlassSurface/GlassSurface";

interface WhatsAppButtonProps {
  isScrolled: boolean;
}

const WhatsAppButton = ({ isScrolled }: WhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    // TODO: Update with your actual WhatsApp business phone number (with country code)
    // Format: "+919876543210" for India, "+11234567890" for USA, etc.
    const phoneNumber = "+917624999594"; // Replace with actual number
    const message = "Hi, I'm interested in The Chimes";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      "",
    )}?text=${encodeURIComponent(message)}`;
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
            text-white hover:text-black
          `}
        title="Chat with us on WhatsApp"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-1"
        >
          <g clipPath="url(#clip0_whatsapp_navbar)">
            <path
              d="M14.9511 2.97137C13.3767 1.38245 11.2304 0.492073 8.99362 0.5C4.35369 0.5 0.57225 4.28038 0.568 8.92138C0.568 10.4078 0.956875 11.8539 1.69106 13.1342L0.5 17.5L4.96675 16.3291C6.20244 17.0016 7.5868 17.3541 8.99362 17.3544H8.99788C13.6389 17.3544 17.4193 13.5741 17.4235 8.92881C17.4256 6.69276 16.5353 4.54833 14.95 2.97137M8.99362 15.9286C7.73881 15.929 6.50706 15.5913 5.42788 14.9511L5.17287 14.7981L2.523 15.4929L3.23062 12.9079L3.06487 12.6412C2.36342 11.5259 1.99244 10.2347 1.99494 8.91712C1.99494 5.0645 5.13675 1.92163 8.99788 1.92163C10.8558 1.91829 12.6381 2.65685 13.9491 3.97331C15.2647 5.28465 16.0022 7.06705 15.9976 8.92456C15.9934 12.791 12.8516 15.9286 8.99362 15.9286ZM12.8346 10.6862C12.6252 10.581 11.5914 10.0721 11.397 9.99981C11.2036 9.93075 11.0623 9.89462 10.9242 10.105C10.7829 10.3143 10.3791 10.7914 10.258 10.9284C10.1369 11.0697 10.0115 11.0857 9.80112 10.9816C9.59181 10.8753 8.91288 10.6543 8.10962 9.935C7.48275 9.37719 7.06306 8.68656 6.93769 8.47725C6.81656 8.26688 6.926 8.15425 7.03119 8.04906C7.12362 7.95556 7.2405 7.80256 7.34569 7.68144C7.45194 7.56031 7.487 7.47106 7.55606 7.33081C7.62513 7.18844 7.59219 7.06731 7.54012 6.96212C7.487 6.85694 7.06731 5.81887 6.88987 5.40025C6.71987 4.98694 6.54669 5.04431 6.41706 5.039C6.29594 5.03156 6.15462 5.03156 6.01331 5.03156C5.79758 5.03692 5.59387 5.13204 5.45125 5.294C5.25787 5.50437 4.71706 6.01331 4.71706 7.05137C4.71706 8.08944 5.47144 9.08712 5.57769 9.22844C5.68181 9.36975 7.05881 11.4937 9.17212 12.4074C9.6715 12.6252 10.0646 12.7538 10.3717 12.8516C10.8764 13.0131 11.3322 12.9886 11.6956 12.9366C12.0993 12.8749 12.9397 12.4266 13.1172 11.9346C13.2914 11.4416 13.2914 11.0209 13.2383 10.9327C13.1863 10.8434 13.0449 10.7914 12.8346 10.6862Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_whatsapp_navbar">
              <rect
                width="17"
                height="17"
                fill="white"
                transform="translate(0.5 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
    </GlassSurface>
  );
};

export default WhatsAppButton;
