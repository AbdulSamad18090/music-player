"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(30); // Simulated progress

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="relative w-full bg-background p-3 border-t flex flex-col">
      {/* Progress Bar (Above the Player) */}
      <Slider
        className="absolute -top-[1px] left-0 w-full h-[2px] rounded-none"
        value={[progress]}
        onValueChange={(value) => setProgress(value[0])}
        max={100}
        step={1}
      />

      {/* Player Content */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Song Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <img
            src="https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=800&auto=format&fit=crop"
            alt="Album cover"
            className="h-14 w-14 rounded-md"
          />
          <div className="truncate">
            <h3 className="font-semibold text-foreground truncate">
              Song Name
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              Artist Name
            </p>
            <p className="text-sm text-primary truncate flex items-center gap-1 cursor-pointer">
              Up Next <ChevronUp />
            </p>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center gap-4 flex-1 justify-center">
          <Button variant="ghost" size="icon">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button onClick={togglePlay} variant="outline" size="icon">
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Right: Volume Control */}
        <div className="hidden sm:flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <Slider
            className="w-24"
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            max={100}
            step={1}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
