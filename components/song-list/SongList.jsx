"use client";
import { useDispatch, useSelector } from "react-redux";
import { Play, Pause, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playSong, togglePlayPause } from "@/lib/slices/playerSlice";
import Image from "next/image";

export function SongList({ songs = [], grid = false }) {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = (song) => {
    if (currentSong?.id === song.id) {
      dispatch(togglePlayPause()); // Toggle if the song is already playing
    } else {
      dispatch(playSong(song)); // Play new song
    }
  };

  return (
    <div
      className={`${
        grid ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col"
      } gap-2`}
    >
      {songs.map((song) => (
        <div
          key={song.id}
          className={`flex items-center justify-between p-3 group rounded-md ${
            currentSong?.id === song.id && "bg-muted/50"
          } hover:bg-muted/50 transition-colors`}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src={song.image[song.image.length - 1].url}
                alt={song.title}
                className="min-w-16 h-16 rounded-md object-cover"
              />
              <Button
                size="icon"
                className={`absolute inset-0 m-auto opacity-0 ${
                  currentSong?.id === song.id && "opacity-100"
                } group-hover:opacity-100 transition-opacity`}
                onClick={() => handlePlayPause(song)}
              >
                {currentSong?.id === song.id && isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
            </div>
            <div>
              <p className="font-medium">{song.name}</p>
              <p className="text-sm text-muted-foreground space-x-2">
                {song.artists.primary.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {currentSong?.id === song?.id ? (
              <AudioLines className="text-foreground" />
            ) : (
              <p className="text-sm">{formatDuration(song.duration)}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
