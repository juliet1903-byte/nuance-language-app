import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center px-6 py-5 max-w-5xl mx-auto">
        <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
          <Logo className="h-8" />
        </button>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pb-20 pt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy for Nuance</h1>
        <p className="text-muted-foreground mb-8 text-sm">Last Updated: February 17, 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <p>
            At <strong>Nuance</strong>, we provide a "Post-Duolingo" leadership development environment designed for high-stakes professional growth. We prioritize the privacy of your strategic communication.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Data Collection & Usage</h2>
            <p className="mb-2">We only collect data necessary to provide a persistent, personalized experience:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Identity Data:</strong> We store your email address and name to manage your account and generate your letter-based profile avatar.</li>
              <li><strong>Progress Tracking:</strong> We save your Vibe IQ score, completed modules, and learning streaks to your private profile.</li>
              <li><strong>Activity Logs:</strong> We record timestamps of your practice sessions to populate your personal Activity Calendar.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. AI & Communication Privacy</h2>
            <p className="mb-2"><strong>Your communication is your own.</strong> Because we focus on professional refactoring:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>No Storage of Inputs:</strong> The text you input into the "Social Translator" or "Refactor" tools is processed in real-time.</li>
              <li><strong>Non-Persistent:</strong> We do not store, save, or archive your original or refactored text on our servers.</li>
              <li><strong>No Training:</strong> Your inputs are not used to train global AI models. Once your session ends, the text is discarded.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Cookies & Session Persistence</h2>
            <p className="mb-2">To respect your workflow and maintain your habit-building:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Session Duration:</strong> By default, your login session remains active for <strong>7 days</strong> through secure local storage.</li>
              <li><strong>Control:</strong> You can terminate this session at any time by selecting "Log Out" from your profile menu.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Infrastructure & Third Parties</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Platform:</strong> Nuance is built and hosted via <strong>Lovable</strong>.</li>
              <li><strong>Database:</strong> Authentication and data storage are handled securely (PostgreSQL).</li>
              <li><strong>Analytics:</strong> Anonymous visitor metadata (e.g., browser type) may be collected by the hosting provider to ensure platform stability.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Your Rights & Data Deletion</h2>
            <p className="mb-2">We comply with global privacy standards regarding your personal data:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You have the right to access or correct your profile information.</li>
              <li>To request permanent deletion of your account and all associated progress data, please use the <strong>contact form in the footer</strong>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Security</h2>
            <p>
              We utilize industry-standard encryption and secure authentication. We recommend using a unique password to protect your professional progress.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
