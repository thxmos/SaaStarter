"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

import defaultProductPic from "@/assets/product-default.svg";
import defaultUserPic from "@/assets/user-default.svg";

export default function PictureSharingApp() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const mockPhotos = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    url: defaultProductPic,
    alt: `Photo ${i + 1}`,
    artist: `artist${i + 1}`,
    category: ["Nature", "Urban", "People", "Abstract"][
      Math.floor(Math.random() * 4)
    ],
  }));

  const categories = ["All", "Nature", "Urban", "People", "Abstract"];

  const filteredPhotos =
    selectedCategory === "All"
      ? mockPhotos
      : mockPhotos.filter((photo) => photo.category === selectedCategory);

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 pb-0 flex justify-center">
        <ScrollArea className="w-full max-w-2xl whitespace-nowrap">
          <div className="flex space-x-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <Dialog key={photo.id}>
                <DialogTrigger asChild>
                  <div className="aspect-square overflow-hidden rounded-lg cursor-pointer">
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] w-fit p-6">
                  <div className="flex flex-col md:flex-row gap-6 max-h-[80vh]">
                    <div className="aspect-square w-full md:w-auto md:h-full flex-shrink-0">
                      <div className="w-full h-full relative rounded-lg overflow-hidden">
                        <Image
                          src={photo.url}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* User Info & Recents */}
                    <div className="flex flex-col w-full md:w-96 h-full">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarImage src={defaultUserPic.url} />
                          <AvatarFallback>
                            <User />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">@{photo.artist}</p>
                          <Button variant="link" className="p-0 h-auto">
                            View Profile
                          </Button>
                        </div>
                      </div>

                      <ScrollArea className="flex-grow">
                        <div className="grid grid-cols-3 gap-2">
                          {Array.from({ length: 9 }, (_, i) => (
                            <div
                              key={i}
                              className="aspect-square overflow-hidden rounded-lg"
                            >
                              <Image
                                src={defaultProductPic}
                                alt={`Recent work ${i + 1}`}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
