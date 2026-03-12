import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Bell,
  Moon,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  Award,
  BookOpen,
  Flame,
  Pencil,
  Camera,
  Trash2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/components/AppLayout";
import { useTheme } from "@/components/ThemeContext";
import { useAuth } from "@/components/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import LetterAvatar from "@/components/LetterAvatar";
import { modules } from "@/data/modules";
import LoginBanner from "@/components/LoginBanner";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LEVEL_NAMES = ["Natural Flow", "The Specialist", "The Collaborator", "The Influencer"];

const Profile = () => {
  const navigate = useNavigate();
  const { theme, toggle: toggleTheme } = useTheme();
  const { isGuest, user, profile, signOut, refreshProfile } = useAuth();
  const { streakDays, modulesCompleted, vibeIq } = useProgress();
  const showBanner = isGuest || !user;

  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayName = showBanner ? "New User" : profile?.display_name || user?.email?.split("@")[0] || "User";
  const displayEmail = showBanner ? "user@example.com" : user?.email;
  const levelName = showBanner ? LEVEL_NAMES[0] : LEVEL_NAMES[Math.min((profile?.learning_level ?? 1) - 1, 3)];

  const quickStats = [
    { icon: Flame, label: "Day Streak", value: showBanner ? "0" : String(streakDays), color: "text-vibe-blunt" },
    {
      icon: BookOpen,
      label: "Modules",
      value: showBanner ? `0/${modules.length}` : `${modulesCompleted}/${modules.length}`,
      color: "text-cta",
    },
    { icon: Award, label: "Vibe IQ", value: showBanner ? "0" : String(vibeIq), color: "text-accent" },
  ];

  const handleEditName = () => {
    setNameValue(profile?.display_name || "");
    setEditingName(true);
  };

  const handleSaveName = async () => {
    if (!user) return;
    const trimmed = nameValue.trim();
    if (!trimmed || trimmed.length > 50) {
      toast.error("Name must be 1-50 characters");
      return;
    }
    setSavingName(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: trimmed })
      .eq("id", user.id);
    setSavingName(false);
    if (error) {
      toast.error("Failed to update name");
    } else {
      toast.success("Name updated");
      setEditingName(false);
      await refreshProfile();
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setUploadingAvatar(true);
    const path = `${user.id}/avatar`;

    // Remove existing avatar first
    await supabase.storage.from("avatars").remove([path]);

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      toast.error("Failed to upload image");
      setUploadingAvatar(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
    const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", user.id);

    setUploadingAvatar(false);
    if (updateError) {
      toast.error("Failed to save avatar");
    } else {
      toast.success("Profile photo updated");
      await refreshProfile();
    }

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setDeleting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke("delete-account", {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (res.error) throw res.error;
      toast.success("Account deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete account. Please try again.");
    }
    setDeleting(false);
    setShowDeleteDialog(false);
  };

  return (
    <AppLayout>
      <header className="flex items-center gap-3 px-5 pt-6 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Profile</h1>
      </header>

      <main className="px-5 space-y-6 pb-8 md:max-w-[900px] md:mx-auto md:w-full">
        <div className="relative overflow-hidden rounded-2xl">
          {showBanner && <LoginBanner />}

        <section className="flex flex-col items-center text-center pt-2">
          <div className="relative mb-3 group">
            <div
              className="rounded-full md:cursor-default cursor-pointer"
              onClick={() => {
                if (window.innerWidth < 768 && !showBanner) {
                  setShowAvatarMenu((v) => !v);
                }
              }}
            >
              <LetterAvatar
                name={showBanner ? "U" : profile?.display_name}
                email={showBanner ? undefined : user?.email}
                avatarUrl={showBanner ? undefined : profile?.avatar_url}
                size="lg"
              />
            </div>
            {!showBanner && (
              <>
                {/* Desktop: centered edit overlay on hover */}
                <button
                  onClick={() => setShowAvatarMenu((v) => !v)}
                  disabled={uploadingAvatar}
                  className="hidden md:flex absolute inset-0 m-auto w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                {showAvatarMenu && (
                  <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl shadow-lg py-1 z-10 min-w-[160px]">
                    <button
                      onClick={() => {
                        setShowAvatarMenu(false);
                        fileInputRef.current?.click();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      <Camera className="w-4 h-4 text-muted-foreground" />
                      Upload photo
                    </button>
                    {profile?.avatar_url && (
                      <button
                        onClick={async () => {
                          setShowAvatarMenu(false);
                          if (!user) return;
                          setUploadingAvatar(true);
                          await supabase.storage.from("avatars").remove([`${user.id}/avatar`]);
                          const { error } = await supabase
                            .from("profiles")
                            .update({ avatar_url: null })
                            .eq("id", user.id);
                          setUploadingAvatar(false);
                          if (error) {
                            toast.error("Failed to remove photo");
                          } else {
                            toast.success("Photo removed");
                            await refreshProfile();
                          }
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-muted transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove photo
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>

          {editingName ? (
            <div className="flex items-center gap-2 mt-1">
              <input
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                maxLength={50}
                autoFocus
                placeholder="Enter your name"
                className="bg-muted border border-border rounded-lg px-3 py-1.5 text-base font-semibold text-center w-48 focus:outline-none focus:ring-2 focus:ring-accent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveName();
                  if (e.key === "Escape") setEditingName(false);
                }}
              />
              <button
                onClick={handleSaveName}
                disabled={savingName}
                className="px-3 py-1.5 rounded-lg bg-cta text-cta-foreground text-sm font-medium disabled:opacity-50"
              >
                {savingName ? "..." : "Save"}
              </button>
              <button
                onClick={() => setEditingName(false)}
                className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-xl font-semibold">{displayName}</h2>
                {!showBanner && (
                  <button onClick={handleEditName} className="p-1 rounded-full hover:bg-muted transition-colors">
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              {!showBanner && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  This name appears on the leaderboard and in your activity
                </p>
              )}
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-0.5">{displayEmail}</p>
          <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-sm font-medium">
            <Award className="h-[16px] w-[16px]" />
            {levelName}
          </span>
        </section>

        <section className="grid grid-cols-3 gap-3">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-xl font-semibold">{stat.value}</span>
              <span className="text-muted-foreground mt-0.5 text-sm">{stat.label}</span>
            </div>
          ))}
        </section>
        </div>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Preferences</h2>
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden divide-y divide-border">
            <div className="w-full flex items-center gap-3 px-4 py-3.5">
              <Moon className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm font-medium">Dark Mode</span>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors">
              <Globe className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm font-medium">Language</span>
              <span className="text-xs text-muted-foreground mr-1">English</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Account</h2>
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden divide-y divide-border">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors">
              <Shield className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm font-medium">Privacy & Security</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/50 transition-colors">
              <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm font-medium">Help & Support</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </section>

        {!showBanner && (
          <section className="space-y-3">
            <button
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-destructive text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </section>
        )}

        <p className="text-center text-xs text-muted-foreground pb-2">Nuance v1.0 · Career Playbook</p>
      </main>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All your progress, streaks, and data will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default Profile;
