import { useNavigate, Link } from "react-router-dom";
import { useRef } from "react";
import { CircleGauge, Route, Flame } from "lucide-react";
import Logo from "@/components/Logo";
import LetterAvatar from "@/components/LetterAvatar";
import heroShowcase from "@/assets/hero-showcase.png";
import { useAuth } from "@/components/AuthContext";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import AnimatedGrid from "@/components/AnimatedGrid";

const Landing = () => {
  const navigate = useNavigate();
  const { enterGuestMode, user, profile } = useAuth();
  const showcaseRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"]
  });

  const rawTilt = useTransform(scrollYProgress, [0, 0.6], [20, 0]);
  const tilt = useSpring(rawTilt, { stiffness: 80, damping: 30 });

  const features = [
  {
    icon: CircleGauge,
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
    <motion.div
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <Logo className="h-8" />
        {user ?
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-sm font-medium text-foreground hover:opacity-80 transition-opacity">
          
            <LetterAvatar name={profile?.display_name} email={user.email} size="sm" />
          </button> :

        <button
          onClick={() => navigate("/auth")}
          className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
          
            Sign In
          </button>
        }
      </nav>

      {/* Hero */}
      <section className="relative text-center px-6 pt-12 pb-16 max-w-3xl mx-auto overflow-hidden">
      {/* Notebook grid texture - full width, faded at edges */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 -left-[50vw] -right-[50vw]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.25) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.25) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 50% 80% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 50% 80% at 50% 50%, black 30%, transparent 100%)"
          }}>
          
          <AnimatedGrid />
        </motion.div>
        <motion.span
          className="relative inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4 border bg-cta/10 text-cta border-cta/20"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          
          The #1 Communication Tool for Business English Learners
        </motion.span>
        <motion.h1
          className="relative text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}>
          
          Speak with Impact. <span className="text-cta">Lead with Nuance.</span>
        </motion.h1>
        <motion.p
          className="relative text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}>
          
          You've mastered the basics. Now, master the nuance. Refactor your business communication to lead, influence,
          and impact.
        </motion.p>
        <motion.div
          className="relative flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}>
          
          <button
            onClick={() => navigate("/auth")}
            className="px-8 py-3 rounded-xl bg-cta text-cta-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-md">
            
            Join Nuance
          </button>
          <button
            onClick={handleGuest}
            className="px-8 py-3 rounded-xl border border-border bg-card text-muted-foreground font-semibold text-base hover:bg-muted/50 transition-colors">
            
            Try as Guest
          </button>
        </motion.div>
      </section>

      {/* Product Showcase */}
      <section ref={showcaseRef} className="px-6 pb-16 max-w-4xl mx-auto">
        {/* Perspective on parent creates the 3D context for the child rotateX */}
        <div style={{ perspective: "1200px" }}>
          <motion.div
            className="rounded-2xl overflow-hidden border border-border/50"
            style={{
              rotateX: tilt,
              transformOrigin: "bottom center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
            }}>
            
            <img src={heroShowcase} alt="Nuance app interface" className="w-full h-auto shadow-none" />
          </motion.div>
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
              <h3 className="mb-2 font-medium text-base">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-base">{f.description}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section with notebook texture */}
      <section className="relative text-center px-6 pt-16 pb-20 mb-16 max-w-5xl mx-auto w-full overflow-hidden">
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-y-0 -left-[50vw] -right-[50vw]"
          style={{
            backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.25) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.25) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 50% 80% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 50% 80% at 50% 50%, black 30%, transparent 100%)"
          }}>
          
          <AnimatedGrid />
        </div>
        <h2 className="relative text-2xl md:text-3xl lg:text-4xl font-bold mb-8">Ready to level up your communication?</h2>
        <Link
          to="/auth"
          className="relative inline-block px-12 py-4 rounded-2xl bg-cta text-cta-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-md">
          
          Join Nuance
        </Link>
      </section>

      <Footer />
    </motion.div>);

};

export default Landing;