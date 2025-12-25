import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

function ChannelPartnerRegistrationPopup({
  open = false,
  setOpen = () => {},
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    contactNumber: "",
    email: "",
    location: "",
    reraNumber: "",
  });

  const [error, setError] = useState({
    contactNumber: "",
    email: "",
  });

  const isFormValid =
    formData.companyName.trim() !== "" &&
    formData.name.trim() !== "" &&
    formData.contactNumber.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.location.trim() !== "" &&
    formData.reraNumber.trim() !== "" &&
    error.contactNumber === "" &&
    error.email === "";

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

    setFormData((prev) => ({ ...prev, contactNumber: rawValue }));

    const isValidPhone = /^[6-9][0-9]{9}$/.test(normalizedPhone);

    setError((prev) => ({
      ...prev,
      contactNumber: isValidPhone ? "" : "Invalid Indian phone number",
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, email: value }));

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    setError((prev) => ({
      ...prev,
      email: isValidEmail ? "" : "Invalid email address",
    }));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log("Channel Partner Registration Data:", formData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      companyName: "",
      name: "",
      contactNumber: "",
      email: "",
      location: "",
      reraNumber: "",
    });
    setError({ contactNumber: "", email: "" });
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-99">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 z-10 w-screen h-[600px] md:h-[100vh] overflow-y-auto gap-0 popup-dilog-container">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative popup-dilog overflow-hidden rounded-lg bg-[#F1EBE3] text-left shadow-xl sm:w-full sm:max-w-[900px]">
            <button onClick={handleClose} className="close-icon">
              <img src="assets/close menu icon.png" alt="" />
            </button>

            <div className="popup-dilog-holder">
              <div>
                <img
                  src="assets/channel-partner-registration.webp"
                  alt="popup left"
                  className="popup-dilog-left-image"
                />
              </div>

              <div className="right-side-popup-content-holder">
                <img
                  src="assets/popup bird image.png"
                  alt="popup bird"
                  className="popup-dilog-right-image"
                />

                <h4>CHANNEL PARTNER REGISTRATION</h4>

                <form className="popup-dilog-form" onSubmit={handleSend}>
                  <div>
                    <label>
                      Company Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      id="companyName"
                      placeholder="Enter your company's full name"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label>
                      Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="popup-dilog-input-holder">
                    <div>
                      <label>
                        Contact Number <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        id="contactNumber"
                        placeholder="Enter your contact number"
                        value={formData.contactNumber}
                        onChange={handlePhoneChange}
                        required
                      />
                      {error.contactNumber && (
                        <span style={{ color: "red", fontSize: "0.875rem" }}>
                          {error.contactNumber}
                        </span>
                      )}
                    </div>

                    <div>
                      <label>Email ID</label>
                      <input
                        id="email"
                        placeholder="Enter your email id"
                        value={formData.email}
                        onChange={handleEmailChange}
                        required
                      />
                      {error.email && (
                        <span style={{ color: "red", fontSize: "0.875rem" }}>
                          {error.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label>
                      Location <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      id="location"
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label>
                      RERA Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      id="reraNumber"
                      placeholder="Enter your RERA number"
                      value={formData.reraNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={
                      !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                    }
                  >
                    Register Now
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

export default ChannelPartnerRegistrationPopup;
