import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { a8 as Scale, ad as ShieldAlert, r as CircleCheck, an as TriangleAlert, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const sections = [{
  title: "1. Driver Qualifications",
  items: ["Minimum Driver Age: 21 years old.", "Licenses: A valid national driver's license matching the vehicle category. Foreign drivers must present a valid International Driving Permit (IDP).", "Documentation: Passport or national identification card copy is required at check-in."]
}, {
  title: "2. Security Deposit & Payments",
  items: ["Refundable Deposits: Security locks are required during checkout and returned within 24 hours of returning the vehicle undamaged.", "Fuel Policy: Return the vehicle with the same level of fuel as provided during pickup.", "Late Returns: Grace period of 59 minutes applies. Beyond this, hourly extensions or daily rates will be charged."]
}, {
  title: "3. Driving Rules & Restrictions",
  items: ["Speed Limits: Standard speed limits are strictly monitored via active GPS tracking. Exceeding 80 km/h will trigger safe driving alerts.", "Cross-Border Restriction: Vehicles must not leave the geographical boundaries of Nepal.", "Prohibited Use: Off-road racing, towing other vehicles, or driving under the influence will void all insurance coverages immediately."]
}];
function TermsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 md:py-28 bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page max-w-4xl space-y-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "h-3.5 w-3.5" }),
        " Legal Agreement"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h1, { initial: {
        opacity: 0,
        y: 15
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1
      }, className: "font-display text-4xl md:text-5xl font-bold tracking-tight text-ink", children: "Terms of Service" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last updated: May 22, 2026" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      delay: 0.2
    }, className: "rounded-3xl border border-border/80 bg-card p-6 md:p-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-ink flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-5 w-5 text-primary" }),
        " Rental Agreement Notice"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Please read these terms carefully before scheduling any vehicle booking. By initiating a booking on our website, you agree to comply with all standard renter rules and insurance liabilities mentioned below." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: sections.map((sect, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 15
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.05
    }, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-ink", children: sect.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: sect.items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-sm text-muted-foreground items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: item })
      ] }, index)) })
    ] }, sect.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.98
    }, whileInView: {
      opacity: 1,
      scale: 1
    }, viewport: {
      once: true
    }, className: "rounded-3xl bg-amber-500/5 border border-amber-500/20 p-6 md:p-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
        " Off-road Driving Warning"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed", children: "Driving premium sedans on off-road terrain or routes beyond standard highways (such as dirt paths or river basins) is strictly prohibited. For high-altitude remote trips like Upper Mustang, Jomsom, or Manang, you must book 4x4 SUVs or adventure off-road bikes." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed max-w-md", children: "If you have questions or require clarification regarding standard contract conditions, feel free to submit a support query." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex h-11 px-5 items-center gap-1.5 rounded-full text-xs font-semibold uppercase tracking-wider gradient-brand text-white shadow-soft hover:-translate-y-0.5 transition-transform self-start sm:self-auto", children: [
        "Contact Support ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
      ] })
    ] })
  ] }) });
}
export {
  TermsPage as component
};
