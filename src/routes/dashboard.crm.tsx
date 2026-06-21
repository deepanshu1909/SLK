import { useEffect } from "react";
import { leads } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CRMPage() {
  useEffect(() => {
    document.title = "CRM — ZarkloAI";
  }, []);

  const stages = ["New", "Warm", "Hot", "Booked"];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl">CRM</h1>
          <p className="text-muted-foreground mt-1">AI-scored leads, pipeline, and interactions.</p>
        </div>
        <Button className="rounded-full bg-gradient-brand border-0 text-white"><Plus className="w-4 h-4 mr-1" /> Add lead</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search leads…" className="pl-9 rounded-full" />
      </div>

      {/* Kanban */}
      <div className="grid md:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const items = leads.filter(l => l.stage === stage || (stage === "Booked" && l.score > 85));
          return (
            <div key={stage} className="rounded-2xl bg-muted/40 p-3 min-h-[300px]">
              <div className="flex items-center justify-between px-2 mb-3">
                <div className="text-sm font-medium">{stage}</div>
                <div className="text-xs text-muted-foreground">{items.length}</div>
              </div>
              <div className="space-y-2">
                {items.map((l) => (
                  <div key={l.id + stage} className="rounded-xl bg-card border p-3 shadow-card hover:shadow-elevated transition cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{l.name}</div>
                      <Badge variant="outline" className="text-[10px] border-brand/30 text-brand-deep">{l.score}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{l.source} · {l.value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-card border shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b text-sm font-medium">All leads</div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Source</th>
              <th className="text-left px-6 py-3">AI Score</th>
              <th className="text-left px-6 py-3">Stage</th>
              <th className="text-right px-6 py-3">Est. value</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t hover:bg-muted/30 transition">
                <td className="px-6 py-3 font-medium">{l.name}</td>
                <td className="px-6 py-3 text-muted-foreground">{l.source}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-brand" style={{ width: `${l.score}%` }} />
                    </div>
                    <span className="text-xs">{l.score}</span>
                  </div>
                </td>
                <td className="px-6 py-3"><Badge variant="secondary" className="rounded-full">{l.stage}</Badge></td>
                <td className="px-6 py-3 text-right font-medium">{l.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
