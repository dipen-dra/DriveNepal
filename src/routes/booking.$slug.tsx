import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  Check, ChevronRight, ArrowLeft, Wallet, Smartphone, Banknote, Sparkles,
  Shield, ShieldCheck, ShieldPlus, Baby, Navigation, HardHat, UserPlus, MapPin, Calendar, Clock, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getVehicle, createBooking, ApiError, type Vehicle } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/booking/$slug")({
  loader: async ({ params }) => {
    try {
      const res = await getVehicle(params.slug);
      return { vehicle: res.data };
    } catch (err) {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Book ${loaderData.vehicle.name} — DriveNepal` }] : [],
  }),
  component: BookingFlow,
});

const steps = ["Vehicle", "Pickup & Return", "Summary", "Payment", "Confirmed"] as const;

const insurances = [
  { id: "basic", name: "Basic Cover", price: 0, desc: "Third-party liability included", icon: Shield },
  { id: "plus", name: "Plus Protection", price: 450, desc: "Covers minor damage & theft", icon: ShieldCheck },
  { id: "max", name: "Max Shield", price: 850, desc: "Zero deductible, full coverage", icon: ShieldPlus },
] as const;

const addons = [
  { id: "driver", name: "Professional driver", price: 1800, desc: "Local, English-speaking driver", icon: UserPlus },
  { id: "gps", name: "GPS navigator", price: 200, desc: "Offline Nepal maps", icon: Navigation },
  { id: "child", name: "Child seat", price: 250, desc: "0–4 years, certified", icon: Baby },
  { id: "helmet", name: "Extra helmet", price: 100, desc: "Premium full-face", icon: HardHat },
] as const;

const locations = [
  "Kathmandu — Thamel hub",
  "Kathmandu — Tribhuvan Intl Airport",
  "Pokhara — Lakeside",
  "Pokhara — Airport",
  "Chitwan — Sauraha",
  "Biratnagar — City center",
];

const detailsSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  license: z.string().min(4, "Enter your license number"),
});

type AddonId = (typeof addons)[number]["id"];
type InsuranceId = (typeof insurances)[number]["id"];

function BookingFlow() {
  const { vehicle: v } = Route.useLoaderData();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 0 — Vehicle / extras
  const [insurance, setInsurance] = useState<InsuranceId>("plus");
  const [selectedAddons, setSelectedAddons] = useState<Set<AddonId>>(new Set());

  // Step 1 — Pickup & return
  const today = new Date().toISOString().split("T")[0];
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("10:00");
  const [pickupLoc, setPickupLoc] = useState(locations[0]);
  const [returnLoc, setReturnLoc] = useState(locations[0]);
  const [sameLoc, setSameLoc] = useState(true);

  // Step 2 — contact (collected on summary)
  const [details, setDetails] = useState({ fullName: "", email: "", phone: "", license: "" });
  const [detailsErr, setDetailsErr] = useState<Partial<Record<keyof typeof details, string>>>({});
  const [agree, setAgree] = useState(false);

  // Step 3 — payment
  const [payment, setPayment] = useState<"Khalti" | "eSewa" | "Cash">("Cash");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Step 4 — confirmation
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Pricing
  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const ms = +new Date(returnDate) - +new Date(pickupDate);
    return Math.max(1, Math.ceil(ms / 86400000));
  }, [pickupDate, returnDate]);

  const insurancePrice = insurances.find((i) => i.id === insurance)!.price;
  const addonsPrice = addons.filter((a) => selectedAddons.has(a.id)).reduce((s, a) => s + a.price, 0);
  const dropOffFee = !sameLoc && pickupLoc !== returnLoc ? 800 : 0;

  const subtotal = v.pricePerDay * days + (insurancePrice + addonsPrice) * days;
  const service = Math.round(subtotal * 0.05);
  const vat = Math.round((subtotal + dropOffFee) * 0.13);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + service + vat + dropOffFee - discount;

  const datesValid = pickupDate && returnDate && new Date(returnDate) >= new Date(pickupDate);

  const toggleAddon = (id: AddonId) =>
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const next = async () => {
    if (step === 1 && !datesValid) return;
    if (step === 2) {
      const r = detailsSchema.safeParse(details);
      if (!r.success) {
        const errs: typeof detailsErr = {};
        r.error.issues.forEach((i) => { errs[i.path[0] as keyof typeof details] = i.message; });
        setDetailsErr(errs);
        return;
      }
      if (!agree) return;
      setDetailsErr({});
    }
    if (step === 3) {
      if (payment === "Khalti" || payment === "eSewa") {
        // Prepare for frontend payment integration (will receive code from user in next chat)
        toast.info(`${payment} integration is coming in the next step! Please select Cash for now.`);
        return;
      }

      // COD / Cash Flow
      try {
        setIsSubmitting(true);
        const res = await createBooking({
          vehicleSlug: v.slug,
          startDate: `${pickupDate}T${pickupTime}:00`,
          endDate: `${returnDate}T${returnTime}:00`,
          pickup: pickupLoc,
          dropoff: returnLoc,
          payment: payment,
          customerName: details.fullName,
          customerEmail: details.email,
          customerPhone: details.phone,
          license: details.license,
          couponCode: couponApplied ? coupon : undefined,
        });
        setBookingId(res.data._id); // Assuming _id is returned.
        setStep(4);
      } catch (err: any) {
        if (err instanceof ApiError) {
          toast.error(err.message);
        } else {
          toast.error("An unexpected error occurred while booking.");
        }
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const canContinue =
    step === 1 ? Boolean(datesValid) :
    step === 2 ? agree :
    true;

  return (
    <section className="container-page py-12 md:py-16">
      <Link to="/vehicles/$slug" params={{ slug: v.slug }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to vehicle
      </Link>

      <Stepper step={step} />

      <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="rounded-3xl border border-border/60 bg-card p-7 md:p-10 min-h-[460px]">
          <AnimatePresence mode="wait">
            {/* Step 0 — Vehicle & extras */}
            {step === 0 && (
              <motion.div key="vehicle" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl font-bold">Your vehicle & extras</h2>
                <p className="text-sm text-muted-foreground mt-1">Confirm the ride and tailor your trip.</p>

                <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-5 flex gap-4">
                  <img src={v.image} alt={v.name} className="h-24 w-32 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{v.brand}</p>
                    <p className="font-display text-lg font-semibold text-ink">{v.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{v.category} · {v.transmission ?? "Auto"} · {v.seats ?? 5} seats</p>
                    <p className="mt-2 font-semibold text-primary">NPR {v.pricePerDay.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">/ day</span></p>
                  </div>
                </div>

                <h3 className="mt-8 font-display text-lg font-semibold">Insurance</h3>
                <div className="mt-3 grid sm:grid-cols-3 gap-3">
                  {insurances.map((opt) => {
                    const Icon = opt.icon;
                    const active = insurance === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setInsurance(opt.id)}
                        className={cn(
                          "relative text-left rounded-2xl border-2 p-4 transition-all",
                          active ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]" : "border-border bg-surface hover:border-primary/40",
                        )}
                      >
                        <div className={cn("h-10 w-10 rounded-full inline-flex items-center justify-center", active ? "gradient-brand text-white" : "bg-muted")}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="mt-3 font-semibold text-ink">{opt.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                        <p className="mt-2 text-xs font-semibold text-primary">
                          {opt.price === 0 ? "Included" : `+ NPR ${opt.price.toLocaleString()}/day`}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <h3 className="mt-8 font-display text-lg font-semibold">Add-ons</h3>
                <div className="mt-3 grid sm:grid-cols-2 gap-3">
                  {addons.map((a) => {
                    const Icon = a.icon;
                    const active = selectedAddons.has(a.id);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => toggleAddon(a.id)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all",
                          active ? "border-primary bg-primary/5" : "border-border bg-surface hover:border-primary/40",
                        )}
                      >
                        <div className={cn("h-10 w-10 rounded-lg inline-flex items-center justify-center", active ? "gradient-brand text-white" : "bg-muted")}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-ink">{a.name}</p>
                          <p className="text-xs text-muted-foreground">{a.desc}</p>
                        </div>
                        <span className="text-xs font-semibold text-primary whitespace-nowrap">+ NPR {a.price}/day</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 1 — Pickup & return */}
            {step === 1 && (
              <motion.div key="pickup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl font-bold">Pickup & return</h2>
                <p className="text-sm text-muted-foreground mt-1">When and where do you want the keys?</p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <Input label="Pickup date" type="date" min={today} value={pickupDate} onChange={setPickupDate} icon={<Calendar className="h-4 w-4" />} />
                  <Input label="Pickup time" type="time" value={pickupTime} onChange={setPickupTime} icon={<Clock className="h-4 w-4" />} />
                  <Input label="Return date" type="date" min={pickupDate || today} value={returnDate} onChange={setReturnDate} icon={<Calendar className="h-4 w-4" />} />
                  <Input label="Return time" type="time" value={returnTime} onChange={setReturnTime} icon={<Clock className="h-4 w-4" />} />
                </div>

                {pickupDate && returnDate && !datesValid && (
                  <p className="mt-3 text-xs text-destructive">Return date must be on or after pickup date.</p>
                )}

                <div className="mt-8 space-y-4">
                  <Select label="Pickup location" value={pickupLoc} onChange={(val) => { setPickupLoc(val); if (sameLoc) setReturnLoc(val); }} options={locations} icon={<MapPin className="h-4 w-4" />} />

                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={sameLoc} onChange={(e) => { setSameLoc(e.target.checked); if (e.target.checked) setReturnLoc(pickupLoc); }} className="h-4 w-4 accent-primary" />
                    Return to the same location
                  </label>

                  {!sameLoc && (
                    <Select label="Return location" value={returnLoc} onChange={setReturnLoc} options={locations} icon={<MapPin className="h-4 w-4" />} />
                  )}
                  {!sameLoc && pickupLoc !== returnLoc && (
                    <p className="text-xs text-muted-foreground">One-way drop-off fee of NPR 800 applies.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2 — Summary + contact */}
            {step === 2 && (
              <motion.div key="summary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl font-bold">Review your booking</h2>
                <p className="text-sm text-muted-foreground mt-1">Make sure everything looks right before payment.</p>

                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <SummaryCard title="Pickup" lines={[pickupLoc, `${pickupDate || "—"} · ${pickupTime}`]} />
                  <SummaryCard title="Return" lines={[returnLoc, `${returnDate || "—"} · ${returnTime}`]} />
                  <SummaryCard title="Insurance" lines={[insurances.find((i) => i.id === insurance)!.name]} />
                  <SummaryCard
                    title="Add-ons"
                    lines={
                      selectedAddons.size === 0
                        ? ["None"]
                        : addons.filter((a) => selectedAddons.has(a.id)).map((a) => a.name)
                    }
                  />
                </div>

                <h3 className="mt-8 font-display text-lg font-semibold">Your details</h3>
                <p className="text-xs text-muted-foreground mt-0.5">For the rental agreement and pickup confirmation.</p>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <Input label="Full name" value={details.fullName} onChange={(val) => setDetails((d) => ({ ...d, fullName: val }))} error={detailsErr.fullName} />
                  <Input label="Email" type="email" value={details.email} onChange={(val) => setDetails((d) => ({ ...d, email: val }))} error={detailsErr.email} />
                  <Input label="Phone" value={details.phone} onChange={(val) => setDetails((d) => ({ ...d, phone: val }))} error={detailsErr.phone} />
                  <Input label="Driving license number" value={details.license} onChange={(val) => setDetails((d) => ({ ...d, license: val }))} error={detailsErr.license} />
                </div>

                <label className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-primary shrink-0" />
                  I agree to DriveNepal's <span className="text-primary font-medium">rental terms</span> and confirm that the driver will hold a valid license at pickup.
                </label>
                {!agree && step === 2 && (
                  <p className="mt-1 ml-6 text-xs text-muted-foreground/70">Please accept the terms to continue.</p>
                )}
              </motion.div>
            )}

            {/* Step 3 — Payment */}
            {step === 3 && (
              <motion.div key="pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-2xl font-bold">Choose payment method</h2>
                <p className="text-sm text-muted-foreground mt-1">Secure checkout. Cancel free up to 24h before pickup.</p>
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
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
                    <button
                      type="button"
                      onClick={() => setCouponApplied(coupon === "DRIVE10")}
                      className="h-11 px-5 rounded-full gradient-brand text-white text-sm font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="mt-3 text-xs text-primary flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> DRIVE10 applied — 10% off</p>
                  )}
                  {coupon && !couponApplied && coupon !== "DRIVE10" && (
                    <p className="mt-3 text-xs text-destructive">Coupon not valid.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4 — Confirmed */}
            {step === 4 && (
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
                  We've sent the rental details to <strong className="text-ink">{details.email || "your email"}</strong>. See you at {pickupLoc} on {pickupDate || "your pickup date"} at {pickupTime}.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 text-sm">
                  <span className="text-muted-foreground">Booking ID</span>
                  <span className="font-mono font-semibold text-ink">{bookingId?.slice(-6).toUpperCase()}</span>
                </div>
                <div className="mt-8 flex gap-3 justify-center flex-wrap">
                  <Link to="/dashboard" className="h-11 px-6 inline-flex items-center rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">My bookings</Link>
                  <button onClick={() => navigate({ to: "/cars" })} className="h-11 px-6 inline-flex items-center rounded-full gradient-brand text-white text-sm font-semibold hover:-translate-y-0.5 transition-transform">
                    Browse more vehicles
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 4 && (
            <div className="mt-10 flex items-center justify-between pt-6 border-t border-border">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0 || isSubmitting}
                className="h-11 px-5 rounded-full border border-border text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => { void next(); }}
                disabled={!canContinue || isSubmitting}
                className="h-12 px-7 inline-flex items-center rounded-full gradient-brand text-white text-sm font-semibold shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                ) : (
                  <>{step === 3 ? `Pay NPR ${total.toLocaleString()}` : "Continue"} <ChevronRight className="ml-1 h-4 w-4" /></>
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
              <p className="text-xs text-muted-foreground mt-1">{days} day{days > 1 ? "s" : ""}</p>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <Row k={`NPR ${v.pricePerDay.toLocaleString()} × ${days} day${days > 1 ? "s" : ""}`} v={`NPR ${(v.pricePerDay * days).toLocaleString()}`} />
            {insurancePrice > 0 && (
              <Row k={`Insurance × ${days}`} v={`NPR ${(insurancePrice * days).toLocaleString()}`} />
            )}
            {addonsPrice > 0 && (
              <Row k={`Add-ons × ${days}`} v={`NPR ${(addonsPrice * days).toLocaleString()}`} />
            )}
            {dropOffFee > 0 && <Row k="One-way drop-off" v={`NPR ${dropOffFee.toLocaleString()}`} />}
            <Row k="Service fee" v={`NPR ${service.toLocaleString()}`} />
            <Row k="VAT (13%)" v={`NPR ${vat.toLocaleString()}`} />
            {couponApplied && <Row k="Discount (DRIVE10)" v={`− NPR ${discount.toLocaleString()}`} accent />}
            <div className="pt-3 border-t border-border flex items-baseline justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl font-bold text-ink">NPR {total.toLocaleString()}</span>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
            Free cancellation up to 24h before pickup. Fuel policy: like-for-like.
          </p>
        </aside>
      </div>
    </section>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 md:gap-3 max-w-4xl mx-auto overflow-x-auto">
      {steps.map((s, i) => (
        <div key={s} className="flex-1 flex items-center gap-2 md:gap-3 min-w-fit">
          <div className={`flex items-center gap-2 ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`h-9 w-9 shrink-0 rounded-full inline-flex items-center justify-center text-xs font-semibold ${i < step ? "gradient-brand text-white" : i === step ? "bg-primary/10 text-primary border-2 border-primary" : "bg-muted"}`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className="hidden md:inline text-sm font-medium whitespace-nowrap">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-0.5 rounded-full bg-muted relative overflow-hidden min-w-6">
              <motion.div className="absolute inset-y-0 left-0 gradient-brand" animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Input({
  label, type = "text", value, onChange, error, icon, min,
}: { label: string; type?: string; value: string; onChange: (v: string) => void; error?: string; icon?: React.ReactNode; min?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className={cn(
        "mt-1 flex items-center gap-2 h-12 px-4 rounded-xl bg-muted border-2 transition-colors",
        error ? "border-destructive" : "border-transparent focus-within:border-primary focus-within:bg-background",
      )}>
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <input
          type={type} value={value} onChange={(e) => onChange(e.target.value)} min={min}
          className="w-full bg-transparent text-sm font-medium focus:outline-none"
        />
      </span>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Select({
  label, value, onChange, options, icon,
}: { label: string; value: string; onChange: (v: string) => void; options: readonly string[]; icon?: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="mt-1 flex items-center gap-2 h-12 px-4 rounded-xl bg-muted border-2 border-transparent focus-within:border-primary focus-within:bg-background transition-colors">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-sm font-medium focus:outline-none">
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      </span>
    </label>
  );
}

function SummaryCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
      <div className="mt-1.5 space-y-0.5">
        {lines.map((l, i) => (
          <p key={i} className="text-sm font-medium text-ink">{l}</p>
        ))}
      </div>
    </div>
  );
}

function PayOption({ active, onClick, icon, title, subtitle }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative text-left rounded-2xl border-2 p-5 transition-all",
        active ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]" : "border-border bg-surface hover:border-primary/40",
      )}
    >
      <div className={cn("h-10 w-10 rounded-full inline-flex items-center justify-center", active ? "gradient-brand text-white" : "bg-muted text-foreground")}>{icon}</div>
      <p className="mt-3 font-semibold text-ink">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      {active && (
        <span className="absolute top-3 right-3 h-5 w-5 rounded-full gradient-brand inline-flex items-center justify-center text-white">
          <Check className="h-3 w-3" />
        </span>
      )}
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
