import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function fetchPlaylists({query, limit}) {
  console.log("this =>",query, limit);
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


export async function fetchArtists({query, limit}) {
  console.log("this =>",query, limit);
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