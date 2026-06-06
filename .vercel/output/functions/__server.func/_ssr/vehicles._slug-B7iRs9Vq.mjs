import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { b as Route$e, u as getVehicles } from "./router-Dp1bmQ9H.mjs";
import { V as VehicleCard } from "./VehicleCard-BsJ3v60h.mjs";
import "../_libs/react-oauth__google.mjs";
import "../_libs/sonner.mjs";
import { a as ArrowLeft, ai as Star, Y as MapPin, K as Fuel, L as Gauge, ar as Users, ac as Shield, m as Check, C as Calendar } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
function VehicleDetail() {
  const {
    vehicle: v
  } = Route$e.useLoaderData();
  const [img, setImg] = reactExports.useState(v.image);
  const [pickupDate, setPickupDate] = reactExports.useState("");
  const [returnDate, setReturnDate] = reactExports.useState("");
  const [pickupLocation, setPickupLocation] = reactExports.useState("Kathmandu — Thamel hub");
  const days = reactExports.useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const ms = +new Date(returnDate) - +new Date(pickupDate);
    return Math.max(1, Math.ceil(ms / 864e5));
  }, [pickupDate, returnDate]);
  const {
    data: suggestionsData
  } = useQuery({
    queryKey: ["vehicles", v.type],
    queryFn: () => getVehicles({
      type: v.type
    }),
    staleTime: 5 * 60 * 1e3
  });
  const suggestions = (suggestionsData?.data ?? []).filter((x) => x._id !== v._id).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page pt-10 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: v.type === "car" ? "/cars" : "/bikes", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to ",
        v.type === "car" ? "cars" : "bikes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1.4fr_1fr] gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] rounded-3xl overflow-hidden bg-surface shadow-[var(--shadow-card)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: img, alt: v.name, initial: {
              opacity: 0,
              scale: 1.05
            }, animate: {
              opacity: 1,
              scale: 1
            }, transition: {
              duration: 0.5
            }, className: "h-full w-full object-cover" }, img),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-5 left-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium", children: [
              v.category,
              " · ",
              v.brand
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-4 gap-3", children: [v.image, ...v.gallery].slice(0, 4).map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setImg(g), className: `aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${img === g ? "border-primary shadow-[var(--shadow-glow)]" : "border-transparent opacity-70 hover:opacity-100"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: g, alt: "", className: "h-full w-full object-cover" }) }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: v.brand }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-4xl md:text-5xl font-bold tracking-tight", children: v.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-yellow-400 text-yellow-400" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: v.rating }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "(",
                    v.reviews,
                    " reviews)"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
                  " ",
                  v.location
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-foreground/80 leading-relaxed", children: v.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-2 md:grid-cols-4 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Fuel, { className: "h-4 w-4" }), label: "Fuel", value: v.fuel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "h-4 w-4" }), label: "Transmission", value: v.transmission }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }), label: "Capacity", value: `${v.seats} ${v.type === "bike" ? "riders" : "seats"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Spec, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }), label: "Insurance", value: "Included" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold mb-4", children: "Features" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: v.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-8 w-8 rounded-full gradient-brand text-white inline-flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: f })
              ] }, f)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.aside, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.1
        }, className: "lg:sticky lg:top-28 self-start rounded-3xl border border-border/60 bg-card p-7 shadow-[var(--shadow-card)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-bold text-primary", children: [
              "NPR ",
              v.pricePerDay.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/ day" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DateField, { label: "Pickup", value: pickupDate, onChange: setPickupDate }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DateField, { label: "Return", value: returnDate, onChange: setReturnDate }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Pickup location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: pickupLocation, onChange: (e) => setPickupLocation(e.target.value), className: "mt-1 w-full h-11 px-3 rounded-xl bg-muted border border-transparent focus:border-primary focus:outline-none text-sm font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Kathmandu — Thamel hub", children: "Kathmandu (Thamel hub)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Pokhara — Lakeside", children: "Pokhara (Lakeside)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Kathmandu — Tribhuvan Intl Airport", children: "Tribhuvan Intl Airport" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: `NPR ${v.pricePerDay.toLocaleString()} × ${days} day${days > 1 ? "s" : ""}`, v: `NPR ${(v.pricePerDay * days).toLocaleString()}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Service fee", v: `NPR ${Math.round(v.pricePerDay * days * 0.05).toLocaleString()}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "VAT (13%)", v: `NPR ${Math.round(v.pricePerDay * days * 0.13).toLocaleString()}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-border flex items-baseline justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl font-bold text-ink", children: [
                "NPR ",
                Math.round(v.pricePerDay * days * 1.18).toLocaleString()
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/booking/$slug", params: {
            slug: v.slug
          }, search: {
            pickupDate,
            returnDate,
            pickupLocation
          }, className: "mt-6 w-full h-12 inline-flex items-center justify-center rounded-full gradient-brand text-white font-semibold shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-transform", children: "Continue to booking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground text-center", children: "Free cancellation up to 24h before pickup" })
        ] })
      ] })
    ] }),
    suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl md:text-3xl font-bold mb-8", children: "You might also like" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: suggestions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VehicleCard, { v: s, index: i }, s._id)) })
    ] })
  ] });
}
function Spec({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-surface p-4 border border-border/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm font-semibold text-ink", children: value })
  ] });
}
function DateField({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value, onChange: (e) => onChange(e.target.value), className: "w-full h-11 pl-10 pr-3 rounded-xl bg-muted border border-transparent focus:border-primary focus:outline-none text-sm font-medium" })
    ] })
  ] });
}
function Row({
  k,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-ink font-medium", children: v })
  ] });
}
export {
  VehicleDetail as component
};
