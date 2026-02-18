import { useNavigate } from "react-router-dom";
import { Zap, Route, Flame } from "lucide-react";
import Logo from "@/components/Logo";
import LetterAvatar from "@/components/LetterAvatar";
import heroShowcase from "@/assets/hero-showcase.png";
import { useAuth } from "@/components/AuthContext";
import Footer from "@/components/Footer";

const Landing = () => {
  const navigate = useNavigate();
  const { enterGuestMode, user, profile } = useAuth();

  const features = [
  {
    icon: Zap,
    title: "Social Translator & Vibe Meter",
    description: "Turn your raw thoughts into polished professional business communication"
  },
  {
    icon: Route,
    title: "4-Level Learning Path",
    description: "Progress from Natural Flow to Influencer with structured career communication modules."
  },
  {
    icon: Flame,
    title: "Daily Streaks",
    description: "Build consistency and momentum with daily learning goals and streaks."
  }];


  const handleGuest = () => {
    enterGuestMode();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <Logo className="h-8" />
        {user ?
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition-opacity">

            <LetterAvatar name={profile?.display_name} email={user.email} size="sm" />
            <span>{profile?.display_name || user.email?.split("@")[0]}</span>
          </button> :

        <button
          onClick={() => navigate("/auth")}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">

            Sign In
          </button>
        }
      </nav>

      {/* Hero */}
      <section className="text-center px-6 pt-12 pb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
          Speak with Impact. <span className="text-cta">Lead with Nuance.</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-4 leading-relaxed">
          You've mastered the basics. Now, master the nuance. Refactor your business communication to lead, influence,
          and impact.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/auth")}
            className="px-8 py-3 rounded-xl bg-cta text-cta-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-md">

            Join Nuance
          </button>
          <button
            onClick={handleGuest}
            className="px-8 py-3 rounded-xl border-2 border-accent text-accent font-semibold text-sm hover:bg-accent/10 transition-colors">

            Try as Guest
          </button>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50">
          <img src={heroShowcase} alt="Nuance app interface" className="w-full h-auto shadow-inner" />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) =>
          <div key={f.title} className="bg-card rounded-2xl p-6 shadow-sm border border-border/30">
              <div className="w-11 h-11 rounded-xl bg-cta/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-cta" />
              </div>
              <h3 className="font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>);

};

export default Landing;