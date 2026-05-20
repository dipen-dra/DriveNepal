import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { BarChart3, Car, Users, Calendar, TrendingUp, Search, Plus, MoreHorizontal, ArrowUpRight, DollarSign, Activity, Shield } from "lucide-react";
import { bookings as allBookings, adminUsers, type BookingStatus } from "@/lib/mock-bookings";
import { vehicles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — DriveNepal" }] }),
  component: AdminPage,
});

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "vehicles", label: "Vehicles", icon: Car },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "users", label: "Users", icon: Users },
] as const;

const statusStyle: Record<BookingStatus, string> = {
  upcoming: "bg-primary/10 text-primary",
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

function AdminPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("overview");

  const stats = useMemo(() => {
    const revenue = allBookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + b.total, 0);
    const active = allBookings.filter((b) => b.status === "active").length;
    return {
      revenue, active,
      bookings: allBookings.length,
      vehicles: vehicles.length,
      users: adminUsers.length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface/50">
      <div className="container-page py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-white shadow-[var(--shadow-glow)]"><Shield className="h-5 w-5" /></span>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">Admin Console</h1>
              <p className="text-xs text-muted-foreground">Manage fleet, bookings, and customers</p>
            </div>
          </div>
          <Link to="/" className="hidden md:inline-flex h-10 px-4 items-center rounded-full text-sm border border-border hover:bg-muted">View site</Link>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative px-4 py-3 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors",
                  active ? "text-primary" : "text-foreground/60 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label}
                {active && <motion.span layoutId="admin-tab" className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary" />}
              </button>
            );
          })}
        </div>

        {tab === "overview" && <Overview stats={stats} />}
        {tab === "vehicles" && <VehiclesTab />}
        {tab === "bookings" && <BookingsTab />}
        {tab === "users" && <UsersTab />}
      </div>
    </div>
  );
}

function Overview({ stats }: { stats: { revenue: number; active: number; bookings: number; vehicles: number; users: number } }) {
  const kpis = [
    { label: "Revenue (NPR)", value: stats.revenue.toLocaleString(), delta: "+18.4%", icon: DollarSign, accent: true },
    { label: "Active rentals", value: stats.active, delta: "+2", icon: Activity },
    { label: "Total bookings", value: stats.bookings, delta: "+12.1%", icon: Calendar },
    { label: "Fleet size", value: stats.vehicles, delta: "+3", icon: Car },
  ];
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <motion.div key={k.label} whileHover={{ y: -2 }} className={cn("rounded-2xl border p-5 shadow-soft", k.accent ? "gradient-brand text-white border-transparent" : "bg-card border-border")}>
            <div className="flex items-center justify-between">
              <span className={cn("text-xs uppercase tracking-wider", k.accent ? "text-white/80" : "text-muted-foreground")}>{k.label}</span>
              <k.icon className={cn("h-4 w-4", k.accent ? "text-white" : "text-primary")} />
            </div>
            <div className={cn("mt-3 font-display text-2xl font-bold", k.accent ? "text-white" : "text-ink")}>{k.value}</div>
            <div className={cn("mt-1 text-xs inline-flex items-center gap-1", k.accent ? "text-white/90" : "text-emerald-600 dark:text-emerald-400")}>
              <TrendingUp className="h-3 w-3" /> {k.delta}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-ink">Revenue · last 7 days</h3>
            <span className="text-xs text-muted-foreground">NPR</span>
          </div>
          <SparkBars data={[42, 58, 51, 70, 64, 88, 96]} />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-lg font-semibold text-ink mb-4">Top vehicles</h3>
          <ul className="space-y-3">
            {vehicles.slice(0, 5).map((v, i) => (
              <li key={v.id} className="flex items-center gap-3">
                <span className="w-5 text-xs text-muted-foreground">{i + 1}</span>
                <img src={v.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-ink truncate">{v.name}</div>
                  <div className="text-xs text-muted-foreground">{v.reviews} bookings</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="p-6 pb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Recent bookings</h3>
          <Link to="/admin" className="text-xs text-primary font-medium">View all</Link>
        </div>
        <BookingTable rows={allBookings.slice(0, 5)} />
      </div>
    </div>
  );
}

function SparkBars({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="flex items-end gap-3 h-44">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(v / max) * 100}%` }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
            className="w-full rounded-t-lg gradient-brand shadow-[var(--shadow-glow)]"
          />
          <span className="text-[10px] text-muted-foreground">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function VehiclesTab() {
  const [q, setQ] = useState("");
  const filtered = vehicles.filter((v) => v.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-5">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search vehicles…" className="w-full h-10 pl-10 pr-4 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <button className="h-10 px-5 inline-flex items-center gap-2 rounded-full gradient-brand text-white text-sm font-medium shadow-[var(--shadow-glow)]"><Plus className="h-4 w-4" /> Add vehicle</button>
      </div>
      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground bg-muted/40">
            <tr>
              <th className="px-5 py-3">Vehicle</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Price / day</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={v.image} alt="" className="h-10 w-14 rounded-md object-cover" />
                    <div>
                      <div className="font-medium text-ink">{v.name}</div>
                      <div className="text-xs text-muted-foreground">{v.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 capitalize">{v.type} · {v.category}</td>
                <td className="px-5 py-3 font-medium text-ink">NPR {v.pricePerDay.toLocaleString()}</td>
                <td className="px-5 py-3">{v.location}</td>
                <td className="px-5 py-3">{v.rating} ★ <span className="text-xs text-muted-foreground">({v.reviews})</span></td>
                <td className="px-5 py-3 text-right"><button className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-muted"><MoreHorizontal className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingsTab() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      <BookingTable rows={allBookings} />
    </div>
  );
}

function BookingTable({ rows }: { rows: typeof allBookings }) {
  return (
    <table className="w-full text-sm">
      <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground bg-muted/40">
        <tr>
          <th className="px-5 py-3">Booking</th>
          <th className="px-5 py-3">Customer</th>
          <th className="px-5 py-3">Vehicle</th>
          <th className="px-5 py-3">Dates</th>
          <th className="px-5 py-3">Total</th>
          <th className="px-5 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((b) => (
          <tr key={b.id} className="border-t border-border hover:bg-muted/30 transition-colors">
            <td className="px-5 py-3 font-medium text-ink">{b.id}</td>
            <td className="px-5 py-3">
              <div className="text-ink">{b.customer}</div>
              <div className="text-xs text-muted-foreground">{b.customerEmail}</div>
            </td>
            <td className="px-5 py-3">{b.vehicleName}</td>
            <td className="px-5 py-3 text-xs text-muted-foreground">{b.startDate} → {b.endDate}</td>
            <td className="px-5 py-3 font-medium text-ink">NPR {b.total.toLocaleString()}</td>
            <td className="px-5 py-3">
              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize", statusStyle[b.status])}>{b.status}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UsersTab() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      <table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground bg-muted/40">
          <tr>
            <th className="px-5 py-3">User</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Bookings</th>
            <th className="px-5 py-3">Joined</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map((u) => (
            <tr key={u.id} className="border-t border-border hover:bg-muted/30 transition-colors">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-full gradient-brand text-white inline-flex items-center justify-center text-xs font-semibold">{u.name.split(" ").map((n) => n[0]).join("")}</span>
                  <div className="font-medium text-ink">{u.name}</div>
                </div>
              </td>
              <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
              <td className="px-5 py-3">{u.bookings}</td>
              <td className="px-5 py-3 text-xs text-muted-foreground">{u.joined}</td>
              <td className="px-5 py-3">
                <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize", u.status === "active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-destructive/10 text-destructive")}>{u.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
