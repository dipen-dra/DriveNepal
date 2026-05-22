import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate, Link, useSearch } from "@tanstack/react-router";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api";
import logo from "@/assets/logo.png";

export function AuthCard({
  title, subtitle, mode, footer,
}: { title: string; subtitle: string; mode: "login" | "signup"; footer: React.ReactNode }) {
  const { login, signup, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { registered?: boolean };
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(search.registered ? "Account created successfully. Please log in." : null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const user = await login(email, password);
        toast.success("Successfully logged in!");
        if (user.role === "admin") {
          void navigate({ to: "/admin" });
        } else {
          void navigate({ to: "/dashboard" });
        }
      } else {
        await signup(name, email, password);
        toast.success("Account created successfully!");
        void navigate({ to: "/login", search: { registered: true } });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors?.[0]?.msg ?? err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError(null);
    try {
      if (credentialResponse.credential) {
        const user = await googleSignIn(credentialResponse.credential);
        toast.success("Google Sign-In successful!");
        if (user.role === "admin") {
          void navigate({ to: "/admin" });
        } else {
          void navigate({ to: "/dashboard" });
        }
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors?.[0]?.msg ?? err.message);
      } else {
        setError("Google authentication failed. Please try again.");
      }
    }
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2 noise-bg">
      <div className="hidden lg:flex relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 gradient-brand opacity-95" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative text-white max-w-md">
          <span className="inline-flex h-12 w-12 rounded-2xl bg-white/15 backdrop-blur items-center justify-center font-bold text-2xl mb-8">D</span>
          <h2 className="font-display text-4xl font-bold leading-tight">Drive luxury.<br />Ride freedom.</h2>
          <p className="mt-6 text-white/85 leading-relaxed">
            From the lakes of Pokhara to the streets of Thamel, your next adventure starts with the right ride.
          </p>
          <div className="mt-12 flex gap-6">
            <Stat k="120+" v="Vehicles" />
            <Stat k="10k+" v="Happy trips" />
            <Stat k="4.9★" v="Avg rating" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="inline-block mb-6">
            <img src={logo} alt="DriveNepal" className="h-8 md:h-10 w-auto" />
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>

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

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {success}
            </motion.div>
          )}

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <Field label="Full name" icon={<User className="h-4 w-4" />}>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Aayush Karki" required
                  className="w-full bg-transparent text-sm font-medium focus:outline-none"
                />
              </Field>
            )}
            <Field label="Email" icon={<Mail className="h-4 w-4" />}>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com" required
                className="w-full bg-transparent text-sm font-medium focus:outline-none"
              />
            </Field>
            <Field label="Password" icon={<Lock className="h-4 w-4" />}>
              <input
                type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required minLength={6}
                className="w-full bg-transparent text-sm font-medium focus:outline-none"
              />
              <button type="button" onClick={() => setShow((s) => !s)} className="text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </Field>

            {mode === "login" && (
              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-2 text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="accent-primary" /> Remember me
                </label>
                <Link to="/forgot-password" className="text-primary font-medium hover:underline">Forgot password?</Link>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full h-12 rounded-full gradient-brand text-white font-semibold shadow-[var(--shadow-glow)] inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Logging in…" : "Creating account…"}
                </span>
              ) : (
                <>{mode === "login" ? "Log in" : "Create account"} <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </button>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex-1 h-px bg-border" /> or continue with <div className="flex-1 h-px bg-border" />
            </div>

            <div className="flex justify-center mt-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google authentication failed.")}
                useOneTap
                theme="outline"
                shape="pill"
                size="large"
                text={mode === "login" ? "signin_with" : "signup_with"}
              />
            </div>
          </form>

          <p className="mt-8 text-sm text-center text-muted-foreground">{footer}</p>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="mt-1 flex items-center gap-3 h-12 px-4 rounded-xl bg-muted border-2 border-transparent focus-within:border-primary focus-within:bg-background transition-colors">
        <span className="text-muted-foreground">{icon}</span>
        {children}
      </span>
    </label>
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
