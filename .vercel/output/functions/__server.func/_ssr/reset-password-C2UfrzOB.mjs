import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Route$x, y as resetPassword, A as ApiError } from "./router-Dp1bmQ9H.mjs";
import { v as validatePasswordStrength, P as PasswordStrength } from "./PasswordStrength-bc7evql9.mjs";
import "../_libs/react-oauth__google.mjs";
import { ae as ShieldCheck, U as Lock, I as EyeOff, H as Eye, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
function ResetPasswordPage() {
  const {
    email,
    token
  } = Route$x.useSearch();
  const navigate = useNavigate();
  const [pw, setPw] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [show, setShow] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const validation = reactExports.useMemo(() => validatePasswordStrength(pw), [pw]);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !token) {
      toast.error("Missing verification token or email. Please restart the reset process.");
      return;
    }
    if (!validation.isValid) {
      toast.error("Password does not meet security requirements.");
      return;
    }
    if (pw !== confirm) {
      toast.error("Passwords don't match.");
      return;
    }
    try {
      setLoading(true);
      await resetPassword(email, token, pw);
      toast.success("Password updated. You can now explore your account!");
      void navigate({
        to: "/dashboard"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "min-h-[calc(100vh-5rem)] grid lg:grid-cols-2 noise-bg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex relative overflow-hidden items-center justify-center p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-brand opacity-95" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-white max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-12 w-12 rounded-2xl bg-white/15 backdrop-blur items-center justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold leading-tight", children: "Create a new password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-white/85 leading-relaxed", children: "Pick something strong and unique. We'll sign you out from all devices for safety." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-6 md:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold tracking-tight", children: "Set a new password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: email ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "For ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: email })
      ] }) : "Choose a password you'll remember." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 space-y-4", onSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "New password", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: show ? "text" : "password", required: true, minLength: 10, value: pw, onChange: (e) => setPw(e.target.value), placeholder: "••••••••", className: "w-full bg-transparent text-sm font-medium focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((s) => !s), className: "text-muted-foreground hover:text-foreground", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordStrength, { password: pw, showRequirements: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Confirm password", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: show ? "text" : "password", required: true, value: confirm, onChange: (e) => setConfirm(e.target.value), placeholder: "••••••••", className: "w-full bg-transparent text-sm font-medium focus:outline-none" })
        ] }),
        confirm && pw !== confirm && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Passwords don't match" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: loading || !validation.isValid || pw !== confirm || !pw, className: "mt-4 w-full h-12 rounded-full gradient-brand text-white font-semibold shadow-[var(--shadow-glow)] inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform disabled:opacity-70 disabled:hover:translate-y-0", children: [
          loading ? "Updating..." : "Update password",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-sm text-center text-muted-foreground", children: [
        "Back to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-primary font-semibold", children: "Log in" })
      ] })
    ] }) })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 flex items-center gap-3 h-12 px-4 rounded-xl bg-muted border-2 border-transparent focus-within:border-primary focus-within:bg-background transition-colors", children })
  ] });
}
export {
  ResetPasswordPage as component
};
