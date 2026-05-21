import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { forgotPassword, ApiError } from "@/lib/api";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — DriveNepal" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2 noise-bg">
      {/* Left panel */}
      <div className="hidden lg:flex relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 gradient-brand opacity-95" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative text-white max-w-md">
          <span className="inline-flex h-12 w-12 rounded-2xl bg-white/15 backdrop-blur items-center justify-center font-bold text-2xl mb-8">D</span>
          <h2 className="font-display text-4xl font-bold leading-tight">Forgot your<br />password?</h2>
          <p className="mt-6 text-white/85 leading-relaxed">
            No worries — it happens to the best of drivers. Enter your email and we'll send you a reset link right away.
          </p>
          <div className="mt-12 flex gap-6">
            <Stat k="100%" v="Secure" />
            <Stat k="< 1m" v="Reset time" />
            <Stat k="24/7" v="Support" />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to login
          </Link>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Reset password</h1>
                <p className="mt-2 text-muted-foreground">
                  Enter your registered email and we'll send you a link to reset your password.
                </p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Email address</span>
                    <span className="mt-1 flex items-center gap-3 h-12 px-4 rounded-xl bg-muted border-2 border-transparent focus-within:border-primary focus-within:bg-background transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        required
                        className="w-full bg-transparent text-sm font-medium focus:outline-none"
                      />
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full h-12 rounded-full gradient-brand text-white font-semibold shadow-[var(--shadow-glow)] inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending link…
                      </span>
                    ) : (
                      <>Send reset link <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </button>
                </form>

                <p className="mt-8 text-sm text-center text-muted-foreground">
                  Remember your password?{" "}
                  <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto h-20 w-20 rounded-full gradient-brand inline-flex items-center justify-center text-white shadow-[var(--shadow-glow)]"
                >
                  <CheckCircle2 className="h-10 w-10" />
                </motion.div>
                <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">Check your inbox</h1>
                <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
                  We've sent a password reset link to{" "}
                  <strong className="text-ink">{email}</strong>. It expires in 1 hour.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Didn't get it? Check your spam folder or{" "}
                  <button
                    onClick={() => setSent(false)}
                    className="text-primary font-medium hover:underline"
                  >
                    try again
                  </button>
                  .
                </p>
                <Link
                  to="/login"
                  className="mt-8 inline-flex h-11 px-6 items-center rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold">{k}</p>
      <p className="text-xs text-white/70 mt-1">{v}</p>
    </div>
  );
}
