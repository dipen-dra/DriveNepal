import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — DriveNepal" },
    { name: "description", content: "Get in touch with the DriveNepal team. We respond within an hour." },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="container-page py-16 md:py-24 grid lg:grid-cols-2 gap-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Contact</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Let's talk wheels.</h1>
        <p className="mt-4 text-muted-foreground max-w-md">
          Have a question, want a custom rental, or building something exciting? We respond within an hour.
        </p>

        <div className="mt-10 space-y-4">
          {[
            { icon: Phone, k: "Call us", v: "+977 1 4444 555" },
            { icon: Mail, k: "Email", v: "hello@drivenepal.com" },
            { icon: MapPin, k: "Headquarters", v: "Thamel, Kathmandu, Nepal" },
          ].map((c) => (
            <div key={c.k} className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-border/60">
              <div className="h-11 w-11 rounded-full gradient-brand text-white inline-flex items-center justify-center"><c.icon className="h-4 w-4" /></div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.k}</p>
                <p className="text-sm font-semibold text-ink">{c.v}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        onSubmit={(e) => e.preventDefault()}
        className="rounded-3xl border border-border/60 bg-card p-8 space-y-5 h-fit"
      >
        <h2 className="font-display text-2xl font-bold">Send a message</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Name" placeholder="Your name" />
          <Input label="Email" placeholder="you@email.com" type="email" />
        </div>
        <Input label="Subject" placeholder="How can we help?" />
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Message</span>
          <textarea rows={5} placeholder="Tell us more…" className="mt-1 w-full p-4 rounded-2xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm" />
        </label>
        <button className="w-full h-12 rounded-full gradient-brand text-white font-semibold inline-flex items-center justify-center shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-transform">
          Send <Send className="ml-2 h-4 w-4" />
        </button>
      </motion.form>
    </section>
  );
}

function Input({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input type={type} placeholder={placeholder} className="mt-1 w-full h-12 px-4 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none text-sm font-medium" />
    </label>
  );
}
