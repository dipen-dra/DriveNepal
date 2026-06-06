import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { F as Earth, ah as Sparkles, O as Heart, X as Map, ae as ShieldCheck, ar as Users, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
const aboutHero = "/assets/about-hero-WNGfufmZ.png";
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[85vh] flex items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        scale: 1.1
      }, animate: {
        scale: 1
      }, transition: {
        duration: 1.5,
        ease: "easeOut"
      }, className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: aboutHero, alt: "Driving in the Himalayas", className: "w-full h-full object-cover object-center brightness-75" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-page relative z-10 text-center max-w-4xl mx-auto pt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.8,
        ease: "easeOut"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 tracking-wide uppercase", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "h-4 w-4" }),
          " Our Story"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-tight", children: [
          "We rent vehicles ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: "we'd drive ourselves." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-medium", children: "DriveNepal started with a simple idea: renting a vehicle in Nepal should feel as good as the trip itself. No paperwork chaos, no surprise fees, no compromises on quality." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page -mt-16 relative z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [{
      label: "Happy Travelers",
      value: "10k+"
    }, {
      label: "Premium Vehicles",
      value: "120+"
    }, {
      label: "Cities Covered",
      value: "15"
    }, {
      label: "Average Rating",
      value: "4.9/5"
    }].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.1
    }, className: "bg-card border border-border/60 rounded-3xl p-6 text-center shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl md:text-4xl font-bold text-primary", children: stat.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground mt-2", children: stat.label })
    ] }, stat.label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-24 md:py-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold tracking-tight text-ink", children: "What drives us forward" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-lg", children: "We believe that a great journey starts with a reliable ride. Here is our promise to you." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [{
        icon: Sparkles,
        title: "Premium by default",
        text: "Every vehicle in our fleet is meticulously detailed, regularly serviced, and thoroughly inspected before each and every trip."
      }, {
        icon: Heart,
        title: "Built with care",
        text: "We believe in honest pricing, real human support, and a flexible cancellation policy that understands travel plans change."
      }, {
        icon: Map,
        title: "Local at heart",
        text: "We're from Nepal. We know the challenging mountain roads, the monsoon seasons, and the hidden routes truly worth taking."
      }, {
        icon: ShieldCheck,
        title: "Fully insured",
        text: "Drive with absolute peace of mind. Comprehensive insurance coverage comes standard with every rental, no hidden upsells."
      }, {
        icon: Users,
        title: "Community first",
        text: "We partner with local guides and mechanics across all our locations to support the beautiful communities we operate in."
      }, {
        icon: Earth,
        title: "Sustainable vision",
        text: "We are actively transitioning our fleet to hybrid and fully electric vehicles to preserve Nepal's pristine environments."
      }].map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        margin: "-50px"
      }, transition: {
        delay: i * 0.1
      }, className: "group rounded-3xl border border-border/60 bg-card p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-primary/10 text-primary inline-flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 font-display text-xl font-bold text-ink", children: v.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: v.text })
      ] }, v.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.95
    }, whileInView: {
      opacity: 1,
      scale: 1
    }, viewport: {
      once: true
    }, className: "relative rounded-[3rem] overflow-hidden gradient-brand p-12 md:p-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_70%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-white mb-6", children: "Ready for your next adventure?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-lg mb-10", children: "Join thousands of happy travelers who have explored the beauty of Nepal with our premium vehicles." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cars", className: "inline-flex h-14 px-8 items-center gap-3 rounded-full bg-white text-primary font-bold text-lg hover:scale-105 transition-transform shadow-xl", children: [
          "Explore the fleet ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AboutPage as component
};
