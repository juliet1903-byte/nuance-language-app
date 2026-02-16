import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { useAuth } from "@/components/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const COOLDOWN_MS = 10 * 60 * 1000;

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const lastRequest = localStorage.getItem("nuance-last-reset-request");
    if (lastRequest && Date.now() - Number(lastRequest) < COOLDOWN_MS) {
      const minutesLeft = Math.ceil((COOLDOWN_MS - (Date.now() - Number(lastRequest))) / 60000);
      toast({ title: "Please wait", description: `Try again in ${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}.`, variant: "destructive" });
      return;
    }
    setForgotLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setForgotLoading(false);
    if (error) {
      toast({ title: "Request failed", description: error.message, variant: "destructive" });
    } else {
      localStorage.setItem("nuance-last-reset-request", String(Date.now()));
      toast({ title: "Check your email", description: "We sent you a password reset link." });
      setShowForgot(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(signInEmail, signInPassword);
    setLoading(false);
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(signUpEmail, signUpPassword);
    setLoading(false);
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "We sent you a verification link." });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="flex items-center px-6 py-5 max-w-5xl mx-auto w-full">
        <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
          <Logo className="h-8" />
        </button>
      </nav>

      {/* Auth Card */}
      <div className="flex-1 flex items-start justify-center px-6 pt-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to Nuance</h1>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-cta text-cta-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Signing in…" : "Sign In"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForgot(true); setForgotEmail(signInEmail); }}
                  className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
                >
                  Forgot password?
                </button>
              </form>

              {showForgot && (
                <form onSubmit={handleForgotPassword} className="mt-4 space-y-3 border-t pt-4 border-border">
                  <p className="text-sm text-muted-foreground">Enter your email to receive a reset link.</p>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-3 rounded-xl bg-cta text-cta-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {forgotLoading ? "Sending…" : "Send Reset Link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgot(false)}
                    className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Display Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-cta text-cta-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Creating account…" : "Sign Up"}
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
