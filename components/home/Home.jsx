"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import {
  fetchAlbums,
  fetchArtists,
  fetchPlaylists,
  fetchSongs,
} from "@/lib/utils";
import Loader from "../loader/Loader";

// Lazy Load Components
const SongList = lazy(() =>
  import("../song-list/SongList").then((module) => ({
    default: module.SongList,
  }))
);
const PlaylistCrousel = lazy(() =>
  import("../playlist-crousel/PlaylistCrousel").then((module) => ({
    default: module.default || module.PlaylistCrousel,
  }))
);
const ArtistsCrousel = lazy(() =>
  import("../artists-crousel/ArtistsCrousel").then((module) => ({
    default: module.default || module.ArtistsCrousel,
  }))
);
const AlbumsList = lazy(() =>
  import("../albums-list/AlbumsList").then((module) => ({
    default: module.default || module.AlbumsList,
  }))
);

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
      <section className="relative overflow-hidden rounded-xl bg-foreground p-6 text-background">
        <div className="relative z-10 max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            Welcome to Musix
          </h1>
          <p className="text-lg opacity-90">
            Discover the best music all in one place
          </p>
        </div>

        {/* Decorative SVG Icon */}
        <div className="absolute -right-10 -bottom-10 opacity-20">
          <svg
            width="300"
            height="300"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
              fill="currentColor"
            />
            <path
              d="M19 12C19 13.1046 18.1046 14 17 14C15.8954 14 15 13.1046 15 12C15 10.8954 15.8954 10 17 10C18.1046 10 19 10.8954 19 12Z"
              fill="currentColor"
            />
            <path d="M9 19V5L19 12V19" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </section>

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
        <Link href={"/albums"}>
          <Button
            variant=""
            className="w-fit border border-border group transition-all"
          >
            Explore Albums{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-all" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
