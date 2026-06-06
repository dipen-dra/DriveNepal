import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, b as useQueryClient, a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, e as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent, f as useRouterState, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { E as notFound, F as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as GoogleOAuthProvider } from "../_libs/react-oauth__google.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root2, b as Trigger2, P as Portal2, a as Content2, T as Title2, D as Description2, C as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useScroll, a as useTransform, m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { ac as Shield, S as LayoutDashboard, V as LogOut, as as X, Z as Menu, J as Facebook, Q as Instagram, ao as Twitter, at as Youtube, a3 as Phone, W as Mail, Y as MapPin, aj as Sun, $ as Moon, f as Bell, n as CheckCheck, _ as MessageSquare, an as TriangleAlert, ak as Tag, z as CreditCard, i as CalendarCheck, m as Check, ab as Settings2, al as Trash2, u as CircleX } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const appCss = "/assets/styles-B7SKFagO.css";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ThemeCtx = reactExports.createContext({ theme: "light", toggle: () => {
} });
function ThemeProvider({ children }) {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const stored = typeof localStorage !== "undefined" && localStorage.getItem("dn-theme");
    const prefers = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefers ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggle = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("dn-theme", next);
      } catch {
      }
      return next;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeCtx.Provider, { value: { theme, toggle }, children });
}
const useTheme = () => reactExports.useContext(ThemeCtx);
function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: toggle,
      "aria-label": "Toggle theme",
      className: `relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-foreground/70 transition-colors ${className}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: { rotate: -90, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: 90, opacity: 0 }, transition: { duration: 0.2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) }, "sun") : /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: { rotate: 90, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: -90, opacity: 0 }, transition: { duration: 0.2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" }) }, "moon") })
    }
  );
}
const BASE = typeof window === "undefined" ? "http://localhost:5001/api" : "/api";
class ApiError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = "ApiError";
  }
  status;
  errors;
}
async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers || {} },
    credentials: "include",
    ...options
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      res.status,
      data.message || "Something went wrong",
      data.errors
    );
  }
  return data;
}
const loginUser = (email, password) => request("/auth/login", {
  method: "POST",
  body: JSON.stringify({ email, password })
});
const registerUser = (name, email, password) => request("/auth/register", {
  method: "POST",
  body: JSON.stringify({ name, email, password })
});
const googleLogin = (credential) => request("/auth/google", {
  method: "POST",
  body: JSON.stringify({ credential })
});
const logoutUser = () => request("/auth/logout", { method: "POST" });
const getMe = () => request("/auth/me");
const forgotPassword = (email) => request("/auth/forgot-password", {
  method: "POST",
  body: JSON.stringify({ email })
});
const verifyOtp = (email, otp) => request("/auth/verify-otp", {
  method: "POST",
  body: JSON.stringify({ email, otp })
});
const resetPassword = (email, otp, password) => request("/auth/reset-password", {
  method: "POST",
  body: JSON.stringify({ email, otp, password })
});
const getVehicles = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== void 0 && v !== "") params.set(k, String(v));
  });
  const qs = params.toString();
  return request(`/vehicles${qs ? `?${qs}` : ""}`);
};
const getVehicle = (slug) => request(`/vehicles/${slug}`);
const createVehicle = async (data) => {
  const res = await fetch(`${BASE}/vehicles`, {
    method: "POST",
    credentials: "include",
    body: data
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, json.message || "Failed to create vehicle");
  return json;
};
const updateVehicle = async (id, data) => {
  const res = await fetch(`${BASE}/vehicles/${id}`, {
    method: "PUT",
    credentials: "include",
    body: data
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, json.message || "Failed to update vehicle");
  return json;
};
const deleteVehicle = (id) => request(`/vehicles/${id}`, { method: "DELETE" });
const getNotifications = () => request("/notifications");
const markNotificationRead = (id) => request(`/notifications/${id}/read`, { method: "PATCH" });
const markAllNotificationsRead = () => request("/notifications/read-all", { method: "PATCH" });
const getMyBookings = (status) => {
  const qs = "";
  return request(`/bookings${qs}`);
};
const createBooking = (payload) => request("/bookings", {
  method: "POST",
  body: JSON.stringify(payload)
});
const cancelBooking = (id) => request(`/bookings/${id}/cancel`, { method: "PATCH" });
const getAllBookings = () => request("/bookings/admin/all");
const updateBookingStatus = (id, status) => request(`/bookings/admin/${id}/status`, {
  method: "PATCH",
  body: JSON.stringify({ status })
});
const deleteBooking = (id) => request(`/bookings/admin/${id}`, { method: "DELETE" });
const updateProfile = (data) => request("/users/me", {
  method: "PUT",
  body: JSON.stringify(data)
});
const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${BASE}/users/profile/avatar`, {
    method: "PATCH",
    headers: {
      // Don't set Content-Type here, let the browser set it with the boundary for FormData
    },
    credentials: "include",
    body: formData
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, data.message || "Avatar upload failed");
  }
  return data;
};
const changePassword = (currentPassword, newPassword) => request("/users/me/password", {
  method: "PUT",
  body: JSON.stringify({ currentPassword, newPassword })
});
const getAllUsers = () => request("/users/admin/all");
const updateUserStatus = (id, isActive) => request(`/users/admin/${id}/status`, {
  method: "PATCH",
  body: JSON.stringify({ isActive })
});
const deleteUser = (id) => request(`/users/admin/${id}`, { method: "DELETE" });
const getAdminStats = () => request("/admin/stats");
async function initiateEsewaPayment(bookingData) {
  return request("/payment/esewa/initiate", {
    method: "POST",
    body: JSON.stringify({ bookingData })
  });
}
async function verifyEsewaPayment(data) {
  return request(`/payment/esewa/verify?data=${encodeURIComponent(data)}`, { method: "GET" });
}
async function verifyKhaltiPayment(token, amount, bookingData) {
  return request("/payment/khalti/verify", {
    method: "POST",
    body: JSON.stringify({ token, amount, bookingData })
  });
}
const submitQuery = (payload) => request("/queries", {
  method: "POST",
  body: JSON.stringify(payload)
});
const getAdminQueries = () => request("/queries/admin/all");
const getUserQueries = () => request("/queries/me");
const replyToQuery = (id, reply) => request(`/queries/admin/${id}/reply`, {
  method: "POST",
  body: JSON.stringify({ reply })
});
const meta = {
  booking: { icon: CalendarCheck, tint: "bg-primary/10 text-primary" },
  payment: { icon: CreditCard, tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  promo: { icon: Tag, tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  alert: { icon: TriangleAlert, tint: "bg-destructive/10 text-destructive" },
  message: { icon: MessageSquare, tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400" }
};
function formatTime(dateString) {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}
function NotificationCenter() {
  const [open, setOpen] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("all");
  const rootRef = reactExports.useRef(null);
  const queryClient = useQueryClient();
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await getNotifications();
      return res.data;
    },
    // Poll every 30 seconds for new notifications
    refetchInterval: 3e4
  });
  const markReadMutation = useMutation({
    mutationFn: markNotificationRead,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const prev = queryClient.getQueryData(["notifications"]);
      queryClient.setQueryData(
        ["notifications"],
        (old) => old?.map((n) => n._id === id ? { ...n, read: true } : n)
      );
      return { prev };
    },
    onError: (_err, _id, context) => {
      if (context?.prev) queryClient.setQueryData(["notifications"], context.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["notifications"] })
  });
  const markAllMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const prev = queryClient.getQueryData(["notifications"]);
      queryClient.setQueryData(
        ["notifications"],
        (old) => old?.map((n) => ({ ...n, read: true }))
      );
      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) queryClient.setQueryData(["notifications"], context.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["notifications"] })
  });
  const unread = notifications.filter((i) => !i.read).length;
  const visible = filter === "unread" ? notifications.filter((i) => !i.read) : notifications;
  reactExports.useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const markAll = () => markAllMutation.mutate();
  const markOne = (id) => markReadMutation.mutate(id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: rootRef, className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setOpen((s) => !s),
        "aria-label": "Notifications",
        "aria-expanded": open,
        className: "relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-foreground/70 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
          unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white ring-2 ring-background", children: unread > 9 ? "9+" : unread })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.98 },
        transition: { duration: 0.18 },
        className: "absolute right-0 mt-2 w-[22rem] max-w-[calc(100vw-2rem)] origin-top-right rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl overflow-hidden z-50",
        role: "dialog",
        "aria-label": "Notifications",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 pt-4 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold", children: "Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: unread > 0 ? `${unread} unread` : "You're all caught up" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: markAll,
                disabled: unread === 0 || markAllMutation.isPending,
                className: "inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-3.5 w-3.5" }),
                  " Mark all read"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-2 flex items-center gap-1", children: ["all", "unread"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setFilter(f),
              className: cn(
                "px-3 h-7 rounded-full text-xs font-medium transition-colors capitalize",
                filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70 hover:bg-muted/70"
              ),
              children: [
                f,
                f === "unread" && unread > 0 ? ` · ${unread}` : ""
              ]
            },
            f
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "max-h-[26rem] overflow-y-auto divide-y divide-border", children: [
            visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "px-6 py-10 text-center text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "mx-auto mb-3 h-8 w-8 opacity-40" }),
              "Nothing here yet."
            ] }),
            visible.map((n) => {
              const Icon = meta[n.type].icon;
              const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("group flex gap-3 px-4 py-3 transition-colors hover:bg-muted/60", !n.read && "bg-primary/5"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", meta[n.type].tint), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold leading-tight truncate", children: n.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground shrink-0", children: formatTime(n.createdAt) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground line-clamp-2", children: n.body })
                ] }),
                !n.read && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      markOne(n._id);
                    },
                    "aria-label": "Mark as read",
                    className: "self-center inline-flex h-6 w-6 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 hover:bg-background border border-border transition-opacity",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" })
                  }
                ),
                !n.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "self-center h-2 w-2 rounded-full bg-primary shrink-0 group-hover:hidden", "aria-hidden": true })
              ] });
              return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: n.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: n.href, onClick: () => {
                if (!n.read) markOne(n._id);
                setOpen(false);
              }, className: "block", children: content }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => {
                if (!n.read) markOne(n._id);
              }, className: "cursor-pointer", children: content }) }, n._id);
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", onClick: () => setOpen(false), className: "text-xs font-medium text-primary hover:underline", children: "View all" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", onClick: () => setOpen(false), className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-3.5 w-3.5" }),
              " Preferences"
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
const AuthContext = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const refreshUser = reactExports.useCallback(async () => {
    try {
      const res = await getMe();
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    refreshUser();
  }, [refreshUser]);
  const login = reactExports.useCallback(async (email, password) => {
    const res = await loginUser(email, password);
    setUser(res.user);
    return res.user;
  }, []);
  const signup = reactExports.useCallback(async (name, email, password) => {
    const res = await registerUser(name, email, password);
    setUser(res.user);
    return res.user;
  }, []);
  const googleSignIn = reactExports.useCallback(async (credential) => {
    const res = await googleLogin(credential);
    setUser(res.user);
    return res.user;
  }, []);
  const logout = reactExports.useCallback(async () => {
    await logoutUser().catch(() => {
    });
    setUser(null);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AuthContext.Provider,
    {
      value: {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        googleSignIn,
        logout,
        refreshUser,
        setUser
      },
      children
    }
  );
}
function useAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
const logo = "/assets/logo-D8L0VLG3.png";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const AlertDialog = Root2;
const AlertDialogTrigger = Trigger2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
function ConfirmModal({
  children,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "destructive"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: cancelText }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AlertDialogAction,
          {
            onClick: () => {
              onConfirm();
            },
            className: variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "",
            children: [
              confirmText.toLowerCase().includes("log out") ? /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }) : null,
              confirmText.toLowerCase().includes("delete") ? /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }) : null,
              confirmText.toLowerCase().includes("cancel") ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mr-2 h-4 w-4" }) : null,
              !confirmText.toLowerCase().includes("log out") && !confirmText.toLowerCase().includes("delete") && !confirmText.toLowerCase().includes("cancel") && variant === "destructive" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mr-2 h-4 w-4" }) : null,
              confirmText
            ]
          }
        )
      ] })
    ] })
  ] });
}
const nav = [
  { to: "/", label: "Home" },
  { to: "/cars", label: "Cars" },
  { to: "/bikes", label: "Bikes" },
  { to: "/locations", label: "Locations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];
function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const [userMenuOpen, setUserMenuOpen] = reactExports.useState(false);
  const { location } = useRouterState();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 24));
    return () => unsub();
  }, [scrollY]);
  reactExports.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  const blur = useTransform(scrollY, [0, 100], [0, 14]);
  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    void navigate({ to: "/" });
  };
  const initials = user?.name ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : "?";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.header,
    {
      style: { backdropFilter: blur.get() ? `saturate(160%) blur(${blur.get()}px)` : void 0 },
      className: cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgb(15_23_42_/_0.06)] border-b border-border/60" : "bg-transparent"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page flex h-16 md:h-20 items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "DriveNepal Logo", className: "h-9 w-9 object-contain transition-transform group-hover:scale-105" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl font-semibold tracking-tight text-ink", children: [
              "Drive",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Nepal" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-1", children: nav.map((n) => {
            const active = location.pathname === n.to || n.to !== "/" && location.pathname.startsWith(n.to);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: n.to,
                className: cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  active ? "text-primary" : "text-foreground/70 hover:text-foreground"
                ),
                children: [
                  n.label,
                  active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.span,
                    {
                      layoutId: "nav-pill",
                      className: "absolute inset-0 -z-10 rounded-full bg-primary/10",
                      transition: { type: "spring", stiffness: 380, damping: 30 }
                    }
                  )
                ]
              },
              n.to
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-muted animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-muted animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-20 rounded-full bg-muted animate-pulse" })
            ] }) : isAuthenticated && user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              user.role === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/admin",
                  className: "hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-foreground/70 transition-colors",
                  "aria-label": "Admin Console",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/dashboard",
                  className: "hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-foreground/70 transition-colors",
                  "aria-label": "Dashboard",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationCenter, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden md:block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setUserMenuOpen((s) => !s),
                    className: cn("h-9 w-9 rounded-full font-semibold text-sm inline-flex items-center justify-center shadow-sm ring-1 ring-border hover:ring-primary/50 hover:opacity-90 transition-all", user.avatar ? "bg-background p-0.5" : "gradient-brand text-white"),
                    children: user.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.avatar, alt: "", className: "h-full w-full rounded-full object-cover" }) : initials
                  }
                ),
                userMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40", onClick: () => setUserMenuOpen(false) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -8 },
                      animate: { opacity: 1, y: 0 },
                      className: "absolute right-0 top-12 w-48 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] p-2 z-50",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 border-b border-border mb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-ink truncate", children: user.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: user.email })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", onClick: () => setUserMenuOpen(false), className: "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-3.5 w-3.5" }),
                          " Dashboard"
                        ] }),
                        user.role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", onClick: () => setUserMenuOpen(false), className: "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5" }),
                          " Admin Panel"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ConfirmModal,
                          {
                            title: "Log out",
                            description: "Are you sure you want to log out of your account?",
                            onConfirm: handleLogout,
                            confirmText: "Log out",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-destructive/10 text-destructive transition-colors", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
                              " Logout"
                            ] })
                          }
                        )
                      ]
                    }
                  )
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-foreground/70 transition-colors", "aria-label": "Dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationCenter, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "hidden md:inline-flex h-10 items-center px-4 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground transition-colors", children: "Login" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "hidden md:inline-flex h-10 items-center px-5 rounded-full text-sm font-medium gradient-brand text-white shadow-[var(--shadow-glow)] hover:shadow-lg hover:-translate-y-0.5 transition-all", children: "Sign up" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setOpen((s) => !s),
                className: "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted",
                "aria-label": "Menu",
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
              }
            )
          ] })
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "lg:hidden border-t border-border bg-background/95 backdrop-blur-xl",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-4 flex flex-col gap-1", children: [
              nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: n.to, className: "px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-muted", children: n.label }, n.to)),
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-3 border-t border-border mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-11 rounded-full bg-muted animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-11 rounded-full bg-muted animate-pulse" })
              ] }) : isAuthenticated && user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: user.role === "admin" ? "/admin" : "/dashboard", className: "flex-1 h-11 inline-flex items-center justify-center rounded-full border border-border text-sm font-medium", children: user.role === "admin" ? "Admin Console" : "Dashboard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ConfirmModal,
                  {
                    title: "Log out",
                    description: "Are you sure you want to log out?",
                    onConfirm: handleLogout,
                    confirmText: "Log out",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex-1 h-11 inline-flex items-center justify-center rounded-full gradient-brand text-white text-sm font-medium", children: "Logout" })
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "flex-1 h-11 inline-flex items-center justify-center rounded-full border border-border text-sm font-medium", children: "Login" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "flex-1 h-11 inline-flex items-center justify-center rounded-full gradient-brand text-white text-sm font-medium", children: "Sign up" })
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-32 bg-[oklch(0.21_0.05_260)] text-white/80", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "DriveNepal Logo", className: "h-9 w-9 object-contain" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-semibold text-white", children: "DriveNepal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-white/60", children: "Premium car and bike rentals across Nepal. Drive luxury, ride freedom." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [Facebook, Instagram, Twitter, Youtube].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold mb-4", children: "Company" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-white", children: "About" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-white", children: "Contact" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/careers", className: "hover:text-white", children: "Careers" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/press", className: "hover:text-white", children: "Press" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold mb-4", children: "Explore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cars", className: "hover:text-white", children: "Cars" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bikes", className: "hover:text-white", children: "Bikes" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/locations", className: "hover:text-white", children: "Locations" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/help", className: "hover:text-white", children: "Help Center" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold mb-4", children: "Stay in the loop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60 mb-3", children: "Weekly drops on new fleet and deals." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              placeholder: "you@email.com",
              className: "flex-1 h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-11 px-5 rounded-full gradient-brand text-white text-sm font-medium", children: "Join" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2 text-xs text-white/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
            " +977 1 4444 555"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
            " hello@drivenepal.com"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " Thamel, Kathmandu"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " DriveNepal. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "hover:text-white", children: "Terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "hover:text-white", children: "Privacy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cookies", className: "hover:text-white", children: "Cookies" })
      ] })
    ] }) })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-8xl font-bold text-gradient", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-2xl font-semibold text-ink", children: "Lost in the hills" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The road you're looking for doesn't exist. Let's get you back on track." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex h-11 px-6 items-center justify-center rounded-full gradient-brand text-white text-sm font-medium shadow-[var(--shadow-glow)]",
        children: "Drive home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold text-ink", children: "Something went sideways" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-2 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "h-10 px-5 rounded-full gradient-brand text-white text-sm font-medium",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "h-10 px-5 inline-flex items-center rounded-full border border-border text-sm font-medium", children: "Go home" })
    ] })
  ] }) });
}
const Route$A = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DriveNepal — Premium Car & Bike Rentals Across Nepal" },
      { name: "description", content: "Rent luxury cars, SUVs and bikes across Nepal. Instant booking, transparent pricing, Khalti & eSewa supported." },
      { name: "theme-color", content: "#5D8BF4" },
      { property: "og:title", content: "DriveNepal — Premium Car & Bike Rentals" },
      { property: "og:description", content: "Drive luxury, ride freedom. Premium rentals across Nepal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "icon", type: "image/png", href: logo },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$A.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleOAuthProvider, { clientId: "583516832517-i1vcusmsiafecllognh1k63rh2dbrfq0.apps.googleusercontent.com", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pt-16 md:pt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] }) }) }) }) });
}
const $$splitComponentImporter$x = () => import("./terms-DvjpIgOe.mjs");
const Route$z = createFileRoute("/terms")({
  head: () => ({
    meta: [{
      title: "Terms of Service — DriveNepal"
    }, {
      name: "description",
      content: "Terms, rental conditions, renter liability, and safety guidelines for renting with DriveNepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
async function requireAuth({ location }) {
  if (typeof window === "undefined") return { user: null };
  try {
    const res = await getMe();
    return { user: res.user };
  } catch {
    throw redirect({
      to: "/login",
      search: { redirect: location.href }
    });
  }
}
async function requireAdmin({ location }) {
  if (typeof window === "undefined") return { user: null };
  try {
    const res = await getMe();
    if (res.user.role !== "admin") {
      throw redirect({ to: "/" });
    }
    return { user: res.user };
  } catch (err) {
    if (err.isRedirect) throw err;
    throw redirect({
      to: "/login",
      search: { redirect: location.href }
    });
  }
}
async function redirectIfLoggedIn() {
  if (typeof window === "undefined") return;
  try {
    const res = await getMe();
    if (res.user.role === "admin") {
      throw redirect({ to: "/admin" });
    }
    throw redirect({ to: "/dashboard" });
  } catch (err) {
    if (err.isRedirect) throw err;
  }
}
const $$splitComponentImporter$w = () => import("./signup-DYogj2lf.mjs");
const Route$y = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Sign up — DriveNepal"
    }]
  }),
  beforeLoad: redirectIfLoggedIn,
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./reset-password-C2UfrzOB.mjs");
const Route$x = createFileRoute("/reset-password")({
  validateSearch: (s) => ({
    token: typeof s.token === "string" ? s.token : void 0,
    email: typeof s.email === "string" ? s.email : void 0
  }),
  head: () => ({
    meta: [{
      title: "Reset password — DriveNepal"
    }, {
      name: "description",
      content: "Choose a new password for your DriveNepal account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./privacy-DIiZYsvH.mjs");
const Route$w = createFileRoute("/privacy")({
  head: () => ({
    meta: [{
      title: "Privacy Policy — DriveNepal"
    }, {
      name: "description",
      content: "Learn about how we securely store and verify your driver's licenses, booking info, and profile details."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./press-DyZW1Ddw.mjs");
const Route$v = createFileRoute("/press")({
  head: () => ({
    meta: [{
      title: "Press & Media Kit — DriveNepal"
    }, {
      name: "description",
      content: "Latest press releases, media kits, and brand assets for DriveNepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./otp-verification-K-YLJsv5.mjs");
const Route$u = createFileRoute("/otp-verification")({
  validateSearch: (s) => ({
    email: typeof s.email === "string" ? s.email : void 0
  }),
  head: () => ({
    meta: [{
      title: "Verify OTP — DriveNepal"
    }, {
      name: "description",
      content: "Enter the 6-digit verification code sent to your email."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./login-DFaipsej.mjs");
const Route$t = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Login — DriveNepal"
    }]
  }),
  beforeLoad: redirectIfLoggedIn,
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./locations-Ca5HQZHr.mjs");
const Route$s = createFileRoute("/locations")({
  head: () => ({
    meta: [{
      title: "Locations — DriveNepal"
    }, {
      name: "description",
      content: "Rent cars and bikes across Nepal. Premium pickups in Kathmandu, Pokhara, Mustang, and more."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./help-h4175PWv.mjs");
const Route$r = createFileRoute("/help")({
  head: () => ({
    meta: [{
      title: "Help Center & FAQs — DriveNepal"
    }, {
      name: "description",
      content: "Frequently asked questions and support for renting cars and bikes in Nepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./forgot-password-Bv-8VQc2.mjs");
const Route$q = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{
      title: "Forgot password — DriveNepal"
    }, {
      name: "description",
      content: "Reset your DriveNepal account password securely."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./dashboard-Bm8mYHQz.mjs");
const Route$p = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — DriveNepal"
    }]
  }),
  beforeLoad: requireAuth,
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./cookies-kaPYAMFG.mjs");
const Route$o = createFileRoute("/cookies")({
  head: () => ({
    meta: [{
      title: "Cookies Policy — DriveNepal"
    }, {
      name: "description",
      content: "Details on how DriveNepal uses cookies to manage booking checkouts, security sessions, and preferences."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./contact-BYXd2nEC.mjs");
const Route$n = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — DriveNepal"
    }, {
      name: "description",
      content: "Get in touch with the DriveNepal team. We respond within an hour."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./cars-B5GiP_5C.mjs");
const Route$m = createFileRoute("/cars")({
  head: () => ({
    meta: [{
      title: "Rent a Car in Nepal — DriveNepal"
    }, {
      name: "description",
      content: "Browse premium cars for rent across Nepal — economy, SUV, luxury, sports, and electric."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./careers-iLhhYeOU.mjs");
const Route$l = createFileRoute("/careers")({
  head: () => ({
    meta: [{
      title: "Careers — DriveNepal"
    }, {
      name: "description",
      content: "Join our team at DriveNepal. Build the future of premium car and bike rentals."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./bikes-DVujPEKh.mjs");
const Route$k = createFileRoute("/bikes")({
  head: () => ({
    meta: [{
      title: "Rent a Bike in Nepal — DriveNepal"
    }, {
      name: "description",
      content: "Adventure, sports, cruiser, and scooter rentals across Nepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./admin-B63rm3Mo.mjs");
const Route$j = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — DriveNepal"
    }]
  }),
  beforeLoad: requireAdmin,
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./about-D-3IoX8P.mjs");
const Route$i = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About Us — DriveNepal"
    }, {
      name: "description",
      content: "Why we built DriveNepal — premium car and bike rentals built for travelers who care."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./index-2ETwr6Lw.mjs");
const Route$h = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const Route$g = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard/overview" });
  }
});
const Route$f = createFileRoute("/admin/")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/overview" });
  }
});
const $$splitComponentImporter$e = () => import("./vehicles._slug-B7iRs9Vq.mjs");
const $$splitNotFoundComponentImporter = () => import("./vehicles._slug-CiQyIW-S.mjs");
const Route$e = createFileRoute("/vehicles/$slug")({
  loader: async ({
    params
  }) => {
    const res = await getVehicle(params.slug).catch(() => null);
    if (!res?.data) throw notFound();
    return {
      vehicle: res.data
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [{
      title: `${loaderData.vehicle.name} — DriveNepal`
    }, {
      name: "description",
      content: loaderData.vehicle.description
    }, {
      property: "og:image",
      content: loaderData.vehicle.image
    }] : []
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./queries-ySpoPCLS.mjs");
const Route$d = createFileRoute("/dashboard/queries")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./profile-CqGvj51U.mjs");
const Route$c = createFileRoute("/dashboard/profile")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./overview-BDPqCOnU.mjs");
const Route$b = createFileRoute("/dashboard/overview")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./bookings-DGiHqzAw.mjs");
const Route$a = createFileRoute("/dashboard/bookings")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./booking._slug-DooHqczB.mjs");
const Route$9 = createFileRoute("/booking/$slug")({
  validateSearch: (search) => {
    return {
      pickupDate: search.pickupDate,
      returnDate: search.returnDate,
      pickupLocation: search.pickupLocation
    };
  },
  loader: async ({
    params
  }) => {
    try {
      const res = await getVehicle(params.slug);
      return {
        vehicle: res.data
      };
    } catch (err) {
      throw notFound();
    }
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [{
      title: `Book ${loaderData.vehicle.name} — DriveNepal`
    }] : []
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./vehicles-BBIRqxdo.mjs");
const Route$8 = createFileRoute("/admin/vehicles")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./users-CDsZxNHw.mjs");
const Route$7 = createFileRoute("/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./queries-eEe69Sr_.mjs");
const Route$6 = createFileRoute("/admin/queries")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./overview-B2nZxvat.mjs");
const Route$5 = createFileRoute("/admin/overview")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./bookings-ByvY0IQ8.mjs");
const Route$4 = createFileRoute("/admin/bookings")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./success-COhZekTT.mjs");
const Route$3 = createFileRoute("/payment/khalti/success")({
  validateSearch: (s) => ({
    bookingId: typeof s.bookingId === "string" ? s.bookingId : void 0
  }),
  head: () => ({
    meta: [{
      title: "Khalti Payment Success — DriveNepal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./failure-B8j2GCGH.mjs");
const Route$2 = createFileRoute("/payment/khalti/failure")({
  head: () => ({
    meta: [{
      title: "Khalti Payment Failed — DriveNepal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./success-_2m0Yxvc.mjs");
const Route$1 = createFileRoute("/payment/esewa/success")({
  validateSearch: (s) => ({
    data: typeof s.data === "string" ? s.data : void 0
  }),
  head: () => ({
    meta: [{
      title: "eSewa Payment Success — DriveNepal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./failure-CI7q3jNC.mjs");
const Route = createFileRoute("/payment/esewa/failure")({
  head: () => ({
    meta: [{
      title: "eSewa Payment Failed — DriveNepal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TermsRoute = Route$z.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$A
});
const SignupRoute = Route$y.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$A
});
const ResetPasswordRoute = Route$x.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$A
});
const PrivacyRoute = Route$w.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$A
});
const PressRoute = Route$v.update({
  id: "/press",
  path: "/press",
  getParentRoute: () => Route$A
});
const OtpVerificationRoute = Route$u.update({
  id: "/otp-verification",
  path: "/otp-verification",
  getParentRoute: () => Route$A
});
const LoginRoute = Route$t.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$A
});
const LocationsRoute = Route$s.update({
  id: "/locations",
  path: "/locations",
  getParentRoute: () => Route$A
});
const HelpRoute = Route$r.update({
  id: "/help",
  path: "/help",
  getParentRoute: () => Route$A
});
const ForgotPasswordRoute = Route$q.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$A
});
const DashboardRoute = Route$p.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$A
});
const CookiesRoute = Route$o.update({
  id: "/cookies",
  path: "/cookies",
  getParentRoute: () => Route$A
});
const ContactRoute = Route$n.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$A
});
const CarsRoute = Route$m.update({
  id: "/cars",
  path: "/cars",
  getParentRoute: () => Route$A
});
const CareersRoute = Route$l.update({
  id: "/careers",
  path: "/careers",
  getParentRoute: () => Route$A
});
const BikesRoute = Route$k.update({
  id: "/bikes",
  path: "/bikes",
  getParentRoute: () => Route$A
});
const AdminRoute = Route$j.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$A
});
const AboutRoute = Route$i.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$A
});
const IndexRoute = Route$h.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$A
});
const DashboardIndexRoute = Route$g.update({
  id: "/",
  path: "/",
  getParentRoute: () => DashboardRoute
});
const AdminIndexRoute = Route$f.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const VehiclesSlugRoute = Route$e.update({
  id: "/vehicles/$slug",
  path: "/vehicles/$slug",
  getParentRoute: () => Route$A
});
const DashboardQueriesRoute = Route$d.update({
  id: "/queries",
  path: "/queries",
  getParentRoute: () => DashboardRoute
});
const DashboardProfileRoute = Route$c.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => DashboardRoute
});
const DashboardOverviewRoute = Route$b.update({
  id: "/overview",
  path: "/overview",
  getParentRoute: () => DashboardRoute
});
const DashboardBookingsRoute = Route$a.update({
  id: "/bookings",
  path: "/bookings",
  getParentRoute: () => DashboardRoute
});
const BookingSlugRoute = Route$9.update({
  id: "/booking/$slug",
  path: "/booking/$slug",
  getParentRoute: () => Route$A
});
const AdminVehiclesRoute = Route$8.update({
  id: "/vehicles",
  path: "/vehicles",
  getParentRoute: () => AdminRoute
});
const AdminUsersRoute = Route$7.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AdminRoute
});
const AdminQueriesRoute = Route$6.update({
  id: "/queries",
  path: "/queries",
  getParentRoute: () => AdminRoute
});
const AdminOverviewRoute = Route$5.update({
  id: "/overview",
  path: "/overview",
  getParentRoute: () => AdminRoute
});
const AdminBookingsRoute = Route$4.update({
  id: "/bookings",
  path: "/bookings",
  getParentRoute: () => AdminRoute
});
const PaymentKhaltiSuccessRoute = Route$3.update({
  id: "/payment/khalti/success",
  path: "/payment/khalti/success",
  getParentRoute: () => Route$A
});
const PaymentKhaltiFailureRoute = Route$2.update({
  id: "/payment/khalti/failure",
  path: "/payment/khalti/failure",
  getParentRoute: () => Route$A
});
const PaymentEsewaSuccessRoute = Route$1.update({
  id: "/payment/esewa/success",
  path: "/payment/esewa/success",
  getParentRoute: () => Route$A
});
const PaymentEsewaFailureRoute = Route.update({
  id: "/payment/esewa/failure",
  path: "/payment/esewa/failure",
  getParentRoute: () => Route$A
});
const AdminRouteChildren = {
  AdminBookingsRoute,
  AdminOverviewRoute,
  AdminQueriesRoute,
  AdminUsersRoute,
  AdminVehiclesRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const DashboardRouteChildren = {
  DashboardBookingsRoute,
  DashboardOverviewRoute,
  DashboardProfileRoute,
  DashboardQueriesRoute,
  DashboardIndexRoute
};
const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute: AdminRouteWithChildren,
  BikesRoute,
  CareersRoute,
  CarsRoute,
  ContactRoute,
  CookiesRoute,
  DashboardRoute: DashboardRouteWithChildren,
  ForgotPasswordRoute,
  HelpRoute,
  LocationsRoute,
  LoginRoute,
  OtpVerificationRoute,
  PressRoute,
  PrivacyRoute,
  ResetPasswordRoute,
  SignupRoute,
  TermsRoute,
  BookingSlugRoute,
  VehiclesSlugRoute,
  PaymentEsewaFailureRoute,
  PaymentEsewaSuccessRoute,
  PaymentKhaltiFailureRoute,
  PaymentKhaltiSuccessRoute
};
const routeTree = Route$A._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ApiError as A,
  submitQuery as B,
  ConfirmModal as C,
  updateBookingStatus as D,
  updateProfile as E,
  updateUserStatus as F,
  updateVehicle as G,
  uploadAvatar as H,
  useAuth as I,
  verifyEsewaPayment as J,
  verifyKhaltiPayment as K,
  verifyOtp as L,
  Route$x as R,
  Route$u as a,
  Route$e as b,
  Route$9 as c,
  Route$3 as d,
  Route$1 as e,
  cancelBooking as f,
  changePassword as g,
  cn as h,
  createBooking as i,
  createVehicle as j,
  deleteBooking as k,
  deleteUser as l,
  deleteVehicle as m,
  forgotPassword as n,
  getAdminQueries as o,
  getAdminStats as p,
  getAllBookings as q,
  getAllUsers as r,
  getMyBookings as s,
  getUserQueries as t,
  getVehicles as u,
  initiateEsewaPayment as v,
  logo as w,
  replyToQuery as x,
  resetPassword as y,
  router as z
};
