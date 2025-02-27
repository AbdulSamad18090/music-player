import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function fetchPlaylists({ query, limit }) {
  try {
    const myQuery = query || "a";
    const response = await fetch(
      `https://saavn.dev/api/search/playlists?query=${myQuery}&limit=${
        limit || 10
      }`
    );
    const data = await response.json();
    return data?.data?.results;
  } catch (error) {
    return { error: "Failed to fetch playlists" };
  }
}

export async function fetchArtists({ query, limit }) {
  try {
    const myQuery = query || "a";
    const response = await fetch(
      `https://saavn.dev/api/search/artists?query=${myQuery}&limit=${
        limit || 10
      }`
    );
    const data = await response.json();
    return data?.data?.results;
  } catch (error) {
    return { error: "Failed to fetch artists" };
  }
}

export async function fetchSongs({ query, limit }) {
  try {
    const myQuery = query || "a";
    const response = await fetch(
      `https://saavn.dev/api/search/songs?query=${myQuery}&limit=${limit || 10}`
    );
    const data = await response.json();
    return data?.data?.results;
  } catch (error) {
    return { error: "Failed to fetch songs" };
  }
}

export async function fetchAlbums({ query, limit }) {
  try {
    const myQuery = query || "a";
    const response = await fetch(
      `https://saavn.dev/api/search/albums?query=${myQuery}&limit=${
        limit || 10
      }`
    );
    const data = await response.json();
    return data?.data?.results;
  } catch (error) {
    return { error: "Failed to fetch albums" };
  }
}

export async function fetchSongLyrics({ id, limit }) {
  try {
    const response = await fetch(`https://saavn.dev/api/songs/${id}/lyrics`);
    const data = await response.json();
    if (data.success) {
      return data?.data?.lyrics;
    } else {
      return data?.message;
    }
  } catch (error) {
    return { error: "Failed to fetch lyrics" };
  }
}
