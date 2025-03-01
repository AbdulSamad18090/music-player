"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePlayPause,
  setVolume,
  setProgress,
  nextSong,
  previousSong,
} from "@/lib/slices/playerSlice";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ChevronUp,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import { fetchSongLyrics } from "@/lib/utils";
import Loader from "../loader/Loader";

const Player = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume, progress, queue, queueIndex } =
    useSelector((state) => state.player);
  const audioRef = useRef(null);
  const animationRef = useRef(null);
  const [localProgress, setLocalProgress] = useState(progress);
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
  const [lyrics, setLyrics] = useState(null);

  const handleFetchLyrics = async ({ id, limit }) => {
    setIsLoadingLyrics(true);
    const lyrics = await fetchSongLyrics({ id, limit });
    setLyrics(lyrics);
    setIsLoadingLyrics(false);
  };

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) return;

    if (currentSong && currentSong.downloadUrl) {
      const audioUrl =
        currentSong.downloadUrl.find((url) => url.quality === "320kbps")?.url ||
        currentSong.downloadUrl[currentSong.downloadUrl.length - 1]?.url;

      if (audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current
            .play()
            .catch((err) => console.error("Playback failed:", err));
        }
      }
    }
  }, [currentSong]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.error("Playback failed:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Function to update progress smoothly
  const updateProgress = () => {
    if (!audioRef.current) return;

    const duration = audioRef.current.duration;
    if (!isNaN(duration)) {
      const calculatedProgress =
        (audioRef.current.currentTime / duration) * 100;
      setLocalProgress(calculatedProgress);

      // Update Redux only when there's a significant change (reducing unnecessary re-renders)
      if (Math.abs(calculatedProgress - progress) > 0.5) {
        dispatch(setProgress(calculatedProgress));
      }
    }

    animationRef.current = requestAnimationFrame(updateProgress);
  };

  // Start progress animation when song is playing
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  // Sync local progress with Redux when seeking
  const handleProgressChange = (value) => {
    if (!audioRef.current) return;

    const duration = audioRef.current.duration;
    if (!isNaN(duration)) {
      audioRef.current.currentTime = (value[0] / 100) * duration;
    }

    setLocalProgress(value[0]);
    dispatch(setProgress(value[0]));
  };

  // Handle song ending - play next song
  const handleSongEnd = () => {
    dispatch(setProgress(0));
    // If we have more songs in the queue, play the next one
    if (queue.length > 1) {
      dispatch(nextSong());
    } else {
      // If we don't have more songs, just stop playing
      dispatch(togglePlayPause());
    }
  };

  // Handle next song button click
  const handleNextSong = () => {
    dispatch(setProgress(0));
    dispatch(nextSong());
  };

  // Handle previous song button click
  const handlePreviousSong = () => {
    // If we're more than 3 seconds into the song, go back to the start of the current song
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      dispatch(setProgress(0));
    } else {
      // Otherwise go to the previous song
      dispatch(setProgress(0));
      dispatch(previousSong());
    }
  };

  // Save state in sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "playerState",
        JSON.stringify({
          currentSong,
          isPlaying,
          volume,
          progress,
          queue,
          queueIndex,
        })
      );
    }
  }, [currentSong, isPlaying, volume, progress, queue, queueIndex]);

  // Load the stored progress when the song starts playing
  useEffect(() => {
    if (!audioRef.current) return;

    if (currentSong && currentSong.downloadUrl) {
      const audioUrl =
        currentSong.downloadUrl.find((url) => url.quality === "320kbps")?.url ||
        currentSong.downloadUrl[currentSong.downloadUrl.length - 1]?.url;

      if (audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();

        // Restore progress time after loading
        audioRef.current.onloadedmetadata = () => {
          if (!isNaN(audioRef.current.duration)) {
            audioRef.current.currentTime =
              (progress / 100) * audioRef.current.duration;
          }
        };

        if (isPlaying) {
          audioRef.current
            .play()
            .catch((err) => console.error("Playback failed:", err));
        }
      }
    }
  }, [currentSong]);

  // Check if next/prev buttons should be disabled
  const isQueueEmpty = !queue || queue.length === 0;

  return (
    <div className="relative w-full bg-background p-3 border-t flex flex-col">
      {/* Audio Element */}
      <audio ref={audioRef} onEnded={handleSongEnd} />

      {/* Progress Bar */}
      <Slider
        className="absolute -top-[1px] left-0 w-full h-[2px] rounded-none"
        value={[localProgress]}
        onValueChange={handleProgressChange}
        max={100}
        step={0.1} // Make it more precise
      />

      {/* Player Content */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Song Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <img
            src={
              currentSong?.image[currentSong.image.length - 1]?.url ||
              "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=800&auto=format&fit=crop"
            }
            alt="Album cover"
            className="h-14 w-14 rounded-md"
          />
          <div className="truncate">
            <h3 className="font-semibold text-foreground truncate">
              {currentSong?.name || "No Song Playing"}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {currentSong?.artists?.primary
                ?.map((artist) => artist.name)
                .join(", ") || "Artist Name"}
            </p>
            <Drawer>
              <DrawerTrigger
                asChild
                onClick={() =>
                  handleFetchLyrics({ id: currentSong?.id, limit: 10 })
                }
              >
                <p className="text-sm text-primary truncate flex items-center gap-1 cursor-pointer">
                  See Lyrics <ChevronUp />
                </p>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <div className="flex gap-3">
                    <img
                      src={
                        currentSong?.image[currentSong.image.length - 1]?.url ||
                        "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=800&auto=format&fit=crop"
                      }
                      alt="Album cover"
                      className="h-14 w-14 rounded-md"
                    />
                    <div className="truncate text-left">
                      <h3 className="font-semibold text-foreground truncate">
                        {currentSong?.name || "No Song Playing"}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {currentSong?.artists?.primary
                          ?.map((artist) => artist.name)
                          .join(", ") || "Artist Name"}
                      </p>
                      <p className="text-sm text-primary truncate flex items-center cursor-pointer">
                        Lyrics
                      </p>
                    </div>
                  </div>
                </DrawerHeader>
                <ScrollArea className="h-96 w-full border-t">
                  {isLoadingLyrics ? (
                    <Loader />
                  ) : (
                    <div className="flex justify-center text-center p-6">
                      <div
                        className="max-w-lg"
                        dangerouslySetInnerHTML={{ __html: lyrics }}
                      />
                    </div>
                  )}
                </ScrollArea>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center gap-4 flex-1 justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePreviousSong}
            disabled={isQueueEmpty}
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => dispatch(togglePlayPause())}
            variant="outline"
            size="icon"
            disabled={!currentSong}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextSong}
            disabled={isQueueEmpty}
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Right: Volume Control */}
        <div className="hidden sm:flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <Slider
            className="w-24"
            value={[volume]}
            onValueChange={(value) => dispatch(setVolume(value[0]))}
            max={100}
            step={1}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
