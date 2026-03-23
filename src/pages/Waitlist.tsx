import { useEffect, useRef } from "react";
import Navbar from "../components/waitlist/Navbar";
import Hero from "../components/waitlist/Hero";
import SocialIcons from "../components/waitlist/SocialIcons";
import AudioToggle from "../components/waitlist/AudioToggle";
import bgAudio from "../assets/4935e98a-7b02-44b0-a360-47b204b36cfa.m4a";

export default function Waitlist() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const START_TIME = 14;
    audio.volume = 0.75;
    audio.preload = "metadata";

    // Only set currentTime once metadata is available
    const seekToStart = () => {
      if (audio.readyState >= 1) {
        audio.currentTime = START_TIME;
      }
    };
    audio.addEventListener("loadedmetadata", seekToStart, { once: true });
    seekToStart(); // in case already loaded

    // Loop back to start time when the track ends
    const onEnded = () => {
      audio.currentTime = START_TIME;
      audio.play();
    };
    audio.addEventListener("ended", onEnded);

    const events = ["click", "scroll", "keydown", "touchstart"] as const;
    const play = () => {
      audio.currentTime = START_TIME;
      audio.play();
      events.forEach((e) => document.removeEventListener(e, play));
    };
    // Try autoplay first
    audio.play().then(() => {
      audio.currentTime = START_TIME;
    }).catch(() => {
      // Browser blocked it — wait for any user interaction
      events.forEach((e) => document.addEventListener(e, play, { once: true }));
    });
    return () => {
      events.forEach((e) => document.removeEventListener(e, play));
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", seekToStart);
    };
  }, []);

  return (
    <div className="">
      {/* Background Audio */}
      <audio ref={audioRef} src={bgAudio} />

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/img/poster.webp"
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none"
      >
        <source src="/img/127983 (Original).mp4" type="video/mp4" />
      </video>

      {/* Dark overlay over video */}
      <div className="fixed inset-0 bg-primary-dark/50 -z-5"></div>

      {/* Content */}
      <div className="text-white overflow-y-hidden">
        <Navbar />
        <Hero />
      </div>

      {/* Social Icons */}
      <SocialIcons />

      {/* Audio Toggle */}
      <AudioToggle audioRef={audioRef} />
    </div>
  );
}
