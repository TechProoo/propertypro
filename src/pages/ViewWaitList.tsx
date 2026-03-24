import { useState, useMemo, useEffect, useRef } from "react";
import { Search, Download, Menu } from "lucide-react";
import gsap from "gsap";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar, {
  MobileSidebar,
} from "@/components/viewwaitlist/AppSidebar";
import StatCards from "@/components/viewwaitlist/StatCards";
import WaitlistTable, {
  type WaitlistEntry,
} from "@/components/viewwaitlist/WaitlistTable";
import UserDetailsModal from "@/components/viewwaitlist/UserDetailsModal";
import { api } from "@/api";
import { useApi } from "@/api/hooks";
import { getErrorMessage } from "@/api/utils";

const TABS = [
  { key: "All", label: "All" },
  { key: "Real Estate Agent", label: "Real Estate Agent" },
  { key: "Builder", label: "Builder" },
  {
    key: "Building Materials Supplier/Installer",
    label: "Building Materials Supplier",
  },
  { key: "Partner / Investor", label: "Partner / Investor" },
];

/**
 * Map API user types to UI category labels
 */
function mapUserTypeToCategory(type: string): string {
  const typeMap: Record<string, string> = {
    REAL_ESTATE_AGENT: "Real Estate Agent",
    BUILDER: "Builder",
    BUILDING_MATERIALS_SUPPLIER_INSTALLER:
      "Building Materials Supplier/Installer",
    PARTNER_INVESTOR: "Partner / Investor",
  };
  return typeMap[type] || type;
}

export default function ViewWaitList() {
  const { data, loading, error, execute } = useApi(
    () => api.waitlist.getAll(),
    [],
  );

  // Animation refs
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const apiEntries = data ?? [];

  // Map API response to component interface (type -> category)
  const entries = apiEntries.map((entry) => ({
    ...entry,
    category: mapUserTypeToCategory(entry.type),
  }));

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [exportLoading, setExportLoading] = useState(false);
  const perPage = 10;

  // Fetch waitlist on component mount
  useEffect(() => {
    execute();
  }, [execute]);

  // Page load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        headerRef.current,
        statsRef.current,
        tableRef.current,
      ].filter(Boolean);

      gsap.set(elements, { opacity: 0, y: 20 });

      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.15,
        ease: "power2.out",
      });

      gsap.to(tableRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // Tab switch animation
  useEffect(() => {
    if (!tableRef.current) return;

    gsap.fromTo(
      tableRef.current,
      { opacity: 0.8, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
    );
  }, [activeTab]);

  const filtered = useMemo(
    () =>
      entries.filter((e) => {
        const matchesTab = activeTab === "All" || e.category === activeTab;
        const q = search.toLowerCase();
        const matchesSearch =
          !q ||
          `${e.first_name} ${e.last_name}`.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.phone.includes(q) ||
          (e.location ?? "").toLowerCase().includes(q);
        return matchesTab && matchesSearch;
      }),
    [entries, activeTab, search],
  );

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const counts = useMemo(() => {
    const c = entries.reduce(
      (acc, e) => ((acc[e.category] = (acc[e.category] || 0) + 1), acc),
      {} as Record<string, number>,
    );
    return {
      total: entries.length,
      agents: c["Real Estate Agent"] ?? 0,
      builders: c["Builder"] ?? 0,
      suppliersAndServices: c["Building Materials Supplier/Installer"] ?? 0,
    };
  }, [entries]);

  // Handle delete with API call
  const handleDelete = async (id: string) => {
    try {
      await api.waitlist.delete(id);
      // Refresh the list after deletion
      await execute();
      setDeleteError(null);
    } catch (err) {
      setDeleteError(getErrorMessage(err));
    }
  };

  // Handle export to CSV
  const handleExport = async () => {
    setExportLoading(true);
    try {
      const blob = await api.waitlist.export();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      setDeleteError("Failed to export waitlist. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <>
      {/* Mobile drawer — rendered outside SidebarProvider intentionally so it
          overlays the entire screen edge-to-edge */}
      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* h-screen + overflow-hidden locks the layout to the viewport so the
          sidebar never scrolls with the page — only SidebarInset scrolls */}
      <SidebarProvider className="h-screen overflow-hidden">
        {/* Desktop sidebar — hidden on mobile via the hidden md:flex inside AppSidebar */}
        <AppSidebar />

        <SidebarInset className="overflow-y-auto">
          <main className="bg-gray-50/50 min-h-full">
            <div className="p-4 lg:p-8">
              {/* Header */}
              <div
                ref={headerRef}
                className="flex items-center justify-between mb-8"
              >
                <div className="flex items-center gap-3">
                  {/* Hamburger — only visible on mobile */}
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu size={20} className="text-gray-600" />
                  </button>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                    Waitlist Registrations
                  </h1>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  {/* Search — hidden on mobile, shown on md+ */}
                  <div className="relative hidden md:block lg:w-64">
                    <Search
                      size={16}
                      className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400"
                    />
                    <input
                      type="search"
                      placeholder="Search registrants..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                  </div>
                  <button 
                    onClick={handleExport}
                    disabled={exportLoading}
                    className="h-10 px-3 md:px-4 rounded-lg bg-[#1a2e27] text-white text-sm font-semibold flex items-center gap-2 hover:bg-[#1a2e27]/90 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap transition-opacity">
                    <Download size={14} />
                    <span className="hidden sm:inline">{exportLoading ? "Exporting..." : "Export"}</span>
                  </button>
                </div>
              </div>

              {/* Mobile search — shown below header on small screens */}
              <div className="md:hidden mb-6 relative">
                <Search
                  size={16}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400"
                />
                <input
                  type="search"
                  placeholder="Search registrants..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-10 pl-9 pr-3 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Error Messages */}
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm font-medium text-red-800">
                    {getErrorMessage(error)}
                  </p>
                </div>
              )}

              {deleteError && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm font-medium text-red-800">
                    Failed to delete: {deleteError}
                  </p>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">
                    Loading waitlist data...
                  </p>
                </div>
              )}

              <div ref={statsRef}>
                <StatCards counts={counts} />
              </div>

              <div
                ref={tableRef}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-6"
              >
                {/* Tabs — scrollable on mobile */}
                <div className="border-b border-gray-100">
                  <div className="flex overflow-x-auto scrollbar-hide px-2">
                    {TABS.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setActiveTab(tab.key);
                          setPage(1);
                        }}
                        className={`px-3 md:px-4 py-3 text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 border-b-2 -mb-px ${
                          activeTab === tab.key
                            ? "text-[#2f9e61] border-[#2f9e61]"
                            : "text-gray-500 hover:text-gray-700 border-transparent"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <WaitlistTable
                  entries={paginated}
                  onDelete={handleDelete}
                  onView={setSelectedEntry}
                  page={page}
                  perPage={perPage}
                  total={filtered.length}
                  onPrev={() => setPage((p) => Math.max(1, p - 1))}
                  onNext={() =>
                    setPage((p) =>
                      Math.min(Math.ceil(filtered.length / perPage), p + 1),
                    )
                  }
                />
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>

      {/* User Details Modal */}
      <UserDetailsModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    </>
  );
}
