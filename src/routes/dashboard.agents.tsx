import { useEffect } from "react";
import { Heart, Sparkles, Target } from "lucide-react";
import { motion } from "framer-motion";
import { agents } from "@/lib/mock-data";
import { Switch } from "@/components/ui/switch";

const iconMap = { Sparkles, Heart, Target };

export default function AgentsPage() {
  useEffect(() => {
    document.title = "AI Agents — ZarkloAI";
  }, []);
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="font-display text-4xl">AI Agents</h1>
        <p className="text-muted-foreground mt-1">Your autonomous team. Toggle, configure, and watch them work.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((a, i) => {
          const Icon = iconMap[a.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={a.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-card border p-6 shadow-card relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-brand border border-white/10 grid place-items-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <Switch defaultChecked />
              </div>
              <h3 className="font-display text-xl">{a.name}</h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{a.desc}</p>

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Performance</div>
                  <div className="text-sm font-medium text-white">{a.metric}</div>
                </div>
                <button className="text-xs text-brand hover:underline">Configure →</button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
