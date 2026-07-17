import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { ArrowRight, Bed, Bath, MapPin, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import featuredPropertiesService from "../../api/services/featuredPropertiesService";
import type { FeaturedProperty } from "../../api/services/featuredPropertiesService";

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState<
    FeaturedProperty[]
  >([]);

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

  useEffect(() => {
    featuredPropertiesService
      .getActive()
      .then(setFeaturedProperties)
      .catch(() => {
        /* silently ignore on public page */
      });
  }, []);

  const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");

  const handlePropertyClick = (property: FeaturedProperty) => {
    navigate("/property-inquiry", { state: { property } });
  };

  return (
    <div className="">
      <div className="flex justify-center md:mt-35 mt-30 p-5 md:p-0">
        <div className="text-left max-w-5xl">
          <small className="prp_des text-[18px]">
            PropertyLoop is a tech-powered real estate network where agents and
            building material <br /> vendors connect, showcase listings, and
            reach ready buyers through a modern online marketplace.
          </small>

          <h1 className="text-text-heading font-bold text-[clamp(28px,5vw,60px)] mt-4 transition-all duration-300">
            Secure your spot as a FOUNDING PARTNER{" "}
            <span ref={typedRef} className="text-primary font-body"></span>
          </h1>

          <p className="hero-description md:mt-0 mt-4 text-white/75 text-[18px] max-w-130 leading-relaxed mb-4">
            We're onboarding a limited number of agents, giving you early
            visibility, priority listing placement, and exclusive perks.
          </p>

          <div style={{ marginTop: "30px" }}>
            <Link to={"/waitlist-form"} className="hero-btn">
              Join Our Marketplace
              <ArrowRight className="arrow" size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Featured Properties Gallery ─────────────────────────────── */}
      {featuredProperties.length > 0 && (
        <div className="mt-16 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-bold text-[clamp(18px,3vw,26px)]">
                Featured Properties
              </h2>
              <p className="text-white/55 text-sm mt-1">
                Handpicked listings ready for you
              </p>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-sm text-[#2f9e61] font-medium cursor-default select-none">
              <span>Swipe to explore</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Scrollable card row */}
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                onClick={() => handlePropertyClick(property)}
                className="snap-start shrink-0 w-70 sm:w-80 cursor-pointer group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#2f9e61]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(47,158,97,0.18)]"
              >
                {/* Property image */}
                <div className="relative h-48 overflow-hidden bg-white/5">
                  {property.imageUrls?.[0] ? (
                    <img
                      src={property.imageUrls[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white/20 text-sm">
                      No image
                    </div>
                  )}
                  {/* Type badge */}
                  <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
                    For{" "}
                    {property.type === "SALE"
                      ? "Sale"
                      : property.type === "RENT"
                        ? "Rent"
                        : "Shortlet"}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-sm leading-snug line-clamp-1 group-hover:text-[#2f9e61] transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-1 text-white/50 text-xs">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-white/50 text-xs mt-0.5">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5" />
                      {property.beds} bed
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5" />
                      {property.baths} bath
                    </span>
                    {property.sqft && <span>{property.sqft} sqft</span>}
                  </div>

                  {/* Price row */}
                  <div className="flex items-end justify-between mt-1 pt-3 border-t border-white/8">
                    <div>
                      <p className="text-[#2f9e61] font-bold text-base leading-none">
                        {formatPrice(property.priceNaira)}
                      </p>
                      {property.priceLabel && (
                        <p className="text-white/40 text-[11px] mt-0.5">
                          {property.priceLabel}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePropertyClick(property);
                      }}
                      className="flex items-center gap-1.5 bg-[#2f9e61] hover:bg-[#27855a] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Get Property
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
