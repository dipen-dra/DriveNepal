import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Calendar, Car, Heart, Settings, MapPin, Clock, CheckCircle2, XCircle, CreditCard, User, LogOut, ChevronRight } from "lucide-react";
import { bookings as allBookings, currentUser, savedVehicleSlugs, type BookingStatus } from "@/lib/mock-bookings";
import { vehicles } from "@/lib/mock-data";
import { VehicleCard } from "@/components/VehicleCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — DriveNepal" }] }),
  component: DashboardPage,
});

const tabs = [
  { id: "overview", label: "Overview", icon: Car },
  { id: "bookings", label: "My Bookings", icon: Calendar },
  { id: "saved", label: "Saved", icon: Heart },
  { id: "profile", label: "Profile", icon: User },
] as const;

const statusStyle: Record<BookingStatus, string> = {
  upcoming: "bg-primary/10 text-primary",
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

function DashboardPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const stats = useMemo(() => {
    const total = allBookings.length;
    const active = allBookings.filter((b) => b.status === "active").length;
    const upcoming = allBookings.filter((b) => b.status === "upcoming").length;
    const spend = allBookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + b.total, 0);
    return { total, active, upcoming, spend };
  }, []);
  const saved = vehicles.filter((v) => savedVehicleSlugs.includes(v.slug));

  return (
    <div className="min-h-screen bg-surface/50">
      <div className="container-page py-10">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
          <img src={currentUser.avatar} alt="" className="h-16 w-16 rounded-full ring-4 ring-background shadow-card object-cover" />
          <div>
            <h1 className="font-display text-3xl font-bold text-ink">Welcome back, {currentUser.name.split(" ")[0]}</h1>
            <p className="text-sm text-muted-foreground">Manage your bookings, saved rides, and account.</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl border border-border bg-card p-2 shadow-soft">
              {tabs.map((t) => {
                const active = tab === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      active ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]" : "text-foreground/70 hover:bg-muted",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {t.label}
                  </button>
                );
              })}
              <Link to="/login" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/60 hover:bg-muted">
                <LogOut className="h-4 w-4" /> Logout
              </Link>
            </div>
          </aside>

          <section>
            {tab === "overview" && <OverviewTab stats={stats} bookings={allBookings} />}
            {tab === "bookings" && <BookingsTab />}
            {tab === "saved" && (
              <div>
                <h2 className="font-display text-2xl font-bold text-ink mb-6">Saved vehicles</h2>
                {saved.length === 0 ? (
                  <EmptyState icon={Heart} title="No saved vehicles yet" desc="Tap the heart on any vehicle to save it here." />
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {saved.map((vh, i) => <VehicleCard key={vh.id} v={vh} index={i} />)}
                  </div>
                )}
              </div>
            )}
            {tab === "profile" && <ProfileTab />}
          </section>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ stats, bookings }: { stats: { total: number; active: number; upcoming: number; spend: number }; bookings: typeof allBookings }) {
  const recent = bookings.slice(0, 3);
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total bookings" value={stats.total} icon={Car} />
        <StatCard label="Active now" value={stats.active} icon={Clock} accent />
        <StatCard label="Upcoming" value={stats.upcoming} icon={Calendar} />
        <StatCard label="Lifetime spend" value={`NPR ${stats.spend.toLocaleString()}`} icon={CreditCard} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-ink">Recent bookings</h2>
          <Link to="/cars" className="text-sm text-primary font-medium inline-flex items-center gap-1">Book again <ChevronRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="space-y-3">
          {recent.map((b) => <BookingRow key={b.id} b={b} />)}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, accent }: { label: string; value: string | number; icon: React.ComponentType<{ className?: string }>; accent?: boolean }) {
  return (
    <motion.div whileHover={{ y: -2 }} className={cn("rounded-2xl border border-border p-5 shadow-soft", accent ? "gradient-brand text-white border-transparent" : "bg-card")}>
      <div className="flex items-center justify-between">
        <span className={cn("text-xs uppercase tracking-wider", accent ? "text-white/80" : "text-muted-foreground")}>{label}</span>
        <Icon className={cn("h-4 w-4", accent ? "text-white" : "text-primary")} />
      </div>
      <div className={cn("mt-3 font-display text-2xl font-bold", accent ? "text-white" : "text-ink")}>{value}</div>
    </motion.div>
  );
}

