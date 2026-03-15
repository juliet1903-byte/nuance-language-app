import { create } from "zustand";
import { storageGet, storageSet } from "@/lib/storage";
import { supabase } from "@/integrations/supabase/client";

const LIMIT_REGISTERED = parseInt(
  import.meta.env.VITE_REQUESTS_LIMIT_REGISTERED ?? "15",
  10
);
const LIMIT_GUEST = parseInt(
  import.meta.env.VITE_REQUESTS_LIMIT_GUEST ?? "5",
  10
);

const GUEST_STORAGE_KEY = "nuance-request-limit";

interface StoredLimit {
  used: number;
  date: string; // "YYYY-MM-DD"
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

interface RequestLimitState {
  requestsUsed: number;
  requestsLimit: number;
  isLimitReached: boolean;
  isInitialized: boolean;

  initialize: (isGuest: boolean) => void;
  checkAndConsume: (isGuest: boolean, userId?: string) => Promise<boolean>;
  syncFromServer: (userId: string) => Promise<void>;
  _setUsed: (used: number, limit: number) => void;
}

export const useRequestLimitStore = create<RequestLimitState>((set, get) => ({
  requestsUsed: 0,
  requestsLimit: LIMIT_GUEST,
  isLimitReached: false,
  isInitialized: false,

  _setUsed(used: number, limit: number) {
    set({ requestsUsed: used, requestsLimit: limit, isLimitReached: used >= limit });
  },

  initialize(isGuest: boolean) {
    const limit = isGuest ? LIMIT_GUEST : LIMIT_REGISTERED;

    if (isGuest) {
      // Guests: read from localStorage
      const stored = storageGet<StoredLimit>(GUEST_STORAGE_KEY);
      const today = todayStr();
      let used = 0;
      if (stored && stored.date === today) {
        used = stored.used;
      } else if (stored && stored.date !== today) {
        storageSet<StoredLimit>(GUEST_STORAGE_KEY, { used: 0, date: today });
      }
      set({ requestsUsed: used, requestsLimit: limit, isLimitReached: used >= limit, isInitialized: true });
    } else {
      // Registered: start at 0; syncFromServer will populate the real count
      set({ requestsUsed: 0, requestsLimit: limit, isLimitReached: false, isInitialized: true });
    }
  },

  async checkAndConsume(isGuest: boolean, userId?: string): Promise<boolean> {
    const { requestsUsed, requestsLimit } = get();

    if (isGuest || !userId) {
      // Guest: enforce client-side + persist to localStorage
      if (requestsUsed >= requestsLimit) return false;
      const newUsed = requestsUsed + 1;
      set({ requestsUsed: newUsed, isLimitReached: newUsed >= requestsLimit });
      storageSet<StoredLimit>(GUEST_STORAGE_KEY, { used: newUsed, date: todayStr() });
      return true;
    }

    // Authenticated: update Zustand state only — DB is the source of truth, no localStorage
    if (requestsUsed >= requestsLimit) return false;
    const newUsed = requestsUsed + 1;
    set({ requestsUsed: newUsed, isLimitReached: newUsed >= requestsLimit });
    return true;
  },

  async syncFromServer(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("ai_requests_today, ai_requests_reset_at")
      .eq("id", userId)
      .maybeSingle();

    if (error || !data) return;

    const today = todayStr();
    const resetDate = data.ai_requests_reset_at?.slice(0, 10);
    const used = resetDate === today ? (data.ai_requests_today ?? 0) : 0;

    // Registered: DB is the source of truth — update Zustand only, no localStorage
    set({
      requestsUsed: used,
      requestsLimit: LIMIT_REGISTERED,
      isLimitReached: used >= LIMIT_REGISTERED,
    });
  },
}));
