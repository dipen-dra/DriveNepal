import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { h as Briefcase, O as Heart, w as Compass, ai as Star, ah as Sparkles, Y as MapPin, C as Calendar, D as DollarSign, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
const jobs = [{
  title: "Mountain Fleet Manager",
  department: "Operations",
  location: "Pokhara / Manang",
  type: "Full-Time",
  salary: "NPR 90k - 130k / month",
  icon: Compass,
  description: "Lead the inspection, maintenance, and staging of premium SUVs and adventure bikes for off-road Himalayan expeditions."
}, {
  title: "Full Stack Software Engineer",
  department: "Engineering",
  location: "Kathmandu (Hybrid)",
  type: "Full-Time",
  salary: "NPR 150k - 220k / month",
  icon: Sparkles,
  description: "Scale our booking system, enhance the admin dashboard tools, and build intelligent routing logic for vehicle deliveries."
}, {
  title: "Customer Success Lead",
  department: "Support",
  location: "Kathmandu (Thamel)",
  type: "Full-Time",
  salary: "NPR 70k - 95k / month",
  icon: Heart,
  description: "Provide exceptional, premium booking coordination and emergency road assistance support to international and local travelers."
}];
const perks = [{
  icon: Heart,
  title: "Health & Wellbeing",
  desc: "Comprehensive medical insurance and mental wellness allowances for you and your family."
}, {
  icon: Compass,
  title: "Road Trips & Rentals",
  desc: "Free quarterly luxury vehicle rentals and sponsored team road-trips across Nepal."
}, {
  icon: Star,
  title: "Equity & Performance",
  desc: "Annual performance bonuses, stock options, and ongoing learning stipends."
}];
function CareersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 md:py-28 bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page max-w-6xl space-y-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
        opacity: 0,
        y: 15
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3.5 w-3.5" }),
        " Join Our Fleet"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1
      }, className: "font-display text-4xl md:text-6xl font-bold tracking-tight text-ink", children: [
        "Build the future of travel ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent", children: "in the Himalayas" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0,
        y: 25
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.2
      }, className: "text-lg text-muted-foreground leading-relaxed", children: "We are looking for builders, adventure seekers, and problem solvers to help us redefine premium transportation and travel experiences in Nepal." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-ink", children: "Perks of the Road" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "What you receive when you join the DriveNepal family." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: perks.map((p, i) => {
        const Icon = p.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.1
        }, className: "rounded-3xl border border-border/60 bg-card p-8 hover:border-primary/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-ink", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 leading-relaxed", children: p.desc })
        ] }, p.title);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-ink", children: "Open Opportunities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Explore our current roles and join us on our journey." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary uppercase bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10 self-start md:self-auto", children: [
          jobs.length,
          " Active Positions"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: jobs.map((job, i) => {
        const Icon = job.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.05
        }, className: "group rounded-3xl border border-border/60 bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 hover:shadow-glow transition-all duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-ink group-hover:text-primary transition-colors duration-300", children: job.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                  " ",
                  job.location
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                  " ",
                  job.type
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-3.5 w-3.5" }),
                  " ",
                  job.salary
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed", children: job.description })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex h-11 px-5 items-center gap-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-muted text-ink group-hover:bg-primary group-hover:text-white transition-all self-start md:self-auto", children: [
            "Apply Now ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] })
        ] }, job.title);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.98
    }, whileInView: {
      opacity: 1,
      scale: 1
    }, viewport: {
      once: true
    }, className: "rounded-[2.5rem] gradient-brand p-8 md:p-12 text-center text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_70%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-xl mx-auto space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl md:text-3xl font-bold", children: "Don't see the perfect role?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm leading-relaxed", children: "We are always looking for exceptional talent who love cars, bikes, and hospitality. Drop us an open application query via our contact center!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex h-12 px-6 items-center gap-2 rounded-full bg-white text-primary font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform", children: [
          "Get In Touch ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  CareersPage as component
};
