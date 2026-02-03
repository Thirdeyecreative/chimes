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

  const [loading, setLoading] = useState(false);

  // 1. ADDED: Logic to check if all fields are valid
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    error.phone === "";

  // Handle generic input changes (Name, Email)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle Phone specific logic
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    let normalizedPhone = rawValue.trim();

    // Remove country code if present for validation
    if (normalizedPhone.startsWith("+91")) {
      normalizedPhone = normalizedPhone.slice(3);
    } else if (
      normalizedPhone.startsWith("91") &&
      normalizedPhone.length > 10
    ) {
      normalizedPhone = normalizedPhone.slice(2);
    }

    // Remove spaces and hyphens
    normalizedPhone = normalizedPhone.replace(/[\s-]/g, "");

    setFormData({ ...formData, phone: rawValue });

    // Validate normalized number: should be 10 digits starting with [6-9]
    const isValidPhone = /^[6-9][0-9]{9}$/.test(normalizedPhone);

    if (isValidPhone) {
      setError({ ...error, phone: "" });
    } else {
      setError({ ...error, phone: "Invalid Indian phone number" });
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent submission if there are validation errors
    if (error.phone) {
      alert("Please enter a valid phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const result = await res.json();
      console.log(result);

      if (result.success) {
        // Trigger PDF Download
        const pdfUrl = "/assets/The Chimes - Brochure.pdf";
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Close the popup
        handleClose();
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Optional: Reset form on close
    setFormData({ name: "", email: "", phone: "" });
    setError({ phone: "" });
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-99 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen h-[600px] md:h-[100vh] overflow-y-auto">
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

                <h4>Download Floor Plan</h4>
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

                  {/* 2. UPDATED: Button with disabled logic and styling */}
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={
                      !isFormValid || loading
                        ? "opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                        : "flex items-center justify-center gap-2"
                    }
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Downloading...
                      </>
                    ) : (
                      "Download"
                    )}
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
