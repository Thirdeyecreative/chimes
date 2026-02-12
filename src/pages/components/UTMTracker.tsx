"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function UTMTracker() {
  const searchParams = useSearchParams();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!searchParams) return;

    // Check if we have already tracked this session to avoid duplicates on every navigation
    const sessionTracked = sessionStorage.getItem("utm_tracked");
    if (sessionTracked || hasTracked.current) return;

    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const utmContent = searchParams.get("utm_content"); // Mapped to utm_ad_group if needed
    const utmTerm = searchParams.get("utm_term");
    const gclid = searchParams.get("gclid");
    const utmPlacement = searchParams.get("utm_placement");
    const utmDevice = searchParams.get("utm_device"); // Custom param check

    // Only track if at least one UTM-like param exists
    if (
      utmSource ||
      utmMedium ||
      utmCampaign ||
      gclid ||
      utmPlacement ||
      utmDevice
    ) {
      const trackVisit = async () => {
        try {
          // Map to the requested structure
          const payload = {
            USOURCE: utmSource || "",
            UMEDIUM: utmMedium || "",
            utm_campaign: utmCampaign || "",
            utm_ad_group: utmContent || "", // Mapping content to ad_group as per user habit
            utm_term: utmTerm || "",
            utm_device: utmDevice || "desktop", // Default or detect
            utm_gclid: gclid || "",
            utm_placement: utmPlacement || "",
            utm_ad_name: "", // Usually not in URL but header
          };

          await fetch("/api/track-visit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          // Mark as tracked for this session
          sessionStorage.setItem("utm_tracked", "true");
          hasTracked.current = true;
        } catch (error) {
          console.error("Failed to track visit", error);
        }
      };

      trackVisit();
    }
  }, [searchParams]);

  return null; // Render nothing
}
