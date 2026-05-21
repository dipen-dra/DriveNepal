import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthCard } from "@/components/AuthCard";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — DriveNepal" }] }),
  component: () => (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to manage your bookings and saved vehicles."
      mode="login"
      footer={
        <>Don't have an account? <Link to="/signup" className="text-primary font-semibold">Sign up</Link></>
      }
    />
  ),
});
