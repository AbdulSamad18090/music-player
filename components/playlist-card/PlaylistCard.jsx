"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function PlaylistCard({ playlist }) {
  return (
    <Link href={`/playlists/${playlist.id}`}>
      <Card className="overflow-hidden hover:opacity-75 transition">
        <CardContent className="p-0">
          <div className="aspect-square relative">
            <img
              src={playlist.image[playlist.image.length - 1].url}
              alt={playlist.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold truncate">{playlist.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {playlist.songCount} songs
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
