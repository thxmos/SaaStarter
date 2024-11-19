"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Facebook, Twitter, Instagram, User } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import defaultProductPic from "@/assets/product-default.svg";
import defaultUserPic from "@/assets/user-default.svg";
import defaultBackgroundPic from "@/assets/hero-bg.jpg";

export default function ArtistProfile() {
  const [selectedImage, setSelectedImage] = useState(null);

  const artist = {
    username: "artista123",
    description:
      "Passionate artist exploring the boundaries of color and form.",
    country: "🇺🇸 United States",
    socialMedia: {
      facebook: "https://facebook.com/artista123",
      twitter: "https://twitter.com/artista123",
      instagram: "https://instagram.com/artista123",
    },
  };

  const artworks = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    url: defaultProductPic,
    alt: `Artwork ${i + 1}`,
    title: `Artwork ${i + 1}`,
    price: 99.99 + i * 10,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div
        className="relative w-full bg-cover bg-center py-8 px-4 sm:px-6 lg:px-8"
        style={{ backgroundImage: `url(${defaultBackgroundPic.src})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start text-white">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white mb-4 md:mb-0 md:mr-6">
            <AvatarImage src={defaultUserPic} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">@{artist.username}</h1>
            <p className="text-lg mb-2">{artist.description}</p>
            <p className="text-lg mb-2">{artist.country}</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href={artist.socialMedia.facebook}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-primary"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href={artist.socialMedia.twitter}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href={artist.socialMedia.instagram}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-primary"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artworks.map((artwork) => (
            <Dialog key={artwork.id}>
              <DialogTrigger asChild>
                <div className="aspect-square overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    src={artwork.url}
                    alt={artwork.alt}
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
                        src={artwork.url}
                        alt={artwork.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full md:w-96 h-full">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        <AvatarImage src={defaultUserPic} />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">@{artist.username}</p>
                      </div>
                    </div>
                    <ScrollArea className="flex-grow">
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{artwork.title}</h2>
                        <p className="text-xl font-semibold">
                          ${artwork.price.toFixed(2)}
                        </p>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">
                            Select Size:
                          </h3>
                          <RadioGroup defaultValue="medium">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="small" id="small" />
                              <Label htmlFor="small">Small (8x10)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="medium" id="medium" />
                              <Label htmlFor="medium">Medium (12x16)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="large" id="large" />
                              <Label htmlFor="large">Large (18x24)</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">
                            Frame Options:
                          </h3>
                          <RadioGroup defaultValue="none">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="none" id="none" />
                              <Label htmlFor="none">No Frame</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="black" id="black" />
                              <Label htmlFor="black">Black Frame</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="white" id="white" />
                              <Label htmlFor="white">White Frame</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <Button className="w-full">Add to Cart</Button>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>
    </div>
  );
}
