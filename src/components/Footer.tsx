import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact", {
        body: { name: name.trim(), email: email.trim(), message: message.trim() },
      });
      if (error) throw error;
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast({ title: "Failed to send", description: "Please try again later.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="bg-[hsl(220,20%,10%)] text-[hsl(36,15%,90%)]">
      {/* CTA Section */}
      <div className="text-center px-6 pt-20 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to level up your communication?</h2>
        <Link
          to="/auth"
          className="inline-block px-10 py-3.5 rounded-xl bg-cta text-cta-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-md"
        >
          Join Nuance
        </Link>
      </div>
      {/* Footer Content */}{" "}
      <div className="max-w-5xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo + Copyright */}{" "}
        <div className="space-y-4">
          <Logo className="h-7 text-[hsl(36,15%,90%)]" />
          <p className="text-sm text-[hsl(220,8%,55%)]">//Master the nuance of professional communication. // </p>{" "}
          <p className="text-xs text-[hsl(220,8%,45%)]">
            © {new Date().getFullYear()} Nuance. All Rights Reserved. //{" "}
          </p>{" "}
        </div>
        {/* Links */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-[hsl(220,8%,55%)]">Links</h3>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="text-sm hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/auth" className="text-sm hover:text-white transition-colors">
              Log In
            </Link>
            <Link to="/auth" className="text-sm hover:text-white transition-colors">
              Register
            </Link>
            <Link to="/privacy" className="text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </nav>
        </div>
        {/* Contact Form */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-[hsl(220,8%,55%)]">Get in Touch</h3>
          <form onSubmit={handleContact} className="space-y-2">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className="bg-[hsl(220,18%,15%)] border-[hsl(220,15%,20%)] text-[hsl(36,15%,90%)] placeholder:text-[hsl(220,8%,45%)] h-9 text-sm"
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              className="bg-[hsl(220,18%,15%)] border-[hsl(220,15%,20%)] text-[hsl(36,15%,90%)] placeholder:text-[hsl(220,8%,45%)] h-9 text-sm"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={1000}
              rows={2}
              className="w-full rounded-md bg-[hsl(220,18%,15%)] border border-[hsl(220,15%,20%)] text-[hsl(36,15%,90%)] placeholder:text-[hsl(220,8%,45%)] px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full py-2 rounded-lg bg-cta text-cta-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
