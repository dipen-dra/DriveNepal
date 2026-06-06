import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { p as getAdminStats, q as getAllBookings, u as getVehicles, h as cn } from "./router-Dp1bmQ9H.mjs";
import { B as BookingTable } from "./BookingTable-_xPGakXp.mjs";
import "../_libs/react-oauth__google.mjs";
import "../_libs/sonner.mjs";
import { D as DollarSign, A as Activity, C as Calendar, k as Car, am as TrendingUp, c as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function OverviewTab() {
  const {
    data: statsData,
    isLoading
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
    refetchInterval: 3e4
  });
  const {
    data: bookingsData
  } = useQuery({
    queryKey: ["adminBookings"],
    queryFn: getAllBookings
  });
  const {
    data: vehiclesData
  } = useQuery({
    queryKey: ["vehicles", "all"],
    queryFn: () => getVehicles({})
  });
  const stats = statsData?.data;
  const recentBookings = (bookingsData?.data ?? []).slice(0, 5);
  const topVehicles = (vehiclesData?.data ?? []).slice(0, 5);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-2xl bg-muted" }, i)) });
  const kpis = [{
    label: "Revenue (NPR)",
    value: (stats?.revenue ?? 0).toLocaleString(),
    icon: DollarSign,
    accent: true
  }, {
    label: "Active rentals",
    value: stats?.activeBookings ?? 0,
    icon: Activity
  }, {
    label: "Total bookings",
    value: stats?.totalBookings ?? 0,
    icon: Calendar
  }, {
    label: "Fleet size",
    value: stats?.totalVehicles ?? 0,
    icon: Car
  }];
  const sparkData = stats?.dailyRevenue?.length ? stats.dailyRevenue.map((d) => d.revenue) : [42, 58, 51, 70, 64, 88, 96];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: kpis.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileHover: {
      y: -2
    }, className: cn("rounded-2xl border p-5 shadow-soft", k.accent ? "gradient-brand text-white border-transparent" : "bg-card border-border"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs uppercase tracking-wider", k.accent ? "text-white/80" : "text-muted-foreground"), children: k.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(k.icon, { className: cn("h-4 w-4", k.accent ? "text-white" : "text-primary") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-3 font-display text-2xl font-bold", k.accent ? "text-white" : "text-ink"), children: k.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("mt-1 text-xs inline-flex items-center gap-1", k.accent ? "text-white/90" : "text-emerald-600 dark:text-emerald-400"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
        " Live"
      ] })
    ] }, k.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-ink", children: "Revenue · last 7 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "NPR" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SparkBars, { data: sparkData })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-ink mb-4", children: "Top vehicles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: topVehicles.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 text-xs text-muted-foreground", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: v.image, alt: "", className: "h-9 w-9 rounded-lg object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-ink truncate", children: v.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              v.reviews,
              " reviews"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground" })
        ] }, v._id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card shadow-soft overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 pb-4 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-ink", children: "Recent bookings" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookingTable, { rows: recentBookings })
    ] })
  ] });
}
function SparkBars({
  data
}) {
  const max = Math.max(...data, 1);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 h-44", children: data.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      height: 0
    }, animate: {
      height: `${v / max * 100}%`
    }, transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: "easeOut"
    }, className: "w-full rounded-t-lg gradient-brand shadow-[var(--shadow-glow)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: days[i % 7] })
  ] }, i)) });
}
export {
  OverviewTab as component
};
