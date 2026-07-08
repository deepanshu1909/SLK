import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Calendar, FlaskConical, Scissors, Sparkles, Stethoscope, TrendingUp, Users } from "lucide-react";
import { revenueData } from "@/lib/mock-data";

export function DashboardPreview() {
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-8 bg-gradient-brand opacity-20 blur-3xl rounded-[3rem]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl bg-card border shadow-elevated overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 h-9 border-b bg-muted/40">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="text-[11px] text-muted-foreground ml-3">zarkloai.com / dashboard</div>
        </div>

        <div className="grid lg:grid-cols-[200px_1fr] min-h-[440px]">
          <div className="hidden lg:flex flex-col gap-1 p-4 border-r bg-sidebar/50">
            {["Dashboard", "AI Agents", "CRM", "Bookings", "Reviews", "Analytics"].map((l, i) => (
              <div
                key={l}
                className={`text-xs px-3 py-2 rounded-lg ${i === 0 ? "bg-gradient-brand text-white shadow-sm" : "text-muted-foreground"}`}
              >
                {l}
              </div>
            ))}
          </div>

          <div className="p-5 space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Salon", icon: Scissors },
                { label: "Clinic", icon: Stethoscope },
                { label: "Path Lab", icon: FlaskConical },
              ].map((v) => (
                <div key={v.label} className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full border border-white/10 bg-muted/40 text-muted-foreground">
                  <v.icon className="w-3 h-3" />
                  {v.label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Revenue", value: "$68.9k", trend: "+24%", icon: TrendingUp },
                { label: "Appointments", value: "428", trend: "+18%", icon: Calendar },
                { label: "New clients", value: "92", trend: "+31%", icon: Users },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border bg-background/50 p-3">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{s.label}</span>
                    <s.icon className="w-3 h-3" />
                  </div>
                  <div className="mt-1 text-lg font-semibold">{s.value}</div>
                  <div className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                    <ArrowUpRight className="w-2.5 h-2.5" /> {s.trend}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border p-3 bg-background/50">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium">Revenue trend</div>
                <div className="text-[10px] text-muted-foreground">Last 8 months</div>
              </div>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.62 0.22 280)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="oklch(0.62 0.22 280)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "white",
                        border: "1px solid oklch(0.92 0.012 280)",
                        borderRadius: 12,
                        fontSize: 11,
                      }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="oklch(0.58 0.22 282)" strokeWidth={2} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border p-3 bg-background/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-brand grid place-items-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="text-xs">
                <div className="font-medium">Discovery Agent</div>
                <div className="text-muted-foreground">Ranked #2 for "clinic near me" · #1 for "blood test at home".</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute -left-6 lg:-left-12 top-1/3 glass rounded-2xl p-4 shadow-elevated hidden md:block animate-float"
      >
        <div className="text-[10px] text-muted-foreground">Profile views</div>
        <div className="text-2xl font-display">+1,200%</div>
        <div className="text-[10px] text-emerald-600 mt-0.5">vs last quarter</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute -right-4 lg:-right-10 top-12 glass rounded-2xl p-4 shadow-elevated hidden md:block animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-brand grid place-items-center text-xs text-white font-medium">AI</div>
          <div className="text-xs">
            <div className="font-medium">Booked Raj — Consult</div>
            <div className="text-muted-foreground">Today 11:30 AM</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
