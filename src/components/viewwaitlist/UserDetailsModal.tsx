import { X, Mail, Phone, MapPin, Building2, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import waitlistService from "@/api/services/waitlistService";

export interface WaitlistEntry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  category: string;
  location?: string;
  company_name?: string;
  created_at: string;
}

interface UserDetailsModalProps {
  entry: WaitlistEntry | null;
  onClose: () => void;
}

const categoryConfig: Record<string, { label: string; className: string }> = {
  "Real Estate Agent": {
    label: "Real Estate Agent",
    className: "bg-[#e8f5ee] text-[#2f9e61]",
  },
  Builder: { label: "Builder", className: "bg-[#e8f5ee] text-[#2f9e61]" },
  "Building Materials Supplier/Installer": {
    label: "Supplier",
    className: "bg-gray-100 text-gray-600",
  },
  "Partner / Investor": {
    label: "Partner / Investor",
    className: "bg-red-100 text-red-600",
  },
};

const avatarColors = [
  "bg-emerald-200",
  "bg-rose-200",
  "bg-green-200",
  "bg-slate-200",
  "bg-rose-200",
  "bg-cyan-200",
];

export default function UserDetailsModal({
  entry,
  onClose,
}: UserDetailsModalProps) {
  if (!entry) return null;

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const emailFormRef = useRef<HTMLDivElement>(null);

  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubject, setEmailSubject] = useState("PropertyLoop Update");
  const [emailBody, setEmailBody] = useState("");

  // Auto-scroll to email form when it opens
  useEffect(() => {
    if (showEmailForm && emailFormRef.current) {
      setTimeout(() => {
        emailFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  }, [showEmailForm]);

  useEffect(() => {
    if (!entry) return;

    const ctx = gsap.context(() => {
      // Backdrop fade in
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );

      // Modal scale and fade in
      gsap.fromTo(
        modalRef.current,
        { scale: 0.95, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" },
      );

      // Stagger content sections
      const contentSections =
        modalRef.current?.querySelectorAll(".content-section");
      if (contentSections) {
        gsap.fromTo(
          contentSections,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.15,
          },
        );
      }
    });

    return () => ctx.revert();
  }, [entry]);

  const avatarColor = avatarColors[parseInt(entry.id) % avatarColors.length];
  const initials = `${entry.first_name[0]}${entry.last_name[0]}`.toUpperCase();
  const cat = categoryConfig[entry.category];
  const registeredDate = new Date(entry.created_at).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  const handleSendEmail = async () => {
    if (!emailSubject.trim() || !emailBody.trim()) {
      setEmailMessage({
        type: "error",
        text: "Subject and message are required.",
      });
      return;
    }

    setEmailLoading(true);
    setEmailMessage(null);

    try {
      const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${emailSubject}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f5f5;
                color: #333;
                line-height: 1.6;
              }
              .wrapper { background-color: #f5f5f5; padding: 20px 0; }
              .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .header { 
                background: linear-gradient(135deg, #2f9e61 0%, #247a4a 100%);
                color: white; 
                padding: 30px 20px;
                text-align: center;
                border-bottom: 4px solid #1f5a37;
              }
              .header svg {
                max-width: 80px;
                height: auto;
                margin-bottom: 10px;
              }
              .header h2 {
                font-size: 24px;
                font-weight: 600;
                margin: 0;
              }
              .content { 
                padding: 40px;
              }
              .message-body {
                font-size: 15px;
                color: #555;
                line-height: 1.8;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .message-container {
                background-color: #f9fafb;
                border-left: 4px solid #2f9e61;
                padding: 20px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .footer {
                background-color: #f9fafb;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #999;
                border-top: 1px solid #eee;
              }
              .footer a {
                color: #2f9e61;
                text-decoration: none;
              }
              .footer p {
                margin: 5px 0;
              }
              .divider {
                height: 1px;
                background-color: #eee;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="container">
                <!-- Header -->
                <div class="header">
                  <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="58" fill="white" opacity="0.1" stroke="white" stroke-width="2"/>
                    <path d="M60 30L80 50V85H40V50L60 30Z" fill="white"/>
                    <path d="M50 60L60 50L70 60" stroke="white" stroke-width="2" fill="none"/>
                  </svg>
                  <h2>PropertyLoop</h2>
                </div>

                <!-- Main Content -->
                <div class="content">
                  <div class="message-container">
                    <div class="message-body">${emailBody}</div>
                  </div>
                  
                  <div class="divider"></div>
                  
                  <p style="font-size: 14px; color: #666; margin-bottom: 15px;">
                    If you have any questions or need further assistance, feel free to reach out. We're here to help!
                  </p>
                </div>

                <!-- Footer -->
                <div class="footer">
                  <p><strong style="color: #2f9e61;">PropertyLoop Team</strong></p>
                  <p>Making real estate management smarter</p>
                  <p style="margin-top: 10px; border-top: 1px solid #eee; padding-top: 10px;">
                    <a href="https://propertyloop.ng">Visit our website</a> • 
                    <a href="https://propertyloop.ng/privacy">Privacy Policy</a>
                  </p>
                  <p>&copy; 2026 PropertyLoop. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      await waitlistService.sendEmail(entry.id, {
        to: entry.email,
        subject: emailSubject,
        text: emailBody,
        html: htmlTemplate,
      });

      setEmailMessage({
        type: "success",
        text: "Email sent successfully!",
      });
      setShowEmailForm(false);
      setEmailSubject("PropertyLoop Update");
      setEmailBody("");
    } catch (error) {
      setEmailMessage({
        type: "error",
        text: "Failed to send email. Please try again.",
      });
      console.error("Email send error:", error);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">User Details</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Profile Section */}
            <div className="content-section flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-full ${avatarColor} flex items-center justify-center text-white text-2xl font-bold mb-4`}
              >
                {initials}
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {entry.first_name} {entry.last_name}
              </h3>
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold mt-3 ${cat?.className ?? "bg-gray-100 text-gray-600"}`}
              >
                {cat?.label ?? entry.category}
              </span>
            </div>

            {/* Contact Information */}
            <div className="content-section bg-gray-50 rounded-xl p-4 space-y-4">
              <h4 className="text-sm font-semibold text-gray-800">
                Contact Information
              </h4>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#2f9e61] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-800 break-all">
                    {entry.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#2f9e61] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <p className="text-sm font-medium text-gray-800">
                    {entry.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="content-section bg-gray-50 rounded-xl p-4 space-y-4">
              <h4 className="text-sm font-semibold text-gray-800">
                Business Information
              </h4>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#2f9e61] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="text-sm font-medium text-gray-800">
                    {entry.location || (
                      <span className="text-gray-400">Not provided</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Company */}
              {entry.company_name && (
                <div className="flex items-start gap-3">
                  <Building2
                    size={18}
                    className="text-[#2f9e61] mt-0.5 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 mb-1">Company Name</p>
                    <p className="text-sm font-medium text-gray-800">
                      {entry.company_name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Registration Date */}
            <div className="content-section bg-gray-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Calendar
                  size={18}
                  className="text-[#2f9e61] mt-0.5 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Date Registered</p>
                  <p className="text-sm font-medium text-gray-800">
                    {registeredDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="content-section flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setShowEmailForm(true)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#2f9e61] text-white text-sm font-semibold hover:bg-[#2f9e61]/90 transition-colors"
              >
                Send Email
              </button>
            </div>

            {/* Email Compose Form */}
            {showEmailForm && (
              <div
                ref={emailFormRef}
                className="content-section bg-blue-50 rounded-lg p-4 border border-blue-200 space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email subject"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f9e61]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Message
                  </label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Compose your message here..."
                    rows={6}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f9e61] resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {emailBody.length} characters
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowEmailForm(false);
                      setEmailMessage(null);
                    }}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendEmail}
                    disabled={emailLoading}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#2f9e61] text-white text-sm font-semibold hover:bg-[#2f9e61]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                  >
                    {emailLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            )}

            {emailMessage && (
              <div
                className={`p-3 rounded-lg text-sm font-medium ${
                  emailMessage.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {emailMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
