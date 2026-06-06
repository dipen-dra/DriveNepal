import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQueryClient, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as cancelBooking, h as cn, C as ConfirmModal } from "./router-Dp1bmQ9H.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { C as Calendar, Y as MapPin, z as CreditCard } from "../_libs/lucide-react.mjs";
const statusStyle = {
  upcoming: "bg-primary/10 text-primary",
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive"
};
function BookingRow({ b }) {
  const queryClient = useQueryClient();
  const { mutate: cancel, isPending } = useMutation({
    mutationFn: () => cancelBooking(b._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      toast.success("Booking cancelled successfully");
    },
    onError: () => {
      toast.error("Failed to cancel booking");
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, className: "rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-card transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: b.vehicleImage, alt: "", className: "h-24 w-full md:w-36 rounded-xl object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: b.bookingId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles/$slug", params: { slug: b.vehicleSlug }, className: "font-display text-lg font-semibold text-ink hover:text-primary truncate block", children: b.vehicleName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize whitespace-nowrap", statusStyle[b.status]), children: b.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid sm:grid-cols-3 gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
          b.startDate,
          " → ",
          b.endDate
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          b.pickup
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-3.5 w-3.5" }),
          b.payment
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-ink", children: [
            "NPR ",
            b.total.toLocaleString()
          ] }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "· ",
            b.days,
            "d"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          b.status === "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConfirmModal,
            {
              title: "Cancel Booking",
              description: "Are you sure you want to cancel this booking? This action cannot be undone.",
              onConfirm: () => cancel(),
              confirmText: "Cancel Booking",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  disabled: isPending,
                  className: "h-10 px-4 rounded-xl border border-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/10 disabled:opacity-50",
                  children: isPending ? "Cancelling…" : "Cancel"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vehicles/$slug", params: { slug: b.vehicleSlug }, className: "h-8 px-3 inline-flex items-center rounded-full text-xs gradient-brand text-white", children: "View" })
        ] })
      ] })
    ] })
  ] }) });
}
function EmptyState({ icon: Icon, title, desc }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-10 w-10 mx-auto text-muted-foreground/60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-lg font-semibold text-ink", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: desc })
  ] });
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-4 animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-36 rounded-xl bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-1/3 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-1/2 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-2/3 bg-muted rounded" })
    ] })
  ] }) });
}
export {
  BookingRow as B,
  EmptyState as E,
  SkeletonCard as S
};
