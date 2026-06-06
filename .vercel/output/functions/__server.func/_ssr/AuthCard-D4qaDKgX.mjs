import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, g as useSearch, L as Link } from "../_libs/tanstack__react-router.mjs";
import { G as GoogleLogin } from "../_libs/react-oauth__google.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { I as useAuth, w as logo, A as ApiError } from "./router-Dp1bmQ9H.mjs";
import { P as PasswordStrength } from "./PasswordStrength-bc7evql9.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { q as CircleAlert, r as CircleCheck, ap as User, W as Mail, I as EyeOff, H as Eye, U as Lock, b as ArrowRight } from "../_libs/lucide-react.mjs";
function AuthCard({
  title,
  subtitle,
  mode,
  footer
}) {
  const { login, signup, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const [show, setShow] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(search.registered ? "Account created successfully. Please log in." : null);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const user = await login(email, password);
        toast.success("Successfully logged in!");
        if (user.role === "admin") {
          void navigate({ to: "/admin" });
        } else {
          void navigate({ to: "/dashboard" });
        }
      } else {
        await signup(name, email, password);
        toast.success("Account created successfully!");
        void navigate({ to: "/login", search: { registered: true } });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors?.[0]?.msg ?? err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSuccess = async (credentialResponse) => {
    setError(null);
    try {
      if (credentialResponse.credential) {
        const user = await googleSignIn(credentialResponse.credential);
        toast.success("Google Sign-In successful!");
        if (user.role === "admin") {
          void navigate({ to: "/admin" });
        } else {
          void navigate({ to: "/dashboard" });
        }
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors?.[0]?.msg ?? err.message);
      } else {
        setError("Google authentication failed. Please try again.");
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "min-h-[calc(100vh-5rem)] grid lg:grid-cols-2 noise-bg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex relative overflow-hidden items-center justify-center p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-brand opacity-95" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-white max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-12 w-12 rounded-2xl bg-white/15 backdrop-blur items-center justify-center font-bold text-2xl mb-8", children: "D" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl font-bold leading-tight", children: [
          "Drive luxury.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Ride freedom."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-white/85 leading-relaxed", children: "From the lakes of Pokhara to the streets of Thamel, your next adventure starts with the right ride." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "120+", v: "Vehicles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "10k+", v: "Happy trips" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "4.9★", v: "Avg rating" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-6 md:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-block mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "DriveNepal", className: "h-8 md:h-10 w-auto" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold tracking-tight", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: subtitle }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          className: "mt-4 flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
            error
          ]
        }
      ),
      success && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          className: "mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 shrink-0" }),
            success
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 space-y-4", onSubmit: handleSubmit, children: [
        mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "Aayush Karki",
            required: true,
            className: "w-full bg-transparent text-sm font-medium focus:outline-none"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "you@email.com",
            required: true,
            className: "w-full bg-transparent text-sm font-medium focus:outline-none"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Password", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: show ? "text" : "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "••••••••",
              required: true,
              minLength: 10,
              className: "w-full bg-transparent text-sm font-medium focus:outline-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((s) => !s), className: "text-muted-foreground hover:text-foreground", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
        ] }),
        mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordStrength, { password, showRequirements: true }),
        mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 text-muted-foreground cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "accent-primary" }),
            " Remember me"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "text-primary font-medium hover:underline", children: "Forgot password?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "mt-2 w-full h-12 rounded-full gradient-brand text-white font-semibold shadow-[var(--shadow-glow)] inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" }),
              mode === "login" ? "Logging in…" : "Creating account…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              mode === "login" ? "Log in" : "Create account",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
          " or continue with ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          GoogleLogin,
          {
            onSuccess: handleGoogleSuccess,
            onError: () => setError("Google authentication failed."),
            useOneTap: true,
            theme: "outline",
            shape: "pill",
            size: "large",
            text: mode === "login" ? "signin_with" : "signup_with"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-sm text-center text-muted-foreground", children: footer })
    ] }) })
  ] });
}
function Field({ label, icon, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 flex items-center gap-3 h-12 px-4 rounded-xl bg-muted border-2 border-transparent focus-within:border-primary focus-within:bg-background transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon }),
      children
    ] })
  ] });
}
function Stat({ k, v }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70 mt-1", children: v })
  ] });
}
export {
  AuthCard as A
};
