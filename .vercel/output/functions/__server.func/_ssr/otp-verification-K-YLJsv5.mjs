import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as Route$u, L as verifyOtp, A as ApiError, n as forgotPassword } from "./router-Dp1bmQ9H.mjs";
import "../_libs/react-oauth__google.mjs";
import { R as KeyRound, a as ArrowLeft, b as ArrowRight, a6 as RefreshCw } from "../_libs/lucide-react.mjs";
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
function OtpPage() {
  const {
    email
  } = Route$u.useSearch();
  const navigate = useNavigate();
  const [digits, setDigits] = reactExports.useState(Array(6).fill(""));
  const [loading, setLoading] = reactExports.useState(false);
  const [cooldown, setCooldown] = reactExports.useState(45);
  const refs = reactExports.useRef([]);
  reactExports.useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1e3);
    return () => clearTimeout(t);
  }, [cooldown]);
  const setAt = (i, v) => {
    const clean = v.replace(/\D/g, "").slice(-1);
    setDigits((d) => {
      const next = [...d];
      next[i] = clean;
      return next;
    });
    if (clean && i < 5) refs.current[i + 1]?.focus();
  };
  const onKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
  };
  const onPaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = Array(6).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    refs.current[Math.min(text.length, 5)]?.focus();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is missing. Please restart the process.");
      return;
    }
    const code = digits.join("");
    if (code.length < 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }
    try {
      setLoading(true);
      await verifyOtp(email, code);
      toast.success("Code verified.");
      void navigate({
        to: "/reset-password",
        search: {
          token: code,
          email
        }
      });
    } catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  const resend = async () => {
    if (cooldown > 0) return;
    if (!email) {
      toast.error("Email is missing. Please restart the process.");
      return;
    }
    try {
      setCooldown(45);
      await forgotPassword(email);
      toast.success("A new code has been sent.");
    } catch (err) {
      setCooldown(0);
      if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "min-h-[calc(100vh-5rem)] grid lg:grid-cols-2 noise-bg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex relative overflow-hidden items-center justify-center p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-brand opacity-95" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-white max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-12 w-12 rounded-2xl bg-white/15 backdrop-blur items-center justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold leading-tight", children: "Check your inbox" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-white/85 leading-relaxed", children: [
          "We sent a 6-digit code to ",
          email ? /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: email }) : "your email",
          ". It expires in 10 minutes."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-6 md:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/forgot-password", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Change email"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold tracking-tight", children: "Enter verification code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
        "Sent to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: email ?? "your email" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 space-y-6", onSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 sm:gap-3 justify-between", onPaste, children: digits.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: (el) => {
          refs.current[i] = el;
        }, inputMode: "numeric", autoComplete: "one-time-code", maxLength: 1, value: d, onChange: (e) => setAt(i, e.target.value), onKeyDown: (e) => onKeyDown(i, e), className: "w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:bg-background focus:outline-none transition-colors" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: loading, className: "w-full h-12 rounded-full gradient-brand text-white font-semibold shadow-[var(--shadow-glow)] inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform disabled:opacity-70 disabled:hover:translate-y-0", children: [
          loading ? "Verifying..." : "Verify code",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          void resend();
        }, disabled: cooldown > 0, className: "w-full inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
          cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  OtpPage as component
};
