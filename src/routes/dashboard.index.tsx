import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Calendar, Sparkles, TrendingUp, Users, DollarSign,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { revenueData, upcomingAppointments, aiInsights, conversations, funnelData } from "@/lib/mock-data";
import { Counter } from "@/components/landing/motion-bits";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Revenue (MTD)", value: 68900, prefix: "$", icon: DollarSign, trend: "+24%" },
  { label: "Bookings", value: 428, icon: Calendar, trend: "+18%" },
  { label: "New clients", value: 92, icon: Users, trend: "+31%" },
  { label: "Conversion", value: 23, suffix: "%", icon: TrendingUp, trend: "+4.2pp" },
];

export default function DashboardHome() {
  useEffect(() => {
    document.title = "Dashboard — ZarkloAI";
  }, []);
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl tracking-tight">Good morning, Camille</h1>
          <p className="text-muted-foreground mt-1">Your AI team handled 38 tasks while you slept.</p>
        </div>
        <Badge variant="outline" className="rounded-full px-3 py-1.5 border-brand/30 bg-brand/5 text-brand-deep">
          <Sparkles className="w-3 h-3 mr-1" /> 6 agents active
        </Badge>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl bg-card border p-5 shadow-card"
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{s.label}</span>
              <s.icon className="w-4 h-4" />
            </div>
            <div className="mt-2 font-display text-3xl">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="text-xs text-emerald-600 mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> {s.trend} vs last month
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl bg-card border p-6 shadow-card">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-sm font-medium">Revenue & Bookings</div>
              <div className="text-xs text-muted-foreground">Last 8 months</div>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.58 0.22 282)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.58 0.22 282)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 280)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.92 0.012 280)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.58 0.22 282)" strokeWidth={2.5} fill="url(#rev2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-card border p-6 shadow-card">
          <div className="text-sm font-medium mb-1">Lead funnel</div>
          <div className="text-xs text-muted-foreground mb-4">Last 30 days</div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.92 0.012 280)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="value" fill="oklch(0.58 0.22 282)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-card border p-6 shadow-card">
          <div className="text-sm font-medium mb-4">Upcoming today</div>
          <div className="space-y-3">
            {upcomingAppointments.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition">
                <div className="w-9 h-9 rounded-full bg-gradient-brand-soft border grid place-items-center text-xs font-medium">
                  {a.client.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{a.client}</div>
                  <div className="text-xs text-muted-foreground truncate">{a.service} · {a.staff}</div>
                </div>
                <div className="text-xs text-muted-foreground">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card border p-6 shadow-card">
          <div className="text-sm font-medium mb-4 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand" /> AI Insights
          </div>
          <div className="space-y-3">
            {aiInsights.map((i, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gradient-brand-soft border border-brand/10">
                <div className="text-xs text-brand-deep font-medium">{i.tag}</div>
                <div className="text-sm font-medium mt-1">{i.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{i.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card border p-6 shadow-card">
          <div className="text-sm font-medium mb-4">Recent conversations</div>
          <div className="space-y-3">
            {conversations.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition">
                <div className="w-9 h-9 rounded-full bg-muted grid place-items-center text-xs">{c.name.split(" ").map(n => n[0]).join("")}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <div className="text-sm font-medium truncate">{c.name}</div>
                    <div className="text-[10px] text-muted-foreground">{c.time}</div>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{c.last}</div>
                </div>
                {c.unread > 0 && (
                  <span className="text-[10px] bg-brand text-white rounded-full w-5 h-5 grid place-items-center">{c.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
