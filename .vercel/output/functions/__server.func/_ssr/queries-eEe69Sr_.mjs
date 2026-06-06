import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { o as getAdminQueries, x as replyToQuery, h as cn } from "./router-Dp1bmQ9H.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/react-oauth__google.mjs";
import { P as Inbox, v as Clock, s as CircleCheckBig, _ as MessageSquare, ap as User, as as X, aa as Send } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
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
function AdminQueriesTab() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = reactExports.useState("all");
  const [selectedQuery, setSelectedQuery] = reactExports.useState(null);
  const [replyText, setReplyText] = reactExports.useState("");
  const {
    data: queriesRes,
    isLoading
  } = useQuery({
    queryKey: ["adminQueries"],
    queryFn: getAdminQueries
  });
  const queries = queriesRes?.data ?? [];
  const replyMutation = useMutation({
    mutationFn: ({
      id,
      reply
    }) => replyToQuery(id, reply),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Reply sent successfully!");
        queryClient.invalidateQueries({
          queryKey: ["adminQueries"]
        });
        setSelectedQuery(null);
        setReplyText("");
      } else {
        toast.error("Failed to send reply.");
      }
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong.");
    }
  });
  const filteredQueries = queries.filter((q) => {
    if (filter === "pending") return !q.isReplied;
    if (filter === "replied") return q.isReplied;
    return true;
  });
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!selectedQuery) return;
    if (!replyText.trim()) {
      toast.error("Reply text cannot be empty.");
      return;
    }
    replyMutation.mutate({
      id: selectedQuery._id,
      reply: replyText
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 rounded-2xl bg-muted" }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-ink", children: "User Inquiries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage and respond to customer queries" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex rounded-xl bg-card border border-border p-1 self-start", children: ["all", "pending", "replied"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(f), className: cn("px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all", filter === f ? "gradient-brand text-white shadow-soft" : "text-foreground/60 hover:text-foreground"), children: f === "pending" ? "Pending Reply" : f }, f)) })
    ] }),
    filteredQueries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 rounded-3xl border border-dashed border-border/80 bg-card text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mb-4 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-ink", children: "No inquiries found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "There are no queries in this category." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: filteredQueries.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layoutId: `query-card-${q._id}`, onClick: () => setSelectedQuery(q), className: "group cursor-pointer rounded-2xl border border-border/60 bg-card p-5 shadow-soft hover:-translate-y-0.5 hover:shadow-card transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          q.user?.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: q.user.avatar, alt: q.name, className: "h-9 w-9 rounded-full object-cover border border-border/40" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm", children: q.name[0].toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-ink group-hover:text-primary transition-colors", children: q.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              new Date(q.createdAt).toLocaleDateString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider", q.isReplied ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : "bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"), children: q.isReplied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-2.5 w-2.5" }),
          " Replied"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-2.5 w-2.5" }),
          " Pending"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-ink truncate", children: q.subject }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed", children: q.message })
      ] }),
      q.user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1.5 text-[10px] font-medium text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3" }),
        " Registered User"
      ] })
    ] }, q._id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedQuery && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.95,
      y: 10
    }, animate: {
      opacity: 1,
      scale: 1,
      y: 0
    }, exit: {
      opacity: 0,
      scale: 0.95,
      y: 10
    }, className: "relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          selectedQuery.user?.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedQuery.user.avatar, alt: selectedQuery.name, className: "h-10 w-10 rounded-full object-cover border border-border" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm", children: selectedQuery.name[0].toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-ink", children: "Inquiry Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "From ",
              selectedQuery.name,
              " · ",
              selectedQuery.email
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setSelectedQuery(null);
          setReplyText("");
        }, className: "rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4 max-h-[60vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-muted/50 p-4 border border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold", children: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-ink mt-0.5", children: selectedQuery.subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-4", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 mt-1 whitespace-pre-wrap leading-relaxed", children: selectedQuery.message })
        ] }),
        selectedQuery.isReplied ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-emerald-500/5 p-4 border border-emerald-500/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5" }),
            " Previous Reply"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-emerald-900 dark:text-emerald-300 mt-1 whitespace-pre-wrap leading-relaxed", children: [
            '"',
            selectedQuery.reply,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-emerald-600/70 mt-2", children: [
            "Replied on ",
            selectedQuery.repliedAt ? new Date(selectedQuery.repliedAt).toLocaleString() : ""
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleReplySubmit, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold", children: "Write a Reply" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, placeholder: "Type support reply here...", value: replyText, onChange: (e) => setReplyText(e.target.value), className: "mt-1.5 w-full p-4 rounded-2xl bg-muted border border-border/40 focus:border-primary focus:outline-none text-sm text-ink leading-relaxed", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: replyMutation.isPending, className: "w-full h-11 rounded-full gradient-brand text-white font-semibold inline-flex items-center justify-center shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:pointer-events-none", children: [
            replyMutation.isPending ? "Sending..." : "Send Reply",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "ml-2 h-4 w-4" })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  AdminQueriesTab as component
};
