import { useState } from "react";
import { Save, Eye, EyeOff, Copy, Check } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/viewwaitlist/AppSidebar";

export default function Settings() {
  const [savedTab, setSavedTab] = useState<string | null>(null);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "PropertyLoop",
    contact_email: "admin@propertyloop.com",
    phone: "+234 801 234 5678",
    address: "Lagos, Nigeria",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (tab: string) => {
    setSavedTab(tab);
    setTimeout(() => setSavedTab(null), 2000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText("sk_live_51234567890abcdefghijk");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <AppSidebar />
      <SidebarInset className="overflow-y-auto">
        <main className="bg-gray-50/50">
          <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your account and API settings
              </p>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Organization Settings */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    Organization
                  </h2>

                  <div className="space-y-5">
                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f9e61]/20 focus:border-[#2f9e61]"
                      />
                    </div>

                    {/* Contact Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f9e61]/20 focus:border-[#2f9e61]"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f9e61]/20 focus:border-[#2f9e61]"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f9e61]/20 focus:border-[#2f9e61] resize-none"
                      />
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => handleSave("org")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2f9e61] text-white text-sm font-semibold hover:bg-[#2f9e61]/90 transition-colors"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                      {savedTab === "org" && (
                        <span className="text-sm text-[#2f9e61] font-medium flex items-center gap-1.5">
                          <Check size={16} />
                          Saved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-6">
                {/* Plan Info */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">
                    Current Plan
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Plan Type
                      </p>
                      <p className="text-lg font-bold text-gray-800 mt-1">
                        Early Access
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Status
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#2f9e61]"></span>
                        <p className="text-sm font-medium text-gray-700">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Download Invoice
                    </button>
                    <button className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Help & Support
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* API Settings */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                API & Integration
              </h2>

              <div className="space-y-5">
                {/* API Key */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type={apiKeyVisible ? "text" : "password"}
                        value="sk_live_51234567890abcdefghijk"
                        readOnly
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:outline-none"
                      />
                      <button
                        onClick={() => setApiKeyVisible(!apiKeyVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {apiKeyVisible ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <button
                      onClick={copyApiKey}
                      className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      {copiedKey ? (
                        <Check size={16} className="text-[#2f9e61]" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Keep this key private. Do not share it with anyone.
                  </p>
                </div>

                {/* Webhook URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-domain.com/webhook"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f9e61]/20 focus:border-[#2f9e61]"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    We'll send waitlist updates to this URL
                  </p>
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleSave("api")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2f9e61] text-white text-sm font-semibold hover:bg-[#2f9e61]/90 transition-colors"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  {savedTab === "api" && (
                    <span className="text-sm text-[#2f9e61] font-medium flex items-center gap-1.5">
                      <Check size={16} />
                      Saved
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-6 bg-white rounded-2xl border border-red-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-4">
                Danger Zone
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                These actions cannot be undone.
              </p>
              <button className="px-4 py-2.5 rounded-lg border border-red-300 bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
