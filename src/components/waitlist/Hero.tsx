import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedRef.current) return;
    const typed = new Typed(typedRef.current, {
      strings: [
        "WITH PROPERTYLOOP",
        "GET VICINITY",
        "GET CONNECTIONS",
        "PLACEMENTS",
      ],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <div className="">
      <div className="flex justify-center md:mt-35 mt-30 p-5 md:p-0">
        <div className="text-left max-w-5xl">
          <small className="prp_des text-[clamp(15px,2vw,16px)]">
            PropertyLoop is a tech-powered real estate network where agents and
            building material <br /> vendors connect, showcase listings, and
            reach ready buyers through a modern online marketplace.
          </small>

          <h1 className="text-text-heading font-bold text-[clamp(28px,5vw,60px)] mt-4 transition-all duration-300">
            Secure your spot as a FOUNDING PARTNER{" "}
            <span ref={typedRef} className="text-primary font-body"></span>
          </h1>

          <p className="hero-description mt-10 text-white/75 text-[clamp(16px,2vw,17px)] max-w-130 leading-relaxed mb-4">
            We're onboarding a limited number of agents, giving you early
            visibility, priority listing placement, and exclusive perks.
          </p>

          <div style={{ marginTop: "50px" }}>
            <Link to={"/waitlist-form"} className="hero-btn">
              Join Our Network
              <ArrowRight className="arrow" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
