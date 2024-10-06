"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Circle } from "lucide-react";
import { mockSongs, Song } from "./mocks";
import SongsTab from "./songs-tab";
import MarketingTab from "./marketing-tab";
import ArtworkTab from "./artwork-tab";
import OverviewTab from "./overview-tab";
import defaultProductPic from "@/assets/product-default.svg";

export default function AlbumReleaseManager() {
  const [selectedArt, setSelectedArt] = useState(defaultProductPic);
  const [songs, setSongs] = useState<Song[]>(mockSongs);

  const updateSong = (updatedSong: Song) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.name === updatedSong.name ? updatedSong : song,
      ),
    );
  };

  const isTabComplete = (tabName: string) => {
    // This is a placeholder logic. You should implement the actual logic based on your requirements.
    return Math.random() < 0.5;
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold mb-6">Album Release Manager</h1>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full h-auto mb-6 p-1 bg-muted">
              {["overview", "songs", "artwork", "marketing"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 flex items-center justify-start space-x-2 px-4 py-2 h-10"
                >
                  {isTabComplete(tab) ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-300 flex-shrink-0" />
                  )}
                  <span className="capitalize truncate">{tab}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview">
              <OverviewTab albumArt={selectedArt} songs={songs} />
            </TabsContent>
            <TabsContent value="songs">
              <SongsTab songs={songs} updateSong={updateSong} />
            </TabsContent>
            <TabsContent value="artwork">
              <ArtworkTab
                selectedArt={selectedArt}
                onArtSelect={setSelectedArt}
              />
            </TabsContent>
            <TabsContent value="marketing">
              <MarketingTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
