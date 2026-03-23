import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "../../assets/logo.png";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial states
    gsap.set([logoRef.current, taglineRef.current, barTrackRef.current, dotsRef.current], {
      opacity: 0,
    });
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left" });
    gsap.set(glintRef.current, { x: "-110%", opacity: 0 });

    tl
      // Logo scales in
      .fromTo(
        logoRef.current,
        { scale: 0.7, opacity: 0, y: 16 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "back.out(1.4)" }
      )
      // Glint sweeps across logo
      .to(
        glintRef.current,
        { x: "110%", opacity: 0.6, duration: 0.7, ease: "power2.inOut" },
        "-=0.1"
      )
      .to(glintRef.current, { opacity: 0, duration: 0.15 }, ">-0.15")
      // Tagline fades in
      .to(
        taglineRef.current,
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      )
      // Progress track appears
      .to(barTrackRef.current, { opacity: 1, duration: 0.3 }, "-=0.1")
      // Bar fills — 2s to give video time to buffer
      .to(barRef.current, { scaleX: 1, duration: 2.2, ease: "power1.inOut" }, "<")
      // Dots pulse in
      .to(dotsRef.current, { opacity: 1, duration: 0.3 }, "<0.3")
      // Hold briefly then exit upward
      .to({}, { duration: 0.2 })
      .to(containerRef.current, {
        y: "-100%",
        duration: 0.7,
        ease: "power2.inOut",
        onComplete,
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="preloader-container"
    >
      {/* Subtle radial glow */}
      <div className="preloader-glow" />

      {/* Logo wrapper (clip for glint) */}
      <div className="preloader-logo-wrap">
        <img
          ref={logoRef}
          src={Logo}
          alt="PropertyLoop"
          className="preloader-logo"
        />
        {/* Glint overlay */}
        <div ref={glintRef} className="preloader-glint" />
      </div>

      {/* Tagline */}
      <p ref={taglineRef} className="preloader-tagline">
        Own Your Space. Power Your Property Search.
      </p>

      {/* Progress bar */}
      <div ref={barTrackRef} className="preloader-bar-track">
        <div ref={barRef} className="preloader-bar" />
      </div>

      {/* Loading dots */}
      <div ref={dotsRef} className="preloader-dots">
        <span className="preloader-dot" style={{ animationDelay: "0s" }} />
        <span className="preloader-dot" style={{ animationDelay: "0.2s" }} />
        <span className="preloader-dot" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
}
