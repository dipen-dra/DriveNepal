import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Check, ChevronRight, ArrowLeft, Wallet, Smartphone, Banknote, Sparkles, AlertCircle } from "lucide-react";
import { getVehicle, createBooking, type Vehicle, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/booking/$slug")({
  loader: async ({ params }) => {
    const res = await getVehicle(params.slug).catch(() => null);
    if (!res?.data) throw notFound();
    return { vehicle: res.data };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Book ${loaderData.vehicle.name} — DriveNepal` }] : [],
  }),
  component: BookingFlow,
});

const steps = ["Trip", "Details", "Payment", "Confirmed"] as const;

const detailsSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  license: z.string().min(4, "Enter your license number"),
});

function BookingFlow() {
  const { vehicle: v } = Route.useLoaderData() as { vehicle: Vehicle };
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);

  const [pickup, setPickup] = useState("");
  const [ret, setRet] = useState("");
  const [location, setLocation] = useState("Kathmandu (Thamel hub)");

  const [details, setDetails] = useState({
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    license: user?.license ?? "",
  });
  const [detailsErr, setDetailsErr] = useState<Partial<Record<keyof typeof details, string>>>({});

  const [payment, setPayment] = useState<"Khalti" | "eSewa" | "Cash">("Khalti");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const days = (() => {
    if (!pickup || !ret) return 1;
    const ms = +new Date(ret) - +new Date(pickup);
    return Math.max(1, Math.ceil(ms / 86400000));
  })();

  const subtotal = v.pricePerDay * days;
  const service = Math.round(subtotal * 0.05);
  const vat = Math.round(subtotal * 0.13);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + service + vat - discount;

  const { mutate: submitBooking, isPending } = useMutation({
    mutationFn: () =>
      createBooking({
        vehicleSlug: v.slug,
        startDate: pickup || new Date().toISOString().slice(0, 10),
        endDate: ret || new Date().toISOString().slice(0, 10),
        pickup: location,
        payment,
        customerName: details.fullName,
        customerEmail: details.email,
        customerPhone: details.phone,
        license: details.license,
        couponCode: couponApplied ? "DRIVE10" : undefined,
      }),
    onSuccess: (res) => {
      setConfirmedBookingId(res.data.bookingId);
      setStep(3);
    },
    onError: (err) => {
      if (err instanceof ApiError) {
        setApiError(err.message);
      } else {
        setApiError("Booking failed. Please try again.");
      }
    },
  });

  const next = () => {
    setApiError(null);
    if (step === 1) {
      const r = detailsSchema.safeParse({
        fullName: details.fullName,
        email: details.email,
        phone: details.phone,
        license: details.license,
      });
      if (!r.success) {
        const errs: typeof detailsErr = {};
        r.error.issues.forEach((i) => { errs[i.path[0] as keyof typeof details] = i.message; });
        setDetailsErr(errs);
        return;
      }
      setDetailsErr({});
    }
    if (step === 2) {
      // Submit booking on pay button
      submitBooking();
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  return (
    <section className="container-page py-12 md:py-16">
      <Link to="/vehicles/$slug" params={{ slug: v.slug }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to vehicle
      </Link>

      <Stepper step={step} />

      <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="rounded-3xl border border-border/60 bg-card p-7 md:p-10 min-h-[420px]">
          {apiError && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" /> {apiError}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="trip" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl font-bold">Trip details</h2>
                <p className="text-sm text-muted-foreground mt-1">When and where do you want to drive?</p>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <Input label="Pickup date" type="date" value={pickup} onChange={setPickup} />
                  <Input label="Return date" type="date" value={ret} onChange={setRet} />
                  <label className="sm:col-span-2 block">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Pickup location</span>
                    <select value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 w-full h-12 px-3 rounded-xl bg-muted border border-transparent focus:border-primary focus:outline-none text-sm font-medium">
                      <option>Kathmandu (Thamel hub)</option>
                      <option>Pokhara (Lakeside)</option>
                      <option>Tribhuvan Intl Airport</option>
                      <option>Chitwan</option>
                    </select>
                  </label>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl font-bold">Your details</h2>
                <p className="text-sm text-muted-foreground mt-1">For the rental agreement and pickup confirmation.</p>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <Input label="Full name" value={details.fullName} onChange={(val) => setDetails((d) => ({ ...d, fullName: val }))} error={detailsErr.fullName} />
                  <Input label="Email" type="email" value={details.email} onChange={(val) => setDetails((d) => ({ ...d, email: val }))} error={detailsErr.email} />
                  <Input label="Phone" value={details.phone} onChange={(val) => setDetails((d) => ({ ...d, phone: val }))} error={detailsErr.phone} />
                  <Input label="Driving license number" value={details.license} onChange={(val) => setDetails((d) => ({ ...d, license: val }))} error={detailsErr.license} />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl font-bold">Payment</h2>
                <p className="text-sm text-muted-foreground mt-1">Choose how you'd like to pay.</p>
                <div className="mt-8 grid sm:grid-cols-3 gap-3">
                  <PayOption active={payment === "Khalti"} onClick={() => setPayment("Khalti")} icon={<Smartphone className="h-5 w-5" />} title="Khalti" subtitle="Wallet · QR" />
                  <PayOption active={payment === "eSewa"} onClick={() => setPayment("eSewa")} icon={<Wallet className="h-5 w-5" />} title="eSewa" subtitle="Mobile wallet" />
                  <PayOption active={payment === "Cash"} onClick={() => setPayment("Cash")} icon={<Banknote className="h-5 w-5" />} title="Cash" subtitle="On pickup" />
                </div>
                <div className="mt-8 rounded-2xl bg-surface p-5 border border-border/60">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Have a coupon?</p>
                  <div className="mt-2 flex gap-2">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Try DRIVE10"
                      className="flex-1 h-11 px-4 rounded-full bg-background border border-border focus:border-primary focus:outline-none text-sm font-medium"
                    />
                    <button onClick={() => setCouponApplied(coupon === "DRIVE10")} className="h-11 px-5 rounded-full gradient-brand text-white text-sm font-semibold">Apply</button>
                  </div>
                  {couponApplied && <p className="mt-3 text-xs text-primary flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> DRIVE10 applied — 10% off</p>}
                  {coupon && !couponApplied && coupon !== "DRIVE10" && <p className="mt-3 text-xs text-destructive">Coupon not valid.</p>}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto h-20 w-20 rounded-full gradient-brand inline-flex items-center justify-center text-white shadow-[var(--shadow-glow)]"
                >
                  <Check className="h-10 w-10" />
                </motion.div>
                <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold">Booking confirmed!</h2>
                <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                  We've sent the rental details to <strong className="text-ink">{details.email}</strong>. See you at {location} on {pickup || "your pickup date"}.
                </p>
                {confirmedBookingId && (
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 text-sm">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span className="font-mono font-semibold text-ink">{confirmedBookingId}</span>
                  </div>
                )}
                <div className="mt-8 flex gap-3 justify-center">
                  <Link to="/dashboard" className="h-11 px-6 inline-flex items-center rounded-full border border-border text-sm font-medium">My bookings</Link>
                  <button onClick={() => navigate({ to: "/cars" })} className="h-11 px-6 inline-flex items-center rounded-full gradient-brand text-white text-sm font-semibold">Browse more vehicles</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 3 && (
            <div className="mt-10 flex items-center justify-between pt-6 border-t border-border">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0 || isPending} className="h-11 px-5 rounded-full border border-border text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors">Back</button>
              <button
                onClick={next}
                disabled={isPending}
                className="h-12 px-7 inline-flex items-center rounded-full gradient-brand text-white text-sm font-semibold shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:translate-y-0"
              >
                {isPending ? (
                  <span className="flex items-center gap-2"><span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Processing…</span>
                ) : (
                  <>{step === 2 ? `Pay NPR ${total.toLocaleString()}` : "Continue"} <ChevronRight className="ml-1 h-4 w-4" /></>
                )}
              </button>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 self-start rounded-3xl border border-border/60 bg-card p-6 h-fit">
          <div className="flex gap-4">
            <img src={v.image} alt={v.name} className="h-20 w-28 rounded-xl object-cover" />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{v.brand}</p>
              <p className="font-display font-semibold text-ink truncate">{v.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{v.category}</p>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <Row k={`NPR ${v.pricePerDay.toLocaleString()} × ${days} day${days > 1 ? "s" : ""}`} v={`NPR ${subtotal.toLocaleString()}`} />
            <Row k="Service fee" v={`NPR ${service.toLocaleString()}`} />
            <Row k="VAT (13%)" v={`NPR ${vat.toLocaleString()}`} />
            {couponApplied && <Row k="Discount (DRIVE10)" v={`− NPR ${discount.toLocaleString()}`} accent />}
            <div className="pt-3 border-t border-border flex items-baseline justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl font-bold text-ink">NPR {total.toLocaleString()}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 md:gap-4 max-w-3xl mx-auto">
      {steps.map((s, i) => (
        <div key={s} className="flex-1 flex items-center gap-2 md:gap-4">
          <div className={`flex items-center gap-2 ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`h-9 w-9 rounded-full inline-flex items-center justify-center text-xs font-semibold ${i < step ? "gradient-brand text-white" : i === step ? "bg-primary/10 text-primary border-2 border-primary" : "bg-muted"}`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className="hidden md:inline text-sm font-medium">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-0.5 rounded-full bg-muted relative overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0 gradient-brand" animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Input({ label, type = "text", value, onChange, error }: { label: string; type?: string; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={`mt-1 w-full h-12 px-4 rounded-xl bg-muted border-2 focus:outline-none text-sm font-medium ${error ? "border-destructive" : "border-transparent focus:border-primary"}`} />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function PayOption({ active, onClick, icon, title, subtitle }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <button onClick={onClick} className={`relative text-left rounded-2xl border-2 p-5 transition-all ${active ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]" : "border-border bg-surface hover:border-primary/40"}`}>
      <div className={`h-10 w-10 rounded-full inline-flex items-center justify-center ${active ? "gradient-brand text-white" : "bg-muted text-foreground"}`}>{icon}</div>
      <p className="mt-3 font-semibold text-ink">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      {active && <span className="absolute top-3 right-3 h-5 w-5 rounded-full gradient-brand inline-flex items-center justify-center text-white"><Check className="h-3 w-3" /></span>}
    </button>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={`font-medium ${accent ? "text-primary" : "text-ink"}`}>{v}</span>
    </div>
  );
}