function BookingsTab() {
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const filtered = filter === "all" ? allBookings : allBookings.filter((b) => b.status === filter);
  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: "All" }, { id: "upcoming", label: "Upcoming" }, { id: "active", label: "Active" }, { id: "completed", label: "Completed" }, { id: "cancelled", label: "Cancelled" },
  ];
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-ink mb-4">My bookings</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={cn("h-9 px-4 rounded-full text-sm font-medium transition-colors", filter === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70 hover:bg-muted/70")}>{f.label}</button>
        ))}
      </div>
      {filtered.length === 0 ? <EmptyState icon={Calendar} title="No bookings here" desc="Try another filter or book a new ride." /> : (
        <div className="space-y-3">{filtered.map((b) => <BookingRow key={b.id} b={b} />)}</div>
      )}
    </div>
  );
}

function BookingRow({ b }: { b: (typeof allBookings)[number] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-card transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={b.vehicleImage} alt="" className="h-24 w-full md:w-36 rounded-xl object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">{b.id}</div>
              <Link to="/vehicles/$slug" params={{ slug: b.vehicleSlug }} className="font-display text-lg font-semibold text-ink hover:text-primary truncate block">{b.vehicleName}</Link>
            </div>
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize whitespace-nowrap", statusStyle[b.status])}>{b.status}</span>
          </div>
          <div className="mt-2 grid sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{b.startDate} → {b.endDate}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{b.pickup}</span>
            <span className="inline-flex items-center gap-1.5"><CreditCard className="h-3.5 w-3.5" />{b.payment}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm"><span className="text-muted-foreground">Total</span> <span className="font-semibold text-ink">NPR {b.total.toLocaleString()}</span> <span className="text-xs text-muted-foreground">· {b.days}d</span></div>
            <div className="flex gap-2">
              {b.status === "upcoming" && <button className="h-8 px-3 rounded-full text-xs border border-border hover:bg-muted">Cancel</button>}
              {b.status === "completed" && <button className="h-8 px-3 rounded-full text-xs border border-border hover:bg-muted">Rate</button>}
              <Link to="/vehicles/$slug" params={{ slug: b.vehicleSlug }} className="h-8 px-3 inline-flex items-center rounded-full text-xs gradient-brand text-white">View</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileTab() {
  const fields = [
    { label: "Full name", value: currentUser.name },
    { label: "Email", value: currentUser.email },
    { label: "Phone", value: currentUser.phone },
    { label: "License #", value: currentUser.license },
    { label: "City", value: currentUser.city },
    { label: "Member since", value: currentUser.joined },
  ];
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-ink mb-6">Profile</h2>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <img src={currentUser.avatar} alt="" className="h-20 w-20 rounded-full object-cover" />
          <div>
            <div className="font-display text-xl font-semibold text-ink">{currentUser.name}</div>
            <div className="text-sm text-muted-foreground">{currentUser.email}</div>
          </div>
          <button className="ml-auto h-10 px-5 rounded-full text-sm font-medium gradient-brand text-white">Edit</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 pt-6">
          {fields.map((f) => (
            <div key={f.label}>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</div>
              <div className="mt-1 text-sm font-medium text-ink">{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft mt-6">
        <h3 className="font-display text-lg font-semibold text-ink flex items-center gap-2"><Settings className="h-4 w-4" /> Preferences</h3>
        <div className="mt-4 space-y-3 text-sm">
          <PrefRow label="Email notifications" enabled />
          <PrefRow label="SMS updates" enabled />
          <PrefRow label="Marketing emails" />
        </div>
      </div>
    </div>
  );
}

function PrefRow({ label, enabled }: { label: string; enabled?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-foreground/80">{label}</span>
      {enabled ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-muted-foreground/50" />}
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
      <Icon className="h-10 w-10 mx-auto text-muted-foreground/60" />
      <div className="mt-3 font-display text-lg font-semibold text-ink">{title}</div>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}
