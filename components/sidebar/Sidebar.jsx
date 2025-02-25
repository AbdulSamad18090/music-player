"use client";

import { Music, ListMusic, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const routes = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "Playlists",
    icon: ListMusic,
    href: "/playlists",
  },
  {
    label: "Artists",
    icon: Users,
    href: "/artists",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="flex items-center gap-2 px-6 py-4">
        <Music className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Musix</h1>
      </div>
      <div className="flex flex-col gap-2 px-4 py-2">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                pathname === route.href && "bg-accent"
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
