import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  RefreshCw,
  Download,
  Trash2,
  Users,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  type CRMDemoRecord,
  type CRMStage,
  type CRMVertical,
  crmStages,
  crmVerticals,
  generateCRMRecords,
  getSourceChartData,
  getStageChartData,
  getTrendChartData,
} from "@/lib/crm-demo";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "CRM", icon: Users },
  { label: "Bookings", icon: Calendar },
  { label: "Conversations", icon: MessageSquare },
  { label: "Analytics", icon: BarChart3 },
] as const;

export default function SuccessDemoDashboard() {
  const [activeNav, setActiveNav] = useState("CRM");
  const [vertical, setVertical] = useState<CRMVertical>("Salon & Spa");
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [leads, setLeads] = useState<CRMDemoRecord[]>(() => {
    const stored = window.localStorage.getItem("zarklo-success-demo-records");
    if (stored) {
      try {
        const records = JSON.parse(stored) as CRMDemoRecord[];
        if (
          Array.isArray(records) &&
          records.length > 0 &&
          records.every((record) => record.vertical && record.createdAt)
        ) {
          return records;
        }
      } catch {
        window.localStorage.removeItem("zarklo-success-demo-records");
      }
    }
    return generateCRMRecords();
  });
  const [newLead, setNewLead] = useState({
    name: "",
    source: "Website",
    stage: "New" as CRMStage,
  });

  useEffect(() => {
    document.title = "Success Demo — Zarklo CRM";
  }, []);

  useEffect(() => {
    window.localStorage.setItem("zarklo-success-demo-records", JSON.stringify(leads));
  }, [leads]);

  const verticalLeads = useMemo(
    () => leads.filter((lead) => lead.vertical === vertical),
    [leads, vertical],
  );

  const visibleLeads = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return verticalLeads;
    return verticalLeads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(normalized) ||
        lead.source.toLowerCase().includes(normalized) ||
        lead.stage.toLowerCase().includes(normalized),
    );
  }, [query, verticalLeads]);

  const stageChartData = useMemo(
    () => getStageChartData(verticalLeads),
    [verticalLeads],
  );
  const sourceChartData = useMemo(
    () => getSourceChartData(verticalLeads),
    [verticalLeads],
  );
  const trendChartData = useMemo(
    () => getTrendChartData(verticalLeads),
    [verticalLeads],
  );

  const addLead = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newLead.name.trim()) return;

    setLeads((current) => [
      {
        id: String(Date.now()),
        name: newLead.name.trim(),
        source: newLead.source.trim() || "Website",
        score: 60,
        stage: newLead.stage,
        value: "$—",
        vertical,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
    setNewLead({ name: "", source: "Website", stage: "New" });
    setShowAddLead(false);
  };

  const updateStage = (id: string, stage: CRMStage) => {
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, stage } : lead)),
    );
  };

  const deleteLead = (id: string) => {
    setLeads((current) => current.filter((lead) => lead.id !== id));
  };

  const regenerateData = () => {
    setLeads(generateCRMRecords());
    setQuery("");
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Source", "Score", "Stage", "Value", "Vertical", "Created"],
      ...verticalLeads.map((lead) => [
        lead.name,
        lead.source,
        String(lead.score),
        lead.stage,
        lead.value,
        lead.vertical,
        lead.createdAt,
      ]),
    ];
    const csv = rows
      .map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `zarklo-${vertical.toLowerCase().replaceAll(" ", "-")}-crm.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dark min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--hairline)] bg-[#08040f] transition-transform lg:static lg:translate-x-0 ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-[var(--hairline)] px-5">
            <Link to="/" className="flex items-center gap-2.5 font-display text-xl">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--primary)] text-sm font-semibold text-white shadow-glow">
                Z
              </span>
              Zarklo
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center text-[var(--muted-ink)] lg:hidden"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 pt-5">
            <div className="rounded-lg border border-[var(--hairline)] bg-[var(--brand-soft)] p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--accent-cyan)]">
                <Sparkles className="h-3.5 w-3.5" />
                Interactive sample workspace
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-ink)]">
                Sample changes are saved locally in this browser.
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.label);
                    setMobileNavOpen(false);
                  }}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm transition ${
                    active
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--muted-ink)] hover:bg-[var(--brand-soft)] hover:text-[var(--heading)]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-[var(--hairline)] p-4">
            <Link
              to="/"
              className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm text-[var(--muted-ink)] hover:bg-[var(--brand-soft)] hover:text-[var(--heading)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to website
            </Link>
          </div>
        </aside>

        {mobileNavOpen && (
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[var(--hairline)] bg-[rgba(8,4,15,0.9)] px-4 backdrop-blur-xl lg:px-7">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg text-[var(--muted-ink)] hover:bg-[var(--brand-soft)] lg:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative hidden max-w-md flex-1 sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-ink)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search records, sources, or stages…"
                className="h-10 w-full rounded-lg border border-[var(--hairline)] bg-[var(--card)] pl-9 pr-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-ink)] focus:border-[var(--gold)]"
              />
            </div>

            <label className="relative ml-auto">
              <span className="sr-only">Select vertical</span>
              <select
                value={vertical}
                onChange={(event) =>
                  setVertical(event.target.value as CRMVertical)
                }
                className="h-10 appearance-none rounded-lg border border-[var(--hairline)] bg-[var(--card)] pl-3 pr-9 text-xs text-[var(--heading)] outline-none focus:border-[var(--gold)]"
              >
                {crmVerticals.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--muted-ink)]" />
            </label>

            <button
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-lg text-[var(--muted-ink)] hover:bg-[var(--brand-soft)]"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            </button>
          </header>

          <main className="p-4 lg:p-7">
            <div className="mx-auto max-w-[1500px]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="zk-kicker">{vertical} workspace</div>
                  <h1 className="mt-2 font-display text-3xl text-[var(--heading)] sm:text-4xl">
                    {activeNav === "CRM" ? "CRM relationships" : activeNav}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-[var(--muted-ink)]">
                    {activeNav === "CRM"
                      ? "Search records, add inquiries, and move people through the pipeline."
                      : "This demo keeps the CRM active while showing how the wider Zarklo workspace is organized."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={regenerateData}
                    className="zk-btn-secondary !px-3"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Random data
                  </button>
                  <button
                    type="button"
                    onClick={exportCSV}
                    className="zk-btn-secondary !px-3"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddLead(true)}
                    className="zk-btn-primary shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                    Add inquiry
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  { label: "Total records", value: verticalLeads.length },
                  { label: "New inquiries", value: verticalLeads.filter((lead) => lead.stage === "New").length },
                  { label: "Follow-up ready", value: verticalLeads.filter((lead) => lead.stage === "Warm" || lead.stage === "Hot").length },
                  { label: "Booked", value: verticalLeads.filter((lead) => lead.stage === "Booked").length },
                ].map((stat) => (
                  <div key={stat.label} className="zk-card p-4 sm:p-5">
                    <div className="text-xs uppercase tracking-[0.06em] text-[var(--muted-ink)]">
                      {stat.label}
                    </div>
                    <div className="mt-2 font-display text-3xl text-[var(--heading)]">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <section className="zk-card p-5 lg:col-span-2">
                  <div className="mb-4">
                    <h2 className="text-sm font-semibold text-[var(--heading)]">
                      Inquiry trend
                    </h2>
                    <p className="mt-1 text-xs text-[var(--muted-ink)]">
                      Generated CRM records from the last six months
                    </p>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendChartData}>
                        <defs>
                          <linearGradient id="crmTrend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.45} />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          vertical={false}
                          stroke="rgba(196,181,253,0.1)"
                          strokeDasharray="4 4"
                        />
                        <XAxis
                          dataKey="label"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#AAA0BD", fontSize: 11 }}
                        />
                        <YAxis
                          allowDecimals={false}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#AAA0BD", fontSize: 11 }}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "#160B27",
                            border: "1px solid rgba(196,181,253,0.16)",
                            borderRadius: 8,
                            color: "#EEE9F8",
                            fontSize: 12,
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="inquiries"
                          stroke="#A78BFA"
                          strokeWidth={2.5}
                          fill="url(#crmTrend)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                <section className="zk-card p-5">
                  <div className="mb-4">
                    <h2 className="text-sm font-semibold text-[var(--heading)]">
                      Pipeline by stage
                    </h2>
                    <p className="mt-1 text-xs text-[var(--muted-ink)]">
                      Current {vertical} records
                    </p>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stageChartData}>
                        <CartesianGrid
                          vertical={false}
                          stroke="rgba(196,181,253,0.1)"
                          strokeDasharray="4 4"
                        />
                        <XAxis
                          dataKey="stage"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#AAA0BD", fontSize: 10 }}
                        />
                        <YAxis hide allowDecimals={false} />
                        <Tooltip
                          cursor={{ fill: "rgba(139,92,246,0.08)" }}
                          contentStyle={{
                            background: "#160B27",
                            border: "1px solid rgba(196,181,253,0.16)",
                            borderRadius: 8,
                            color: "#EEE9F8",
                            fontSize: 12,
                          }}
                        />
                        <Bar dataKey="records" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </section>
              </div>

              <section className="zk-card mt-4 p-5">
                <div className="mb-4">
                  <h2 className="text-sm font-semibold text-[var(--heading)]">
                    Inquiry sources
                  </h2>
                  <p className="mt-1 text-xs text-[var(--muted-ink)]">
                    Where current sample records originated
                  </p>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sourceChartData} layout="vertical">
                      <CartesianGrid
                        horizontal={false}
                        stroke="rgba(196,181,253,0.1)"
                        strokeDasharray="4 4"
                      />
                      <XAxis
                        type="number"
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#AAA0BD", fontSize: 11 }}
                      />
                      <YAxis
                        type="category"
                        dataKey="source"
                        width={75}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#AAA0BD", fontSize: 11 }}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(139,92,246,0.08)" }}
                        contentStyle={{
                          background: "#160B27",
                          border: "1px solid rgba(196,181,253,0.16)",
                          borderRadius: 8,
                          color: "#EEE9F8",
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="records" fill="#C4B5FD" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <div className="mt-6 sm:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-ink)]" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search CRM…"
                    className="h-11 w-full rounded-lg border border-[var(--hairline)] bg-[var(--card)] pl-9 pr-3 text-sm outline-none focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              {showAddLead && (
                <form
                  onSubmit={addLead}
                  className="mt-6 grid gap-3 rounded-xl border border-[var(--gold)] bg-[var(--card)] p-4 shadow-[var(--shadow-elevated)] sm:grid-cols-[1fr_0.7fr_0.5fr_auto]"
                >
                  <input
                    autoFocus
                    value={newLead.name}
                    onChange={(event) =>
                      setNewLead((current) => ({ ...current, name: event.target.value }))
                    }
                    placeholder="Client or patient name"
                    className="h-11 rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--gold)]"
                  />
                  <input
                    value={newLead.source}
                    onChange={(event) =>
                      setNewLead((current) => ({ ...current, source: event.target.value }))
                    }
                    placeholder="Source"
                    className="h-11 rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--gold)]"
                  />
                  <select
                    value={newLead.stage}
                    onChange={(event) =>
                      setNewLead((current) => ({
                        ...current,
                        stage: event.target.value as CRMStage,
                      }))
                    }
                    className="h-11 rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--gold)]"
                  >
                    {crmStages.map((stage) => (
                      <option key={stage}>{stage}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button type="submit" className="zk-btn-primary !px-4">
                      <Check className="h-4 w-4" />
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddLead(false)}
                      className="zk-btn-secondary !px-3"
                      aria-label="Cancel adding inquiry"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 grid gap-4 xl:grid-cols-4">
                {crmStages.map((stage) => {
                  const stageLeads = visibleLeads.filter((lead) => lead.stage === stage);
                  return (
                    <section
                      key={stage}
                      className="min-h-[260px] rounded-xl border border-[var(--hairline)] bg-[#0d0617] p-3"
                    >
                      <div className="mb-3 flex items-center justify-between px-1">
                        <h2 className="text-sm font-semibold text-[var(--heading)]">{stage}</h2>
                        <span className="grid h-6 min-w-6 place-items-center rounded-md bg-[var(--brand-soft)] px-1.5 text-xs text-[var(--accent-cyan)]">
                          {stageLeads.length}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {stageLeads.map((lead) => (
                          <article
                            key={lead.id}
                            className="rounded-lg border border-[var(--hairline)] bg-[var(--card)] p-4 shadow-card"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-sm font-medium text-[var(--heading)]">
                                  {lead.name}
                                </h3>
                                <p className="mt-1 text-xs text-[var(--muted-ink)]">
                                  {lead.source} · {lead.value}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="rounded-md bg-[var(--brand-soft)] px-2 py-1 text-[10px] font-medium text-[var(--accent-cyan)]">
                                  {lead.score}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => deleteLead(lead.id)}
                                  className="grid h-7 w-7 place-items-center rounded-md text-[var(--muted-ink)] hover:bg-red-500/10 hover:text-red-300"
                                  aria-label={`Delete ${lead.name}`}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                            <label className="mt-4 block">
                              <span className="sr-only">Move {lead.name} to stage</span>
                              <select
                                value={lead.stage}
                                onChange={(event) =>
                                  updateStage(lead.id, event.target.value as CRMStage)
                                }
                                className="h-9 w-full rounded-md border border-[var(--hairline)] bg-[var(--background)] px-2 text-xs text-[var(--muted-ink)] outline-none focus:border-[var(--gold)]"
                              >
                                {crmStages.map((option) => (
                                  <option key={option}>{option}</option>
                                ))}
                              </select>
                            </label>
                          </article>
                        ))}

                        {stageLeads.length === 0 && (
                          <div className="rounded-lg border border-dashed border-[var(--hairline)] p-5 text-center text-xs text-[var(--muted-ink)]">
                            No matching records
                          </div>
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>

              <div className="mt-5 rounded-lg border border-[var(--hairline)] bg-[var(--card)] p-4 text-xs leading-relaxed text-[var(--muted-ink)]">
                Demo data is illustrative. Production CRM configuration, integrations,
                permissions, consent, and compliance controls depend on your plan and
                workflow requirements.
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
