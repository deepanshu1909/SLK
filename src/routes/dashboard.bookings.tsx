import { createFileRoute } from "@tanstack/react-router";
import { upcomingAppointments } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/bookings")({
  head: () => ({ meta: [{ title: "Bookings — SLK" }] }),
  component: BookingsPage,
});

const hours = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`);
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function BookingsPage() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl">Bookings</h1>
          <p className="text-muted-foreground mt-1">Calendar, services, and staff in one view.</p>
        </div>
        <Button className="rounded-full bg-gradient-brand border-0 text-white"><Plus className="w-4 h-4 mr-1" /> New booking</Button>
      </div>

      <div className="rounded-2xl bg-card border shadow-card overflow-hidden">
        <div className="grid grid-cols-8 border-b text-xs">
          <div className="p-3 text-muted-foreground" />
          {days.map((d) => <div key={d} className="p-3 text-center font-medium border-l">{d}</div>)}
        </div>
        {hours.map((h, idx) => (
          <div key={h} className="grid grid-cols-8 border-b last:border-0 text-xs">
            <div className="p-3 text-muted-foreground">{h}</div>
            {days.map((d) => (
              <div key={d} className="p-1.5 border-l min-h-[56px] relative hover:bg-muted/30 transition">
                {idx === 1 && d === "Sat" && (
                  <div className="absolute inset-1 rounded-lg bg-gradient-brand text-white text-[10px] p-1.5">
                    Ava M. · Balayage
                  </div>
                )}
                {idx === 3 && d === "Wed" && (
                  <div className="absolute inset-1 rounded-lg bg-accent-cyan/30 text-foreground text-[10px] p-1.5">
                    Noah B. · Beard
                  </div>
                )}
                {idx === 5 && d === "Fri" && (
                  <div className="absolute inset-1 rounded-lg bg-gradient-brand-soft border border-brand/20 text-foreground text-[10px] p-1.5">
                    Sofia R. · Facial
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-card border shadow-card">
        <div className="px-6 py-4 border-b text-sm font-medium">Today's appointments</div>
        <div className="divide-y">
          {upcomingAppointments.map((a) => (
            <div key={a.id} className="px-6 py-4 flex items-center gap-4">
              <div className="text-sm font-medium w-20">{a.time}</div>
              <div className="flex-1">
                <div className="text-sm font-medium">{a.client}</div>
                <div className="text-xs text-muted-foreground">{a.service}</div>
              </div>
              <div className="text-xs text-muted-foreground">{a.staff}</div>
              <Badge variant={a.status === "confirmed" ? "default" : "secondary"} className="rounded-full capitalize">{a.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
