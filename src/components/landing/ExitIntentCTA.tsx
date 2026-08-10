import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const STORAGE_KEY = "zarklo-exit-intent-dismissed";

export function ExitIntentCTA() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY)) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    const onScroll = () => {
      const scrolled =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled > 0.55) show();
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.localStorage.setItem(STORAGE_KEY, "1");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div
        role="dialog"
        aria-labelledby="exit-intent-title"
        className="w-full max-w-md rounded-xl border border-[var(--hairline)] bg-[var(--card)] p-6 shadow-[var(--shadow-elevated)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="zk-kicker mb-2">Before you go</div>
            <h2 id="exit-intent-title" className="zk-h3">
              Get a free ranking report — no call required.
            </h2>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="grid h-9 w-9 place-items-center rounded-lg text-[var(--muted-ink)] hover:bg-[var(--brand-soft)]"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-sm text-[var(--muted-ink)]">
          Check how you show up for a local search, or see a growth estimate for your
          salon, clinic, or lab.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <a href="#ranking-tool" className="zk-btn-primary" onClick={dismiss}>
            Get your free ranking report
          </a>
          <a href="#growth-calculator" className="zk-btn-secondary" onClick={dismiss}>
            See a free growth estimate
          </a>
        </div>
        <Link
          to="/dashboard"
          className="mt-3 block text-center text-xs text-[var(--gold)] hover:underline"
          onClick={dismiss}
        >
          Or open the Success Demo
        </Link>
      </div>
    </div>
  );
}
