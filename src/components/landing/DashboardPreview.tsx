import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Calendar, FlaskConical, Scissors, Stethoscope, TrendingUp, Users } from "lucide-react";
import { revenueData } from "@/lib/mock-data";

export function DashboardPreview() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-xl bg-[var(--card)] border border-[var(--hairline)] shadow-[var(--shadow-elevated)] overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 h-10 border-b border-[var(--hairline)] bg-[var(--cream)]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--hairline)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--hairline)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--hairline)]" />
          </div>
          <div className="text-[11px] text-[var(--muted-ink)] ml-3">zarklo.com / dashboard</div>
        </div>

        <div className="grid lg:grid-cols-[180px_1fr] min-h-[400px]">
          <div className="hidden lg:flex flex-col gap-0.5 p-4 border-r border-[var(--hairline)] bg-[var(--cream)]/50">
            {["Dashboard", "Modules", "CRM", "Bookings", "Reviews", "Analytics"].map((l, i) => (
              <div
                key={l}
                className={`text-xs px-3 py-2.5 rounded-md ${
                  i === 0
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--muted-ink)]"
                }`}
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
                <div
                  key={v.label}
                  className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-md border border-[var(--hairline)] bg-[var(--cream)] text-[var(--muted-ink)]"
                >
                  <v.icon className="w-3 h-3 text-[var(--gold)]" strokeWidth={1.5} />
                  {v.label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Appointments", value: "Connected", icon: Calendar },
                { label: "Inquiries", value: "Responding", icon: Users },
                { label: "Visibility", value: "Tracking", icon: TrendingUp },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-[var(--hairline)] bg-[var(--cream)] p-3">
                  <div className="flex items-center justify-between text-[10px] text-[var(--muted-ink)] uppercase tracking-wide">
                    <span>{s.label}</span>
                    <s.icon className="w-3 h-3 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <div className="mt-1.5 font-display text-lg text-[var(--heading)]">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-[var(--hairline)] p-3 bg-[var(--card)]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium text-[var(--heading)]">Activity trend</div>
                <div className="text-[10px] text-[var(--muted-ink)]">Illustrative</div>
              </div>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.38} />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 10, fill: "#666666" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "#160B27",
                        border: "1px solid rgba(196,181,253,0.16)",
                        borderRadius: 8,
                        fontSize: 11,
                        color: "#EEE9F8",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#A78BFA"
                      strokeWidth={2}
                      fill="url(#rev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--hairline)] p-3 bg-[var(--cream)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-[var(--primary)] grid place-items-center text-[10px] text-white font-medium">
                D
              </div>
              <div className="text-xs">
                <div className="font-medium text-[var(--heading)]">Discovery module</div>
                <div className="text-[var(--muted-ink)]">
                  Local visibility work running for clinic & lab keywords.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
