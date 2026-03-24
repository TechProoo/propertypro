import { Users, Settings, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Logo from "../../assets/logo.png";
import Admin from "../../assets/admin.jpg";
const navItems = [
  { title: "Waitlist", url: "/admin/waitlist", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

// ─── Shared nav content ────────────────────────────────────────────────────
// Extracted so it can be rendered both inside the sticky desktop sidebar
// and inside the mobile Sheet drawer without duplication.
function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-[#1a2e27]">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <img src={Logo} className="w-50" alt="" />
        <p className="text-[#2f9e61] text-[10px] font-semibold tracking-[0.2em] uppercase mt-0.5">
          Admin Console
        </p>
      </div>

      {/* Nav items */}
      <div className="flex-1 px-3">
        <div className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <Link
                key={item.title}
                to={item.url}
                onClick={onNavigate}
                className={`flex items-center gap-3 h-10 px-3 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-[#2f9e61] text-white"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon size={16} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="w-9 h-9 rounded-full bg-[#2f9e61]/30 border border-[#2f9e61]/50 flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src={Admin}
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              PropertyLoop
            </p>
            <p className="text-[11px] text-white/40 truncate">Director</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop sidebar ────────────────────────────────────────────────────────
// collapsible="none" keeps it in the normal document flow (not position:fixed)
// so SidebarInset is naturally pushed to the right.
// h-screen + overflow-y-auto means it fills the viewport and scrolls its own
// content if needed, but since it's short it stays put.
export default function AppSidebar() {
  return (
    <Sidebar
      collapsible="none"
      className="hidden md:flex border-r-0 shrink-0 h-screen overflow-y-auto bg-[#1a2e27]"
    >
      <SidebarNav />
    </Sidebar>
  );
}

// ─── Mobile drawer ──────────────────────────────────────────────────────────
// Rendered separately in the page component alongside a hamburger trigger.
export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="left"
        className="w-64 p-0 border-r-0 bg-[#1a2e27] [&>button]:hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        <SidebarNav onNavigate={onClose} />
      </SheetContent>
    </Sheet>
  );
}
