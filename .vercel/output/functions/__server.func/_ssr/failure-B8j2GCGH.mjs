import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { an as TriangleAlert } from "../_libs/lucide-react.mjs";
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
function KhaltiFailure() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center container-page py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    scale: 0.95
  }, animate: {
    opacity: 1,
    scale: 1
  }, className: "w-full max-w-md bg-card border border-border/60 rounded-3xl p-8 md:p-10 text-center shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-16 w-16 rounded-full bg-destructive/10 inline-flex items-center justify-center text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-8 w-8" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-display text-2xl font-bold text-ink", children: "Payment Failed" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-sm", children: "Your transaction with Khalti could not be completed. Your booking was not confirmed." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex gap-3 justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cars", className: "h-11 px-6 inline-flex items-center rounded-full gradient-brand text-white text-sm font-semibold hover:-translate-y-0.5 transition-transform", children: "Browse Vehicles" }) })
  ] }) });
}
export {
  KhaltiFailure as component
};
