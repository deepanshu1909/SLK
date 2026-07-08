import { Link, Outlet, useLocation } from "react-router-dom";
import {
  BarChart3, Bell, Calendar, CreditCard, LayoutDashboard,
  MessageSquare, Search, Settings, Sparkles, Star, Users, Megaphone, Bot,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/agents", label: "AI Agents", icon: Bot },
  { to: "/dashboard/crm", label: "CRM", icon: Users },
  { to: "/dashboard/bookings", label: "Bookings", icon: Calendar },
  { to: "/dashboard/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/dashboard/reviews", label: "Reviews", icon: Star },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/chat", label: "AI Chat", icon: MessageSquare },
  { to: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-sidebar shrink-0">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl px-6 h-16 border-b">
          <span className="grid place-items-center w-8 h-8 rounded-xl bg-gradient-brand shadow-glow">
            <Sparkles className="w-4 h-4 text-white" />
          </span>
          ZarkloAI
        </Link>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  active
                    ? "bg-gradient-brand text-white shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-2xl bg-gradient-brand-soft border p-4">
          <div className="text-xs font-medium">Trial · 12 days left</div>
          <div className="text-xs text-muted-foreground mt-1">Upgrade to keep your AI team running.</div>
          <Link to="/dashboard/billing" className="mt-3 inline-flex text-xs text-brand-deep font-medium">
            Upgrade →
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-background/70 backdrop-blur-xl sticky top-0 z-30 flex items-center px-4 lg:px-8 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search clients, bookings, agents…" className="pl-9 h-10 rounded-full bg-muted/60 border-transparent" />
          </div>
          <button className="relative w-10 h-10 grid place-items-center rounded-full hover:bg-muted transition">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-brand text-white grid place-items-center text-sm font-medium">AM</div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
