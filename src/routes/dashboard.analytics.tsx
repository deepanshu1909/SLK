import { useEffect } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import { revenueData, trafficData } from "@/lib/mock-data";

export default function AnalyticsPage() {
  useEffect(() => {
    document.title = "Analytics — Zarklo";
  }, []);
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="font-display text-4xl">Analytics</h1>
        <p className="text-muted-foreground mt-1">Revenue, retention, SEO, and campaign performance.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Revenue" subtitle="Monthly trend">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.58 0.22 282)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.58 0.22 282)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 280)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.92 0.012 280)", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="oklch(0.58 0.22 282)" strokeWidth={2.5} fill="url(#rA)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Bookings" subtitle="Monthly">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 280)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.92 0.012 280)", borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="bookings" fill="oklch(0.7 0.16 220)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Profile views" subtitle="Last 7 days">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 280)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.92 0.012 280)", borderRadius: 12, fontSize: 12 }} />
              <Line type="monotone" dataKey="views" stroke="oklch(0.58 0.22 282)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="clicks" stroke="oklch(0.72 0.18 330)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="SEO rankings" subtitle="Top keywords">
          <div className="p-4 space-y-3">
            {[
              { kw: "salon near me", rank: 2, change: "+5" },
              { kw: "balayage [city]", rank: 1, change: "+3" },
              { kw: "hydrafacial booking", rank: 4, change: "+8" },
              { kw: "best barber downtown", rank: 3, change: "+2" },
              { kw: "lash lift [city]", rank: 6, change: "+12" },
            ].map((k) => (
              <div key={k.kw} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-brand text-white grid place-items-center text-xs font-medium">#{k.rank}</div>
                <div className="flex-1 text-sm">{k.kw}</div>
                <div className="text-xs text-emerald-600">{k.change}</div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border shadow-card overflow-hidden">
      <div className="p-6 pb-2">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <div className="h-[260px] p-2">{children}</div>
    </div>
  );
}
