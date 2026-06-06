import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { I as useAuth, B as submitQuery } from "./router-Dp1bmQ9H.mjs";
import "../_libs/react-oauth__google.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { a3 as Phone, W as Mail, Y as MapPin, aa as Send } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
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
function ContactPage() {
  const {
    user
  } = useAuth();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await submitQuery({
        name,
        email,
        subject,
        message
      });
      if (res.success) {
        toast.success("Message sent successfully! We will get back to you soon.");
        setSubject("");
        setMessage("");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-16 md:py-24 grid lg:grid-cols-2 gap-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl md:text-5xl font-bold tracking-tight", children: "Let's talk wheels." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-md", children: "Have a question, want a custom rental, or building something exciting? We respond within an hour." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-4", children: [{
        icon: Phone,
        k: "Call us",
        v: "+977 1 4444 555"
      }, {
        icon: Mail,
        k: "Email",
        v: "hello@drivenepal.com"
      }, {
        icon: MapPin,
        k: "Headquarters",
        v: "Thamel, Kathmandu, Nepal"
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-5 rounded-2xl bg-surface border border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-full gradient-brand text-white inline-flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: c.k }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-ink", children: c.v })
        ] })
      ] }, c.k)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.form, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: 0.1
    }, onSubmit: handleSubmit, className: "rounded-3xl border border-border/60 bg-card p-8 space-y-5 h-fit", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Send a message" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Your name", value: name, onChange: (e) => setName(e.target.value), className: "mt-1 w-full h-12 px-4 rounded-xl bg-muted border border-border/40 focus:border-primary focus:outline-none text-sm font-medium text-ink", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "you@email.com", value: email, onChange: (e) => setEmail(e.target.value), className: "mt-1 w-full h-12 px-4 rounded-xl bg-muted border border-border/40 focus:border-primary focus:outline-none text-sm font-medium text-ink", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Subject" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "How can we help?", value: subject, onChange: (e) => setSubject(e.target.value), className: "mt-1 w-full h-12 px-4 rounded-xl bg-muted border border-border/40 focus:border-primary focus:outline-none text-sm font-medium text-ink", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, placeholder: "Tell us more…", value: message, onChange: (e) => setMessage(e.target.value), className: "mt-1 w-full p-4 rounded-2xl bg-muted border border-border/40 focus:border-primary focus:outline-none text-sm text-ink", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: isSubmitting, className: "w-full h-12 rounded-full gradient-brand text-white font-semibold inline-flex items-center justify-center shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:pointer-events-none", children: [
        isSubmitting ? "Sending..." : "Send",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "ml-2 h-4 w-4" })
      ] })
    ] })
  ] });
}
export {
  ContactPage as component
};
