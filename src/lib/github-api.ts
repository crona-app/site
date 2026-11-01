// Cached access to the public GitHub API. Unauthenticated calls are limited to 60 an hour per
// IP, so every page shares this helper: Cloudflare's edge cache absorbs most traffic, and an
// in-memory copy per isolate covers local dev and serves the last good answer when GitHub fails.

const DEFAULT_TTL_SECONDS = 600;

interface CacheEntry {
  data: unknown;
  storedAt: number;
}

const memoryCache = new Map<string, CacheEntry>();

type CloudflareRequestInit = RequestInit & { cf?: { cacheTtl: number; cacheEverything: boolean } };

export async function fetchGitHub<T>(path: string, ttlSeconds = DEFAULT_TTL_SECONDS): Promise<T> {
  const url = `https://api.github.com/${path.replace(/^\//, "")}`;
  const cached = memoryCache.get(url);
  if (cached && Date.now() - cached.storedAt < ttlSeconds * 1000) return cached.data as T;

  try {
    const init: CloudflareRequestInit = {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "crona-site" },
      cf: { cacheTtl: ttlSeconds, cacheEverything: true },
    };
    const response = await fetch(url, init);
    if (!response.ok) throw new Error(`GitHub request failed: ${response.status} ${path}`);
    const data = (await response.json()) as T;
    memoryCache.set(url, { data, storedAt: Date.now() });
    return data;
  } catch (error) {
    // A stale answer beats an empty one when GitHub is down or rate limiting us.
    if (cached) return cached.data as T;
    throw error;
  }
}

/** "https://github.com/owner/repo" -> "repos/owner/repo" */
export const repoApiPath = (repoUrl: string) =>
  repoUrl.replace(/^https:\/\/github\.com\//, "repos/").replace(/\/$/, "");
