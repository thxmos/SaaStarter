import { useState } from "react";
import { initialStages, Song } from "./mocks";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DialogContent } from "@radix-ui/react-dialog";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function SongsTab({
  songs,
  updateSong,
}: {
  songs: Song[];
  updateSong: (updatedSong: Song) => void;
}) {
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [editType, setEditType] = useState<"mixNotes" | "lyrics" | null>(null);

  const openEditModal = (song: Song, type: "mixNotes" | "lyrics") => {
    setEditingSong(song);
    setEditType(type);
  };

  const closeEditModal = () => {
    setEditingSong(null);
    setEditType(null);
  };

  const handleSave = () => {
    if (editingSong && editType) {
      updateSong(editingSong);
      closeEditModal();
    }
  };

  const songCompletion = (song: Song) => {
    const completedStages = Object.values(song.stages).filter(Boolean).length;
    return (completedStages / initialStages.length) * 100;
  };

  return (
    <div className="space-y-4">
      {songs.map((song) => (
        <Card key={song.name}>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold w-1/4">{song.name}</h3>
              <div className="flex items-center justify-center space-x-2 w-1/4">
                <Progress value={songCompletion(song)} className="w-24" />
                <span className="text-sm font-medium">
                  {songCompletion(song).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-end space-x-2 w-1/2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(song, "mixNotes")}
                >
                  <Edit className="h-4 w-4 mr-1" /> Mix Notes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(song, "lyrics")}
                >
                  <Edit className="h-4 w-4 mr-1" /> Lyrics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog
        open={!!editingSong}
        onOpenChange={(open) => !open && closeEditModal()}
      >
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>
              {editType === "mixNotes" ? "Edit Mix Notes" : "Edit Lyrics"}
            </DialogTitle>
          </DialogHeader>
          {editingSong && (
            <div className="grid gap-4 py-4">
              <Textarea
                className="min-h-[300px]"
                value={
                  editType === "mixNotes"
                    ? editingSong.mixNotes
                    : editingSong.lyrics
                }
                onChange={(e) => {
                  return setEditingSong({
                    ...editingSong,
                    [editType ?? ""]: e.target.value,
                  });
                }}
              />
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
