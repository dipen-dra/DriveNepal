import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar, Car, Heart, Settings, MapPin, Clock, CheckCircle2,
  XCircle, CreditCard, User, LogOut, ChevronRight, Edit2, Save, X, Lock,
} from "lucide-react";
import {
  getMyBookings, cancelBooking, updateProfile, changePassword,
  type Booking, type BookingStatus,
} from "@/lib/api";
import { requireAuth } from "@/lib/guards";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — DriveNepal" }] }),
  beforeLoad: requireAuth,
  component: DashboardPage,
});

const tabs = [
  { id: "overview", label: "Overview", icon: Car },
  { id: "bookings", label: "My Bookings", icon: Calendar },
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
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
    queryKey: ["myBookings"],
    queryFn: () => getMyBookings(),
    enabled: !!user,
  });

  const bookings = bookingsData?.data ?? [];
  const stats = {
    total: bookings.length,
    active: bookings.filter((b) => b.status === "active").length,
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    spend: bookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + b.total, 0),
  };

  const handleLogout = async () => {
    await logout();
    void navigate({ to: "/" });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-ink">Please log in to view your dashboard.</p>
          <Link to="/login" className="mt-4 inline-flex h-11 px-6 items-center rounded-full gradient-brand text-white text-sm">Login</Link>
        </div>
      </div>
    );
  }

  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-surface/50">
      <div className="container-page py-10">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full gradient-brand text-white font-bold text-xl inline-flex items-center justify-center ring-4 ring-background shadow-card">
            {user.avatar ? <img src={user.avatar} alt="" className="h-full w-full rounded-full object-cover" /> : initials}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-ink">Welcome back, {user.name.split(" ")[0]}</h1>
            <p className="text-sm text-muted-foreground">Manage your bookings and account.</p>
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
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/60 hover:bg-muted hover:text-destructive transition-all"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </aside>

          <section>
            {tab === "overview" && (
              <OverviewTab stats={stats} bookings={bookings} loading={bookingsLoading} />
            )}
            {tab === "bookings" && <BookingsTab bookings={bookings} loading={bookingsLoading} />}
            {tab === "profile" && <ProfileTab user={user} setUser={setUser} />}
          </section>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({
  stats, bookings, loading,
}: { stats: { total: number; active: number; upcoming: number; spend: number }; bookings: Booking[]; loading: boolean }) {
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
        {loading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <SkeletonCard key={i} />)}</div>
        ) : recent.length === 0 ? (
          <EmptyState icon={Car} title="No bookings yet" desc="Browse our fleet and book your first ride." />
        ) : (
          <div className="space-y-3">{recent.map((b) => <BookingRow key={b._id} b={b} />)}</div>
        )}
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

function BookingsTab({ bookings, loading }: { bookings: Booking[]; loading: boolean }) {
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
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
      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <SkeletonCard key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Calendar} title="No bookings here" desc="Try another filter or book a new ride." />
      ) : (
        <div className="space-y-3">{filtered.map((b) => <BookingRow key={b._id} b={b} />)}</div>
      )}
    </div>
  );
}

