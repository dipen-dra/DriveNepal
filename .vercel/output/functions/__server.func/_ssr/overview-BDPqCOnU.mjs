import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as getMyBookings, h as cn } from "./router-Dp1bmQ9H.mjs";
import { S as SkeletonCard, E as EmptyState, B as BookingRow } from "./UserBookingComponents-CnrFfbRc.mjs";
import "../_libs/react-oauth__google.mjs";
import "../_libs/sonner.mjs";
import { k as Car, v as Clock, C as Calendar, z as CreditCard, p as ChevronRight } from "../_libs/lucide-react.mjs";
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
function DashboardOverviewTab() {
  const {
    data: bookingsData,
    isLoading: loading
  } = useQuery({
    queryKey: ["myBookings"],
    queryFn: () => getMyBookings()
  });
  const bookings = bookingsData?.data ?? [];
  const stats = {
    total: bookings.length,
    active: bookings.filter((b) => b.status === "active").length,
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    spend: bookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + b.total, 0)
  };
  const recent = bookings.slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total bookings", value: stats.total, icon: Car }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active now", value: stats.active, icon: Clock, accent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Upcoming", value: stats.upcoming, icon: Calendar }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Lifetime spend", value: `NPR ${stats.spend.toLocaleString()}`, icon: CreditCard })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-ink", children: "Recent bookings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cars", className: "text-sm text-primary font-medium inline-flex items-center gap-1", children: [
          "Book again ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: Car, title: "No bookings yet", desc: "Browse our fleet and book your first ride." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recent.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(BookingRow, { b }, b._id)) })
    ] })
  ] });
}
function StatCard({
  label,
  value,
  icon: Icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileHover: {
    y: -2
  }, className: cn("rounded-2xl border border-border p-5 shadow-soft", accent ? "gradient-brand text-white border-transparent" : "bg-card"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs uppercase tracking-wider", accent ? "text-white/80" : "text-muted-foreground"), children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-4 w-4", accent ? "text-white" : "text-primary") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-3 font-display text-2xl font-bold", accent ? "text-white" : "text-ink"), children: value })
  ] });
}
export {
  DashboardOverviewTab as component
};
