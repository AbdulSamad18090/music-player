"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function ArtistCard({ artist }) {
  return (
    <Link href={`/artists/${artist.id}`}>
      <Card className="overflow-hidden flex flex-col items-center justify-center w-fit hover:opacity-75 transition text-center border-none shadow-none">
        <CardContent className="p-0">
          <div className="aspect-square relative">
            <img
              src={artist.image}
              alt={artist.name}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold truncate">{artist.name}</h3>
            <p className="text-sm text-muted-foreground">
              {artist.genres.join(", ")}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
