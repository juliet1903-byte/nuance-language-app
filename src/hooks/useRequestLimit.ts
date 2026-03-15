import { useCallback, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRequestLimitStore } from "@/store/requestLimitStore";
import { toast } from "@/hooks/use-toast";

const LIMIT_REGISTERED = parseInt(
  import.meta.env.VITE_REQUESTS_LIMIT_REGISTERED ?? "15",
  10
);

export function useRequestLimit() {
  const { user, isGuest } = useAuth();
  const store = useRequestLimitStore();
  const effectiveIsGuest = isGuest || !user;

  useEffect(() => {
    store.initialize(effectiveIsGuest);
    if (user && !isGuest) {
      store.syncFromServer(user.id);
    }
  }, [user?.id, isGuest]);

  const consume = useCallback(async (): Promise<boolean> => {
    const wasAtLimit = store.isLimitReached;
    const allowed = await store.checkAndConsume(effectiveIsGuest, user?.id ?? undefined);

    // Fire a toast exactly once when the limit is just reached
    if (allowed && store.isLimitReached && !wasAtLimit) {
      if (effectiveIsGuest) {
        toast({
          title: "Daily limit reached",
          description: `Sign up free to get ${LIMIT_REGISTERED} requests/day!`,
          variant: "destructive",
        });
      } else {
        toast({
          title: `That's all ${store.requestsLimit} for today`,
          description: "Your requests reset at midnight.",
          variant: "destructive",
        });
      }
    }

    return allowed;
  }, [effectiveIsGuest, user?.id, store]);

  const requestsLimit = store.requestsLimit;
  const requestsUsed = store.requestsUsed;

  return {
    requestsUsed,
    requestsLimit,
    requestsLeft: Math.max(0, requestsLimit - requestsUsed),
    isLimitReached: store.isLimitReached,
    isGuest: effectiveIsGuest,
    consume,
    syncFromServer: user ? () => store.syncFromServer(user.id) : undefined,
  };
}
