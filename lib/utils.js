import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function decodeHtmlEntities(text) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html").body
    .textContent;
  return decodedString;
}

export function getInitials(text) {
  if (!text) return "";

  // Split text into words
  const words = text.trim().split(/\s+/);

  // Get first letter of each word (limit to 2 letters)
  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return initials;
}

export function formatNumber(num) {
  if (typeof num !== "number" || isNaN(num)) return "0"; // Handle invalid input

  if (num < 1000) return num.toString();

  const units = ["K", "M", "B", "T"];
  let unitIndex = -1;
  let formattedNum = num;

  while (formattedNum >= 1000 && unitIndex < units.length - 1) {
    formattedNum /= 1000;
    unitIndex++;
  }

  return `${formattedNum.toFixed(1).replace(/\.0$/, "")}${
    units[unitIndex] || ""
  }`;
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
 * Fetch Artist by id with caching
 */

export async function fetchArtistById({ id }) {
  const cacheKey = `artist_${id}`;

  // Check if cached data exists and is not expired
  if (
    artistCache.has(cacheKey) &&
    Date.now() < artistCache.get(cacheKey).expiry
  ) {
    console.log(`Returning cached artist for: ${id}`);
    return artistCache.get(cacheKey).value;
  }

  // Fetch fresh data if not cached or expired
  try {
    const response = await fetch(
      `https://saavn.dev/api/artists/${id}?sortBy=popularity`
    );
    const data = await response.json();

    if (data?.data) {
      artistCache.set(cacheKey, {
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
 * Fetch Album by id with caching
 */

export async function fetchAlbumById({ id }) {
  const cacheKey = `album_${id}`;

  // Check if cached data exists and is not expired
  if (
    albumCache.has(cacheKey) &&
    Date.now() < albumCache.get(cacheKey).expiry
  ) {
    console.log(`Returning cached album for: ${id}`);
    return albumCache.get(cacheKey).value;
  }

  // Fetch fresh data if not cached or expired
  try {
    const response = await fetch(`https://saavn.dev/api/albums?id=${id}`);
    const data = await response.json();
    if (data?.data) {
      albumCache.set(cacheKey, {
        value: data.data,
        expiry: Date.now() + CACHE_TTL,
      });
      return data.data;
    } else {
      return data?.message;
    }
  } catch (error) {
    return { error: "Failed to fetch album" };
  }
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
