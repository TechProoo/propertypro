import { Trash2, Eye, User } from "lucide-react";

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

const companyColors = [
  "text-gray-800",
  "text-gray-800",
  "text-gray-800",
  "text-gray-800",
  "text-gray-800",
  "text-gray-800",
];

const avatarColors = [
  "bg-emerald-200",
  "bg-rose-200",
  "bg-green-200",
  "bg-slate-200",
  "bg-rose-200",
  "bg-cyan-200",
];

interface WaitlistTableProps {
  entries: WaitlistEntry[];
  onDelete: (id: string) => void;
  onView: (entry: WaitlistEntry) => void;
  page: number;
  perPage: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function WaitlistTable({
  entries,
  onDelete,
  onView,
  page,
  perPage,
  total,
  onPrev,
  onNext,
}: WaitlistTableProps) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
            <User size={28} className="text-gray-300" />
          </div>
          <p className="text-sm font-semibold text-gray-500">
            No registrants found
          </p>
          <p className="text-xs mt-1 text-gray-400">
            Try adjusting your search or filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Mobile Card View */}
      <div className="md:hidden">
        <div className="divide-y divide-gray-100">
          {entries.map((entry, i) => {
            const cat = categoryConfig[entry.category];
            const avatarColor = avatarColors[i % avatarColors.length];
            const initials =
              `${entry.first_name[0]}${entry.last_name[0]}`.toUpperCase();
            const registeredDate = new Date(entry.created_at).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
              }
            );

            return (
              <div key={entry.id} className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm">
                        {entry.first_name} {entry.last_name}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold mt-1 ${cat?.className ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {cat?.label ?? entry.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => onView(entry)}
                      className="p-1.5 rounded-md text-gray-300 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="p-1.5 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-gray-600">
                  <div>
                    <p className="text-gray-400 mb-0.5">Email</p>
                    <p className="font-medium text-gray-800 break-all">
                      {entry.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-0.5">Phone</p>
                    <p className="font-medium text-gray-800">{entry.phone}</p>
                  </div>
                  {entry.location && (
                    <div>
                      <p className="text-gray-400 mb-0.5">Location</p>
                      <p className="font-medium text-gray-800">
                        {entry.location}
                      </p>
                    </div>
                  )}
                  {entry.company_name && (
                    <div>
                      <p className="text-gray-400 mb-0.5">Company</p>
                      <p className="font-medium text-gray-800">
                        {entry.company_name}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-400 mb-0.5">Registered</p>
                    <p className="font-medium text-gray-800">
                      {registeredDate}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Name
              </th>
              <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Contact
              </th>
              <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Category
              </th>
              <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Location
              </th>
              <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Company
              </th>
              <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Date Registered
              </th>
              <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => {
              const cat = categoryConfig[entry.category];
              const avatarColor = avatarColors[i % avatarColors.length];
              const companyColor = companyColors[i % companyColors.length];
              const initials =
                `${entry.first_name[0]}${entry.last_name[0]}`.toUpperCase();
              return (
                <tr
                  key={entry.id}
                  className="hover:bg-gray-50/50 transition-colors group border-b border-gray-50 last:border-b-0"
                >
                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                      >
                        {initials}
                      </div>
                      <span className="font-semibold text-gray-800">
                        {entry.first_name} {entry.last_name}
                      </span>
                    </div>
                  </td>
                  {/* Contact */}
                  <td className="px-6 py-4">
                    <p className="text-gray-700 text-[13px]">{entry.email}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {entry.phone}
                    </p>
                  </td>
                  {/* Category */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${cat?.className ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {cat?.label ?? entry.category}
                    </span>
                  </td>
                  {/* Location */}
                  <td className="px-6 py-4 text-gray-600 text-[13px]">
                    {entry.location ?? <span className="text-gray-300">—</span>}
                  </td>
                  {/* Company */}
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold text-[13px] ${companyColor}`}
                    >
                      {entry.company_name || (
                        <span className="text-gray-300 font-normal">—</span>
                      )}
                    </span>
                  </td>
                  {/* Date */}
                  <td className="px-6 py-4 text-gray-500 text-[13px]">
                    {new Date(entry.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onView(entry)}
                        className="p-1.5 rounded-md text-gray-300 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(entry.id)}
                        className="p-1.5 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Showing {start} to {end} of {total} registrations
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={page === 1}
            className="px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={end >= total}
            className="px-3 py-1.5 text-xs font-semibold text-white border border-[#1a2e27] rounded-md bg-[#1a2e27] hover:bg-[#1a2e27]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
