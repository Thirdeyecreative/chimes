import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

function SendEnquiryPopup({
  open = false,
  setOpen = () => {},
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState({
    phone: "",
  });

  // 1. ADD THIS LOGIC: Check if form is valid
  // It checks if fields are not empty AND if there are no errors in error.phone
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    error.phone === "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    let normalizedPhone = rawValue.trim();

    if (normalizedPhone.startsWith("+91")) {
      normalizedPhone = normalizedPhone.slice(3);
    } else if (
      normalizedPhone.startsWith("91") &&
      normalizedPhone.length > 10
    ) {
      normalizedPhone = normalizedPhone.slice(2);
    }

    normalizedPhone = normalizedPhone.replace(/[\s-]/g, "");

    setFormData({ ...formData, phone: rawValue });

    const isValidPhone = /^[6-9][0-9]{9}$/.test(normalizedPhone);

    if (isValidPhone) {
      setError({ ...error, phone: "" });
    } else {
      setError({ ...error, phone: "Invalid Indian phone number" });
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (error.phone) {
      alert("Please enter a valid phone number");
      return;
    }

    console.log("Enquiry Data Submitted:", formData);

    const pdfUrl = "/assets/The Chimes - Brochure.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: "", email: "", phone: "" });
    setError({ phone: "" });
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-99 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen h-[600px] md:h-[100vh] overflow-y-auto gap-0 popup-dilog-container">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative popup-dilog transform overflow-hidden rounded-lg bg-[#F1EBE3] text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[900px] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <button onClick={handleClose} className="close-icon">
              <img src="assets/close menu icon.png" alt="" />
            </button>
            <div className="popup-dilog-holder">
              <div>
                <img
                  src="assets/popup left image.webp"
                  alt="popup left image"
                  className="popup-dilog-left-image"
                />
              </div>
              <div className="right-side-popup-content-holder">
                <img
                  src="assets/popup bird image.png"
                  alt="popup right image"
                  className="popup-dilog-right-image"
                />

                <h4>
                  Start your journey to a <br /> thoughtful home
                </h4>
                <p>
                  Tell us a little about yourself, and we'll guide you to a home
                  that blends mindful design, natural comfort, and modern
                  living, just the way you imagined.
                </p>

                <form className="popup-dilog-form" onSubmit={handleSend}>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email ID</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email ID"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact">Contact Number</label>
                    <div className="relative">
                      <input
                        type="number"
                        id="contact"
                        placeholder="Enter your contact number"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                      />
                    </div>
                    {error.phone && (
                      <span
                        className="error"
                        style={{ color: "red", fontSize: "0.875rem" }}
                      >
                        {error.phone}
                      </span>
                    )}
                  </div>

                  {/* 2. UPDATE BUTTON: Add disabled attribute and styling */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={
                      !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                    }
                  >
                    Send Enquiry
                  </button>

                  <button type="button" className="reach-us-in-popup-section">
                    Or simply give us a call at: <span>7624999594</span>
                  </button>
                </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default SendEnquiryPopup;
