import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { a1 as Newspaper, C as Calendar, G as ExternalLink, E as Download, W as Mail, a3 as Phone, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
const articles = [{
  title: "DriveNepal Expands Premium SUV Rental Fleet to Pokhara & Mustang",
  date: "April 15, 2026",
  outlet: "Kathmandu Post",
  summary: "Introducing comprehensive overland solutions with professional support for remote Himalayan routes to improve adventure travel experiences in Nepal."
}, {
  title: "DriveNepal launches Nepal's first fully digital luxury vehicle rental service",
  date: "January 20, 2026",
  outlet: "TechNepal",
  summary: "A seamless booking application featuring instant validation, live availability trackers, and flexible digital checkouts."
}];
const brandAssets = [{
  name: "Logo Pack (SVG & PNG)",
  size: "4.2 MB",
  desc: "Includes light, dark, and icon-only high resolution logo files."
}, {
  name: "Brand Guidelines (PDF)",
  size: "12.8 MB",
  desc: "Hex color codes, typography scales, and correct usage guides."
}];
function PressPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 md:py-28 bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page max-w-5xl space-y-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
        opacity: 0,
        y: 15
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "h-3.5 w-3.5" }),
        " Media Relations"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1
      }, className: "font-display text-4xl md:text-5xl font-bold tracking-tight text-ink", children: [
        "Press Room & ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent", children: "Brand Assets" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0,
        y: 25
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.2
      }, className: "text-base text-muted-foreground leading-relaxed", children: "Welcome to the DriveNepal press room. Find our latest announcements, news coverages, and download high-quality, approved brand assets." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-ink", children: "Recent Press Releases" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Read our latest company announcements and milestones." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: articles.map((art, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 15
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.1
      }, className: "group rounded-3xl border border-border/60 bg-card p-6 md:p-8 hover:border-primary/20 hover:shadow-card transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            " ",
            art.date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary uppercase tracking-wide bg-primary/5 px-2.5 py-0.5 rounded-full", children: art.outlet })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-ink group-hover:text-primary transition-colors duration-300 mt-4", children: art.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3 leading-relaxed", children: art.summary }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary", children: [
          "Read Full Article ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
        ] })
      ] }, art.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-ink", children: "Brand Assets" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Approved logos, screenshots, and visual specs for media use." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: brandAssets.map((asset, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-ink", children: asset.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: asset.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full mt-2", children: asset.size })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-10 w-10 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) })
        ] }, asset.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 md:p-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-ink", children: "Media & PR Inquiries" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Get in touch with our communications team for interviews or data requests." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-sm text-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-ink", children: "press@drivenepal.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-ink", children: "+977 1 4444 555 (Ext. 402)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "w-full h-11 rounded-full gradient-brand text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center shadow-soft hover:-translate-y-0.5 transition-transform", children: [
          "Contact Support ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  PressPage as component
};
