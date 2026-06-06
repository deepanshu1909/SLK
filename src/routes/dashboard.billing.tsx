import { useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/lib/mock-data";

export default function BillingPage() {
  useEffect(() => {
    document.title = "Billing — Zarklo";
  }, []);
  return (
    <div className="space-y-8 max-w-[1200px]">
      <div>
        <h1 className="font-display text-4xl">Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and invoices.</p>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-white p-8 shadow-glow">
        <div className="text-xs uppercase tracking-wider text-white/70">Current plan</div>
        <div className="font-display text-4xl mt-1">Growth</div>
        <div className="text-white/80 mt-1">$199/mo · renews on Jun 14</div>
        <div className="mt-6 flex gap-3">
          <Button className="rounded-full bg-white text-brand-deep hover:bg-white/90 border-0">Upgrade plan</Button>
          <Button variant="ghost" className="rounded-full text-white hover:bg-white/10 hover:text-white">Manage payment</Button>
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl mb-4">Change plan</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {pricingTiers.map((t) => (
            <div key={t.name} className={`rounded-2xl border bg-card p-6 shadow-card ${t.popular ? "border-brand" : ""}`}>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.name}</div>
              <div className="font-display text-3xl mt-1">${t.monthly}<span className="text-base text-muted-foreground">/mo</span></div>
              <ul className="mt-4 space-y-2">
                {t.features.slice(0, 4).map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-brand mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-card border shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b text-sm font-medium">Invoices</div>
        <table className="w-full text-sm">
          <tbody>
            {[
              { date: "May 14, 2026", amount: "$199.00", status: "Paid" },
              { date: "Apr 14, 2026", amount: "$199.00", status: "Paid" },
              { date: "Mar 14, 2026", amount: "$199.00", status: "Paid" },
            ].map((i) => (
              <tr key={i.date} className="border-t">
                <td className="px-6 py-3">{i.date}</td>
                <td className="px-6 py-3 font-medium">{i.amount}</td>
                <td className="px-6 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700">{i.status}</span></td>
                <td className="px-6 py-3 text-right"><a href="#" className="text-xs text-brand">Download</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
