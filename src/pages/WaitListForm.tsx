import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "../assets/logo.png";
import { icons } from "../components/waitlist/SocialIcons";

const tabs = [
  "Real Estate Agent",
  "Builder",
  "Building Materials Supplier/Installer",
  "Partner / Investor",
];

const tabFields: Record<number, { label: string; type: string; placeholder: string }[]> = {
  0: [
    { label: "First Name", type: "text", placeholder: "Enter Your First Name" },
    { label: "Last Name", type: "text", placeholder: "Enter Your Last Name" },
    { label: "Company Name", type: "text", placeholder: "Enter Your Company Name" },
    { label: "Location", type: "text", placeholder: "Enter Your Location" },
    { label: "Phone Number", type: "tel", placeholder: "Enter Your Phone Number" },
    { label: "Email", type: "email", placeholder: "Email Address" },
  ],
  1: [
    { label: "First Name", type: "text", placeholder: "Enter Your First Name" },
    { label: "Last Name", type: "text", placeholder: "Enter Your Last Name" },
    { label: "Phone Number", type: "tel", placeholder: "Enter Your Phone Number" },
    { label: "Email", type: "email", placeholder: "Email Address" },
  ],
  2: [
    { label: "First Name", type: "text", placeholder: "Enter Your First Name" },
    { label: "Last Name", type: "text", placeholder: "Enter Your Last Name" },
    { label: "Company Name", type: "text", placeholder: "Enter Your Company Name" },
    { label: "Location", type: "text", placeholder: "Enter Your Location" },
    { label: "Phone Number", type: "tel", placeholder: "Enter Your Phone Number" },
    { label: "Email", type: "email", placeholder: "Email Address" },
  ],
  3: [
    { label: "First Name", type: "text", placeholder: "Enter Your First Name" },
    { label: "Last Name", type: "text", placeholder: "Enter Your Last Name" },
    { label: "Company Name", type: "text", placeholder: "Enter Your Company Name" },
    { label: "Location", type: "text", placeholder: "Enter Your Location" },
    { label: "Phone Number", type: "tel", placeholder: "Enter Your Phone Number" },
    { label: "Email", type: "email", placeholder: "Email Address" },
  ],
};

const WaitListForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Page load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden states
      gsap.set([sidebarRef.current, headerRef.current, contentRef.current], {
        opacity: 0,
      });
      if (tabsRef.current) {
        gsap.set(Array.from(tabsRef.current.children), { opacity: 0 });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(sidebarRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
      })
        .fromTo(
          headerRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          contentRef.current,
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          tabsRef.current ? Array.from(tabsRef.current.children) : [],
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, []);

  // Tab switch animation
  useEffect(() => {
    if (!formRef.current) return;
    const fields = formRef.current.querySelectorAll(".form-field");
    const btn = formRef.current.querySelector(".submit-btn");

    gsap.fromTo(
      fields,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
      }
    );

    if (btn) {
      gsap.fromTo(
        btn,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [activeTab]);

  const fields = tabFields[activeTab];

  return (
    <div className="waitlistforms">
      <div className="grid grid-cols-12 min-h-screen">
        <div
          ref={sidebarRef}
          className="hidden md:block md:col-span-2 form-left relative min-h-screen"
        >
          <div className="lft_logo md:inline hidden">
            <img src={Logo} className="w-100" alt="Logo" />
          </div>
          <p className="text-black/30 text-xs hidden md:block absolute bottom-30 left-5 right-5">
            &copy; 2026 PropertyLoop.ng. All Rights Reserved.
          </p>
        </div>
        <div className="md:col-span-10 col-span-12 form-right">
          <div ref={headerRef} className="form-right-header">
            <div className="form_ic flex md:block justify-between items-center px-10 pt-5">
              <div className="logo_mobile md:hidden block">
                <img src={Logo} className="w-20" alt="" />
              </div>
              <div className="float-right">
                <div className="flex gap-2.5">
                  {icons.map((item) => (
                    <a
                      key={item.label}
                      href="#"
                      aria-label={item.label}
                      className="w-10 h-10 flex items-center justify-center rounded-(--radius-full) bg-[#2f9e61] text-white transition-all duration-150
                            hover:bg-transparent hover:border-2 hover:border-primary/15 hover:text-primary"
                    >
                      <item.Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div ref={contentRef} className="bg-[#4a7a5c] min-h-screen rounded-2xl m-6 p-8">
            <div className="px-10 pt-6">
              <div ref={tabsRef} className="flex items-center gap-0">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(index)}
                    className={`relative px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
                      activeTab === index
                        ? "border-white text-white"
                        : "border-transparent text-white/50 hover:text-white/80"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ${
                          activeTab === index
                            ? "bg-white text-[#4a7a5c]"
                            : "bg-white/20 text-white/60"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {tab}
                    </span>
                  </button>
                ))}
              </div>
              <div className="h-px bg-white/20 -mt-px"></div>
            </div>

            <div ref={formRef} className="grid md:grid-cols-2 gap-6 mt-8">
              {fields.map((field) => (
                <div key={`${activeTab}-${field.label}`} className="form-field">
                  <label className="block text-white/80 text-sm mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              ))}
              <div className="md:col-span-2 mt-4 submit-btn">
                <button className="w-full py-3 rounded-lg bg-white text-[#4a7a5c] font-semibold hover:bg-white/90 transition-colors">
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitListForm;
