import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { h as cn } from "./router-Dp1bmQ9H.mjs";
import "../_libs/react-oauth__google.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { t as CircleQuestionMark, ae as ShieldCheck, z as CreditCard, w as Compass, b as ArrowRight, o as ChevronDown, _ as MessageSquare, a3 as Phone } from "../_libs/lucide-react.mjs";
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
const faqs = [{
  category: "bookings",
  q: "What documents do I need to rent a vehicle?",
  a: "You need a valid driver's license (international driving permit required for foreigners) and a government-issued photo ID (passport for international citizens). The minimum driver age is 21."
}, {
  category: "payments",
  q: "How does the security deposit work?",
  a: "A refundable security deposit (NPR 15,000 for bikes, NPR 30,000 for standard SUVs) is pre-authorized on your card or paid via digital wallets during checkouts. It is fully refunded within 24 hours of returning the vehicle safely."
}, {
  category: "insurance",
  q: "Is insurance included in the rental price?",
  a: "Yes, comprehensive third-party insurance comes standard with all rental bookings. You can upgrade to a Premium collision damage waiver (CDW) at checkout to limit maximum personal liability."
}, {
  category: "roadside",
  q: "What should I do in case of an accident or breakdown?",
  a: "Safety first! Ensure everyone is safe. Then, immediately call our 24/7 Roadside Assistance hotline at +977 1 4444 555. We partner with support mechanics across 15 cities to dispatch roadside support or replacements."
}];
const guides = [{
  icon: ShieldCheck,
  title: "Insurance & Coverage",
  desc: "Understand your deductible limits, damage wavers, and emergency liability."
}, {
  icon: CreditCard,
  title: "Refunds & Deposits",
  desc: "Learn about transaction timelines for refundable security locks."
}, {
  icon: Compass,
  title: "Off-road Driving Guide",
  desc: "Best safety guidelines for navigating challenging mountain tracks and river passes."
}];
function HelpPage() {
  const [openIndex, setOpenIndex] = reactExports.useState(null);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 md:py-28 bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page max-w-5xl space-y-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
        opacity: 0,
        y: 15
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-3.5 w-3.5" }),
        " Support Portal"
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
        "How can we ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent", children: "help you?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0,
        y: 25
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.2
      }, className: "text-base text-muted-foreground leading-relaxed", children: "Find answers to frequently asked questions about bookings, insurance policies, refunds, and mountain safety guides." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: guides.map((g, i) => {
      const Icon = g.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 15
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.1
      }, className: "rounded-3xl border border-border/60 bg-card p-6 flex flex-col justify-between hover:border-primary/20 hover:shadow-card transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-ink", children: g.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 leading-relaxed", children: g.desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider cursor-pointer hover:translate-x-0.5 transition-transform", children: [
          "Learn more ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] })
      ] }, g.title);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-ink", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Get instant answers to general inquiries." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-3xl bg-card overflow-hidden", children: faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/80 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleFaq(index), className: "w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/35 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-ink", children: faq.q }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("h-4 w-4 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180") })
          ] }),
          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/20 bg-muted/10", children: faq.a })
        ] }, index);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2.5rem] border border-border bg-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-ink", children: "Still have questions?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "We are ready to guide you on your journey. Reach out directly to our live support channels or submit an query." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "h-12 px-6 rounded-full gradient-brand text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center shadow-soft hover:-translate-y-0.5 transition-transform", children: [
          "Submit Inquiry ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "ml-2 h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+97714444555", className: "h-12 px-6 rounded-full border border-border text-ink hover:bg-muted font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center transition-all", children: [
          "Call Hotline ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "ml-2 h-4 w-4" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  HelpPage as component
};
