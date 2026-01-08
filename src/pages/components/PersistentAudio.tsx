import { useEffect, useState } from "react";
import { useAuthContext } from "@/pages/AuthContext/AuthContext";

const PersistentAudio = () => {
  const {
    audioRef,
    hasGlobalAudioTriggered,
    setHasGlobalAudioTriggered,
    setIsPlaying,
    isPlaying,
  } = useAuthContext();
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioSrc = "assets/Healing Chimes (mp3cut.net).mp3";

  // 1. Listen to audio events to sync state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      setIsPlaying(true);
      // If played (manually or automatically), mark as triggered so we don't try to auto-play again needlessly
      setHasGlobalAudioTriggered(true);
    };
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef, setIsPlaying, setHasGlobalAudioTriggered]);

  // 2. Global Click Auto-Play Logic
  useEffect(() => {
    if (hasGlobalAudioTriggered) return;

    const handleGlobalClick = async (e: any) => {
      // Check if the click is on a restricted navigation link
      const target = e.target as HTMLElement;

      // Check restricted text content (for buttons/links)
      const element = target.closest("button") || target.closest("a") || target;
      const text = element.innerText || element.textContent || "";
      const restrictedTexts = ["Channel Partner", "Careers"];

      // If text matches exactly or contains the restricted text
      if (restrictedTexts.some((t) => text.trim() === t)) {
        return;
      }

      // Also check href if it's a link (backup for other links)
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href") || "";
        if (href.includes("channelpartner") || href.includes("careers")) {
          return;
        }
      }

      // If music is NOT playing, try to play
      if (audioRef.current && !isPlaying && !hasInteracted) {
        try {
          await audioRef.current.play();
          setHasGlobalAudioTriggered(true);
        } catch (error) {
          console.log("Audio play failed:", error);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [
    hasGlobalAudioTriggered,
    hasInteracted,
    isPlaying,
    audioRef,
    setHasGlobalAudioTriggered,
  ]);

  return <audio className="hidden" ref={audioRef} src={audioSrc} loop />;
};

export default PersistentAudio;
