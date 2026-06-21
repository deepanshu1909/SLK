import { useEffect } from "react";
import { reviews } from "@/lib/mock-data";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  useEffect(() => {
    document.title = "Reviews — ZarkloAI";
  }, []);
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="font-display text-4xl">Reviews</h1>
        <p className="text-muted-foreground mt-1">Your reputation, managed by the Review Agent.</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: "Average rating", value: "4.9" },
          { label: "Total reviews", value: "1,284" },
          { label: "Response rate", value: "100%" },
          { label: "5-star this month", value: "62" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-card border p-5 shadow-card">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="font-display text-3xl mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.concat(reviews).concat(reviews).map((r, i) => (
          <div key={i} className="rounded-2xl bg-card border p-5 shadow-card">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium text-sm">{r.author}</div>
              <div className="text-[10px] text-muted-foreground">{r.platform}</div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: r.stars }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-sm text-muted-foreground">"{r.body}"</p>
            <div className="mt-4 pt-3 border-t text-xs text-brand-deep">
              ✨ AI replied automatically
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
