import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const JOB_ROLES = [
  {
    title: "Senior Project Manager, Sustainable Housing",
    location: "THE CHIMES – SARJAPUR, BENGALURU",
  },
  {
    title: "Architect / Design Coordinator – Green Villas",
    location: "THE CHIMES – SARJAPUR, BENGALURU",
  },
  {
    title: "Sales & Channel Partner Manager – Real Estate",
    location: "THE CHIMES – SARJAPUR, BENGALURU",
  },
];

function JobApplicationPopup({
  open = false,
  setOpen = () => {},
  role = "",
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  role: string | null;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    applyingFor: "",
    resume: null as File | null,
  });

  const [error, setError] = useState({
    contactNumber: "",
    resume: "",
  });

  /** 🔹 Preselect role when popup opens */
  useEffect(() => {
    if (role) {
      setFormData((prev) => ({
        ...prev,
        applyingFor: role,
      }));
    }
  }, [role]);

  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.contactNumber.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.applyingFor.trim() !== "" &&
    formData.resume !== null &&
    error.contactNumber === "" &&
    error.resume === "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 📞 Indian phone validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, contactNumber: value }));

    const isValid = /^[6-9][0-9]{9}$/.test(value);
    setError((prev) => ({
      ...prev,
      contactNumber: isValid ? "" : "Invalid Indian phone number",
    }));
  };

  // 📎 Resume upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError((prev) => ({
        ...prev,
        resume: "Only PDF or DOC files allowed",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError((prev) => ({
        ...prev,
        resume: "File size must be under 5MB",
      }));
      return;
    }

    setError((prev) => ({ ...prev, resume: "" }));
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log("Job Application Data:", formData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      fullName: "",
      contactNumber: "",
      email: "",
      applyingFor: "",
      resume: null,
    });
    setError({ contactNumber: "", resume: "" });
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-99">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 z-10 w-full h-[600px] md:h-[100vh] overflow-y-auto  popup-dilog-container">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <DialogPanel className="relative popup-dilog overflow-hidden rounded-lg bg-[#F1EBE3] text-left shadow-xl sm:w-full sm:max-w-[900px]">
            <button onClick={handleClose} className="close-icon">
              <img src="assets/close menu icon.png" alt="" />
            </button>

            <div className="popup-dilog-holder">
              <div>
                <img
                  src="assets/work-with-us.webp"
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

                <h4>WORK WITH US</h4>

                <form className="popup-dilog-form" onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Full Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
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
                      <label>
                        Email ID <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        id="email"
                        placeholder="Enter your email id"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label>
                      Applying For <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="applyingFor"
                      value={formData.applyingFor}
                      onChange={handleChange}
                      required
                      style={{
                        border: "1px solid rgba(53, 137, 39, 0.5)",
                        borderRadius: "4px",
                        height: "40px",

                        paddingInline: "1rem", // Padding for left text
                        paddingRight: "2.5rem", // Extra padding on right so text doesn't touch the arrow

                        // 1. Remove native browser styling
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",

                        // 2. Add custom arrow (SVG URL encoded)
                        // This uses a simple chevron down, colored green to match your border
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg width='13' height='8' viewBox='0 0 13 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M7.00726 7.78279L12.7923 1.72295C12.9262 1.5828 13 1.3957 13 1.1962C13 0.996706 12.9262 0.809609 12.7923 0.669453L12.3664 0.223188C12.0888 -0.0671999 11.6378 -0.0671999 11.3606 0.223188L6.5027 5.31178L1.63936 0.217541C1.50545 0.0773846 1.32694 0 1.13659 0C0.946033 0 0.767522 0.0773845 0.633507 0.217541L0.207681 0.663806C0.0737715 0.804073 0 0.99106 0 1.19056C0 1.39005 0.0737715 1.57715 0.207681 1.71731L5.99802 7.78279C6.13236 7.92328 6.31171 8.00044 6.50238 8C6.69378 8.00044 6.87303 7.92328 7.00726 7.78279Z' fill='%23000100'/></svg>")`,

                        // 3. Position and size the arrow
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.7rem center",
                        backgroundSize: "0.65em auto",

                        // Ensure background matches input color (usually white)
                      }}
                    >
                      <option value="">Select role you are applying for</option>
                      {JOB_ROLES.map((job) => (
                        <option key={job.title} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 🔹 Custom Resume Upload UI */}
                  <div className="resume-upload-wrapper">
                    <label>
                      Resume <span style={{ color: "red" }}>*</span>
                      <small>
                        {" "}
                        ( We accept .pdf, .doc, and .docx formats )
                      </small>
                    </label>

                    <div className="resume-upload-ui">
                      <label className="resume-choose-btn">
                        Choose file
                        <input
                          type="file"
                          hidden
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </label>

                      <span className="resume-file-name">
                        {formData.resume
                          ? formData.resume.name
                          : "No file chosen"}
                      </span>
                    </div>

                    {error.resume && (
                      <div style={{ color: "red", fontSize: "0.875rem" }}>
                        {error.resume}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={
                      !isFormValid ? "opacity-50 cursor-not-allowed w-full" : " w-full"
                    }
                  >
                    Apply Now
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

export default JobApplicationPopup;
