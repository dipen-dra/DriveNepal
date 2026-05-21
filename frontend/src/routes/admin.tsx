import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BarChart3, Car, Users, Calendar, TrendingUp, Search, Plus,
  MoreHorizontal, ArrowUpRight, DollarSign, Activity, Shield,
  Trash2, Edit2, CheckCircle, XCircle, X, Save,
} from "lucide-react";
import {
  getAdminStats, getAllBookings, getAllUsers, getVehicles,
  updateBookingStatus, deleteBooking, updateUserStatus, deleteUser,
  createVehicle, updateVehicle, deleteVehicle,
  type Booking, type BookingStatus, type UserProfile, type Vehicle,
} from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
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
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h1 className="font-display text-2xl font-bold text-ink">Admin access required</h1>
          <p className="mt-2 text-muted-foreground">You don't have permission to view this page.</p>
          <Link to="/" className="mt-4 inline-flex h-11 px-6 items-center rounded-full gradient-brand text-white text-sm">Go home</Link>
        </div>
      </div>
    );
  }

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

        {tab === "overview" && <OverviewTab />}
        {tab === "vehicles" && <VehiclesTab />}
        {tab === "bookings" && <BookingsTab />}
        {tab === "users" && <UsersTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
    refetchInterval: 30000,
  });
  const { data: bookingsData } = useQuery({ queryKey: ["adminBookings"], queryFn: getAllBookings });
  const { data: vehiclesData } = useQuery({ queryKey: ["vehicles", "all"], queryFn: () => getVehicles({}) });

  const stats = statsData?.data;
  const recentBookings = (bookingsData?.data ?? []).slice(0, 5);
  const topVehicles = (vehiclesData?.data ?? []).slice(0, 5);

  if (isLoading) return <div className="animate-pulse space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-24 rounded-2xl bg-muted" />)}</div>;

  const kpis = [
    { label: "Revenue (NPR)", value: (stats?.revenue ?? 0).toLocaleString(), icon: DollarSign, accent: true },
    { label: "Active rentals", value: stats?.activeBookings ?? 0, icon: Activity },
    { label: "Total bookings", value: stats?.totalBookings ?? 0, icon: Calendar },
    { label: "Fleet size", value: stats?.totalVehicles ?? 0, icon: Car },
  ];

  // Build spark bar data from dailyRevenue or fallback
  const sparkData = stats?.dailyRevenue?.length
    ? stats.dailyRevenue.map((d) => d.revenue)
    : [42, 58, 51, 70, 64, 88, 96];

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
              <TrendingUp className="h-3 w-3" /> Live
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
          <SparkBars data={sparkData} />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-lg font-semibold text-ink mb-4">Top vehicles</h3>
          <ul className="space-y-3">
            {topVehicles.map((v, i) => (
              <li key={v._id} className="flex items-center gap-3">
                <span className="w-5 text-xs text-muted-foreground">{i + 1}</span>
                <img src={v.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-ink truncate">{v.name}</div>
                  <div className="text-xs text-muted-foreground">{v.reviews} reviews</div>
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
        </div>
        <BookingTable rows={recentBookings} />
      </div>
    </div>
  );
}

function SparkBars({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
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
          <span className="text-[10px] text-muted-foreground">{days[i % 7]}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Vehicles Tab ────────────────────────────────────────── */
function VehiclesTab() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);

  const { data, isLoading } = useQuery({ queryKey: ["vehicles", "all"], queryFn: () => getVehicles({}) });
  const vehicles = (data?.data ?? []).filter((v) => v.name.toLowerCase().includes(q.toLowerCase()));

  const { mutate: doDelete } = useMutation({
    mutationFn: (id: string) => deleteVehicle(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicles"] }),
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-5">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search vehicles…" className="w-full h-10 pl-10 pr-4 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <button onClick={() => { setEditVehicle(null); setShowModal(true); }} className="h-10 px-5 inline-flex items-center gap-2 rounded-full gradient-brand text-white text-sm font-medium shadow-[var(--shadow-glow)]">
          <Plus className="h-4 w-4" /> Add vehicle
        </button>
      </div>

      {showModal && (
        <VehicleModal
          vehicle={editVehicle}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); queryClient.invalidateQueries({ queryKey: ["vehicles"] }); }}
        />
      )}

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading vehicles…</div>
        ) : (
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
              {vehicles.map((v) => (
                <tr key={v._id} className="border-t border-border hover:bg-muted/30 transition-colors">
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
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setEditVehicle(v); setShowModal(true); }} className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-muted"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button onClick={() => { if (confirm("Delete this vehicle?")) doDelete(v._id); }} className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function VehicleModal({ vehicle, onClose, onSaved }: { vehicle: Vehicle | null; onClose: () => void; onSaved: () => void }) {
  const isEdit = !!vehicle;
  const [form, setForm] = useState({
    slug: vehicle?.slug ?? "",
    name: vehicle?.name ?? "",
    brand: vehicle?.brand ?? "",
    type: vehicle?.type ?? "car",
    category: vehicle?.category ?? "",
    pricePerDay: vehicle?.pricePerDay ?? 0,
    fuel: vehicle?.fuel ?? "Petrol",
    transmission: vehicle?.transmission ?? "Automatic",
    seats: vehicle?.seats ?? 5,
    location: vehicle?.location ?? "Kathmandu",
    description: vehicle?.description ?? "",
    image: vehicle?.image ?? "",
    features: vehicle?.features?.join(", ") ?? "",
    isAvailable: vehicle?.isAvailable ?? true,
  });
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const payload = {
        ...form,
        pricePerDay: Number(form.pricePerDay),
        seats: Number(form.seats),
        features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
        gallery: [form.image],
      };
      return isEdit ? updateVehicle(vehicle!._id, payload) : createVehicle(payload);
    },
    onSuccess: onSaved,
    onError: (err: Error) => setError(err.message),
  });

  const F = ({ label, k, type = "text" }: { label: string; k: keyof typeof form; type?: string }) => (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        value={String(form[k])}
        onChange={(e) => setForm((d) => ({ ...d, [k]: e.target.value }))}
        className="mt-1 w-full h-10 px-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm"
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-ink">{isEdit ? "Edit vehicle" : "Add vehicle"}</h2>
          <button onClick={onClose} className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>
        {error && <p className="mb-4 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-xl">{error}</p>}
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="Slug" k="slug" />
          <F label="Name" k="name" />
          <F label="Brand" k="brand" />
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Type</span>
            <select value={form.type} onChange={(e) => setForm((d) => ({ ...d, type: e.target.value as "car" | "bike" }))} className="mt-1 w-full h-10 px-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm">
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
          </label>
          <F label="Category" k="category" />
          <F label="Price per day (NPR)" k="pricePerDay" type="number" />
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Fuel</span>
            <select value={form.fuel} onChange={(e) => setForm((d) => ({ ...d, fuel: e.target.value as Vehicle["fuel"] }))} className="mt-1 w-full h-10 px-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm">
              {["Petrol", "Diesel", "Electric", "Hybrid"].map((f) => <option key={f}>{f}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Transmission</span>
            <select value={form.transmission} onChange={(e) => setForm((d) => ({ ...d, transmission: e.target.value as Vehicle["transmission"] }))} className="mt-1 w-full h-10 px-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm">
              <option>Automatic</option>
              <option>Manual</option>
            </select>
          </label>
          <F label="Seats" k="seats" type="number" />
          <F label="Location" k="location" />
          <div className="sm:col-span-2"><F label="Image URL" k="image" /></div>
          <div className="sm:col-span-2"><F label="Features (comma-separated)" k="features" /></div>
          <div className="sm:col-span-2">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Description</span>
              <textarea value={form.description} onChange={(e) => setForm((d) => ({ ...d, description: e.target.value }))} rows={3} className="mt-1 w-full px-3 py-2 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm resize-none" />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="h-10 px-5 rounded-full border border-border text-sm font-medium hover:bg-muted">Cancel</button>
          <button onClick={() => mutate()} disabled={isPending} className="h-10 px-5 rounded-full gradient-brand text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60">
            <Save className="h-3.5 w-3.5" /> {isPending ? "Saving…" : "Save"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Bookings Tab ────────────────────────────────────────── */
function BookingsTab() {
  const { data, isLoading } = useQuery({ queryKey: ["adminBookings"], queryFn: getAllBookings });
  const bookings = data?.data ?? [];
  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      {isLoading ? <div className="p-8 text-center text-muted-foreground">Loading…</div> : <BookingTable rows={bookings} showActions />}
    </div>
  );
}

function BookingTable({ rows, showActions }: { rows: Booking[]; showActions?: boolean }) {
  const queryClient = useQueryClient();
  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) => updateBookingStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminBookings"] }),
  });
  const { mutate: doDelete } = useMutation({
    mutationFn: (id: string) => deleteBooking(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminBookings"] }),
  });

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
          {showActions && <th className="px-5 py-3" />}
        </tr>
      </thead>
      <tbody>
        {rows.map((b) => (
          <tr key={b._id} className="border-t border-border hover:bg-muted/30 transition-colors">
            <td className="px-5 py-3 font-medium text-ink">{b.bookingId}</td>
            <td className="px-5 py-3">
              <div className="text-ink">{b.customerName}</div>
              <div className="text-xs text-muted-foreground">{b.customerEmail}</div>
            </td>
            <td className="px-5 py-3">{b.vehicleName}</td>
            <td className="px-5 py-3 text-xs text-muted-foreground">{b.startDate} → {b.endDate}</td>
            <td className="px-5 py-3 font-medium text-ink">NPR {b.total.toLocaleString()}</td>
            <td className="px-5 py-3">
              {showActions ? (
                <select
                  value={b.status}
                  onChange={(e) => updateStatus({ id: b._id, status: e.target.value as BookingStatus })}
                  className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize border-0 focus:outline-none cursor-pointer", statusStyle[b.status])}
                >
                  {(["upcoming", "active", "completed", "cancelled"] as BookingStatus[]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ) : (
                <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize", statusStyle[b.status])}>{b.status}</span>
              )}
            </td>
            {showActions && (
              <td className="px-5 py-3 text-right">
                <button onClick={() => { if (confirm("Delete booking?")) doDelete(b._id); }} className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-destructive/10 text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ─── Users Tab ───────────────────────────────────────────── */
function UsersTab() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["adminUsers"], queryFn: getAllUsers });
  const users = data?.data ?? [];

  const { mutate: toggleStatus } = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => updateUserStatus(id, isActive),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminUsers"] }),
  });
  const { mutate: doDelete } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminUsers"] }),
  });

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Loading…</div>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground bg-muted/40">
            <tr>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Bookings</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((u: UserProfile) => (
              <tr key={u._id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-full gradient-brand text-white inline-flex items-center justify-center text-xs font-semibold">
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <div className="font-medium text-ink">{u.name}</div>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-5 py-3">{u.bookingsCount ?? 0}</td>
                <td className="px-5 py-3 capitalize">
                  <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", u.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-muted-foreground">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</td>
                <td className="px-5 py-3">
                  <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize", u.isActive !== false ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-destructive/10 text-destructive")}>
                    {u.isActive !== false ? "Active" : "Suspended"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => toggleStatus({ id: u._id, isActive: u.isActive === false })}
                      className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-muted"
                      title={u.isActive !== false ? "Suspend" : "Activate"}
                    >
                      {u.isActive !== false ? <XCircle className="h-3.5 w-3.5 text-destructive" /> : <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />}
                    </button>
                    <button onClick={() => { if (confirm("Delete user?")) doDelete(u._id); }} className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-destructive/10 text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
