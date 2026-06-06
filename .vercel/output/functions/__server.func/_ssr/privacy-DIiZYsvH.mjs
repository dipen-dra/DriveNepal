import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { ac as Shield, H as Eye, U as Lock, M as Globe, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
const policyPoints = [{
  icon: Eye,
  title: "1. Information We Collect",
  desc: "We collect basic profile details (name, email, phone number) when you register. During booking checkouts, we securely process and store your driver's license photos solely to perform mandatory identity and compliance checks as required by vehicle rental laws."
}, {
  icon: Lock,
  title: "2. Data Protection & Security",
  desc: "Your uploaded documents and license photos are encrypted in transit using industry-standard SSL and stored with rest encryption. Only certified fleet officers are authorized to inspect documents, ensuring strict confidentiality."
}, {
  icon: Globe,
  title: "3. Location Telemetry (GPS)",
  desc: "For roadside assistance, mountain safety monitoring, and vehicle protection, our premium cars and bikes are equipped with safe-driving GPS telemetry. We only access real-time location metrics during roadside breakdowns or speed alert occurrences."
}];
function PrivacyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 md:py-28 bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page max-w-4xl space-y-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5" }),
        " Privacy & Trust"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h1, { initial: {
        opacity: 0,
        y: 15
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1
      }, className: "font-display text-4xl md:text-5xl font-bold tracking-tight text-ink", children: "Privacy Policy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last updated: May 22, 2026" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: policyPoints.map((point, i) => {
      const Icon = point.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 15
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.05
      }, className: "flex gap-4 items-start rounded-3xl border border-border/60 bg-card p-6 md:p-8 hover:shadow-soft transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-ink", children: point.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: point.desc })
        ] })
      ] }, point.title);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed max-w-md", children: "Have questions regarding how your driver's license data or profile information is handled? Reach out to our privacy officer." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex h-11 px-5 items-center gap-1.5 rounded-full text-xs font-semibold uppercase tracking-wider gradient-brand text-white shadow-soft hover:-translate-y-0.5 transition-transform self-start sm:self-auto", children: [
        "Contact Support ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
      ] })
    ] })
  ] }) });
}
export {
  PrivacyPage as component
};
