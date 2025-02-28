"use client";
import Loader from "@/components/loader/Loader";
import { SongList } from "@/components/song-list/SongList";
import { fetchPlaylistById } from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState();

  const handleFetchPlaylist = async () => {
    setIsLoadingPlaylist(true);
    const newPlaylist = await fetchPlaylistById({ id });

    setPlaylist(newPlaylist); // Append new playlists
    setIsLoadingPlaylist(false);
  };

  useEffect(() => {
    handleFetchPlaylist();
  }, [id]);

  return (
    <div>
      {isLoadingPlaylist || !playlist ? (
        <Loader />
      ) : (
        <div>
          <div className="relative">
            <img
              src={playlist?.image[playlist?.image?.length - 1].url}
              alt="playlist image"
              className="w-full h-44 object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-50"></div>
          </div>
          <div className="p-6 flex flex-col gap-6">
            <div className="sticky top-0 bg-background py-4 z-10">
              <h1 className="text-lg font-semibold">{playlist?.name}</h1>
              <p className="text-muted-foreground">{playlist?.description}</p>
            </div>

            <SongList songs={playlist?.songs} grid={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
