import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Login successful", variant: "default" });
      navigate("/admin");
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      toast({ title: "Login failed", description: errMsg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast({ title: "Google login successful", variant: "default" });
      navigate("/admin");
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      toast({ title: "Google login failed", description: errMsg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-sciscribe-navy/90 via-sciscribe-blue/70 to-sciscribe-gold/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700"
      />
      {/* Glassmorphism Card */}
      <Card className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-slate-100 dark:border-slate-800">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-8">
          {/* Login SVG Icon */}
          <span className="mb-2 rounded-full bg-sciscribe-navy/10 dark:bg-sciscribe-gold/10 p-3 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-14 h-14 text-sciscribe-navy dark:text-sciscribe-gold"
              aria-hidden="true"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </span>
          <h1 className="text-3xl font-extrabold text-sciscribe-navy dark:text-sciscribe-gold tracking-tight text-center">
            SciScribe <span className="text-sciscribe-gold">Admin Console</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground text-center max-w-xs">
            Sign in to access the administration dashboard
          </p>
        </div>
        {/* Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
            className="bg-white/80 dark:bg-slate-800/80 shadow-sm focus:ring-sciscribe-gold"
            autoComplete="username"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
            className="bg-white/80 dark:bg-slate-800/80 shadow-sm focus:ring-sciscribe-gold"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            className="w-full font-semibold bg-sciscribe-navy hover:bg-sciscribe-blue text-white dark:bg-sciscribe-gold dark:text-slate-900 dark:hover:bg-sciscribe-blue/80 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
          <span className="mx-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        </div>
        {/* Google SSO Button */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 font-medium bg-white/90 dark:bg-slate-800/90 border border-sciscribe-gold/30 hover:border-sciscribe-gold shadow-sm hover:shadow-lg transition"
          disabled={loading}
        >
          <FcGoogle className="h-5 w-5" aria-hidden /> Sign in with Google
        </Button>
      </Card>
      {/* Subtle Overlay for Depth */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-white/20 via-transparent to-slate-900/30 dark:from-black/30 dark:to-black/60" />
    </div>
  );
}
