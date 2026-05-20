import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Bell, Menu, X, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { to: "/", label: "Home" },
  { to: "/cars", label: "Cars" },
  { to: "/bikes", label: "Bikes" },
  { to: "/locations", label: "Locations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 24));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const blur = useTransform(scrollY, [0, 100], [0, 14]);

  return (
    <motion.header
      style={{ backdropFilter: blur.get() ? `saturate(160%) blur(${blur.get()}px)` : undefined }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgb(15_23_42_/_0.06)] border-b border-border/60"
          : "bg-transparent",
      )}
    >
      <div className="container-page flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white font-bold shadow-[var(--shadow-glow)]">
            D
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            Drive<span className="text-gradient">Nepal</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const active = location.pathname === n.to || (n.to !== "/" && location.pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  active ? "text-primary" : "text-foreground/70 hover:text-foreground",
                )}
              >
                {n.label}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/dashboard" className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-foreground/70 transition-colors" aria-label="Dashboard">
            <LayoutDashboard className="h-4 w-4" />
          </Link>
          <button className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted text-foreground/70 transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <Link
            to="/login"
            className="hidden md:inline-flex h-10 items-center px-4 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hidden md:inline-flex h-10 items-center px-5 rounded-full text-sm font-medium gradient-brand text-white shadow-[var(--shadow-glow)] hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Sign up
          </Link>
          <button
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl"
        >
          <div className="container-page py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3">
              <Link to="/login" className="flex-1 h-11 inline-flex items-center justify-center rounded-full border border-border text-sm font-medium">Login</Link>
              <Link to="/signup" className="flex-1 h-11 inline-flex items-center justify-center rounded-full gradient-brand text-white text-sm font-medium">Sign up</Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
