"use client";

import React, { useState } from "react";
import { Search, Music, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../mode-toggler/ModeToggler";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <header className="flex items-center justify-between p-3 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-2">
        <Music className="h-8 w-8" />
        <h1 className="text-2xl font-bold hidden sm:block">Musix</h1>
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

        {/* Mobile Menu Button (If Needed) */}
        {/* <button className="sm:hidden">
          <Menu className="h-6 w-6" />
        </button> */}
      </div>

      {/* Mobile Search Bar (Toggles Open) */}
      {isSearchVisible && (
        <div className="absolute top-14 left-0 z-50 w-full p-3 bg-background shadow-md sm:hidden">
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