function BookingRow({ b }: { b: Booking }) {
  const queryClient = useQueryClient();
  const { mutate: cancel, isPending } = useMutation({
    mutationFn: () => cancelBooking(b._id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myBookings"] }),
  });

  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-card transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={b.vehicleImage} alt="" className="h-24 w-full md:w-36 rounded-xl object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">{b.bookingId}</div>
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
              {b.status === "upcoming" && (
                <button
                  onClick={() => cancel()}
                  disabled={isPending}
                  className="h-8 px-3 rounded-full text-xs border border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors disabled:opacity-50"
                >
                  {isPending ? "Cancelling…" : "Cancel"}
                </button>
              )}
              <Link to="/vehicles/$slug" params={{ slug: b.vehicleSlug }} className="h-8 px-3 inline-flex items-center rounded-full text-xs gradient-brand text-white">View</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileTab({
  user, setUser,
}: { user: NonNullable<ReturnType<typeof useAuth>["user"]>; setUser: (u: NonNullable<ReturnType<typeof useAuth>["user"]> | null) => void }) {
  const [editing, setEditing] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone ?? "", license: user.license ?? "", city: user.city ?? "" });
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [pwMsg, setPwMsg] = useState<string | null>(null);

  const { mutate: saveProfile, isPending: saving } = useMutation({
    mutationFn: () => updateProfile(form),
    onSuccess: (res) => {
      setUser({ ...user, ...res.data });
      setEditing(false);
      setSaveMsg("Profile updated!");
      setTimeout(() => setSaveMsg(null), 3000);
    },
  });

  const { mutate: savePw, isPending: savingPw } = useMutation({
    mutationFn: () => changePassword(pwForm.currentPassword, pwForm.newPassword),
    onSuccess: () => {
      setChangingPw(false);
      setPwMsg("Password changed successfully.");
      setPwForm({ currentPassword: "", newPassword: "" });
      setTimeout(() => setPwMsg(null), 3000);
    },
    onError: (err: Error) => setPwMsg(err.message),
  });

  const fields = [
    { label: "Full name", key: "name" as const },
    { label: "Email", key: "email" as const },
    { label: "Phone", key: "phone" as const },
    { label: "License #", key: "license" as const },
    { label: "City", key: "city" as const },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-ink mb-6">Profile</h2>

      {saveMsg && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> {saveMsg}
        </motion.div>
      )}

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <div className="h-20 w-20 rounded-full gradient-brand text-white font-bold text-2xl inline-flex items-center justify-center">
            {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
          </div>
          <div>
            <div className="font-display text-xl font-semibold text-ink">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <div className="text-xs text-muted-foreground mt-0.5 capitalize">{user.role} · Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "N/A"}</div>
          </div>
          <button onClick={() => setEditing((s) => !s)} className="ml-auto h-10 px-5 rounded-full text-sm font-medium gradient-brand text-white flex items-center gap-2">
            {editing ? <><X className="h-3.5 w-3.5" /> Cancel</> : <><Edit2 className="h-3.5 w-3.5" /> Edit</>}
          </button>
        </div>

        {editing ? (
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 pt-6">
            {fields.map((f) => (
              <label key={f.key} className="block">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</span>
                <input
                  value={form[f.key]}
                  onChange={(e) => setForm((d) => ({ ...d, [f.key]: e.target.value }))}
                  className="mt-1 w-full h-11 px-4 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm"
                />
              </label>
            ))}
            <div className="sm:col-span-2 flex justify-end">
              <button onClick={() => saveProfile()} disabled={saving} className="h-10 px-6 rounded-full gradient-brand text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60">
                <Save className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 pt-6">
            {fields.map((f) => (
              <div key={f.label}>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</div>
                <div className="mt-1 text-sm font-medium text-ink">{form[f.key] || "—"}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink flex items-center gap-2"><Lock className="h-4 w-4" /> Security</h3>
          <button onClick={() => setChangingPw((s) => !s)} className="text-sm text-primary font-medium">{changingPw ? "Cancel" : "Change password"}</button>
        </div>
        {pwMsg && <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">{pwMsg}</p>}
        {changingPw && (
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Current password</span>
              <input type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm((d) => ({ ...d, currentPassword: e.target.value }))} className="mt-1 w-full h-11 px-4 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">New password</span>
              <input type="password" value={pwForm.newPassword} onChange={(e) => setPwForm((d) => ({ ...d, newPassword: e.target.value }))} className="mt-1 w-full h-11 px-4 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm" />
            </label>
            <div className="sm:col-span-2 flex justify-end">
              <button onClick={() => savePw()} disabled={savingPw} className="h-10 px-6 rounded-full gradient-brand text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60">
                {savingPw ? "Saving…" : "Update password"}
              </button>
            </div>
          </div>
        )}
        {!changingPw && (
          <div className="mt-4 space-y-3 text-sm">
            <PrefRow label="Email notifications" enabled />
            <PrefRow label="SMS updates" enabled />
            <PrefRow label="Marketing emails" />
          </div>
        )}
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

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 animate-pulse">
      <div className="flex gap-4">
        <div className="h-24 w-36 rounded-xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-muted rounded" />
          <div className="h-5 w-1/2 bg-muted rounded" />
          <div className="h-3 w-2/3 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
