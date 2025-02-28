"use client";
import Loader from "@/components/loader/Loader";
import { SongList } from "@/components/song-list/SongList";
import { fetchSongs } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const page = () => {
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);
  const [songs, setSongs] = useState([]);

  const handleFetchSongs = async ({ query, limit }) => {
    setIsLoadingSongs(true);
    const songs = await fetchSongs({ query, limit });
    setSongs(songs);
    setIsLoadingSongs(false);
  };

  useEffect(() => {
    handleFetchSongs({ query: "a", limit: 50 });
  }, []);

  console.log(songs);

  return (
    <div className="p-6 flex flex-col gap-6">
      {isLoadingSongs ? <Loader /> : <SongList songs={songs} grid={true} />}
    </div>
  );
};

export default page;
