import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, MapPin, CreditCard } from "lucide-react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { cancelBooking, type Booking, type BookingStatus } from "@/lib/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const statusStyle: Record<BookingStatus, string> = {
  upcoming: "bg-primary/10 text-primary",
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

export function BookingRow({ b }: { b: Booking }) {
  const queryClient = useQueryClient();
  const { mutate: cancel, isPending } = useMutation({
    mutationFn: () => cancelBooking(b._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      toast.success("Booking cancelled successfully");
    },
    onError: () => {
      toast.error("Failed to cancel booking");
    }
  });

  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-card transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={b.vehicleImage} alt="" className="h-24 w-full md:w-36 rounded-xl object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">{b.bookingId}</div>
              <Link to="/vehicles/$slug" params={{ slug: b.vehicleSlug }} className="font-display text-lg font-semibold text-ink hover:text-primary truncate block">{b.vehicleName}</Link>
            </div>
            <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize whitespace-nowrap", statusStyle[b.status])}>{b.status}</span>
          </div>
          <div className="mt-2 grid sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{b.startDate} → {b.endDate}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{b.pickup}</span>
            <span className="inline-flex items-center gap-1.5"><CreditCard className="h-3.5 w-3.5" />{b.payment}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm"><span className="text-muted-foreground">Total</span> <span className="font-semibold text-ink">NPR {b.total.toLocaleString()}</span> <span className="text-xs text-muted-foreground">· {b.days}d</span></div>
            <div className="flex gap-2">
              {b.status === "upcoming" && (
                <ConfirmModal
                  title="Cancel Booking"
                  description="Are you sure you want to cancel this booking? This action cannot be undone."
                  onConfirm={() => cancel()}
                  confirmText="Cancel Booking"
                >
                  <button
                    disabled={isPending}
                    className="h-10 px-4 rounded-xl border border-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/10 disabled:opacity-50"
                  >
                    {isPending ? "Cancelling…" : "Cancel"}
                  </button>
                </ConfirmModal>
              )}
              <Link to="/vehicles/$slug" params={{ slug: b.vehicleSlug }} className="h-8 px-3 inline-flex items-center rounded-full text-xs gradient-brand text-white">View</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function EmptyState({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
      <Icon className="h-10 w-10 mx-auto text-muted-foreground/60" />
      <div className="mt-3 font-display text-lg font-semibold text-ink">{title}</div>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 animate-pulse">
      <div className="flex gap-4">
        <div className="h-24 w-36 rounded-xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-muted rounded" />
          <div className="h-5 w-1/2 bg-muted rounded" />
          <div className="h-3 w-2/3 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
