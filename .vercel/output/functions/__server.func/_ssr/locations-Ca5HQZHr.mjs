import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as getVehicles } from "./router-Dp1bmQ9H.mjs";
import "../_libs/react-oauth__google.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { a0 as Navigation, a9 as Search, Y as MapPin, s as CircleCheckBig, k as Car, g as Bike, ae as ShieldCheck, v as Clock } from "../_libs/lucide-react.mjs";
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
const kathmanduImg = "/assets/kathmandu-DDu1Q7Hl.png";
const pokharaImg = "/assets/pokhara-CArv0rcG.png";
const mustangImg = "/assets/mustang-CdjgCf7L.png";
const locationMeta = {
  kathmandu: {
    image: kathmanduImg,
    tagline: "The Historic Valley Hub",
    description: "Navigate ancient streets, historic temples, and bustling city centers. Perfect starting point for valley touring or business trips.",
    highlights: ["Boudhanath Stupa", "Patan Durbar Square", "Easy Airport Pickup"]
  },
  pokhara: {
    image: pokharaImg,
    tagline: "The Ultimate Adventure Gateway",
    description: "Cruise around the peaceful lake under the massive Annapurna mountain peaks. Ideal for travelers, trekkers, and lakeside riders.",
    highlights: ["Phewa Lake Reflection", "Annapurna Basecamp Portal", "Scenic Highway Drives"]
  },
  mustang: {
    image: mustangImg,
    tagline: "The Rugged Mountain Canyons",
    description: "Explore the wild, arid landscapes of the forbidden kingdom. Requires heavy duty 4x4 SUVs or off-road adventure bikes.",
    highlights: ["Muktinath Pilgrimage", "Deep River Canyons", "Off-Road Terrain"]
  }
};
function LocationsPage() {
  const [q, setQ] = reactExports.useState("");
  const {
    data: res,
    isLoading
  } = useQuery({
    queryKey: ["vehicles", "locations"],
    queryFn: () => getVehicles({})
  });
  const vehicles = res?.data || [];
  const locationCounts = reactExports.useMemo(() => {
    return vehicles.reduce((acc, v) => {
      const loc = v.location || "Kathmandu";
      acc[loc] = (acc[loc] || 0) + 1;
      return acc;
    }, {});
  }, [vehicles]);
  const locations = reactExports.useMemo(() => {
    return Object.entries(locationCounts).map(([name, count]) => {
      const slug = name.toLowerCase();
      const meta = locationMeta[slug] || {
        image: kathmanduImg,
        // Fallback
        tagline: "Scenic Nepal Pickup Point",
        description: `Explore and rent premium cars or bikes in ${name}. Safe routes, flexible dropoffs, and complete support.`,
        highlights: ["Flexible pick-ups", "Local safety guide", "All-day assistance"]
      };
      return {
        id: name,
        name,
        count,
        ...meta
      };
    });
  }, [locationCounts]);
  const filteredLocations = reactExports.useMemo(() => {
    return locations.filter((loc) => loc.name.toLowerCase().includes(q.toLowerCase()));
  }, [locations, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-surface/30 space-y-16 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-20 md:py-32 bg-[oklch(0.12_0.02_260)] text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_60%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page relative z-10 max-w-4xl mx-auto text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
          opacity: 0,
          y: 15
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3.5 w-3.5" }),
          " Fleet Hubs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.1
        }, className: "font-display text-4xl md:text-6xl font-bold tracking-tight", children: [
          "Pick Up Across ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent", children: "Nepal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 25
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.2
        }, className: "text-lg text-white/70 max-w-2xl mx-auto", children: "From the bustling valley hub of Kathmandu to the lakeside city of Pokhara and the high-altitude trails of Mustang. Start your drive where it fits your travel plans." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 30
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.3
        }, className: "relative max-w-md mx-auto pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search pickup cities...", value: q, onChange: (e) => setQ(e.target.value), className: "w-full h-12 pl-12 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:bg-white/15 transition-all text-sm" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page max-w-6xl", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 rounded-[2.5rem] bg-card border border-border animate-pulse" }, i)) }),
      !isLoading && filteredLocations.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24 rounded-[2.5rem] border border-dashed border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-12 w-12 text-muted-foreground/50 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-ink", children: "No pickup hubs match your search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Try clearing your filters or search for Kathmandu or Pokhara." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredLocations.map((loc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.5,
        delay: i * 0.1
      }, className: "group flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-card border border-border/70 hover:shadow-card hover:border-primary/20 transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-surface", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: loc.image, alt: loc.name, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              " ",
              loc.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-soft", children: [
              loc.count,
              " ",
              loc.count === 1 ? "vehicle" : "vehicles"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-primary", children: loc.tagline }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-ink mt-1", children: loc.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: loc.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 space-y-2 border-t border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider", children: "Local highlights" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: loc.highlights.map((h, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-xs text-foreground/80 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-emerald-500 flex-shrink-0" }),
                " ",
                h
              ] }, idx)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 pt-0 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cars", search: {
            location: loc.name
          }, className: "flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-full border border-border text-xs font-semibold text-foreground/80 hover:border-primary hover:text-primary transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4" }),
            " Cars"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bikes", search: {
            location: loc.name
          }, className: "flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-full gradient-brand text-white text-xs font-semibold shadow-soft hover:-translate-y-0.5 transition-transform", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "h-4 w-4" }),
            " Bikes"
          ] })
        ] })
      ] }, loc.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2.5rem] bg-card border border-border/80 p-8 md:p-12 space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-ink", children: "Our Pick up & Drop off Standards" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "We make picking up your rental vehicle smooth and secure, anywhere in Nepal." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [{
        icon: ShieldCheck,
        title: "Flexible Drop-offs",
        desc: "Pick up in Kathmandu and drop off in Pokhara or other major hubs. One-way options are fully customizable."
      }, {
        icon: Clock,
        title: "24/7 Roadside Assistance",
        desc: "No matter how remote the route, our network of roadside partners ensures support or replacement is never far away."
      }, {
        icon: MapPin,
        title: "Airport Staging",
        desc: "Provide your flight number, and our coordinator will have your car or bike detailed and waiting right outside the terminal."
      }].map((srv, idx) => {
        const Icon = srv.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-ink", children: srv.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: srv.desc })
        ] }, idx);
      }) })
    ] }) })
  ] });
}
export {
  LocationsPage as component
};
