import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as getAllUsers, F as updateUserStatus, l as deleteUser, h as cn, C as ConfirmModal } from "./router-Dp1bmQ9H.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/react-oauth__google.mjs";
import { u as CircleX, s as CircleCheckBig, al as Trash2 } from "../_libs/lucide-react.mjs";
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
function UsersTab() {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: getAllUsers
  });
  const users = data?.data ?? [];
  const {
    mutate: toggleStatus
  } = useMutation({
    mutationFn: ({
      id,
      isActive
    }) => updateUserStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminUsers"]
      });
      toast.success("User status updated successfully");
    },
    onError: () => toast.error("Failed to update user status")
  });
  const {
    mutate: doDelete
  } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminUsers"]
      });
      toast.success("User deleted successfully");
    },
    onError: () => toast.error("Failed to delete user")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card shadow-soft overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-muted-foreground", children: "Loading…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-left text-xs uppercase tracking-wider text-muted-foreground bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "User" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Bookings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Role" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Joined" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-muted/30 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-9 w-9 rounded-full inline-flex items-center justify-center text-xs font-semibold overflow-hidden shrink-0", u.avatar ? "bg-background" : "gradient-brand text-white"), children: u.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: u.avatar, alt: u.name, className: "h-full w-full object-cover" }) : u.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-ink", children: u.name })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground", children: u.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: u.bookingsCount ?? 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 capitalize", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs font-semibold px-2.5 py-1 rounded-full", u.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"), children: u.role }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-xs text-muted-foreground", children: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize", u.isActive !== false ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-destructive/10 text-destructive"), children: u.isActive !== false ? "Active" : "Suspended" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmModal, { title: u.isActive !== false ? "Suspend User" : "Activate User", description: `Are you sure you want to ${u.isActive !== false ? "suspend" : "activate"} this user?`, onConfirm: () => toggleStatus({
          id: u._id,
          isActive: u.isActive === false
        }), confirmText: u.isActive !== false ? "Suspend" : "Activate", variant: u.isActive !== false ? "destructive" : "default", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-muted", title: u.isActive !== false ? "Suspend" : "Activate", children: u.isActive !== false ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 text-emerald-500" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmModal, { title: "Delete User", description: "Are you sure you want to permanently delete this user?", onConfirm: () => doDelete(u._id), confirmText: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-destructive/10 text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) })
      ] }) })
    ] }, u._id)) })
  ] }) });
}
export {
  UsersTab as component
};
