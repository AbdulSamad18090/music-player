"use client";
import { useDispatch, useSelector } from "react-redux";
import { Play, Pause, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  playSong,
  setProgress,
  togglePlayPause,
  addToQueue,
  clearQueue,
} from "@/lib/slices/playerSlice";
import { decodeHtmlEntities } from "@/lib/utils";

export function SongList({ songs = [], grid = false }) {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, queue } = useSelector(
    (state) => state.player
  );

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = (song, index) => {
    if (currentSong?.id === song.id) {
      dispatch(togglePlayPause()); // Toggle if the song is already playing
    } else {
      // Check if our songs array is the same as the current queue
      const isSameQueue =
        queue.length === songs.length &&
        songs.every((s, i) => s.id === queue[i]?.id);

      if (!isSameQueue) {
        // If we're playing from a different list, rebuild the queue
        dispatch(clearQueue());
        // Add all songs to the queue
        const songsQueue = [...songs];
        // Dispatch the playSong action with the queue and current index
        dispatch(playSong({ queue: songsQueue, index }));
      } else {
        // If we're in the same queue, just jump to the song
        const songIndex = queue.findIndex((s) => s.id === song.id);
        if (songIndex !== -1) {
          dispatch(playSong({ queue, index: songIndex }));
        }
      }
      dispatch(setProgress(0)); // Reset progress in Redux
    }
  };

  return (
    <div
      className={`${
        grid ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col"
      } gap-2`}
    >
      {songs.map((song, i) => (
        <div
          key={i}
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
                onClick={() => handlePlayPause(song, i)}
              >
                {currentSong?.id === song.id && isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
            </div>
            <div>
              <p className="font-medium line-clamp-1">{song.name}</p>
              <p className="text-sm text-muted-foreground space-x-2 line-clamp-2">
                {song.artists.primary
                  .map((artist) => decodeHtmlEntities(artist.name))
                  .join(", ")}
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
