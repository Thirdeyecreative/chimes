// components/Navbar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AudioPlayer from "@/pages/home/hooks/AudioPlayer";
import SendEnquiryPopup from "./SendEnquiryPopup";
import { useAuthContext } from "../AuthContext/AuthContext";
import GlassSurface from "@/ReactBits/GlassSurface/GlassSurface";
import { useRouter, usePathname } from "next/navigation";

// Define nav items outside component to keep it stable
const navItems = [
  { name: "About Us", id: "about-us" },
  { name: "Highlights", id: "highlights" },
  { name: "Gallery", id: "gallery" },
  { name: "Amenities", id: "amenities" },
  { name: "Floor Plans", id: "floor-plans" },
  { name: "Nearby", id: "nearby" },
  { name: "Channel Partner", id: null, link: "channelpartner" },
  { name: "Careers", id: null, link: "careers" },
];

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { selectedNav, setSelectedNav, isOpen, setIsOpen } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  // ---------------------------------------------------------
  // 1. SCROLL SPY LOGIC (Homepage Only)
  // ---------------------------------------------------------
  useEffect(() => {
    // Only run this observer on the homepage
    if (pathname !== "/") return;

    const observerOptions = {
      root: null,
      // 🔹 FIX: Changed from -50% to -40%.
      // This creates a slightly wider detection zone (20% of screen height) in the middle
      // making it easier to catch smaller sections or end-of-page sections.
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSelectedNav(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    navItems.forEach((item) => {
      if (item.id) {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname, setSelectedNav]);

  // ---------------------------------------------------------
  // 2. SCROLL HANDLERS (Visibility & Bottom Detection)
  // ---------------------------------------------------------

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // 1. Detect if user is at top
      setIsAtTop(currentScroll === 0);

      // 2. Hide/Show Navbar logic
      if (currentScroll > lastScrollY && currentScroll > 50) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      setLastScrollY(currentScroll);

      // 3. Mobile background logic
      if (isMobile && currentScroll > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 🔹 FIX: Bottom of Page Detection for "Nearby"
      // If the user is at the very bottom of the page, force the last ID item to be active.
      // This overrides the observer if the last section is too short to reach the middle of the screen.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        const lastIdItem = navItems.filter((item) => item.id).pop();
        if (lastIdItem) {
          setSelectedNav(lastIdItem.id);
        }
      }
    };

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1025);
    };

    const handleResize = () => {
      checkIfMobile();
      if (window.innerWidth > 1025) {
        closeMenu();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    // Initial check
    checkIfMobile();

    // Event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY, isMobile, setSelectedNav]); // Added dependencies

  const closeMenu = () => {
    setIsActive(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
    document.body.style.overflow = isActive ? "" : "hidden";
  };

  const scrollToSection = (id: string | null, link?: string) => {
    closeMenu();

    if (id !== null) {
      // Logic for scrolling within the page
      setSelectedNav(id);

      if (pathname !== "/") {
        // If not on homepage, go there first, then scroll
        router.replace(`/#${id}`);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    } else if (link) {
      // Logic for external pages
      setSelectedNav(null); // Clear active state regarding scroll spy
      router.push(link);
    }
  };

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.5,
        when: "beforeChildren",
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.4,
        delay: i * 0.07,
      },
    }),
  };

  const menuContainerVariants = {
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <header
      className={`header z-1 bg-white w-full fixed top-0 left-0 right-0
    ${
      isMobile
        ? isScrolled && !isScrolled
          ? "mobile-bg"
          : "mobile-bg-top"
        : ""
    }`}
      style={{
        position: !isNavbarVisible ? "absolute" : "fixed",
        background: !isAtTop ? "#f1ebe3" : "transparent",
        top: !isNavbarVisible ? "-100%" : "0px",
        transition: "top 0.4s ease",
      }}
      ref={navbarRef}
    >
      <div className=" left-and-right-padding-add  max-w-[1536px] w-full mx-auto">
        <motion.nav
          className="navbar"
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          <motion.div className="nav-brand" initial={{ opacity: 1 }}>
            <Link href="/" onClick={closeMenu}>
              <Image
                src="/assets/The Chimes Logo.webp"
                alt="Logo"
                width={200}
                height={100}
                className="logo"
              />
            </Link>
          </motion.div>

          <div className={`nav-menu ${isActive ? "active" : ""}`}>
            <motion.div initial={false}>
              <motion.ul
                className="nav-list"
                variants={menuContainerVariants}
                initial="closed"
                animate={isActive ? "open" : "closed"}
              >
                {navItems.map((item, i) => {
                  // 🔹 LOGIC TO DETERMINE ACTIVE LINK
                  const isActiveLink =
                    // Scenario 1: On Homepage & Scroll Spy Match
                    (pathname === "/" && item.id && selectedNav === item.id) ||
                    // Scenario 2: On External Page & Pathname Match (e.g., /careers)
                    (item.link && pathname === `/${item.link}`);

                  return (
                    <motion.li
                      key={item.id || item.link}
                      className={`nav-item `}
                      variants={menuItemVariants}
                      custom={i}
                    >
                      <button
                        className={`nav-link cursor-pointer  ${
                          isActiveLink ? "active-link" : ""
                        }`}
                        onClick={() => scrollToSection(item.id, item.link)}
                      >
                        {item.name}
                      </button>
                    </motion.li>
                  );
                })}
                <motion.li
                  className="nav-item mobile-button "
                  style={{ background: "rgba(242, 238, 238, 0.12)" }}
                >
                  <Link
                    href="#"
                    className="nav-link nav-link-mobile"
                    style={{ backgroundColor: "rgba(242, 238, 238, 0.12)" }}
                  >
                    <button
                      className="button button-link-mobile"
                      onClick={() => {
                        setIsOpen(true);
                        closeMenu();
                      }}
                    >
                      Enquire Now
                    </button>
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
          <div className="nav-actions">
            <motion.div initial={{ opacity: 1 }} className="nav-action">
              <AudioPlayer />
              <GlassSurface
                width={"fit-content"}
                height={"fit-content"}
                borderRadius={40}
                className="desktop-enquire-button"
              >
                <Link href="#" className="nav-link  mobile-will-hide">
                  <button
                    className="button"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    Enquire Now
                  </button>
                </Link>
              </GlassSurface>
            </motion.div>

            <div
              className={`cross-icons ${isActive ? "active-cross-icon" : ""}`}
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={closeMenu}
              >
                <rect
                  width="38"
                  height="38"
                  rx="19"
                  fill="#F2EEEE"
                  fillOpacity="0.12"
                />
                <path
                  d="M20.2826 19.0001L25.7339 13.5485C26.0887 13.1939 26.0887 12.6206 25.7339 12.266C25.3793 11.9113 24.806 11.9113 24.4514 12.266L18.9999 17.7176L13.5486 12.266C13.1938 11.9113 12.6207 11.9113 12.2661 12.266C11.9113 12.6206 11.9113 13.1939 12.2661 13.5485L17.7174 19.0001L12.2661 24.4517C11.9113 24.8063 11.9113 25.3797 12.2661 25.7343C12.4428 25.9111 12.6751 26 12.9073 26C13.1395 26 13.3717 25.9111 13.5486 25.7343L18.9999 20.2827L24.4514 25.7343C24.6283 25.9111 24.8605 26 25.0927 26C25.3249 26 25.557 25.9111 25.7339 25.7343C26.0887 25.3797 26.0887 24.8063 25.7339 24.4517L20.2826 19.0001Z"
                  fill="#15420E"
                />
              </svg>
            </div>

            <motion.div
              onClick={toggleMenu}
              className={`nav-toggle ${isActive ? "nav-active" : ""}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto block"
              >
                <path
                  d="M1.2 2.4H14.8C15.4629 2.4 16 1.86289 16 1.2C16 0.537109 15.4629 0 14.8 0H1.2C0.537109 0 0 0.537109 0 1.2C0 1.86289 0.537109 2.4 1.2 2.4Z"
                  fill="#15420E"
                />
                <path
                  d="M14.8 4.8H1.2C0.537109 4.8 0 5.33711 0 6C0 6.66289 0.537109 7.2 1.2 7.2H14.8C15.4629 7.2 16 6.66289 16 6C16 5.33711 15.4629 4.8 14.8 4.8Z"
                  fill="#15420E"
                />
                <path
                  d="M14.8 9.6H1.2C0.537109 9.6 0 10.1371 0 10.8C0 11.4629 0.537109 12 1.2 12H14.8C15.4629 12 16 11.4629 16 10.8C16 10.1371 15.4629 9.6 14.8 9.6Z"
                  fill="#15420E"
                />
              </svg>
            </motion.div>
          </div>
        </motion.nav>

        <SendEnquiryPopup open={isOpen} setOpen={setIsOpen} />
      </div>
    </header>
  );
}
