import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useLocation, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { I as useAuth, h as cn } from "./router-Dp1bmQ9H.mjs";
import "../_libs/react-oauth__google.mjs";
import "../_libs/sonner.mjs";
import { ac as Shield, l as ChartColumn, k as Car, C as Calendar, ar as Users, W as Mail } from "../_libs/lucide-react.mjs";
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
const tabs = [{
  id: "overview",
  label: "Overview",
  icon: ChartColumn,
  path: "/admin/overview"
}, {
  id: "vehicles",
  label: "Vehicles",
  icon: Car,
  path: "/admin/vehicles"
}, {
  id: "bookings",
  label: "Bookings",
  icon: Calendar,
  path: "/admin/bookings"
}, {
  id: "users",
  label: "Users",
  icon: Users,
  path: "/admin/users"
}, {
  id: "queries",
  label: "Queries",
  icon: Mail,
  path: "/admin/queries"
}];
function AdminLayout() {
  const {
    user
  } = useAuth();
  const location = useLocation();
  if (!user || user.role !== "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-12 w-12 mx-auto text-muted-foreground/50 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-ink", children: "Admin access required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "You don't have permission to view this page." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-4 inline-flex h-11 px-6 items-center rounded-full gradient-brand text-white text-sm", children: "Go home" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-surface/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-white shadow-[var(--shadow-glow)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold text-ink", children: "Admin Console" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manage fleet, bookings, and customers" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hidden md:inline-flex h-10 px-4 items-center rounded-full text-sm border border-border hover:bg-muted", children: "View site" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-6 border-b border-border overflow-x-auto", children: tabs.map((t) => {
      const Icon = t.icon;
      const active = location.pathname.startsWith(t.path);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: t.path, className: cn("relative px-4 py-3 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors", active ? "text-primary" : "text-foreground/60 hover:text-foreground"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        t.label,
        active && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { layoutId: "admin-tab", className: "absolute -bottom-px left-0 right-0 h-0.5 bg-primary" })
      ] }, t.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] }) });
}
export {
  AdminLayout as component
};
