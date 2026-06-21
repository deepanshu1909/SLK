import { motion } from "framer-motion";
import { Heart, Sparkles, Target } from "lucide-react";
import { agents } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";
import { revenueData, trafficData } from "@/lib/mock-data";

const iconMap = { Sparkles, Heart, Target };

function MiniChart({ idx }: { idx: number }) {
  if (idx % 3 === 0) {
    return (
      <ResponsiveContainer width="100%" height={48}>
        <LineChart data={revenueData}>
          <Line type="monotone" dataKey="revenue" stroke="#60A5FA" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  if (idx % 3 === 1) {
    return (
      <ResponsiveContainer width="100%" height={48}>
        <BarChart data={trafficData}>
          <Bar dataKey="clicks" fill="#06B6D4" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={48}>
      <LineChart data={trafficData}>
        <Line type="monotone" dataKey="views" stroke="#34D399" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AgentsSection() {
  return (
    <section id="agents" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-brand mb-4">AI Agents</div>
            <h2 className="font-display text-5xl md:text-6xl leading-[1] tracking-tight text-foreground">
              Three specialists. <br />
              <span className="italic text-white">One team.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Each agent runs autonomously, learns your brand, and reports back daily. No prompts to write. No dashboards to babysit.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {agents.map((a, i) => {
            const Icon = iconMap[a.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={a.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl bg-card border border-white/10 p-7 shadow-card hover:shadow-elevated transition-shadow overflow-hidden"
              >
                <div aria-hidden className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-20 blur-3xl transition-opacity" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-brand border border-white/10 grid place-items-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Agent</div>
                  </div>

                  <h3 className="font-display text-2xl mb-2 text-foreground">{a.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{a.desc}</p>

                  <div className="rounded-xl bg-muted/40 border border-white/5 p-3 mb-3">
                    <MiniChart idx={i} />
                  </div>

                  <div className="text-sm font-medium text-white">{a.metric}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
