import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as getMyBookings, h as cn } from "./router-Dp1bmQ9H.mjs";
import { S as SkeletonCard, E as EmptyState, B as BookingRow } from "./UserBookingComponents-CnrFfbRc.mjs";
import "../_libs/react-oauth__google.mjs";
import "../_libs/sonner.mjs";
import { C as Calendar } from "../_libs/lucide-react.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function DashboardBookingsTab() {
  const {
    data: bookingsData,
    isLoading: loading
  } = useQuery({
    queryKey: ["myBookings"],
    queryFn: () => getMyBookings()
  });
  const bookings = bookingsData?.data ?? [];
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const filters = [{
    id: "all",
    label: "All"
  }, {
    id: "upcoming",
    label: "Upcoming"
  }, {
    id: "active",
    label: "Active"
  }, {
    id: "completed",
    label: "Completed"
  }, {
    id: "cancelled",
    label: "Cancelled"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-ink mb-4", children: "My bookings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(f.id), className: cn("h-9 px-4 rounded-full text-sm font-medium transition-colors", filter === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70 hover:bg-muted/70"), children: f.label }, f.id)) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: Calendar, title: "No bookings here", desc: "Try another filter or book a new ride." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(BookingRow, { b }, b._id)) })
  ] });
}
export {
  DashboardBookingsTab as component
};
