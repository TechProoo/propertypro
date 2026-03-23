import { useState, useMemo } from "react";
import { Search, Download } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/viewwaitlist/AppSidebar";
import StatCards from "@/components/viewwaitlist/StatCards";
import WaitlistTable, {
  type WaitlistEntry,
} from "@/components/viewwaitlist/WaitlistTable";

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

const MOCK_DATA: WaitlistEntry[] = [
  {
    id: "1",
    first_name: "Chidi",
    last_name: "Okafor",
    email: "chidi@example.com",
    phone: "+234 801 234 5678",
    category: "Real Estate Agent",
    location: "Lagos",
    company_name: "Okafor Realty",
    created_at: "2026-03-01T10:00:00Z",
  },
  {
    id: "2",
    first_name: "Amina",
    last_name: "Hassan",
    email: "amina@example.com",
    phone: "+234 802 345 6789",
    category: "Builder",
    location: "Abuja",
    company_name: "",
    created_at: "2026-03-05T11:30:00Z",
  },
  {
    id: "3",
    first_name: "Tunde",
    last_name: "Adeyemi",
    email: "tunde@example.com",
    phone: "+234 803 456 7890",
    category: "Building Materials Supplier/Installer",
    location: "Ibadan",
    company_name: "Adeyemi Supplies Ltd",
    created_at: "2026-03-10T09:15:00Z",
  },
  {
    id: "4",
    first_name: "Ngozi",
    last_name: "Eze",
    email: "ngozi@example.com",
    phone: "+234 804 567 8901",
    category: "Partner / Investor",
    location: "Port Harcourt",
    company_name: "Eze Ventures",
    created_at: "2026-03-15T14:00:00Z",
  },
  {
    id: "5",
    first_name: "Emeka",
    last_name: "Nwosu",
    email: "emeka@example.com",
    phone: "+234 805 678 9012",
    category: "Real Estate Agent",
    location: "Enugu",
    company_name: "Prime Homes",
    created_at: "2026-03-18T08:45:00Z",
  },
];

export default function ViewWaitList() {
  const [entries, setEntries] = useState<WaitlistEntry[]>(MOCK_DATA);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

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

  return (
    /*
      THE KEY LAYOUT TRICK:
      - SidebarProvider gets h-screen + overflow-hidden so the flex row is
        locked to the viewport. Neither column can make the page itself scroll.
      - AppSidebar has h-screen on its own so it fills the locked row height.
      - SidebarInset gets overflow-y-auto so ONLY the content area scrolls.
      - The sidebar never moves because the page body itself never scrolls.
    */
    <SidebarProvider className="h-screen overflow-hidden">
      <AppSidebar />
      <SidebarInset className="overflow-y-auto">
        <main className="bg-gray-50/50">
          <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Waitlist Registrations
              </h1>
              <div className="flex items-center gap-3">
                <div className="relative lg:w-64">
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
                <button className="h-10 px-4 rounded-lg bg-[#1a2e27] text-white text-sm font-semibold flex items-center gap-2 hover:bg-[#1a2e27]/90">
                  <Download size={14} />
                  Export
                </button>
              </div>
            </div>

            <StatCards counts={counts} />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
              {/* Tabs */}
              <div className="p-2 border-b border-gray-100">
                <div className="flex items-center flex-wrap gap-y-1">
                  {TABS.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key);
                        setPage(1);
                      }}
                      className={`px-4 py-2 text-sm font-semibold transition-colors ${
                        activeTab === tab.key
                          ? "text-[#2f9e61]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <WaitlistTable
                entries={paginated}
                onDelete={(id) =>
                  setEntries((prev) => prev.filter((e) => e.id !== id))
                }
                onView={() => {}}
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
  );
}
