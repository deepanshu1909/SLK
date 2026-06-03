import { useEffect } from "react";
import { Megaphone, Mail, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  { name: "Spring Glow-Up", channel: "Email", sent: 1240, opened: "62%", booked: 84, status: "Active" },
  { name: "Birthday Treat", channel: "SMS", sent: 312, opened: "94%", booked: 41, status: "Active" },
  { name: "Win-back: 60 days inactive", channel: "Email", sent: 480, opened: "48%", booked: 22, status: "Active" },
  { name: "Summer Hydrafacial Launch", channel: "Social", sent: 0, opened: "—", booked: 0, status: "Draft" },
];

export default function CampaignsPage() {
  useEffect(() => {
    document.title = "Campaigns — SLK";
  }, []);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl">Campaigns</h1>
          <p className="text-muted-foreground mt-1">AI-generated, multi-channel, and on-brand.</p>
        </div>
        <Button className="rounded-full bg-gradient-brand border-0 text-white"><Plus className="w-4 h-4 mr-1" /> New campaign</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Mail, label: "Email", value: "2,032" },
          { icon: MessageSquare, label: "SMS", value: "312" },
          { icon: Megaphone, label: "Social posts", value: "48" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-card border p-5 shadow-card flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-brand-soft grid place-items-center">
              <s.icon className="w-5 h-5 text-brand-deep" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{s.label} this month</div>
              <div className="font-display text-2xl">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-card border shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="text-left px-6 py-3">Campaign</th>
              <th className="text-left px-6 py-3">Channel</th>
              <th className="text-left px-6 py-3">Sent</th>
              <th className="text-left px-6 py-3">Open rate</th>
              <th className="text-left px-6 py-3">Bookings</th>
              <th className="text-left px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.name} className="border-t hover:bg-muted/30">
                <td className="px-6 py-3 font-medium">{c.name}</td>
                <td className="px-6 py-3 text-muted-foreground">{c.channel}</td>
                <td className="px-6 py-3">{c.sent.toLocaleString()}</td>
                <td className="px-6 py-3">{c.opened}</td>
                <td className="px-6 py-3 font-medium">{c.booked}</td>
                <td className="px-6 py-3"><Badge variant={c.status === "Active" ? "default" : "secondary"} className="rounded-full">{c.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
