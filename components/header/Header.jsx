"use client";

import React, { useState } from "react";
import { Search, Music, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../mode-toggler/ModeToggler";
import CustomThemeSwitcher from "../CustomThemeSwitcher";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-3 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left Side: Logo */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Music className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Musix</h1>
        </div>

        {/* Middle: Search Bar (Hidden on Small Screens) */}
        <div className="hidden sm:flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search songs, artists, or playlists..."
              className="pl-10 bg-muted/50 w-full"
            />
          </div>
        </div>

        {/* Right Side: Mode Toggle & Mobile Search Button */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="sm:hidden"
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* Mode Toggle */}
          <ModeToggle />

          {/* Custom Theme Switcher */}
          <CustomThemeSwitcher />
        </div>
      </div>

      {/* Mobile Search Bar (Toggles Open) */}
      {isSearchVisible && (
        <div className="w-full p-3 bg-background sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-muted/50 w-full"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
