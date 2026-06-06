import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as Route$9, I as useAuth, h as cn, v as initiateEsewaPayment, i as createBooking, A as ApiError, K as verifyKhaltiPayment } from "./router-Dp1bmQ9H.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/react-oauth__google.mjs";
import { ac as Shield, ae as ShieldCheck, af as ShieldPlus, aq as UserPlus, a0 as Navigation, B as Baby, N as HardHat, a as ArrowLeft, C as Calendar, v as Clock, Y as MapPin, e as Banknote, ah as Sparkles, m as Check, T as LoaderCircle, p as ChevronRight } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const khaltiLogo = "/assets/khalti-DX8ryYUk.png";
const esewaLogo = "/assets/esewa-icon-large-DRQ0Zapf.webp";
const steps = ["Vehicle", "Pickup & Return", "Summary", "Payment", "Confirmed"];
const insurances = [{
  id: "basic",
  name: "Basic Cover",
  price: 0,
  desc: "Third-party liability included",
  icon: Shield
}, {
  id: "plus",
  name: "Plus Protection",
  price: 450,
  desc: "Covers minor damage & theft",
  icon: ShieldCheck
}, {
  id: "max",
  name: "Max Shield",
  price: 850,
  desc: "Zero deductible, full coverage",
  icon: ShieldPlus
}];
const addons = [{
  id: "driver",
  name: "Professional driver",
  price: 1800,
  desc: "Local, English-speaking driver",
  icon: UserPlus
}, {
  id: "gps",
  name: "GPS navigator",
  price: 200,
  desc: "Offline Nepal maps",
  icon: Navigation
}, {
  id: "child",
  name: "Child seat",
  price: 250,
  desc: "0–4 years, certified",
  icon: Baby
}, {
  id: "helmet",
  name: "Extra helmet",
  price: 100,
  desc: "Premium full-face",
  icon: HardHat
}];
const locations = ["Kathmandu — Thamel hub", "Kathmandu — Tribhuvan Intl Airport", "Pokhara — Lakeside", "Pokhara — Airport", "Chitwan — Sauraha", "Biratnagar — City center"];
const detailsSchema = objectType({
  fullName: stringType().min(2, "Enter your full name"),
  email: stringType().email("Enter a valid email"),
  phone: stringType().min(7, "Enter a valid phone"),
  license: stringType().min(4, "Enter your license number")
});
function BookingFlow() {
  const {
    vehicle: v
  } = Route$9.useLoaderData();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const search = Route$9.useSearch();
  const STORAGE_KEY = `booking_draft_${v._id}`;
  const getInit = (key, fallback, fromSearch) => {
    if (fromSearch) return fromSearch;
    if (typeof window === "undefined") return fallback;
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[key] !== void 0) {
          if (key === "selectedAddons") return new Set(parsed[key]);
          return parsed[key];
        }
      } catch {
      }
    }
    return fallback;
  };
  const [step, setStep] = reactExports.useState(() => getInit("step", 0));
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [insurance, setInsurance] = reactExports.useState(() => getInit("insurance", "plus"));
  const [selectedAddons, setSelectedAddons] = reactExports.useState(() => getInit("selectedAddons", /* @__PURE__ */ new Set()));
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const [pickupDate, setPickupDate] = reactExports.useState(() => getInit("pickupDate", "", search.pickupDate));
  const [pickupTime, setPickupTime] = reactExports.useState(() => getInit("pickupTime", "10:00"));
  const [returnDate, setReturnDate] = reactExports.useState(() => getInit("returnDate", "", search.returnDate));
  const [returnTime, setReturnTime] = reactExports.useState(() => getInit("returnTime", "10:00"));
  const [pickupLoc, setPickupLoc] = reactExports.useState(() => getInit("pickupLoc", locations[0], search.pickupLocation));
  const [returnLoc, setReturnLoc] = reactExports.useState(() => getInit("returnLoc", locations[0], search.pickupLocation));
  const [sameLoc, setSameLoc] = reactExports.useState(() => getInit("sameLoc", true));
  const [details, setDetails] = reactExports.useState(() => getInit("details", {
    fullName: "",
    email: "",
    phone: "",
    license: ""
  }));
  const [detailsErr, setDetailsErr] = reactExports.useState({});
  const [agree, setAgree] = reactExports.useState(() => getInit("agree", false));
  const [payment, setPayment] = reactExports.useState(() => getInit("payment", "Cash"));
  const [coupon, setCoupon] = reactExports.useState("");
  const [couponApplied, setCouponApplied] = reactExports.useState(false);
  const [bookingId, setBookingId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (user) {
      setDetails((prev) => ({
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
        license: prev.license || user.license || ""
      }));
    }
  }, [user]);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      const scriptId = "khalti-checkout-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iff.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);
  reactExports.useEffect(() => {
    if (step === 4) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    const stateToSave = {
      step,
      insurance,
      selectedAddons: Array.from(selectedAddons),
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      pickupLoc,
      returnLoc,
      sameLoc,
      details,
      agree,
      payment
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [step, insurance, selectedAddons, pickupDate, pickupTime, returnDate, returnTime, pickupLoc, returnLoc, sameLoc, details, agree, payment, STORAGE_KEY]);
  const days = reactExports.useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const ms = +new Date(returnDate) - +new Date(pickupDate);
    return Math.max(1, Math.ceil(ms / 864e5));
  }, [pickupDate, returnDate]);
  const insurancePrice = insurances.find((i) => i.id === insurance).price;
  const addonsPrice = addons.filter((a) => selectedAddons.has(a.id)).reduce((s, a) => s + a.price, 0);
  const dropOffFee = !sameLoc && pickupLoc !== returnLoc ? 800 : 0;
  const subtotal = v.pricePerDay * days + (insurancePrice + addonsPrice) * days;
  const service = Math.round(subtotal * 0.05);
  const vat = Math.round((subtotal + dropOffFee) * 0.13);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + service + vat + dropOffFee - discount;
  const datesValid = pickupDate && returnDate && new Date(returnDate) >= new Date(pickupDate);
  const toggleAddon = (id) => setSelectedAddons((prev) => {
    const next2 = new Set(prev);
    next2.has(id) ? next2.delete(id) : next2.add(id);
    return next2;
  });
  const next = async () => {
    if (step === 1 && !datesValid) return;
    if (step === 2) {
      const r = detailsSchema.safeParse(details);
      if (!r.success) {
        const errs = {};
        r.error.issues.forEach((i) => {
          errs[i.path[0]] = i.message;
        });
        setDetailsErr(errs);
        return;
      }
      if (!agree) return;
      setDetailsErr({});
    }
    if (step === 3) {
      const bookingPayload = {
        vehicleSlug: v.slug,
        startDate: `${pickupDate}T${pickupTime}:00`,
        endDate: `${returnDate}T${returnTime}:00`,
        pickup: pickupLoc,
        dropoff: returnLoc,
        payment,
        customerName: details.fullName,
        customerEmail: details.email,
        customerPhone: details.phone,
        license: details.license,
        couponCode: couponApplied ? coupon : void 0,
        insurance,
        addons: Array.from(selectedAddons)
      };
      if (payment === "eSewa") {
        try {
          setIsSubmitting(true);
          const res = await initiateEsewaPayment(bookingPayload);
          if (res.success && res.data) {
            const data = res.data;
            const form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", data.ESEWA_URL);
            const fields = ["amount", "tax_amount", "total_amount", "transaction_uuid", "product_code", "product_service_charge", "product_delivery_charge", "success_url", "failure_url", "signed_field_names", "signature"];
            fields.forEach((field) => {
              const input = document.createElement("input");
              input.setAttribute("type", "hidden");
              input.setAttribute("name", field);
              input.setAttribute("value", data[field] ?? "0");
              form.appendChild(input);
            });
            document.body.appendChild(form);
            form.submit();
          } else {
            toast.error("Failed to initiate eSewa payment.");
          }
        } catch (err) {
          toast.error(err.message || "eSewa initiation failed.");
        } finally {
          setIsSubmitting(false);
        }
        return;
      }
      if (payment === "Khalti") {
        const KhaltiCheckout = window.KhaltiCheckout;
        if (!KhaltiCheckout) {
          toast.error("Khalti payment gateway is still loading. Please try again in a few seconds.");
          return;
        }
        const khaltiConfig = {
          publicKey: "test_public_key_3f78fb6364ef4bd1b5fc670ce33a06f5",
          productIdentity: v.slug,
          productName: v.name,
          productUrl: window.location.href,
          paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
          eventHandler: {
            onSuccess: async (payload) => {
              try {
                setIsSubmitting(true);
                toast.loading("Verifying Khalti payment...", {
                  id: "khalti-verify"
                });
                const verifyRes = await verifyKhaltiPayment(payload.token, payload.amount, bookingPayload);
                toast.dismiss("khalti-verify");
                if (verifyRes.success && verifyRes.data) {
                  toast.success("Payment verified successfully!");
                  navigate({
                    to: "/payment/khalti/success",
                    search: {
                      bookingId: verifyRes.data._id
                    }
                  });
                } else {
                  toast.error("Khalti verification failed.");
                  navigate({
                    to: "/payment/khalti/failure"
                  });
                }
              } catch (err) {
                toast.dismiss("khalti-verify");
                toast.error(err.message || "Payment verification failed.");
                navigate({
                  to: "/payment/khalti/failure"
                });
              } finally {
                setIsSubmitting(false);
              }
            },
            onError: (error) => {
              console.error("Khalti error:", error);
              toast.error("Khalti payment failed or cancelled.");
              navigate({
                to: "/payment/khalti/failure"
              });
            },
            onClose: () => {
              console.log("Khalti widget closed");
            }
          }
        };
        const checkout = new KhaltiCheckout(khaltiConfig);
        checkout.show({
          amount: total * 100
        });
        return;
      }
      try {
        setIsSubmitting(true);
        const res = await createBooking(bookingPayload);
        setBookingId(res.data._id);
        setStep(4);
      } catch (err) {
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
  const canContinue = step === 1 ? Boolean(datesValid) : step === 2 ? agree : true;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-12 md:py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vehicles/$slug", params: {
      slug: v.slug
    }, className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to vehicle"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stepper, { step }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid lg:grid-cols-[1fr_380px] gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border/60 bg-card p-7 md:p-10 min-h-[460px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            x: 20
          }, animate: {
            opacity: 1,
            x: 0
          }, exit: {
            opacity: 0,
            x: -20
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Your vehicle & extras" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Confirm the ride and tailor your trip." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-border/60 bg-surface p-5 flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: v.image, alt: v.name, className: "h-24 w-32 rounded-xl object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: v.brand }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-ink", children: v.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  v.category,
                  " · ",
                  v.transmission ?? "Auto",
                  " · ",
                  v.seats ?? 5,
                  " seats"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 font-semibold text-primary", children: [
                  "NPR ",
                  v.pricePerDay.toLocaleString(),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "/ day" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-8 font-display text-lg font-semibold", children: "Insurance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid sm:grid-cols-3 gap-3", children: insurances.map((opt) => {
              const Icon = opt.icon;
              const active = insurance === opt.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setInsurance(opt.id), className: cn("relative text-left rounded-2xl border-2 p-4 transition-all", active ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]" : "border-border bg-surface hover:border-primary/40"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-10 w-10 rounded-full inline-flex items-center justify-center", active ? "gradient-brand text-white" : "bg-muted"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-semibold text-ink", children: opt.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: opt.desc }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs font-semibold text-primary", children: opt.price === 0 ? "Included" : `+ NPR ${opt.price.toLocaleString()}/day` })
              ] }, opt.id);
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-8 font-display text-lg font-semibold", children: "Add-ons" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid sm:grid-cols-2 gap-3", children: addons.map((a) => {
              const Icon = a.icon;
              const active = selectedAddons.has(a.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleAddon(a.id), className: cn("flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all", active ? "border-primary bg-primary/5" : "border-border bg-surface hover:border-primary/40"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-10 w-10 rounded-lg inline-flex items-center justify-center", active ? "gradient-brand text-white" : "bg-muted"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-ink", children: a.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: a.desc })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary whitespace-nowrap", children: [
                  "+ NPR ",
                  a.price,
                  "/day"
                ] })
              ] }, a.id);
            }) })
          ] }, "vehicle"),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            x: 20
          }, animate: {
            opacity: 1,
            x: 0
          }, exit: {
            opacity: 0,
            x: -20
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Pickup & return" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "When and where do you want the keys?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Pickup date", type: "date", min: today, value: pickupDate, onChange: setPickupDate, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Pickup time", type: "time", value: pickupTime, onChange: setPickupTime, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Return date", type: "date", min: pickupDate || today, value: returnDate, onChange: setReturnDate, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Return time", type: "time", value: returnTime, onChange: setReturnTime, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }) })
            ] }),
            pickupDate && returnDate && !datesValid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-destructive", children: "Return date must be on or after pickup date." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Pickup location", value: pickupLoc, onChange: (val) => {
                setPickupLoc(val);
                if (sameLoc) setReturnLoc(val);
              }, options: locations, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: sameLoc, onChange: (e) => {
                  setSameLoc(e.target.checked);
                  if (e.target.checked) setReturnLoc(pickupLoc);
                }, className: "h-4 w-4 accent-primary" }),
                "Return to the same location"
              ] }),
              !sameLoc && /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Return location", value: returnLoc, onChange: setReturnLoc, options: locations, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }) }),
              !sameLoc && pickupLoc !== returnLoc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "One-way drop-off fee of NPR 800 applies." })
            ] })
          ] }, "pickup"),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            x: 20
          }, animate: {
            opacity: 1,
            x: 0
          }, exit: {
            opacity: 0,
            x: -20
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Review your booking" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Make sure everything looks right before payment." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid sm:grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { title: "Pickup", lines: [pickupLoc, `${pickupDate || "—"} · ${pickupTime}`] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { title: "Return", lines: [returnLoc, `${returnDate || "—"} · ${returnTime}`] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { title: "Insurance", lines: [insurances.find((i) => i.id === insurance).name] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { title: "Add-ons", lines: selectedAddons.size === 0 ? ["None"] : addons.filter((a) => selectedAddons.has(a.id)).map((a) => a.name) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-8 font-display text-lg font-semibold", children: "Your details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "For the rental agreement and pickup confirmation." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Full name", value: details.fullName, onChange: (val) => setDetails((d) => ({
                ...d,
                fullName: val
              })), error: detailsErr.fullName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Email", type: "email", value: details.email, onChange: (val) => setDetails((d) => ({
                ...d,
                email: val
              })), error: detailsErr.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Phone", value: details.phone, onChange: (val) => setDetails((d) => ({
                ...d,
                phone: val
              })), error: detailsErr.phone }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Driving license number", value: details.license, onChange: (val) => setDetails((d) => ({
                ...d,
                license: val
              })), error: detailsErr.license })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-6 flex items-start gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: agree, onChange: (e) => setAgree(e.target.checked), className: "mt-0.5 h-4 w-4 accent-primary shrink-0" }),
              "I agree to DriveNepal's ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "rental terms" }),
              " and confirm that the driver will hold a valid license at pickup."
            ] }),
            !agree && step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 ml-6 text-xs text-muted-foreground/70", children: "Please accept the terms to continue." })
          ] }, "summary"),
          step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            x: 20
          }, animate: {
            opacity: 1,
            x: 0
          }, exit: {
            opacity: 0,
            x: -20
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Choose payment method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Secure checkout. Cancel free up to 24h before pickup." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid sm:grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PayOption, { active: payment === "Khalti", onClick: () => setPayment("Khalti"), logoSrc: khaltiLogo, title: "Khalti", subtitle: "Wallet · QR", brand: "khalti" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PayOption, { active: payment === "eSewa", onClick: () => setPayment("eSewa"), logoSrc: esewaLogo, title: "eSewa", subtitle: "Mobile wallet", brand: "esewa" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PayOption, { active: payment === "Cash", onClick: () => setPayment("Cash"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "h-5 w-5" }), title: "Cash", subtitle: "On pickup", brand: "cash" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl bg-surface p-5 border border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Have a coupon?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: coupon, onChange: (e) => setCoupon(e.target.value.toUpperCase()), placeholder: "Try DRIVE10", className: "flex-1 h-11 px-4 rounded-full bg-background border border-border focus:border-primary focus:outline-none text-sm font-medium" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCouponApplied(coupon === "DRIVE10"), className: "h-11 px-5 rounded-full gradient-brand text-white text-sm font-semibold", children: "Apply" })
              ] }),
              couponApplied && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-primary flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
                " DRIVE10 applied — 10% off"
              ] }),
              coupon && !couponApplied && coupon !== "DRIVE10" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-destructive", children: "Coupon not valid." })
            ] })
          ] }, "pay"),
          step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            scale: 0.95
          }, animate: {
            opacity: 1,
            scale: 1
          }, className: "text-center py-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              scale: 0
            }, animate: {
              scale: 1
            }, transition: {
              type: "spring",
              stiffness: 200,
              damping: 15
            }, className: "mx-auto h-20 w-20 rounded-full gradient-brand inline-flex items-center justify-center text-white shadow-[var(--shadow-glow)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-10 w-10" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-display text-3xl md:text-4xl font-bold", children: "Booking confirmed!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-muted-foreground max-w-md mx-auto", children: [
              "We've sent the rental details to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-ink", children: details.email || "your email" }),
              ". See you at ",
              pickupLoc,
              " on ",
              pickupDate || "your pickup date",
              " at ",
              pickupTime,
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Booking ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-ink", children: bookingId?.slice(-6).toUpperCase() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex gap-3 justify-center flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "h-11 px-6 inline-flex items-center rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors", children: "My bookings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
                to: "/cars"
              }), className: "h-11 px-6 inline-flex items-center rounded-full gradient-brand text-white text-sm font-semibold hover:-translate-y-0.5 transition-transform", children: "Browse more vehicles" })
            ] })
          ] }, "done")
        ] }),
        step < 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center justify-between pt-6 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep((s) => Math.max(0, s - 1)), disabled: step === 0 || isSubmitting, className: "h-11 px-5 rounded-full border border-border text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors", children: "Back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            void next();
          }, disabled: !canContinue || isSubmitting, className: "h-12 px-7 inline-flex items-center rounded-full gradient-brand text-white text-sm font-semibold shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            " Processing..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            step === 3 ? `Pay NPR ${total.toLocaleString()}` : "Continue",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-1 h-4 w-4" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:sticky lg:top-28 self-start rounded-3xl border border-border/60 bg-card p-6 h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: v.image, alt: v.name, className: "h-20 w-28 rounded-xl object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: v.brand }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-ink truncate", children: v.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              days,
              " day",
              days > 1 ? "s" : ""
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: `NPR ${v.pricePerDay.toLocaleString()} × ${days} day${days > 1 ? "s" : ""}`, v: `NPR ${(v.pricePerDay * days).toLocaleString()}` }),
          insurancePrice > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: `Insurance × ${days}`, v: `NPR ${(insurancePrice * days).toLocaleString()}` }),
          addonsPrice > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: `Add-ons × ${days}`, v: `NPR ${(addonsPrice * days).toLocaleString()}` }),
          dropOffFee > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "One-way drop-off", v: `NPR ${dropOffFee.toLocaleString()}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Service fee", v: `NPR ${service.toLocaleString()}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "VAT (13%)", v: `NPR ${vat.toLocaleString()}` }),
          couponApplied && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Discount (DRIVE10)", v: `− NPR ${discount.toLocaleString()}`, accent: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-border flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl font-bold text-ink", children: [
              "NPR ",
              total.toLocaleString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[11px] text-muted-foreground leading-relaxed", children: "Free cancellation up to 24h before pickup. Fuel policy: like-for-like." })
      ] })
    ] })
  ] });
}
function Stepper({
  step
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 md:gap-3 max-w-4xl mx-auto overflow-x-auto", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-2 md:gap-3 min-w-fit", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 ${i <= step ? "text-primary" : "text-muted-foreground"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-9 w-9 shrink-0 rounded-full inline-flex items-center justify-center text-xs font-semibold ${i < step ? "gradient-brand text-white" : i === step ? "bg-primary/10 text-primary border-2 border-primary" : "bg-muted"}`, children: i < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : i + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline text-sm font-medium whitespace-nowrap", children: s })
    ] }),
    i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-0.5 rounded-full bg-muted relative overflow-hidden min-w-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute inset-y-0 left-0 gradient-brand", animate: {
      width: i < step ? "100%" : "0%"
    }, transition: {
      duration: 0.4
    } }) })
  ] }, s)) });
}
function Input({
  label,
  type = "text",
  value,
  onChange,
  error,
  icon,
  min
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("mt-1 flex items-center gap-2 h-12 px-4 rounded-xl bg-muted border-2 transition-colors", error ? "border-destructive" : "border-transparent focus-within:border-primary focus-within:bg-background"), children: [
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, onChange: (e) => onChange(e.target.value), min, className: "w-full bg-transparent text-sm font-medium focus:outline-none" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs text-destructive", children: error })
  ] });
}
function Select({
  label,
  value,
  onChange,
  options,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 flex items-center gap-2 h-12 px-4 rounded-xl bg-muted border-2 border-transparent focus-within:border-primary focus-within:bg-background transition-colors", children: [
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value, onChange: (e) => onChange(e.target.value), className: "w-full bg-transparent text-sm font-medium focus:outline-none", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: o }, o)) })
    ] })
  ] });
}
function SummaryCard({
  title,
  lines
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 space-y-0.5", children: lines.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-ink", children: l }, i)) })
  ] });
}
const brandStyles = {
  khalti: {
    border: "border-[#5C2D91]",
    bg: "bg-[#5C2D91]/5",
    shadow: "shadow-[0_0_20px_rgba(92,45,145,0.25)]",
    hoverBorder: "hover:border-[#5C2D91]/40",
    logoBg: "bg-[#5C2D91]",
    checkBg: "bg-[#5C2D91]"
  },
  esewa: {
    border: "border-[#60BB46]",
    bg: "bg-[#60BB46]/5",
    shadow: "shadow-[0_0_20px_rgba(96,187,70,0.25)]",
    hoverBorder: "hover:border-[#60BB46]/40",
    logoBg: "bg-white",
    checkBg: "bg-[#60BB46]"
  },
  cash: {
    border: "border-primary",
    bg: "bg-primary/5",
    shadow: "shadow-[var(--shadow-glow)]",
    hoverBorder: "hover:border-primary/40",
    logoBg: "gradient-brand",
    checkBg: "gradient-brand"
  }
};
function PayOption({
  active,
  onClick,
  icon,
  logoSrc,
  title,
  subtitle,
  brand
}) {
  const s = brandStyles[brand];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: cn("relative text-left rounded-2xl border-2 p-5 transition-all", active ? `${s.border} ${s.bg} ${s.shadow}` : `border-border bg-surface ${s.hoverBorder}`), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-12 w-12 rounded-2xl inline-flex items-center justify-center overflow-hidden", logoSrc ? brand === "esewa" ? "bg-white border border-border/40" : brand === "khalti" ? "bg-[#5C2D91]" : "" : active ? s.logoBg : "bg-muted text-foreground"), children: logoSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoSrc, alt: title, className: "h-8 w-8 object-contain" }) : icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-semibold text-ink", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subtitle }),
    active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("absolute top-3 right-3 h-5 w-5 rounded-full inline-flex items-center justify-center text-white", s.checkBg), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) })
  ] });
}
function Row({
  k,
  v,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium ${accent ? "text-primary" : "text-ink"}`, children: v })
  ] });
}
export {
  BookingFlow as component
};
