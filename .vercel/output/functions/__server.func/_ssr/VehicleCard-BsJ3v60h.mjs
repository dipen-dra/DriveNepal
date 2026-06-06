import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { ai as Star, K as Fuel, L as Gauge, ar as Users } from "../_libs/lucide-react.mjs";
function VehicleCard({ v, index = 0 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.5, delay: index * 0.05 },
      className: "group rounded-3xl bg-card border border-border/70 overflow-hidden card-hover",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vehicles/$slug", params: { slug: v.slug }, className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-surface", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: v.image,
              alt: v.name,
              loading: "lazy",
              className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-4 left-4 inline-flex items-center gap-1 rounded-full glass px-3 py-1 text-xs font-medium text-ink", children: v.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-ink/80 backdrop-blur-md text-white px-3 py-1 text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-yellow-400 text-yellow-400" }),
            " ",
            v.rating
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: v.brand }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-ink mt-0.5", children: v.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg font-bold text-primary", children: [
                "NPR ",
                v.pricePerDay.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "/ day" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Fuel, { className: "h-3.5 w-3.5" }),
              " ",
              v.fuel
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "h-3.5 w-3.5" }),
              " ",
              v.transmission
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
              " ",
              v.seats
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 inline-flex items-center justify-center h-10 rounded-full border border-border text-xs font-medium text-foreground/80 group-hover:border-primary group-hover:text-primary transition-colors", children: "View details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center h-10 px-5 rounded-full gradient-brand text-white text-xs font-semibold shadow-[var(--shadow-glow)]", children: "Book now" })
          ] })
        ] })
      ] })
    }
  );
}
export {
  VehicleCard as V
};
