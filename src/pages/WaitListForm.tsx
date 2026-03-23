import { useState, useEffect, useRef, type FormEvent } from "react";
import gsap from "gsap";
import Logo from "../assets/logo.png";
import { icons } from "../components/waitlist/SocialIcons";

const tabs = [
  "Real Estate Agent",
  "Builder",
  "Building Materials Supplier/Installer",
  "Partner / Investor",
];

const tabEmails: Record<number, string> = {
  0: "agent@propertyloop.ng",
  1: "builder@propertyloop.ng",
  2: "supplier@propertyloop.ng",
  3: "service@propertyloop.ng",
};

const tabFields: Record<
  number,
  { label: string; name: string; type: string; placeholder: string }[]
> = {
  0: [
    { label: "First Name", name: "first_name", type: "text", placeholder: "Enter Your First Name" },
    { label: "Last Name", name: "last_name", type: "text", placeholder: "Enter Your Last Name" },
    { label: "Company Name", name: "company_name", type: "text", placeholder: "Enter Your Company Name" },
    { label: "Location", name: "location", type: "text", placeholder: "Enter Your Location" },
    { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter Your Phone Number" },
    { label: "Email", name: "email", type: "email", placeholder: "Email Address" },
  ],
  1: [
    { label: "First Name", name: "first_name", type: "text", placeholder: "Enter Your First Name" },
    { label: "Last Name", name: "last_name", type: "text", placeholder: "Enter Your Last Name" },
    { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter Your Phone Number" },
    { label: "Email", name: "email", type: "email", placeholder: "Email Address" },
  ],
  2: [
    { label: "First Name", name: "first_name", type: "text", placeholder: "Enter Your First Name" },
    { label: "Last Name", name: "last_name", type: "text", placeholder: "Enter Your Last Name" },
    { label: "Company Name", name: "company_name", type: "text", placeholder: "Enter Your Company Name" },
    { label: "Location", name: "location", type: "text", placeholder: "Enter Your Location" },
    { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter Your Phone Number" },
    { label: "Email", name: "email", type: "email", placeholder: "Email Address" },
  ],
  3: [
    { label: "First Name", name: "first_name", type: "text", placeholder: "Enter Your First Name" },
    { label: "Last Name", name: "last_name", type: "text", placeholder: "Enter Your Last Name" },
    { label: "Company Name", name: "company_name", type: "text", placeholder: "Enter Your Company Name" },
    { label: "Location", name: "location", type: "text", placeholder: "Enter Your Location" },
    { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter Your Phone Number" },
    { label: "Email", name: "email", type: "email", placeholder: "Email Address" },
  ],
};

const WaitListForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Page load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
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
          "-=0.5",
        )
        .fromTo(
          contentRef.current,
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          tabsRef.current ? Array.from(tabsRef.current.children) : [],
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
          "-=0.3",
        );
    });

    return () => ctx.revert();
  }, []);

  // Tab switch animation + clear result
  useEffect(() => {
    setResult(null);
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
      },
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
        },
      );
    }
  }, [activeTab]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "b202617d-1bf3-416a-b20f-90bbe6e65e51");
    formData.append("to_email", tabEmails[activeTab]);
    formData.append("subject", `New Waitlist Signup - ${tabs[activeTab]}`);
    formData.append("from_name", "PropertyLoop Waitlist");
    formData.append("category", tabs[activeTab]);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult({ success: true, message: "You've been added to the waitlist!" });
        (e.target as HTMLFormElement).reset();
      } else {
        setResult({ success: false, message: "Something went wrong. Please try again." });
      }
    } catch {
      setResult({ success: false, message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const fields = tabFields[activeTab];

  return (
    <div className="waitlistforms">
      <div className="grid grid-cols-12 min-h-screen">
        <div
          ref={sidebarRef}
          className="hidden md:block md:col-span-2 form-left sticky top-0 h-screen self-start"
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
          <div
            ref={contentRef}
            className="bg-[#4a7a5c] min-h-screen rounded-2xl m-3 p-4 sm:m-6 sm:p-8"
          >
            <div className="px-2 sm:px-10 pt-6">
              <div className="relative sm:static">
                <div
                  ref={tabsRef}
                  className="flex overflow-x-auto gap-0 scrollbar-hide"
                >
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(index)}
                      className={`relative px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                        activeTab === index
                          ? "border-white text-white"
                          : "border-transparent text-white/50 hover:text-white/80"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="sm:hidden absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-[#4a7a5c] to-transparent pointer-events-none"></div>
              </div>
              <div className="h-px bg-white/20 -mt-px"></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div
                ref={formRef}
                className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 px-2 sm:px-0"
              >
                {fields.map((field) => (
                  <div key={`${activeTab}-${field.label}`} className="form-field">
                    <label className="block text-white/80 text-sm mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                ))}
                <div className="md:col-span-2 mt-4 submit-btn">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-lg bg-white text-[#4a7a5c] font-semibold hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Join Waitlist"}
                  </button>
                  {result && (
                    <p className={`mt-3 text-sm text-center ${result.success ? "text-white" : "text-red-300"}`}>
                      {result.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitListForm;
