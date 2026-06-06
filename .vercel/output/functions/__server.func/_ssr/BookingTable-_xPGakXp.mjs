import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQueryClient, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { D as updateBookingStatus, k as deleteBooking, h as cn, C as ConfirmModal } from "./router-Dp1bmQ9H.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { al as Trash2 } from "../_libs/lucide-react.mjs";
const statusStyle = {
  upcoming: "bg-primary/10 text-primary",
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive"
};
function BookingTable({ rows, showActions }) {
  const queryClient = useQueryClient();
  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }) => updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      toast.success("Booking status updated");
    },
    onError: () => {
      toast.error("Failed to update booking status");
    }
  });
  const { mutate: doDelete } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      toast.success("Booking deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete booking");
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase tracking-wider text-muted-foreground bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Booking" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Customer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Vehicle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Dates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Total" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Status" }),
      showActions && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-muted/30 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium text-ink", children: b.bookingId }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-ink", children: b.customerName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: b.customerEmail })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: b.vehicleName }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-xs text-muted-foreground", children: [
        b.startDate,
        " → ",
        b.endDate
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-medium text-ink", children: [
        "NPR ",
        b.total.toLocaleString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: showActions ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: b.status,
          onChange: (e) => updateStatus({ id: b._id, status: e.target.value }),
          className: cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize border-0 focus:outline-none cursor-pointer", statusStyle[b.status]),
          children: ["upcoming", "active", "completed", "cancelled"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize", statusStyle[b.status]), children: b.status }) }),
      showActions && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConfirmModal,
        {
          title: "Delete Booking",
          description: "Are you sure you want to permanently delete this booking?",
          onConfirm: () => doDelete(b._id),
          confirmText: "Delete",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-destructive/10 text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        }
      ) })
    ] }, b._id)) })
  ] });
}
export {
  BookingTable as B
};
