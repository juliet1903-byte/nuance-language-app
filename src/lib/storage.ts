export function storageGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error(`[storage] Failed to read key "${key}":`, e);
    return null;
  }
}

export function storageSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`[storage] Failed to write key "${key}":`, e);
  }
}

export function storageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`[storage] Failed to remove key "${key}":`, e);
  }
}
