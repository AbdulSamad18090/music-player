import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const playlistCache = new Map(); // In-memory cache

export async function fetchPlaylists({ query = "a", limit = 10 }) {
  const cacheKey = `${query}_${limit}`; // Unique cache key

  if (playlistCache.has(cacheKey)) {
    console.log("Returning cached playlists for:", cacheKey);
    return playlistCache.get(cacheKey); // Return cached playlists if available
  }

  try {
    const response = await fetch(
      `https://saavn.dev/api/search/playlists?query=${query}&limit=${limit}`
    );
    const data = await response.json();

    if (data?.data?.results) {
      playlistCache.set(cacheKey, data.data.results); // Store in cache
      return data.data.results;
    } else {
      return data?.message;
    }
  } catch (error) {
    return { error: "Failed to fetch playlists" };
  }
}

const artistCache = new Map(); // In-memory cache

export async function fetchArtists({ query = "a", limit = 10 }) {
  const cacheKey = `${query}_${limit}`; // Unique cache key

  if (artistCache.has(cacheKey)) {
    console.log("Returning cached artists for:", cacheKey);
    return artistCache.get(cacheKey); // Return cached artists if available
  }

  try {
    const response = await fetch(
      `https://saavn.dev/api/search/artists?query=${query}&limit=${limit}`
    );
    const data = await response.json();

    if (data?.data?.results) {
      artistCache.set(cacheKey, data.data.results); // Store in cache
      return data.data.results;
    } else {
      return data?.message;
    }
  } catch (error) {
    return { error: "Failed to fetch artists" };
  }
}

const songCache = new Map(); // In-memory cache

export async function fetchSongs({ query = "a", limit = 10 }) {
  const cacheKey = `${query}_${limit}`; // Unique cache key

  if (songCache.has(cacheKey)) {
    console.log("Returning cached songs for:", cacheKey);
    return songCache.get(cacheKey); // Return cached songs if available
  }

  try {
    const response = await fetch(
      `https://saavn.dev/api/search/songs?query=${query}&limit=${limit}`
    );
    const data = await response.json();

    if (data?.data?.results) {
      songCache.set(cacheKey, data.data.results); // Store in cache
      return data.data.results;
    } else {
      return data?.message;
    }
  } catch (error) {
    return { error: "Failed to fetch songs" };
  }
}

const albumCache = new Map(); // In-memory cache

export async function fetchAlbums({ query = "a", limit = 10 }) {
  const cacheKey = `${query}_${limit}`; // Unique key for each query-limit combination

  if (albumCache.has(cacheKey)) {
    console.log("Returning cached albums for:", cacheKey);
    return albumCache.get(cacheKey); // Return cached albums if available
  }

  try {
    const response = await fetch(
      `https://saavn.dev/api/search/albums?query=${query}&limit=${limit}`
    );
    const data = await response.json();

    if (data?.data?.results) {
      albumCache.set(cacheKey, data.data.results); // Store in cache
      return data.data.results;
    } else {
      return data?.message;
    }
  } catch (error) {
    return { error: "Failed to fetch albums" };
  }
}

const lyricsCache = new Map(); // In-memory cache

export async function fetchSongLyrics({ id }) {
  if (lyricsCache.has(id)) {
    console.log("Returning cached lyrics for:", id);
    return lyricsCache.get(id); // Return cached lyrics if available
  }

  try {
    const response = await fetch(`https://saavn.dev/api/songs/${id}/lyrics`);
    const data = await response.json();

    if (data.success) {
      const lyrics = data?.data?.lyrics;
      lyricsCache.set(id, lyrics); // Store lyrics in cache
      return lyrics;
    } else {
      return data?.message;
    }
  } catch (error) {
    return { error: "Failed to fetch lyrics" };
  }
}
