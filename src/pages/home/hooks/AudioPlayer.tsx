import { useState, useRef, useEffect } from "react";
import GlassSurface from "@/ReactBits/GlassSurface/GlassSurface";
import { useAuthContext } from "@/pages/AuthContext/AuthContext";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { audioRef, hasGlobalAudioTriggered, setHasGlobalAudioTriggered } =
    useAuthContext();

  const audioSrc = "assets/Healing Chimes (mp3cut.net).mp3";

  // 1. ADD THIS EFFECT: Listen to the actual DOM element for state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return; 

    const onPlay = () => setIsPlaying(true);  
    const onPause = () => setIsPlaying(false);

    // Subscribe to native audio events
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Cleanup listeners on unmount
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef]);

  useEffect(() => {
    if (hasGlobalAudioTriggered) return;

    const handleGlobalClick = async () => {
      if (!isPlaying && audioRef.current && !hasInteracted) {
        try {
          await audioRef.current.play();
          setHasGlobalAudioTriggered(true);
        } catch (error) {
          console.log("Audio play failed:", error);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, { once: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [hasGlobalAudioTriggered, hasInteracted, isPlaying]);

  // 3. UPDATE TOGGLE FUNCTION: Remove manual state setting
  const togglePlayPause = async (e: any) => {
    e.stopPropagation();
    setHasInteracted(true);

    if (!audioRef.current) return;

    // Check the ACTUAL status of the audio element
    if (audioRef.current.paused) {
      await audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    // Removed setIsPlaying(!isPlaying); -> The event listener above will update the state automatically
  };

  return (
    <>
      <GlassSurface
        width={"fit-content"}
        height={"fit-content"}
        borderRadius={40}
        className="desktop-enquire-button"
      >
        <button
          onClick={togglePlayPause}
          className={`
            cursor-pointer mr-3 md:mr-0 relative z-2 button button-padding-remove music-icon-in-nav 
            transition-colors duration-300 ease-in-out
            ${
              isPlaying || !hasInteracted ? "active-link" : "audio-button-pause"
            }
          `}
        >
          {isPlaying || !hasInteracted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="relative z-1"
            >
              <path
                d="M6.54053 3.32711C5.6955 2.70776 4.8285 1.94442 4.21144 1.01883L3.67125 0.208575C3.55681 0.0369192 3.3435 -0.0395183 3.14528 0.0199817C2.94753 0.0799505 2.8125 0.262138 2.8125 0.468607V7.82311C2.53563 7.66164 2.21803 7.56236 1.875 7.56236C0.840906 7.56236 0 8.40326 0 9.43736C0 10.4714 0.840906 11.3123 1.875 11.3123C2.90909 11.3123 3.75 10.4714 3.75 9.43733V2.0077C4.41238 2.84495 5.24094 3.53676 5.98619 4.08333C6.35238 4.35158 6.5625 4.76542 6.5625 5.21858C6.5625 5.99401 5.93169 6.62483 5.15625 6.62483C4.89716 6.62483 4.6875 6.83448 4.6875 7.09358C4.6875 7.35267 4.89716 7.56233 5.15625 7.56233C6.44853 7.56233 7.5 6.51086 7.5 5.21858C7.5 4.4747 7.14156 3.76792 6.54053 3.32711Z"
                fill="#FFFFFF"
              />
              <path
                d="M15.4026 3.83023L8.77763 5.70523C8.57622 5.76292 8.4375 5.94692 8.4375 6.15613V12.5106C8.16062 12.3492 7.84303 12.2499 7.5 12.2499C6.46591 12.2499 5.625 13.0908 5.625 14.1249C5.625 15.159 6.46591 15.9999 7.5 15.9999C8.53409 15.9999 9.375 15.159 9.375 14.1249C9.375 14.018 9.375 8.38488 9.375 8.38488L15.0625 6.77773V10.6356C14.7856 10.4742 14.468 10.3749 14.125 10.3749C13.0909 10.3749 12.25 11.2158 12.25 12.2499C12.25 13.284 13.0909 14.1249 14.125 14.1249C15.1591 14.1249 16 13.284 16 12.2499C16 12.143 16 4.28113 16 4.28113C16 3.9711 15.7034 3.74526 15.4026 3.83023Z"
                fill="#FFFFFF"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-1 transform scale-110"
            >
              <path
                d="M8.54053 4.03414C7.6955 3.41479 6.8285 2.65145 6.21144 1.72586L5.67125 0.915607C5.55681 0.74395 5.3435 0.667513 5.14528 0.727013C4.94753 0.786982 4.8125 0.969169 4.8125 1.17564V8.53014C4.53563 8.36867 4.21803 8.26939 3.875 8.26939C2.84091 8.26939 2 9.11029 2 10.1444C2 11.1785 2.84091 12.0194 3.875 12.0194C4.90909 12.0194 5.75 11.1785 5.75 10.1444V2.71473C6.41238 3.55198 7.24094 4.24379 7.98619 4.79036C8.35238 5.05861 8.5625 5.47245 8.5625 5.92561C8.5625 6.70104 7.93169 7.33186 7.15625 7.33186C6.89716 7.33186 6.6875 7.54151 6.6875 7.80061C6.6875 8.0597 6.89716 8.26936 7.15625 8.26936C8.44853 8.26936 9.5 7.21789 9.5 5.92561C9.5 5.18173 9.14156 4.47495 8.54053 4.03414Z"
                fill="white"
              />
              <path
                d="M17.4026 4.53734L10.7776 6.41234C10.5762 6.47002 10.4375 6.65402 10.4375 6.86324V13.2177C10.1606 13.0563 9.84303 12.957 9.5 12.957C8.46591 12.957 7.625 13.7979 7.625 14.832C7.625 15.8661 8.46591 16.707 9.5 16.707C10.5341 16.707 11.375 15.8661 11.375 14.832C11.375 14.7251 11.375 9.09199 11.375 9.09199L17.0625 7.48484V11.3427C16.7856 11.1813 16.468 11.082 16.125 11.082C15.0909 11.082 14.25 11.9229 14.25 12.957C14.25 13.9911 15.0909 14.832 16.125 14.832C17.1591 14.832 18 13.9911 18 12.957C18 12.8501 18 4.98824 18 4.98824C18 4.67821 17.7034 4.45237 17.4026 4.53734Z"
                fill="white"
              />
              <line
                x1="0.353553"
                y1="0.353478"
                x2="17.3536"
                y2="17.3535"
                stroke="white"
              />
            </svg>
          )}
        </button>
      </GlassSurface>

      <audio className="hidden" ref={audioRef} src={audioSrc} loop />
    </>
  );
};

export default AudioPlayer;
