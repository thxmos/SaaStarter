"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@radix-ui/react-tabs";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload, { FileType } from "@/components/file-upload";
import { uploadBlob } from "@/actions/blob.actions";
import { isValidSession, updateUserAvatar } from "@/actions/user.actions";
import { useSession } from "@/providers/session-provider";
import { updateUser } from "./settings.action";
import { User } from "@/types/user";
import { getInitials } from "@/helpers";

interface Props {
  user: User;
}

const themes = [
  { name: "bight", color: "#ffffff" },
  { name: "dark", color: "#1f2937" },
  { name: "blue", color: "#3b82f6" },
  { name: "green", color: "#10b981" },
  { name: "purple", color: "#8b5cf6" },
  { name: "orange", color: "#f97316" },
  { name: "pink", color: "#ec4899" },
  { name: "teal", color: "#14b8a6" },
];

export default function AccountTab({ user }: Props) {
  const { setUser } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedTheme, setSelectedTheme] = useState(
    user.theme || themes[0].name,
  );

  const handleAvatarUpload = async () => {
    const isSessionValid = await isValidSession();
    if (!isSessionValid) return;
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("file", avatarFile);
    formData.append("path", "avatars/");
    setIsUploadingAvatar(true);

    const blob = await uploadBlob(formData);

    if (blob) {
      toast.success("Avatar uploaded successfully");
      await updateUserAvatar(blob.url);
      setIsUploadingAvatar(false);
      router.refresh();
      setIsModalOpen(false);
      setUser({ ...user, avatar: blob.url });
    } else {
      setIsUploadingAvatar(false);
      toast.error("Failed to upload avatar");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("theme", selectedTheme);

    startTransition(async () => {
      try {
        const result = await updateUser(formData);
        if (result.message === "User successfully updated!") {
          toast.success(result.message);
          const updatedName = formData.get("name") as string;
          setUser({
            ...user,
            name: updatedName,
            theme: selectedTheme,
          });
          router.refresh();
        } else {
          toast.error("Failed to update user");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating user");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TabsContent value="account" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">User Settings</CardTitle>
            <CardDescription>
              Update your personal information and profile picture.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <div className="w-36 grid place-items-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar ?? ""} alt="Avatar" />
                  <AvatarFallback className="bg-red-500 text-white text-xs">
                    {getInitials(user.name!)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <DialogTrigger asChild>
                <Button type="button">
                  <Upload className="h-4 w-4 mr-2" />
                  Update Avatar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update User Avatar</DialogTitle>
                  <DialogDescription>
                    Upload an image and click upload file to update your avatar.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <FileUpload
                    fileType={FileType.Image}
                    file={avatarFile}
                    setFile={setAvatarFile}
                    onUpload={handleAvatarUpload}
                    acceptedTypes={{
                      "image/jpeg": [],
                      "image/png": [],
                    }}
                    uploading={isUploadingAvatar}
                  />
                </div>
              </DialogContent>
            </Dialog>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={user.name!}
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
            <input type="hidden" name="id" value={user.id} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Preferences</CardTitle>
            <CardDescription>
              Customize your experience by updating theme.
              {/* and time zone preferences. */}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    type="button"
                    className={`w-8 h-8 rounded-md border-2 ${
                      selectedTheme === theme.name
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: theme.color }}
                    onClick={() => setSelectedTheme(theme.name)}
                    aria-label={`Select ${theme.name} theme`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </TabsContent>
    </form>
  );
}
