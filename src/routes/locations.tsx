import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { getVehicles } from "@/lib/api";

export const Route = createFileRoute("/locations")({
  head: () => ({ meta: [{ title: "Locations — DriveNepal" }] }),
  component: LocationsPage,
});

function LocationsPage() {
  const { data: res } = useQuery({
    queryKey: ["vehicles", "locations"],
    queryFn: () => getVehicles({}),
  });

  const vehicles = res?.data || [];

  const locationCounts = vehicles.reduce((acc, v) => {
    // If backend location is missing for some reason, use 'Kathmandu'
    const loc = v.location || "Kathmandu";
    acc[loc] = (acc[loc] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const locations = Object.entries(locationCounts).map(([name, count]) => ({
    id: name,
    name,
    count,
  }));

  return (
    <>
      <section className="noise-bg">
        <div className="container-page pt-16 pb-12 md:pt-24">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Locations</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">Pickup across Nepal</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">From valley hubs to lakeside cities — pick up where it suits you.</p>
        </div>
      </section>

      <section className="container-page py-16">
        {locations.length === 0 && !res && (
          <div className="text-muted-foreground">Loading locations...</div>
        )}
        {locations.length === 0 && res && (
          <div className="text-muted-foreground">No locations currently available.</div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="group rounded-3xl border border-border/60 bg-card p-7 card-hover"
            >
              <div className="h-12 w-12 rounded-2xl gradient-brand text-white inline-flex items-center justify-center shadow-[var(--shadow-glow)]">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{loc.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{loc.count} vehicles available</p>
              <Link to="/cars" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Explore <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
