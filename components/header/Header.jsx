"use client";

import React, { useRef, useState } from "react";
import { Search, Music, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../mode-toggler/ModeToggler";
import CustomThemeSwitcher from "../CustomThemeSwitcher";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [isOpenSearchDialog, setIsOpenSearchDialog] = useState(false);

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
          <Button
            variant="secondary"
            className="relative w-full flex justify-start items-center"
            onClick={() => setIsOpenSearchDialog(true)}
          >
            <Search className="text-muted-foreground" />
            <p className="text-muted-foreground font-normal">
              Search songs, artists, or playlists...
            </p>
          </Button>
        </div>

        {/* Right Side: Mode Toggle & Mobile Search Button */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Icon */}
          <Button
            size="icon"
            variant="outline"
            className="sm:hidden"
            onClick={() => setIsOpenSearchDialog(true)}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>

          {/* Mode Toggle */}
          <ModeToggle />

          {/* Custom Theme Switcher */}
          <CustomThemeSwitcher />
        </div>
      </div>

      <Dialog
        open={isOpenSearchDialog}
        onOpenChange={() => setIsOpenSearchDialog(false)}
        className="md:min-w-[450px]"
      >
        <DialogContent className="sm:max-w-3xl p-0">
          <DialogHeader className={"p-3"}>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>
              Search songs, artists, or playlists...
            </DialogDescription>
          </DialogHeader>
          <Command className="">
            <CommandInput placeholder="Type songs, artists, or playlists or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Songs">
                <CommandItem>
                  <span>Calendar</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Playlists">
                <CommandItem>
                  <span>Calendar</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Artists">
                <CommandItem>
                  <span>Calendar</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Albums">
                <CommandItem>
                  <span>Calendar</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
