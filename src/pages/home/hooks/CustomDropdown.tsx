"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

type GlassDropdownProps = {
  options: string[];
  defaultLabel?: string;
  onSelect?: (selectedOption: string) => void;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

const GlassDropdown = ({
  options,
  defaultLabel = "Select",
  selectedOption,
  setSelectedOption,
  onSelect,
}: GlassDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative max-w-[200px] w-full cursor-pointer row-span-2"
    >
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 bg-transparent"
        aria-expanded={isOpen}
      >
        {selectedOption}
        <svg
          className={`transition-transform dropdonw-icon ${
            isOpen ? "rotate-180" : ""
          }`}
          width="12"
          height="9"
          viewBox="0 0 12 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9337 0.908584C11.8791 0.78604 11.7922 0.68243 11.6831 0.61002C11.5741 0.53761 11.4475 0.499433 11.3184 0.500006H0.676284C0.548097 0.501904 0.422982 0.541378 0.315131 0.613952C0.20728 0.686526 0.121008 0.789296 0.0661011 0.910604C0.011194 1.03191 -0.0101512 1.16691 0.0044865 1.30027C0.0191242 1.43364 0.069159 1.56004 0.148916 1.66514L5.27915 8.23378C5.34309 8.31561 5.42354 8.3816 5.51472 8.42702C5.6059 8.47243 5.70556 8.49614 5.80653 8.49644C6.12044 8.50148 6.50376 8.53471 6.71551 8.23376L11.8458 1.66512C11.9277 1.56087 11.9795 1.43429 11.995 1.30027C12.0106 1.16625 11.9893 1.03037 11.9337 0.908584Z"
            fill="currentColor"
          />
        </svg>
      </span>

      {isOpen && (
        <ul className="absolute -left-2 flex flex-col gap-2 py-4  backdrop-blur-3xl border-1 border-black  rounded-md top-7 mt-4  w-full backdrop:blur-sm z-5  mobile-section-dropdown">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-3 py-1 text-white hover:text-white hover:bg-white/20 cursor-pointer transition-colors mobile-section-dropdown-item"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GlassDropdown;
