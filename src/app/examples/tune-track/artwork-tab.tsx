import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { artOptions } from "./mocks";
import { Star } from "lucide-react";
import Image from "next/image";

export default function ArtworkTab({
  selectedArt,
  onArtSelect,
}: {
  selectedArt: string;
  onArtSelect: (art: string) => void;
}) {
  const [favoriteArt, setFavoriteArt] = useState(selectedArt);
  const [displayedArt, setDisplayedArt] = useState<"A" | "B">("A");

  const handleArtSelect = (art: string) => {
    onArtSelect(art);
    setDisplayedArt("B");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="space-y-4 py-4">
          <Image
            src={displayedArt === "A" ? favoriteArt : selectedArt}
            alt="Album Artwork"
            width={400}
            height={400}
            className="w-full h-auto"
          />
          <div className="flex justify-center space-x-4">
            <Button
              variant={displayedArt === "A" ? "default" : "outline"}
              onClick={() => setDisplayedArt("A")}
            >
              A
            </Button>
            <Button
              variant={displayedArt === "B" ? "default" : "outline"}
              onClick={() => setDisplayedArt("B")}
            >
              B
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4">
          <div className="grid grid-cols-3 gap-4">
            {artOptions.map((art, index) => (
              <Button
                key={index}
                variant="outline"
                className={`p-0 h-auto aspect-square ${
                  selectedArt === art ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleArtSelect(art)}
              >
                <Image
                  src={art}
                  alt={`Album Art Option ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-auto"
                />
                {favoriteArt === art && (
                  <Star className="absolute top-2 right-2 text-yellow-400 fill-current" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
