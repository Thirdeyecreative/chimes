"use client";

import HomeSection from "@/pages/home/Home";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import Channelpartner from "./Channelpartner";

export default function Home() {
  return (
    <div className="landing-page">
      <Navbar />
      <Channelpartner />
      <FooterSection />
    </div>
  );
}
