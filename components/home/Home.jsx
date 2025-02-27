"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  fetchAlbums,
  fetchArtists,
  fetchPlaylists,
  fetchSongs,
} from "@/lib/utils";
import Loader from "../loader/Loader";

// Lazy Load Components
const SongList = lazy(() => import("../song-list/SongList").then((module) => ({ default: module.SongList })));
const PlaylistCrousel = lazy(() => import("../playlist-crousel/PlaylistCrousel").then((module) => ({ default: module.default || module.PlaylistCrousel })));
const ArtistsCrousel = lazy(() => import("../artists-crousel/ArtistsCrousel").then((module) => ({ default: module.default || module.ArtistsCrousel })));
const AlbumsList = lazy(() => import("../albums-list/AlbumsList").then((module) => ({ default: module.default || module.AlbumsList })));


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

const HomePage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(false);

  const handleFetchPlaylists = async ({ query, limit }) => {
    setIsLoadingPlaylists(true);
    const playlists = await fetchPlaylists({ query, limit });
    setPlaylists(playlists);
    setIsLoadingPlaylists(false);
  };

  const handleFetchArtists = async ({ query, limit }) => {
    setIsLoadingArtists(true);
    const artists = await fetchArtists({ query, limit });
    setArtists(artists);
    setIsLoadingArtists(false);
  };

  const handleFetchSongs = async ({ query, limit }) => {
    setIsLoadingSongs(true);
    const songs = await fetchSongs({ query, limit });
    setSongs(songs);
    setIsLoadingSongs(false);
  };

  const handleFetchAlbums = async ({ query, limit }) => {
    setIsLoadingAlbums(true);
    const albums = await fetchAlbums({ query, limit });
    setAlbums(albums);
    setIsLoadingAlbums(false);
  };

  useEffect(() => {
    handleFetchPlaylists({ query: "2024", limit: 15 });
    handleFetchArtists({ query: "a", limit: 15 });
    handleFetchSongs({ query: "a", limit: 6 });
    handleFetchAlbums({ query: "a", limit: 16 });
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold">Songs</h1>
      <Suspense fallback={<Loader />}>
        {isLoadingSongs ? <Loader /> : <SongList songs={songs} grid={true} />}
      </Suspense>
      <div className="w-full flex items-center justify-center">
        <Link href={"/songs"}>
          <Button
            variant=""
            className="w-fit border border-border group transition-all"
          >
            Explore Songs{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-all" />
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold">Featured Playlists</h1>
      <Suspense fallback={<Loader />}>
        {isLoadingPlaylists ? (
          <Loader />
        ) : (
          <PlaylistCrousel playlists={playlists} />
        )}
      </Suspense>
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
      <Suspense fallback={<Loader />}>
        {isLoadingArtists ? <Loader /> : <ArtistsCrousel artists={artists} />}
      </Suspense>
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

      <h1 className="text-2xl font-bold">Popular Albums</h1>
      <Suspense fallback={<Loader />}>
        {isLoadingAlbums ? <Loader /> : <AlbumsList albums={albums} />}
      </Suspense>
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
    </div>
  );
};

export default HomePage;
