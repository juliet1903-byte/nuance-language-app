import { useEffect, useState } from "react";
import { Trophy, Shield, ShieldOff, Crown, Medal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthContext";
import { Switch } from "@/components/ui/switch";
import LetterAvatar from "@/components/LetterAvatar";

interface LeaderboardEntry {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  vibe_iq: number;
  lessons_completed: number;
}

const RANK_ICONS = [
  <Crown className="w-5 h-5 text-yellow-500" />,
  <Medal className="w-5 h-5 text-gray-400" />,
  <Medal className="w-5 h-5 text-amber-600" />,
];

const Leaderboard = () => {
  const { user, profile } = useAuth();
  const [optedIn, setOptedIn] = useState(false);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [myRank, setMyRank] = useState<number>(0);
  const [totalParticipants, setTotalParticipants] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  // Fetch opt-in status
  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("leaderboard_opt_in")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) setOptedIn((data as any).leaderboard_opt_in ?? false);
      });
  }, [user]);

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    setLoading(true);
    const { data } = await supabase.rpc("get_leaderboard");
    if (data) setEntries(data as LeaderboardEntry[]);

    if (user) {
      const { data: rankData } = await supabase.rpc("get_my_leaderboard_rank", {
        _user_id: user.id,
      });
      if (rankData && (rankData as any[])[0]) {
        setMyRank(Number((rankData as any[])[0].rank));
        setTotalParticipants(Number((rankData as any[])[0].total_participants));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [user, optedIn]);

  const handleToggle = async (checked: boolean) => {
    if (!user || toggling) return;
    setToggling(true);
    await supabase
      .from("profiles")
      .update({ leaderboard_opt_in: checked } as any)
      .eq("id", user.id);
    setOptedIn(checked);
    await fetchLeaderboard();
    setToggling(false);
  };

  const currentVibeIq = (profile as any)?.vibe_iq ?? 0;

  return (
    <section className="bg-card rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Vibe IQ Leaderboard
          </h2>
        </div>
      </div>

      {/* Opt-in toggle */}
      {user && (
        <div className="flex items-center justify-between p-3 mb-4 rounded-xl bg-muted/50">
          <div className="flex items-center gap-2">
            {optedIn ? (
              <Shield className="w-4 h-4 text-primary" />
            ) : (
              <ShieldOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium">
              {optedIn ? "Visible on leaderboard" : "Join the leaderboard"}
            </span>
          </div>
          <Switch
            checked={optedIn}
            onCheckedChange={handleToggle}
            disabled={toggling}
          />
        </div>
      )}

      {/* Your rank summary (only when not on the list) */}
      {user && currentVibeIq > 0 && !optedIn && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 mb-4 rounded-xl border border-primary/20 bg-primary/5"
        >
          <LetterAvatar
            name={profile?.display_name}
            email={user.email}
            avatarUrl={profile?.avatar_url}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {profile?.display_name || user.email?.split("@")[0] || "You"}
            </p>
            <p className="text-xs text-muted-foreground">Your score (private)</p>
          </div>
          <span className="text-lg font-bold text-primary">{currentVibeIq}</span>
        </motion.div>
      )}

      {/* Leaderboard list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-xl bg-muted/40 animate-pulse" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center">
          <Trophy className="w-10 h-10 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">
            No participants yet. Be the first to join!
          </p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-2">
            {entries.map((entry, idx) => {
              const isMe = entry.user_id === user?.id;
              return (
                <motion.div
                  key={entry.user_id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    isMe
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  {/* Rank */}
                  <div className="w-7 flex items-center justify-center shrink-0">
                    {idx < 3 ? (
                      RANK_ICONS[idx]
                    ) : (
                      <span className="text-sm font-semibold text-muted-foreground">
                        {idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <LetterAvatar
                    name={entry.display_name}
                    avatarUrl={entry.avatar_url}
                    size="sm"
                  />

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {isMe ? "You" : entry.display_name || "Anonymous"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.lessons_completed} lessons
                    </p>
                  </div>

                  {/* Score */}
                  <span
                    className={`text-base font-bold ${
                      idx === 0 ? "text-yellow-500" : "text-foreground"
                    }`}
                  >
                    {entry.vibe_iq}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </section>
  );
};

export default Leaderboard;
