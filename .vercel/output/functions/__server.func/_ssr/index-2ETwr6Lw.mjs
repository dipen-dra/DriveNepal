import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as getVehicles, h as cn } from "./router-Dp1bmQ9H.mjs";
import { V as VehicleCard } from "./VehicleCard-BsJ3v60h.mjs";
import "../_libs/react-oauth__google.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { b as ArrowRight, ae as ShieldCheck, k as Car, g as Bike, ak as Tag, d as BadgeCheck, v as Clock, C as Calendar, au as Zap, z as CreditCard, a5 as Quote, ai as Star, o as ChevronDown, Y as MapPin } from "../_libs/lucide-react.mjs";
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
const heroImg = "/assets/hero-vehicles-BXhObOlR.jpg";
const testimonials = [{
  name: "Aayush Karki",
  role: "Traveler, Kathmandu",
  text: "Booked a Himalayan for a Mustang trip — flawless from start to finish. The bike was spotless.",
  rating: 5
}, {
  name: "Sneha Maharjan",
  role: "Designer, Pokhara",
  text: "Rented a Tesla for a weekend. The handover was 5 minutes. Felt like Apple-level service.",
  rating: 5
}, {
  name: "Bikash Thapa",
  role: "Founder, Lalitpur",
  text: "Used DriveNepal twice for client visits. Professional, on-time, and the pricing is honest.",
  rating: 5
}, {
  name: "Priya Shrestha",
  role: "Photographer",
  text: "Loved the booking flow. Picked the SUV, paid via Khalti, done. Zero friction.",
  rating: 5
}];
const faqs = [{
  q: "What documents do I need to rent?",
  a: "A valid driving license, citizenship or passport, and one of: Khalti, eSewa, or cash deposit at pickup."
}, {
  q: "Is there a security deposit?",
  a: "Yes. Refundable deposits range from NPR 5,000 to 25,000 depending on the vehicle category, returned within 24 hours of drop-off."
}, {
  q: "Can I cancel my booking?",
  a: "Free cancellation up to 24 hours before pickup. After that, a 20% fee applies."
}, {
  q: "Do you offer delivery?",
  a: "Inside Kathmandu Valley and Pokhara, we deliver free for bookings of 3+ days."
}, {
  q: "What if the vehicle breaks down?",
  a: "Our 24/7 roadside team will reach you within 90 minutes anywhere on a paved highway in Nepal."
}];
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopularVehicles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyUs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTA, {})
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden noise-bg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { "aria-hidden": true, className: "absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl", animate: {
        x: [0, 40, 0],
        y: [0, 20, 0]
      }, transition: {
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { "aria-hidden": true, className: "absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full bg-[oklch(0.81_0.08_254)]/30 blur-3xl", animate: {
        x: [0, -30, 0],
        y: [0, -20, 0]
      }, transition: {
        duration: 16,
        repeat: Infinity,
        ease: "easeInOut"
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page pt-12 md:pt-20 pb-24 grid lg:grid-cols-12 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-ink", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
          "Now serving 6 cities across Nepal"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 24
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.1
        }, className: "mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight", children: [
          "Premium ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Car & Bike" }),
          " Rentals Across Nepal"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.2
        }, className: "mt-6 text-lg text-muted-foreground max-w-xl", children: "Rent luxury cars, bikes, and travel companions for the road. Instant booking, transparent pricing, and zero hidden fees." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.3
        }, className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cars", className: "inline-flex h-12 items-center px-7 rounded-full gradient-brand text-white font-medium shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:shadow-xl transition-all", children: [
            "Book Now ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bikes", className: "inline-flex h-12 items-center px-7 rounded-full border border-border bg-background hover:bg-muted font-medium transition-colors", children: "Explore Fleet" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          delay: 0.5
        }, className: "mt-10 grid grid-cols-3 gap-6 max-w-md", children: [{
          k: "120+",
          v: "Vehicles"
        }, {
          k: "10k+",
          v: "Trips"
        }, {
          k: "4.9★",
          v: "Rating"
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-ink", children: s.k }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s.v })
        ] }, s.v)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.95
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.8,
        ease: [0.2, 0.7, 0.2, 1]
      }, className: "lg:col-span-6 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_120px_-30px_rgb(93_139_244_/_0.45)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Luxury car and bike", width: 1600, height: 1200, className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: -20
        }, animate: {
          opacity: 1,
          x: 0
        }, transition: {
          delay: 0.6
        }, className: "absolute -left-4 md:-left-8 top-10 glass rounded-2xl p-4 shadow-[var(--shadow-card)] w-56", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Today's pick" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-ink mt-1", children: "Tesla Model 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary font-bold mt-1", children: [
            "NPR 12,500 ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "/day" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: 20
        }, animate: {
          opacity: 1,
          x: 0
        }, transition: {
          delay: 0.7
        }, className: "absolute -right-4 md:-right-6 bottom-8 glass rounded-2xl p-4 shadow-[var(--shadow-card)] flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full gradient-brand flex items-center justify-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Insured & verified" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-ink", children: "100% safe rides" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, {})
  ] });
}
function SearchBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-page -mt-8 md:-mt-12 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, className: "rounded-2xl md:rounded-full glass shadow-[var(--shadow-card)] p-3 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] gap-2 md:gap-1 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }), label: "Pickup", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "bg-transparent text-sm font-medium text-ink focus:outline-none w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Kathmandu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Pokhara" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Chitwan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Lumbini" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }), label: "Pickup date", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", className: "bg-transparent text-sm font-medium text-ink focus:outline-none w-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }), label: "Return date", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", className: "bg-transparent text-sm font-medium text-ink focus:outline-none w-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4" }), label: "Vehicle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "bg-transparent text-sm font-medium text-ink focus:outline-none w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Any" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Car" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Bike" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cars", className: "h-12 md:h-14 px-6 inline-flex items-center justify-center rounded-full gradient-brand text-white font-medium shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all", children: [
      "Search ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
    ] })
  ] }) });
}
function Field({
  icon,
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 px-4 py-2 md:py-3 rounded-xl md:rounded-full hover:bg-muted/60 cursor-pointer transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col min-w-0 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: label }),
      children
    ] })
  ] });
}
function PopularVehicles() {
  const [tab, setTab] = reactExports.useState("all");
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["vehicles", "home"],
    queryFn: () => getVehicles({}),
    staleTime: 5 * 60 * 1e3
  });
  const allVehicles = data?.data ?? [];
  const list = allVehicles.filter((v) => tab === "all" || v.type === tab).slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-24 md:py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Popular fleet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-4xl md:text-5xl font-bold tracking-tight", children: "Pick your next ride" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-xl", children: "A handpicked selection of our most-booked vehicles this month." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex rounded-full bg-muted p-1", children: [{
        k: "all",
        label: "All",
        icon: null
      }, {
        k: "car",
        label: "Cars",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-3.5 w-3.5" })
      }, {
        k: "bike",
        label: "Bikes",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { className: "h-3.5 w-3.5" })
      }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(t.k), className: cn("relative h-10 px-5 inline-flex items-center gap-2 rounded-full text-sm font-medium transition-colors", tab === t.k ? "text-primary" : "text-foreground/70 hover:text-foreground"), children: [
        tab === t.k && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { layoutId: "pop-tab", className: "absolute inset-0 rounded-full bg-primary/10 -z-10", transition: {
          type: "spring",
          stiffness: 400,
          damping: 30
        } }),
        t.icon,
        t.label
      ] }, t.k)) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card overflow-hidden animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/3 bg-muted rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-2/3 bg-muted rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/4 bg-muted rounded" })
      ] })
    ] }, i)) }) : list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-muted-foreground", children: "No vehicles found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: list.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VehicleCard, { v, index: i }, v._id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cars", className: "inline-flex h-12 px-7 items-center rounded-full border border-border bg-background hover:bg-muted font-medium transition-colors", children: [
      "See all vehicles ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
    ] }) })
  ] });
}
function WhyUs() {
  const items = [{
    icon: Tag,
    title: "Affordable pricing",
    text: "Transparent rates, no hidden fees, ever."
  }, {
    icon: BadgeCheck,
    title: "Verified vehicles",
    text: "Every car and bike is inspected before pickup."
  }, {
    icon: Clock,
    title: "24/7 support",
    text: "Our team is one call away, day or night."
  }, {
    icon: Calendar,
    title: "Flexible booking",
    text: "Free cancellation up to 24 hours."
  }, {
    icon: Zap,
    title: "Instant booking",
    text: "From browse to keys in under 3 minutes."
  }, {
    icon: CreditCard,
    title: "Safe payments",
    text: "Khalti, eSewa, or cash on pickup."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-surface py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Why DriveNepal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-4xl md:text-5xl font-bold tracking-tight", children: "Built for travelers who care" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "From the valley to the Himalayas, we sweat the details so your trip is effortless." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      margin: "-50px"
    }, transition: {
      delay: i * 0.05
    }, className: "group rounded-3xl bg-card p-7 border border-border/60 card-hover", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl gradient-brand text-white inline-flex items-center justify-center shadow-[var(--shadow-glow)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-display text-lg font-semibold", children: it.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: it.text })
    ] }, it.title)) })
  ] }) });
}
function Testimonials() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-page py-24 md:py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "Loved across Nepal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-4xl md:text-5xl font-bold tracking-tight", children: "What our drivers say" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-5", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.08
    }, className: "rounded-3xl border border-border/60 bg-card p-7 card-hover", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-7 w-7 text-primary/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm leading-relaxed text-foreground", children: [
        '"',
        t.text,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-3 pt-5 border-t border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full gradient-brand text-white font-semibold inline-flex items-center justify-center", children: t.name.split(" ").map((n) => n[0]).slice(0, 2).join("") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-ink truncate", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: t.role })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-0.5", children: Array.from({
          length: t.rating
        }).map((_, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-yellow-400 text-yellow-400" }, i2)) })
      ] })
    ] }, t.name)) })
  ] });
}
function FAQ() {
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-surface py-24 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-page grid lg:grid-cols-12 gap-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-wider", children: "FAQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-4xl md:text-5xl font-bold tracking-tight", children: "Questions, answered" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-muted-foreground", children: [
        "Can't find what you're looking for? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-primary font-medium", children: "Talk to us →" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 space-y-3", children: faqs.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.05
    }, className: "rounded-2xl bg-card border border-border/60 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(open === i ? null : i), className: "w-full flex items-center justify-between gap-4 p-5 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-ink", children: f.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-5 w-5 text-muted-foreground transition-transform ${open === i ? "rotate-180 text-primary" : ""}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: false, animate: {
        height: open === i ? "auto" : 0,
        opacity: open === i ? 1 : 0
      }, transition: {
        duration: 0.3,
        ease: [0.2, 0.7, 0.2, 1]
      }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 pb-5 text-sm text-muted-foreground leading-relaxed", children: f.a }) })
    ] }, f.q)) })
  ] }) });
}
function CTA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-page py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 30
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, className: "relative overflow-hidden rounded-[2.5rem] gradient-brand p-12 md:p-20 text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid md:grid-cols-2 gap-8 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold leading-tight", children: "Your next adventure is one tap away." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white/85 max-w-md", children: "Browse 120+ vehicles, lock in pickup, and hit the road today." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:justify-self-end flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cars", className: "h-12 px-7 inline-flex items-center rounded-full bg-white text-primary font-semibold hover:-translate-y-0.5 transition-transform", children: "Browse cars" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bikes", className: "h-12 px-7 inline-flex items-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white font-medium hover:bg-white/20 transition-colors", children: "Browse bikes" })
      ] })
    ] })
  ] }) });
}
export {
  Landing as component
};
