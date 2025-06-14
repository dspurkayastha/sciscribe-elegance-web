
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useFirebase } from "@/hooks/useFirebase";

export default function ResearchLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isFirebaseAvailable } = useFirebase();

  if (!isFirebaseAvailable) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sciscribe-navy/90 via-sciscribe-blue/70 to-sciscribe-gold/30">
        <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-sciscribe-navy">Firebase Configuration Required</CardTitle>
            <CardDescription>
              Please configure Firebase to access the research collaboration platform.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Welcome to SciScribe Research Portal", variant: "default" });
      navigate("/research");
    } catch (error) {
      toast({ title: "Login failed", description: "Invalid credentials", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: "Account created successfully", variant: "default" });
      navigate("/research");
    } catch (error) {
      toast({ title: "Signup failed", description: "Please try again", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sciscribe-navy/90 via-sciscribe-blue/70 to-sciscribe-gold/30 p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl border border-sciscribe-gold/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-sciscribe-gold/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-sciscribe-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-sciscribe-navy">Research Portal</CardTitle>
          <CardDescription className="text-sciscribe-navy/70">
            Access your collaborative research workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/80 border-sciscribe-gold/30 focus:border-sciscribe-gold"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/80 border-sciscribe-gold/30 focus:border-sciscribe-gold"
                />
                <Button
                  type="submit"
                  className="w-full bg-sciscribe-navy hover:bg-sciscribe-blue text-white"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/80 border-sciscribe-gold/30 focus:border-sciscribe-gold"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/80 border-sciscribe-gold/30 focus:border-sciscribe-gold"
                />
                <Button
                  type="submit"
                  className="w-full bg-sciscribe-gold hover:bg-sciscribe-amber text-sciscribe-navy"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
