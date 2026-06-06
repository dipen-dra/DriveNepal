import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { e as Route$1, J as verifyEsewaPayment } from "./router-Dp1bmQ9H.mjs";
import "../_libs/react-oauth__google.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { T as LoaderCircle, m as Check, u as CircleX } from "../_libs/lucide-react.mjs";
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
function EsewaSuccess() {
  const {
    data
  } = Route$1.useSearch();
  const [status, setStatus] = reactExports.useState("loading");
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const [bookingId, setBookingId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!data) {
      setStatus("error");
      setErrorMsg("No payment data found in URL.");
      return;
    }
    verifyEsewaPayment(data).then((res) => {
      setStatus("success");
      setBookingId(res.data._id);
    }).catch((err) => {
      setStatus("error");
      setErrorMsg(err.message || "Payment verification failed.");
    });
  }, [data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center container-page py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    scale: 0.95
  }, animate: {
    opacity: 1,
    scale: 1
  }, className: "w-full max-w-md bg-card border border-border/60 rounded-3xl p-8 md:p-10 text-center shadow-soft", children: [
    status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-12 w-12 text-primary animate-spin mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-display text-2xl font-bold", children: "Verifying Payment..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-sm", children: "Please wait while we confirm your transaction with eSewa." })
    ] }),
    status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-16 w-16 rounded-full gradient-brand inline-flex items-center justify-center text-white shadow-[var(--shadow-glow)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-display text-2xl font-bold text-ink", children: "Payment Successful!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-sm", children: "Your booking has been confirmed and paid via eSewa." }),
      bookingId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Booking ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-ink", children: bookingId.slice(-6).toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex gap-3 justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "h-11 px-6 inline-flex items-center rounded-full gradient-brand text-white text-sm font-semibold hover:-translate-y-0.5 transition-transform", children: "Go to Dashboard" }) })
    ] }),
    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-16 w-16 text-destructive mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-display text-2xl font-bold text-ink", children: "Payment Failed" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-sm", children: errorMsg }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex gap-3 justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "h-11 px-6 inline-flex items-center rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors", children: "Back to Dashboard" }) })
    ] })
  ] }) });
}
export {
  EsewaSuccess as component
};
