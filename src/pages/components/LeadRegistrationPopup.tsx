import { useState, useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

function LeadRegistrationPopup({
  open = false,
  setOpen = () => {},
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  // 1. Create a Ref for the date input
  const dateRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    channelPartnerName: "",
    customerName: "",
    customerContactNumber: "",
    email: "",
    siteVisitDate: "",
    message: "",
  });

  const [error, setError] = useState({
    customerContactNumber: "",
  });

  const isFormValid =
    formData.channelPartnerName.trim() !== "" &&
    formData.customerName.trim() !== "" &&
    formData.customerContactNumber.trim() !== "" &&
    error.customerContactNumber === "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    setFormData((prev) => ({
      ...prev,
      customerContactNumber: rawValue,
    }));

    const isValidPhone = /^[6-9][0-9]{9}$/.test(normalizedPhone);

    setError({
      customerContactNumber: isValidPhone ? "" : "Invalid Indian phone number",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log("Lead Registration Data:", formData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      channelPartnerName: "",
      customerName: "",
      customerContactNumber: "",
      email: "",
      siteVisitDate: "",
      message: "",
    });
    setError({ customerContactNumber: "" });
  };

  // 2. Helper function to trigger the calendar
  const handleCalendarIconClick = () => {
    if (dateRef.current) {
      dateRef.current.showPicker();
    }
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
                  src="assets/lead-registration.webp"
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

                <h4>LEAD REGISTRATION</h4>

                <form className="popup-dilog-form" onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Channel Partner Name{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      id="channelPartnerName"
                      placeholder="Enter your full channel partner name"
                      value={formData.channelPartnerName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="popup-dilog-input-holder">
                    <div>
                      <label>
                        Customer Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        id="customerName"
                        placeholder="Enter customer name"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label>
                        Customer Contact Number{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        id="customerContactNumber"
                        placeholder="Enter their number"
                        value={formData.customerContactNumber}
                        onChange={handlePhoneChange}
                        required
                      />
                      {error.customerContactNumber && (
                        <span style={{ color: "red", fontSize: "0.875rem" }}>
                          {error.customerContactNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="popup-dilog-input-holder">
                    <div>
                      <label>Email ID</label>
                      <input
                        id="email"
                        placeholder="Enter email id"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    {/* DATE INPUT FIXED */}
                    <div>
                      {/* Label MUST be outside the relative container for correct vertical centering of icon */}
                      <label>Date of Site Visit</label>
                      <div style={{ position: "relative" }}>
                        <input
                          type="date"
                          id="siteVisitDate"
                          ref={dateRef} // Attach Ref
                          value={formData.siteVisitDate}
                          onChange={handleChange}
                          style={{ paddingRight: "36px", width: "100%" }}
                        />

                        {/* Custom SVG icon */}
                        <span
                          onClick={handleCalendarIconClick} // Add click handler
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)", // Vertically center precisely
                            cursor: "pointer", // Show pointer on hover
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            width="12"
                            height="11"
                            viewBox="0 0 12 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.351591 9.53333H2.1094V10.6333C2.1094 10.8358 2.26681 11 2.46096 11H11.6484C11.8426 11 12 10.8358 12 10.6333V1.1C12 0.897502 11.8426 0.733333 11.6484 0.733333H9.89063V0.366667C9.89063 0.164169 9.73322 0 9.53907 0C9.34491 0 9.18751 0.164169 9.18751 0.366667V0.733333H7.40626V0.366667C7.40626 0.164169 7.24886 0 7.0547 0C6.86054 0 6.70314 0.164169 6.70314 0.366667V0.733333H4.94533V0.366667C4.94533 0.164169 4.78792 0 4.59377 0C4.39961 0 4.24221 0.164169 4.24221 0.366667V0.733333H2.46096C2.26681 0.733333 2.1094 0.897502 2.1094 1.1V3.3C2.1094 6.00233 1.03257 8.08123 0.126521 8.88499C0.0128027 8.98382 -0.0293612 9.14633 0.0210058 9.2915C0.0714198 9.43666 0.20356 9.53333 0.351591 9.53333ZM11.2969 10.2667H2.81252V9.53333H9.53907C9.62131 9.53333 9.70095 9.50327 9.76414 9.44834C10.1868 9.08121 10.8414 8.20712 11.2969 7.08762V10.2667ZM2.81252 1.46667H4.24221V1.83333C4.24221 2.03583 4.39961 2.2 4.59377 2.2C4.78792 2.2 4.94533 2.03583 4.94533 1.83333V1.46667H6.70314V1.83333C6.70314 2.03583 6.86054 2.2 7.0547 2.2C7.24886 2.2 7.40626 2.03583 7.40626 1.83333V1.46667H9.18751V1.83333C9.18751 2.03583 9.34491 2.2 9.53907 2.2C9.73322 2.2 9.89063 2.03583 9.89063 1.83333V1.46667H11.2969V2.93333H2.81252V1.46667ZM2.8065 3.66642H11.2906C11.2114 5.99243 10.3555 7.82254 9.40121 8.8H1.15125C2.23249 7.36313 2.74849 5.49223 2.8065 3.66642Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label>Message</label>
                    <textarea
                      id="message"
                      placeholder="Enter your message here"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      style={{
                        border: "1px solid rgba(53,137,39,0.5)",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={
                      !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                    }
                  >
                    Submit Lead Info
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

export default LeadRegistrationPopup;
