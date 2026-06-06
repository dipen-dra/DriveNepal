import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, u as useLocation, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { I as useAuth, h as cn, C as ConfirmModal } from "./router-Dp1bmQ9H.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/react-oauth__google.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { k as Car, C as Calendar, ap as User, W as Mail, V as LogOut } from "../_libs/lucide-react.mjs";
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
const tabs = [{
  id: "overview",
  label: "Overview",
  icon: Car,
  path: "/dashboard/overview"
}, {
  id: "bookings",
  label: "My Bookings",
  icon: Calendar,
  path: "/dashboard/bookings"
}, {
  id: "profile",
  label: "Profile",
  icon: User,
  path: "/dashboard/profile"
}, {
  id: "queries",
  label: "My Queries",
  icon: Mail,
  path: "/dashboard/queries"
}];
function DashboardLayout() {
  const {
    user,
    logout,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  reactExports.useEffect(() => {
    if (!isLoading && user && user.role === "admin") {
      void navigate({
        to: "/admin"
      });
    }
  }, [user, isLoading, navigate]);
  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    void navigate({
      to: "/"
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-surface/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-ink", children: "Please log in to view your dashboard." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "mt-4 inline-flex h-11 px-6 items-center rounded-full gradient-brand text-white text-sm", children: "Login" })
    ] }) });
  }
  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-surface/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "flex items-center gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-16 w-16 rounded-full font-bold text-xl inline-flex items-center justify-center ring-4 ring-background shadow-card overflow-hidden", user.avatar ? "bg-background" : "gradient-brand text-white"), children: user.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.avatar, alt: "", className: "h-full w-full object-cover" }) : initials }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-ink", children: [
          "Welcome back, ",
          user.name.split(" ")[0]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your bookings and account." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[260px_1fr] gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:sticky lg:top-24 self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-2 shadow-soft", children: [
        tabs.map((t) => {
          const active = location.pathname.startsWith(t.path);
          const Icon = t.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: t.path, className: cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all", active ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]" : "text-foreground/70 hover:bg-muted"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
            t.label
          ] }, t.id);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmModal, { title: "Log out", description: "Are you sure you want to log out?", onConfirm: handleLogout, confirmText: "Log out", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/60 hover:bg-muted hover:text-destructive transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          " Logout"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] }) });
}
export {
  DashboardLayout as component
};
