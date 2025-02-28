import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const CACHE_TTL = 10 * 60 * 1000; // Cache expiry time (10 minutes)

function createCache() {
  return new Map();
}

// Global Caches
const playlistCache = createCache();
const artistCache = createCache();
const songCache = createCache();
const albumCache = createCache();
const lyricsCache = createCache();

/**
 * Fetch data with caching and expiry
 */
async function fetchWithCache(url, cache, cacheKey) {
  const cachedEntry = cache.get(cacheKey);

  if (cachedEntry && Date.now() < cachedEntry.expiry) {
    console.log(`Returning cached data for: ${cacheKey}`);
    return cachedEntry.value;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data?.data?.results) {
      cache.set(cacheKey, {
        value: data.data.results,
        expiry: Date.now() + CACHE_TTL,
      });
      return data.data.results;
    } else {
      return data?.message;
    }
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}

/**
 * Fetch Playlists with caching
 */
export async function fetchPlaylists({ query = "a", limit = 10 }) {
  const url = `https://saavn.dev/api/search/playlists?query=${query}&limit=${limit}`;
  return await fetchWithCache(
    url,
    playlistCache,
    `playlists_${query}_${limit}`
  );
}

/**
 * Fetch Playlists By Id with caching
 */

export async function fetchPlaylistById({ id, limit = 10 }) {
  const cacheKey = `playlist_${id}`;

  // Check if cached data exists and is not expired
  if (
    playlistCache.has(cacheKey) &&
    Date.now() < playlistCache.get(cacheKey).expiry
  ) {
    console.log(`Returning cached playlist for: ${id}`);
    return playlistCache.get(cacheKey).value;
  }

  // Fetch fresh data if not cached or expired
  try {
    const response = await fetch(
      `https://saavn.dev/api/playlists?id=${id}&limit=${limit}`
    );
    const data = await response.json();

    if (data?.data) {
      playlistCache.set(cacheKey, {
        value: data.data,
        expiry: Date.now() + CACHE_TTL,
      });
      return data.data;
    } else {
      return data?.message;
    }
  } catch (error) {
    return { error: "Failed to fetch playlist" };
  }
}

/**
 * Fetch Artists with caching
 */
export async function fetchArtists({ query = "a", limit = 10 }) {
  const url = `https://saavn.dev/api/search/artists?query=${query}&limit=${limit}`;
  return await fetchWithCache(url, artistCache, `artists_${query}_${limit}`);
}

/**
 * Fetch Songs with caching
 */
export async function fetchSongs({ query = "a", limit = 10 }) {
  const url = `https://saavn.dev/api/search/songs?query=${query}&limit=${limit}`;
  return await fetchWithCache(url, songCache, `songs_${query}_${limit}`);
}

/**
 * Fetch Albums with caching
 */
export async function fetchAlbums({ query = "a", limit = 10 }) {
  const url = `https://saavn.dev/api/search/albums?query=${query}&limit=${limit}`;
  return await fetchWithCache(url, albumCache, `albums_${query}_${limit}`);
}

/**
 * Fetch Song Lyrics with caching
 */
export async function fetchSongLyrics({ id }) {
  const cacheKey = `lyrics_${id}`;

  if (
    lyricsCache.has(cacheKey) &&
    Date.now() < lyricsCache.get(cacheKey).expiry
  ) {
    console.log(`Returning cached lyrics for: ${id}`);
    return lyricsCache.get(cacheKey).value;
  }

  try {
    const response = await fetch(`https://saavn.dev/api/songs/${id}/lyrics`);
    const data = await response.json();

    if (data.success) {
      const lyrics = data?.data?.lyrics;
      lyricsCache.set(cacheKey, {
        value: lyrics,
        expiry: Date.now() + CACHE_TTL,
      });
      return lyrics;
    } else {
      return data?.message;
    }
  } catch (error) {
    return { error: "Failed to fetch lyrics" };
  }
}
