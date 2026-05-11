import { useLocation, Link } from "react-router-dom";
import {
  MessageCircle,
  Phone,
  Mail,
  ArrowLeft,
  Star,
  MapPin,
  Bed,
  Bath,
  CheckCircle2,
} from "lucide-react";
import type { FeaturedProperty } from "../api/services/featuredPropertiesService";

const WHATSAPP = "2347053053040";
const PHONE = "2347053053040";
const SUPPORT_EMAIL = "support@propertyloop.ng";

function ContactCard({
  icon,
  label,
  value,
  href,
  color,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  color: string;
  bg: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${bg}`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-white font-bold text-base truncate">{value}</p>
      </div>
      <div className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowLeft className="w-4 h-4 text-white rotate-180" />
      </div>
    </a>
  );
}

export default function PropertyInquiry() {
  const location = useLocation();
  const property: FeaturedProperty | undefined = location.state?.property;

  const waMessage = property
    ? encodeURIComponent(
        `Hi PropertyLoop! I'm interested in: *${property.title}* — ${property.location} (${property.priceLabel}). Please share more details.`,
      )
    : encodeURIComponent(
        "Hi PropertyLoop! I'm interested in a property I saw on your site. Please share more details.",
      );

  const emailSubject = property
    ? encodeURIComponent(`Enquiry: ${property.title} — ${property.location}`)
    : encodeURIComponent("Property Enquiry");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1f16] via-[#132b1e] to-[#0a1610] text-white">
      {/* Nav */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-black/20 border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
        {/* Property preview card */}
        {property && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
            {property.imageUrls?.[0] && (
              <div className="relative h-52 sm:h-64">
                <img
                  src={property.imageUrls[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#2f9e61] text-white">
                  {property.type}
                </span>
              </div>
            )}
            <div className="p-5">
              <h2 className="font-bold text-xl text-white leading-snug">
                {property.title}
              </h2>
              <p className="flex items-center gap-1.5 text-white/50 text-sm mt-1">
                <MapPin size={13} />
                {property.location}
              </p>
              <p className="text-[#2f9e61] font-bold text-2xl mt-2">
                {property.priceLabel}
              </p>
              <div className="flex items-center gap-4 text-white/50 text-xs mt-1.5">
                <span className="flex items-center gap-1">
                  <Bed size={12} /> {property.beds} beds
                </span>
                <span className="flex items-center gap-1">
                  <Bath size={12} /> {property.baths} baths
                </span>
                {property.sqft && <span>{property.sqft}</span>}
              </div>

              {/* Additional images gallery */}
              {property.imageUrls?.length > 1 && (
                <div className="mt-4 pt-4 border-t border-white/8">
                  <p className="text-white/40 text-xs font-medium mb-2.5 uppercase tracking-wider">
                    More Photos
                  </p>
                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                    {property.imageUrls.slice(1).map((url, idx) => (
                      <div
                        key={idx}
                        className="shrink-0 w-28 h-20 rounded-xl overflow-hidden border border-white/10"
                      >
                        <img
                          src={url}
                          alt={`${property.title} photo ${idx + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2f9e61]/20 border border-[#2f9e61]/30 text-[#4ecb83] text-xs font-semibold mb-4">
            <Star size={12} />
            Interested in this property?
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Get in Touch With{" "}
            <span className="text-[#2f9e61]">PropertyLoop</span>
          </h1>
          <p className="text-white/50 text-base mt-3 max-w-md mx-auto leading-relaxed">
            Our team is ready to help you secure this property. Reach us through
            any of the channels below and we'll get back to you right away.
          </p>
        </div>

        {/* Contact options */}
        <div className="space-y-3 mb-10">
          <ContactCard
            href={`https://wa.me/${WHATSAPP}?text=${waMessage}`}
            label="WhatsApp — fastest response"
            value={`+${WHATSAPP}`}
            color="bg-green-500/20 text-green-400"
            bg="border-green-800/30 bg-green-900/10 hover:border-green-600/50"
            icon={<MessageCircle size={22} />}
          />
          <ContactCard
            href={`tel:+${PHONE}`}
            label="Call us directly"
            value={`+${PHONE}`}
            color="bg-blue-500/20 text-blue-400"
            bg="border-blue-800/30 bg-blue-900/10 hover:border-blue-600/50"
            icon={<Phone size={22} />}
          />
          <ContactCard
            href={`mailto:${SUPPORT_EMAIL}?subject=${emailSubject}`}
            label="Email"
            value={SUPPORT_EMAIL}
            color="bg-purple-500/20 text-purple-400"
            bg="border-purple-800/30 bg-purple-900/10 hover:border-purple-600/50"
            icon={<Mail size={22} />}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 my-10" />

        {/* Standout CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-[#2f9e61]/20 to-[#1f6f43]/10 border border-[#2f9e61]/30 p-7 text-center">
          <Star
            size={32}
            className="mx-auto mb-4 text-[#2f9e61]"
            fill="currentColor"
          />
          <h3 className="text-xl font-bold text-white mb-2">
            Want Your Property to Stand Out?
          </h3>
          <p className="text-white/55 text-sm leading-relaxed max-w-sm mx-auto mb-5">
            List your property as a featured ad on PropertyLoop's hero gallery
            and reach thousands of ready buyers every day.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left">
            {[
              "Prime hero placement",
              "Thousands of daily visitors",
              "Direct buyer enquiries",
            ].map((perk) => (
              <div
                key={perk}
                className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5"
              >
                <CheckCircle2 size={14} className="text-[#2f9e61] shrink-0" />
                <span className="text-white/70 text-xs font-medium">
                  {perk}
                </span>
              </div>
            ))}
          </div>

          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("I want to feature my property on PropertyLoop")}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2f9e61] hover:bg-[#26834f] text-white font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#2f9e61]/25 hover:-translate-y-0.5 text-sm"
          >
            <Mail size={16} />
            Email {SUPPORT_EMAIL}
          </a>
        </div>

        {/* Footer note */}
        <p className="text-center text-white/25 text-xs mt-8">
          PropertyLoop · Real Estate Network · Lagos, Nigeria
        </p>
      </div>
    </div>
  );
}
