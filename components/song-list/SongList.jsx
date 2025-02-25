"use client";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SongList({ songs }) {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-2">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex items-center justify-between p-4 rounded-md hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img
                src={song.cover}
                alt={song.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <Button
                size="icon"
                className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => playSong(song)}
              >
                {true ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
            </div>
            <div>
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {formatDuration(song.duration)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
