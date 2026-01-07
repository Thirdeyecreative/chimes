"use client";

import JobApplicationPopup from "@/pages/components/JobApplicationPopup";
import React from "react";

type Role = {
  title: string;
  location: string;
};

const roles: Role[] = [
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

const OpenRoles = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  return (
    <section className="open-roles">
      <JobApplicationPopup open={isPopupOpen} setOpen={setIsPopupOpen} role={selectedRole} />
      <h2 className="open-roles__title">
        <span>Open</span> Roles
      </h2>

      <p className="open-roles__subtitle">
        If you’re passionate about building smarter, greener spaces and want to
        grow with a purpose-driven team, explore our open roles below or send us
        your resume.
      </p>

      <div className="open-roles__actions">
        <a href="tel:+919876543210" className="pill-btn pill-btn--phone">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9841 0H5C2.25397 0 0 2.25397 0 5.01587V15C0 17.746 2.25397 20 5 20H14.9841C17.746 20 20 17.746 20 14.9841V5.01587C20 2.25397 17.746 0 14.9841 0ZM9.46032 4.11111C9.49206 3.61905 9.95238 3.79365 10.1905 3.7619C13.1746 3.85714 15.746 6.53968 15.7143 9.42857C15.7143 9.71429 15.8095 10.127 15.381 10.127C14.9683 10.127 15.0794 9.69841 15.0317 9.4127C14.6349 6.34921 13.2063 4.90476 10.0952 4.42857C9.84127 4.39683 9.44444 4.44444 9.46032 4.11111ZM13.9206 9.55556C13.4444 9.61905 13.5397 9.20635 13.4921 8.93651C13.1746 7.06349 12.5079 6.38095 10.5873 5.96825C10.3016 5.90476 9.85714 5.95238 9.93651 5.52381C10 5.11111 10.3968 5.25397 10.6984 5.28571C12.619 5.50794 14.1905 7.14286 14.1746 8.93651C14.1429 9.12698 14.2698 9.49206 13.9206 9.55556ZM12.7302 8.57143C12.7302 8.8254 12.6984 9.06349 12.4127 9.09524C12.2063 9.12698 12.0794 8.95238 12.0476 8.74603C11.9683 7.98413 11.5556 7.52381 10.7619 7.39683C10.5238 7.36508 10.3016 7.28571 10.4127 6.96825C10.4921 6.76191 10.6825 6.73016 10.8889 6.73016C11.746 6.71429 12.7302 7.71429 12.7302 8.57143ZM15.746 14.4286C15.4127 15.3333 14.2857 16.254 13.3175 16.2381C13.1746 16.2064 12.9048 16.1587 12.6667 16.0635C8.4127 14.2698 5.31746 11.3175 3.57143 7.09524C2.98413 5.68254 3.60317 4.47619 5.07937 4C5.34921 3.90476 5.60317 3.90476 5.87302 4C6.50794 4.22222 8.11111 6.39683 8.14286 7.03175C8.1746 7.52381 7.8254 7.79365 7.49206 8.01587C6.84127 8.44444 6.84127 8.98413 7.12698 9.60318C7.74603 10.9683 8.80952 11.9206 10.1905 12.5238C10.6825 12.746 11.1746 12.7302 11.5079 12.2222C12.1111 11.3175 12.8571 11.3651 13.6667 11.9206C14.0794 12.2063 14.4921 12.4762 14.873 12.7778C15.3968 13.2063 16.0635 13.5556 15.746 14.4286Z"
              fill="#2C6C22"
            />
          </svg>
          +91 9876543210
        </a>
        <a
          href="mailto:support@thechimes.in"
          className="pill-btn pill-btn--email"
        >
          <svg
            width="20"
            height="15"
            viewBox="0 0 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9592 7.86137L11.2841 9.54208C10.6049 10.2237 9.40973 10.2384 8.71579 9.54208L7.04067 7.86137L1.02441 13.8972C1.24836 14.0007 1.49527 14.0625 1.75777 14.0625H18.2422C18.5047 14.0625 18.7515 14.0008 18.9754 13.8972L12.9592 7.86137Z"
              fill="#2C6C22"
            />
            <path
              d="M18.2421 0H1.7577C1.4952 0 1.24828 0.061797 1.02441 0.165352L7.45321 6.61547C7.45364 6.6159 7.45415 6.61598 7.45458 6.61641C7.455 6.61684 7.45508 6.61743 7.45508 6.61743L9.54544 8.71469C9.76747 8.93673 10.2324 8.93673 10.4544 8.71469L12.5443 6.61778C12.5443 6.61778 12.5449 6.61684 12.5453 6.61641C12.5453 6.61641 12.5462 6.6159 12.5466 6.61547L18.9753 0.165313C18.7514 0.0617189 18.5046 0 18.2421 0Z"
              fill="#2C6C22"
            />
            <path
              d="M0.186953 0.984841C0.0710938 1.21914 0 1.47922 0 1.75781V12.3047C0 12.5833 0.0710157 12.8434 0.186914 13.0777L6.2136 7.03145L0.186953 0.984841Z"
              fill="#2C6C22"
            />
            <path
              d="M19.8127 0.984569L13.7861 7.03125L19.8127 13.0775C19.9286 12.8433 19.9997 12.5832 19.9997 12.3045V1.75762C19.9997 1.47894 19.9286 1.21887 19.8127 0.984569Z"
              fill="#2C6C22"
            />
          </svg>
          support@thechimes.in
        </a>
      </div>

      <div className="open-roles__list">
        {roles.map((role, index) => (
          <div key={index} className="role-item">
            <h3 className="role-item__title">{role.title}</h3>
                <span className="role-item__location"
                    onClick={() => {
                        setIsPopupOpen(true)
                        setSelectedRole(role.title)
                }}
                >{role.location}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OpenRoles;
