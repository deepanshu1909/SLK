import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  useEffect(() => {
    document.title = "Settings — ZarkloAI";
  }, []);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-4xl">Settings</h1>
        <p className="text-muted-foreground mt-1">Business profile and notification preferences.</p>
      </div>

      <div className="rounded-2xl bg-card border p-6 shadow-card space-y-4">
        <div className="text-sm font-medium">Business profile</div>
        <div className="space-y-1.5">
          <Label htmlFor="biz">Business name</Label>
          <Input id="biz" defaultValue="Maison Lumière Salon" className="rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Contact email</Label>
          <Input id="email" defaultValue="hello@maisonlumiere.com" className="rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="addr">Address</Label>
          <Input id="addr" defaultValue="201 Mission St, San Francisco, CA" className="rounded-xl" />
        </div>
      </div>

      <div className="rounded-2xl bg-card border p-6 shadow-card space-y-4">
        <div className="text-sm font-medium">Notifications</div>
        {[
          { label: "New bookings", desc: "Get notified when a booking comes in" },
          { label: "AI agent reports", desc: "Daily summary from each agent" },
          { label: "Reviews", desc: "Alert me when a new review is posted" },
        ].map((n) => (
          <div key={n.label} className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium">{n.label}</div>
              <div className="text-xs text-muted-foreground">{n.desc}</div>
            </div>
            <Switch defaultChecked />
          </div>
        ))}
      </div>

      <Button className="rounded-full bg-gradient-brand border-0 text-white px-6">Save changes</Button>
    </div>
  );
}
