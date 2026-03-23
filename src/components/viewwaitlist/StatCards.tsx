import {
  Users,
  Home,
  HardHat,
  Package,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface StatCardsProps {
  counts: {
    total: number;
    agents: number;
    builders: number;
    suppliersAndServices: number;
  };
}

const stats = [
  {
    label: "Total Registrants",
    key: "total" as const,
    icon: Users,
    iconBg: "bg-[#e8f5ee]",
    iconColor: "text-[#2f9e61]",
    labelColor: "text-[#2f9e61]",
    trend: "+12%",
    trendUp: true,
  },
  {
    label: "Real Estate Agents",
    key: "agents" as const,
    icon: Home,
    iconBg: "bg-[#e8f5ee]",
    iconColor: "text-[#2f9e61]",
    labelColor: "text-gray-500",
    trend: "+5.2%",
    trendUp: true,
  },
  {
    label: "Builders",
    key: "builders" as const,
    icon: HardHat,
    iconBg: "bg-[#e8f5ee]",
    iconColor: "text-[#2f9e61]",
    labelColor: "text-gray-500",
    trend: "+8.4%",
    trendUp: true,
  },
  {
    label: "Suppliers",
    key: "suppliersAndServices" as const,
    icon: Package,
    iconBg: "bg-[#e8f5ee]",
    iconColor: "text-[#2f9e61]",
    labelColor: "text-gray-500",
    trend: "-2.1%",
    trendUp: false,
  },
];

export default function StatCards({ counts }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center`}
            >
              <stat.icon size={20} className={stat.iconColor} />
            </div>
            <span
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
            >
              {stat.trendUp ? (
                <TrendingUp size={11} />
              ) : (
                <TrendingDown size={11} />
              )}
              {stat.trend}
            </span>
          </div>
          <p
            className={`text-xs font-medium text-gray-500 uppercase tracking-wide mb-1`}
          >
            {stat.label}
          </p>
          <p className="text-3xl font-bold text-gray-800">
            {counts[stat.key].toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
