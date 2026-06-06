import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as getVehicles } from "./router-Dp1bmQ9H.mjs";
import { V as VehicleCard } from "./VehicleCard-BsJ3v60h.mjs";
import { g as useSearch, L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { ag as SlidersHorizontal, as as X, a9 as Search } from "../_libs/lucide-react.mjs";
function CatalogPage({ type, title, subtitle }) {
  const search = useSearch({ strict: false });
  const activeLocation = search.location || "";
  const [q, setQ] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("All");
  const [sort, setSort] = reactExports.useState("popular");
  const [priceMax, setPriceMax] = reactExports.useState(99999);
  const { data, isLoading } = useQuery({
    queryKey: ["vehicles", type],
    queryFn: () => getVehicles({ type }),
    staleTime: 5 * 60 * 1e3
    // 5 min cache
  });
  const all = data?.data ?? [];
  const categories = ["All", ...Array.from(new Set(all.map((v) => v.category)))];
  const locationsList = ["All", ...Array.from(new Set(all.map((v) => v.location || "Kathmandu")))];
  const maxPrice = all.length ? Math.max(...all.map((v) => v.pricePerDay)) : 99999;
  const list = reactExports.useMemo(() => {
    let r = all.filter(
      (v) => (cat === "All" || v.category === cat) && v.pricePerDay <= (priceMax === 99999 ? maxPrice : priceMax) && (q === "" || (v.name + v.brand).toLowerCase().includes(q.toLowerCase())) && (activeLocation === "" || (v.location || "").toLowerCase() === activeLocation.toLowerCase())
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [all, cat, priceMax, q, sort, maxPrice, activeLocation]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "noise-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-page pt-16 pb-12 md:pt-24 md:pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: type === "car" ? "Cars" : "Bikes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl md:text-6xl font-bold tracking-tight", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground max-w-2xl", children: subtitle })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[280px_1fr] gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:sticky lg:top-28 self-start rounded-3xl border border-border/60 bg-card p-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-ink", children: "Filters" })
          ] }),
          activeLocation && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: ".",
              search: (prev) => ({ ...prev, location: void 0 }),
              className: "inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline",
              children: "Clear location"
            }
          )
        ] }),
        activeLocation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-2xl bg-primary/5 border border-primary/15 text-xs text-primary font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 truncate", children: [
            "Location: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: activeLocation })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: ".",
              search: (prev) => ({ ...prev, location: void 0 }),
              className: "p-1 rounded-full hover:bg-primary/10 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: q,
              onChange: (e) => setQ(e.target.value),
              placeholder: "Search by name…",
              className: "w-full h-11 pl-9 pr-3 rounded-full bg-muted border border-transparent focus:border-primary focus:outline-none text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setCat(c),
              className: `h-9 px-4 rounded-full text-xs font-medium border transition-all ${cat === c ? "gradient-brand text-white border-transparent shadow-[var(--shadow-glow)]" : "bg-background border-border hover:border-primary/40"}`,
              children: c
            },
            c
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-2", children: "Location Hubs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: locationsList.map((loc) => {
            const isActive = loc === "All" && !activeLocation || activeLocation.toLowerCase() === loc.toLowerCase();
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: ".",
                search: (prev) => ({ ...prev, location: loc === "All" ? void 0 : loc }),
                className: `h-9 px-4 inline-flex items-center rounded-full text-xs font-medium border transition-all ${isActive ? "gradient-brand text-white border-transparent shadow-[var(--shadow-glow)]" : "bg-background border-border hover:border-primary/40"}`,
                children: loc
              },
              loc
            );
          }) })
        ] }),
        all.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-3", children: [
            "Max price ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-ink font-semibold ml-1", children: [
              "NPR ",
              (priceMax === 99999 ? maxPrice : priceMax).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: Math.min(...all.map((v) => v.pricePerDay)),
              max: maxPrice,
              step: 500,
              value: priceMax === 99999 ? maxPrice : priceMax,
              onChange: (e) => setPriceMax(Number(e.target.value)),
              className: "w-full accent-primary"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isLoading ? "Loading…" : `${list.length} vehicles` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: sort,
              onChange: (e) => setSort(e.target.value),
              className: "h-10 px-4 rounded-full bg-muted border border-transparent text-sm font-medium focus:outline-none focus:border-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "popular", children: "Most popular" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-asc", children: "Price: low to high" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-desc", children: "Price: high to low" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rating", children: "Top rated" })
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 xl:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card overflow-hidden animate-pulse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-1/2 bg-muted rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-2/3 bg-muted rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-1/3 bg-muted rounded" })
          ] })
        ] }, i)) }) : list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24 rounded-3xl bg-surface border border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: "No vehicles match your filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Try widening the price range or category." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 xl:grid-cols-3 gap-6", children: list.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VehicleCard, { v, index: i }, v._id)) })
      ] })
    ] }) })
  ] });
}
export {
  CatalogPage as C
};
