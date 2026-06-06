import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { x as Cookie, ah as Sparkles, m as Check, ad as ShieldAlert, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
const cookieTypes = [{
  title: "Essential Cookies",
  desc: "Necessary to keep your authentication session active, retrieve your shopping carts during checkouts, and maintain security tokens.",
  status: "Always Active"
}, {
  title: "Analytical & Performance",
  desc: "Allows us to measure search filter loads, identify slower page routes, and optimize image render speeds across our fleet catalogs.",
  status: "Optional"
}, {
  title: "Preferences Cookies",
  desc: "Used to preserve local site configurations such as dark mode preferences and city search filter presets.",
  status: "Optional"
}];
function CookiesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 md:py-28 bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page max-w-4xl space-y-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cookie, { className: "h-3.5 w-3.5" }),
        " Tracker Management"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h1, { initial: {
        opacity: 0,
        y: 15
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1
      }, className: "font-display text-4xl md:text-5xl font-bold tracking-tight text-ink", children: "Cookies Policy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last updated: May 22, 2026" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      delay: 0.2
    }, className: "text-sm text-muted-foreground leading-relaxed bg-card border border-border p-6 rounded-3xl", children: "We use cookies and active web storage techniques to deliver a faster, personalized, and secure booking experience. This document outlines the types of tracking technologies utilized by our client and backend servers." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-ink", children: "Cookies We Utilize" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: cookieTypes.map((cookie, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 15
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.05
      }, className: "rounded-3xl border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-soft transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 max-w-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-ink flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
            " ",
            cookie.title
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: cookie.desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex h-8 px-4 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 self-start sm:self-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 mr-1" }),
          " ",
          cookie.status
        ] })
      ] }, cookie.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, whileInView: {
      opacity: 1
    }, viewport: {
      once: true
    }, className: "rounded-3xl bg-primary/5 border border-primary/20 p-6 md:p-8 flex gap-4 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-5 w-5 text-primary flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Removing or blocking functional session cookies via browser controls might cause active auth states to reset, booking selections to clear, and dashboard maps to display with errors." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed max-w-md", children: "If you wish to opt-out of optional analytics tracking or have questions about local web storage, submit an inquiry." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex h-11 px-5 items-center gap-1.5 rounded-full text-xs font-semibold uppercase tracking-wider gradient-brand text-white shadow-soft hover:-translate-y-0.5 transition-transform self-start sm:sm:self-auto", children: [
        "Contact Support ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
      ] })
    ] })
  ] }) });
}
export {
  CookiesPage as component
};
