import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";

interface AudioToggleProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function AudioToggle({ audioRef }: AudioToggleProps) {
  const [playing, setPlaying] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  // Show button with animation on first user click (audio starts playing)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef]);

  // Animate in on mount
  useEffect(() => {
    if (!btnRef.current) return;
    gsap.fromTo(
      btnRef.current,
      { scale: 0, opacity: 0, rotate: -180 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)" }
    );
  }, []);

  // Animate bars when playing
  useEffect(() => {
    if (!barsRef.current) return;
    const bars = barsRef.current.children;
    if (playing) {
      Array.from(bars).forEach((bar, i) => {
        gsap.to(bar, {
          scaleY: 1,
          duration: 0.3,
          delay: i * 0.05,
          ease: "power2.out",
        });
        gsap.to(bar, {
          scaleY: 0.3 + Math.random() * 0.7,
          duration: 0.4 + Math.random() * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
        });
      });
    } else {
      Array.from(bars).forEach((bar) => {
        gsap.killTweensOf(bar);
        gsap.to(bar, { scaleY: 0.2, duration: 0.3, ease: "power2.out" });
      });
    }
  }, [playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Button bounce animation
    gsap.fromTo(
      btnRef.current,
      { scale: 0.85 },
      { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" }
    );

    if (audio.paused) {
      void audio.play().catch(() => undefined);
    } else {
      audio.pause();
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      className="audio-toggle"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      <div ref={barsRef} className="audio-bars">
        <span className="audio-bar" />
        <span className="audio-bar" />
        <span className="audio-bar" />
        <span className="audio-bar" />
      </div>
      {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}
