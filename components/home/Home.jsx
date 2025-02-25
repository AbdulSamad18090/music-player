import React from "react";
import { PlaylistCard } from "../playlist-card/PlaylistCard";
import PlaylistCrousel from "../playlist-crousel/PlaylistCrousel";
import ArtistsCrousel from "../artists-crousel/ArtistsCrousel";
import { SongList } from "../song-list/SongList";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export const ARTISTS = [
  {
    id: "artist1",
    name: "Cosmo Sheldrake",
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800&auto=format&fit=crop",
    genres: ["Electronic", "Experimental"],
  },
  {
    id: "artist2",
    name: "Sleepy Forest",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    genres: ["Ambient", "Nature"],
  },
  {
    id: "artist3",
    name: "The Digital Age",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    genres: ["Electronic", "Chill"],
  },
  {
    id: "artist2",
    name: "Sleepy Forest",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    genres: ["Ambient", "Nature"],
  },
  {
    id: "artist3",
    name: "The Digital Age",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    genres: ["Electronic", "Chill"],
  },
];

export const SONGS = [
  {
    id: "1",
    title: "Lost in the City Lights",
    artist: "Cosmo Sheldrake",
    artistId: "artist1",
    album: "Urban Dreams",
    duration: 241,
    cover:
      "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=800&auto=format&fit=crop",
    url: "https://storage.googleapis.com/joshwcomeau/lost-in-the-city-lights.mp3",
    genre: "Electronic",
  },
  {
    id: "2",
    title: "Forest Lullaby",
    artist: "Sleepy Forest",
    artistId: "artist2",
    album: "Nature Sounds",
    duration: 184,
    cover:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    url: "https://storage.googleapis.com/joshwcomeau/forest-lullaby.mp3",
    genre: "Ambient",
  },
  {
    id: "3",
    title: "Electronic Chill",
    artist: "The Digital Age",
    artistId: "artist3",
    album: "Digital Dreams",
    duration: 198,
    cover:
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=800&auto=format&fit=crop",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
    genre: "Electronic",
  },
];

export const PLAYLISTS = [
  {
    id: "playlist1",
    name: "Chill Electronic",
    description: "Perfect for focused work and relaxation",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    songs: SONGS.filter((song) => song.genre === "Electronic"),
  },
  {
    id: "playlist2",
    name: "Nature Sounds",
    description: "Peaceful ambient sounds from nature",
    cover:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    songs: SONGS.filter((song) => song.genre === "Ambient"),
  },
  {
    id: "playlist1",
    name: "Chill Electronic",
    description: "Perfect for focused work and relaxation",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    songs: SONGS.filter((song) => song.genre === "Electronic"),
  },
  {
    id: "playlist2",
    name: "Nature Sounds",
    description: "Peaceful ambient sounds from nature",
    cover:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    songs: SONGS.filter((song) => song.genre === "Ambient"),
  },
  {
    id: "playlist1",
    name: "Chill Electronic",
    description: "Perfect for focused work and relaxation",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    songs: SONGS.filter((song) => song.genre === "Electronic"),
  },
  {
    id: "playlist2",
    name: "Nature Sounds",
    description: "Peaceful ambient sounds from nature",
    cover:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    songs: SONGS.filter((song) => song.genre === "Ambient"),
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 p-6 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold">Featured Playlists</h1>
      <PlaylistCrousel playlists={PLAYLISTS} />
      <div className="w-full flex items-center justify-center">
        <Link href={"/playlists"}>
          <Button
            variant=""
            className="w-fit border border-border group transition-all"
          >
            Explore Playlists{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-all" />
          </Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold">Popular Artists</h1>
      <ArtistsCrousel artists={ARTISTS} />
      <div className="w-full flex items-center justify-center">
        <Link href={"/artists"}>
          <Button
            variant=""
            className="w-fit border border-border group transition-all"
          >
            Explore Artists{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-all" />
          </Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold">Recently Played</h1>
      <SongList songs={SONGS} />
    </div>
  );
};

export default HomePage;
