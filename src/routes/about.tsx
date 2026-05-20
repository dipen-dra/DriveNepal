import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Heart, Globe2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — DriveNepal" },
    { name: "description", content: "Why we built DriveNepal — premium rentals built for travelers who care." },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="noise-bg">
        <div className="container-page pt-16 md:pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">About us</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              We rent vehicles<br /><span className="text-gradient">we'd drive ourselves.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              DriveNepal started with a simple idea: renting a car in Nepal should feel as good as the trip itself. No paperwork chaos, no surprise fees, no compromises on quality.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden gradient-brand">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
            <div className="relative h-full flex items-center justify-center text-white text-center p-10">
              <div>
                <p className="font-display text-6xl font-bold">2024</p>
                <p className="mt-2 text-white/85">Founded in Kathmandu</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Sparkles, title: "Premium by default", text: "Every vehicle is detailed, serviced, and inspected before each trip." },
            { icon: Heart, title: "Built with care", text: "Honest pricing, real humans on support, and a flexible cancellation policy." },
            { icon: Globe2, title: "Local at heart", text: "We're from Nepal. We know the roads, the seasons, and the routes worth taking." },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-border/60 bg-card p-7 card-hover"
            >
              <div className="h-12 w-12 rounded-2xl gradient-brand text-white inline-flex items-center justify-center"><v.icon className="h-5 w-5" /></div>
              <h3 className="mt-5 font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link to="/cars" className="inline-flex h-12 px-7 items-center rounded-full gradient-brand text-white font-medium shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-transform">
            Explore the fleet
          </Link>
        </div>
      </section>
    </>
  );
}
