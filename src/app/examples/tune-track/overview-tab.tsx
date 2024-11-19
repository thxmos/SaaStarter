import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { initialStages, Song } from "./mocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import defaultProductPic from "@/assets/product-default.svg";

export default function OverviewTab({
  albumArt,
  songs,
}: {
  albumArt: string;
  songs: Song[];
}) {
  const [projectNotes, setProjectNotes] = useState("");

  const completionPercentage =
    songs.length > 0
      ? (songs.flatMap((song) => Object.values(song.stages)).filter(Boolean)
          .length /
          (songs.length * initialStages.length)) *
        100
      : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Album Artwork</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={albumArt}
              alt="Album Artwork"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Project Completion</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <Progress value={completionPercentage} className="w-full mb-4" />
            <p className="text-center text-lg font-semibold mb-4">
              {completionPercentage.toFixed(0)}% Complete
            </p>
            <Textarea
              placeholder="Project notes..."
              value={projectNotes}
              onChange={(e) => setProjectNotes(e.target.value)}
              className="flex-grow resize-none"
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Production Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Song</TableHead>
                {initialStages.map((stage) => (
                  <TableHead key={stage}>{stage}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {songs.map((song) => (
                <TableRow key={song.name}>
                  <TableCell>{song.name}</TableCell>
                  {initialStages.map((stage) => (
                    <TableCell key={`${song.name}-${stage}`}>
                      <Checkbox
                        checked={song.stages[stage]}
                        disabled
                        className="cursor-default pointer-events-none"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
