import { Check } from "lucide-react";
import { trustBadges } from "@/lib/site-content";

export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 ${className}`}
      aria-label="Trust commitments"
    >
      {trustBadges.map((badge) => (
        <li
          key={badge}
          className="inline-flex items-center gap-1.5 rounded-md border border-[var(--hairline)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--muted-ink)]"
        >
          <Check className="h-3.5 w-3.5 text-[var(--gold)]" strokeWidth={2} />
          {badge}
        </li>
      ))}
    </ul>
  );
}
