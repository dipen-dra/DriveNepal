import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { resetPassword, ApiError } from "@/lib/api";
import { redirectIfLoggedIn } from "@/lib/guards";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password — DriveNepal" }] }),
  beforeLoad: redirectIfLoggedIn,
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read ?token= from URL
  const token =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token") ?? ""
      : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Reset token is missing. Please use the link from your email.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token, password);
      setDone(true);
      setTimeout(() => navigate({ to: "/dashboard" }), 2500);
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("Something went wrong. Please try again.");
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
          <span className="inline-flex h-12 w-12 rounded-2xl bg-white/15 backdrop-blur items-center justify-center font-bold text-2xl mb-8">
            D
          </span>
          <h2 className="font-display text-4xl font-bold leading-tight">
            Set your new<br />password
          </h2>
          <p className="mt-6 text-white/85 leading-relaxed">
            Choose a strong password to keep your DriveNepal account safe. You're almost back on the road.
          </p>
          <div className="mt-12 flex gap-6">
            <Stat k="AES-256" v="Encryption" />
            <Stat k="Zero" v="Data stored" />
            <Stat k="Always" v="Secure" />
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
            {!done ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                  New password
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Must be at least 6 characters. Pick something you'll remember.
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
                  <PasswordField
                    label="New password"
                    value={password}
                    onChange={setPassword}
                    show={show}
                    onToggle={() => setShow((s) => !s)}
                  />
                  <PasswordField
                    label="Confirm password"
                    value={confirm}
                    onChange={setConfirm}
                    show={show}
                    onToggle={() => setShow((s) => !s)}
                    placeholder="Re-enter password"
                  />

                  {/* Strength bar */}
                  {password.length > 0 && (
                    <StrengthBar password={password} />
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full h-12 rounded-full gradient-brand text-white font-semibold shadow-[var(--shadow-glow)] inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Resetting…
                      </span>
                    ) : (
                      "Reset password"
                    )}
                  </button>
                </form>
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
                <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">
                  Password updated!
                </h1>
                <p className="mt-3 text-muted-foreground">
                  Your password has been reset successfully. Redirecting you to your dashboard…
                </p>
                <div className="mt-4 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full gradient-brand"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function PasswordField({
  label, value, onChange, show, onToggle, placeholder = "••••••••",
}: {
  label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="mt-1 flex items-center gap-3 h-12 px-4 rounded-xl bg-muted border-2 border-transparent focus-within:border-primary focus-within:bg-background transition-colors">
        <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-medium focus:outline-none"
        />
        <button type="button" onClick={onToggle} className="text-muted-foreground hover:text-foreground">
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </span>
    </label>
  );
}

function StrengthBar({ password }: { password: string }) {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const labels = ["Too short", "Weak", "Fair", "Good", "Strong", "Excellent"];
  const colors = ["bg-destructive", "bg-destructive", "bg-orange-400", "bg-yellow-400", "bg-emerald-500", "bg-emerald-600"];

  return (
    <div>
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${i <= strength ? colors[strength] : "bg-muted"}`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{labels[strength]}</p>
    </div>
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
