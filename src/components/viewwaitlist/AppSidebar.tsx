import { LayoutDashboard, Users, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Waitlist", url: "/admin/waitlist", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    /*
      collapsible="none" = stays in normal document flow (no position:fixed)
      bg-[#1a2e27] = explicit dark green background (not relying on CSS var)
      h-screen overflow-y-auto = fills full viewport height and scrolls
        its own content if needed, but since content is short it won't scroll
      shrink-0 = never compress narrower than its defined width
    */
    <Sidebar
      collapsible="none"
      className="border-r-0 shrink-0 bg-[#1a2e27] h-screen overflow-y-auto"
    >
      {/* Logo */}
      <SidebarHeader className="px-5 pt-6 pb-5">
        <p className="text-white font-bold text-lg leading-tight">
          PropertyLoop
        </p>
        <p className="text-[#2f9e61] text-[10px] font-semibold tracking-[0.2em] uppercase mt-0.5">
          Admin Console
        </p>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`h-10 rounded-lg text-[13px] font-medium transition-all ${
                        isActive
                          ? "bg-[#2f9e61] text-white hover:bg-[#2f9e61] hover:text-white"
                          : "text-white/50 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Link to={item.url}>
                        <item.icon size={16} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="w-9 h-9 rounded-full bg-[#2f9e61]/30 border border-[#2f9e61]/50 flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src="https://i.pravatar.cc/36?img=12"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              James Sterling
            </p>
            <p className="text-[11px] text-white/40 truncate">Director</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
