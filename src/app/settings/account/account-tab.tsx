"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { uploadAvatar } from "@/app/settings/account/account.actions";
import { getUserById, updateUserById } from "@/data-access/user";
import { isValidSession } from "@/actions/lucia.actions";
import { getInitials } from "@/helpers";
import { SessionUser } from "@/lib/lucia";

export default function AccountTab({ user }: { user: SessionUser }) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      toast.error("Please select an image to upload.");
      return;
    }
    setIsUploadingAvatar(true);

    const formData = new FormData();
    formData.append("file", avatarFile);
    formData.append("path", "avatars/");

    try {
      const result = await uploadAvatar(formData);
      if (result.success) {
        setIsModalOpen(false);
        toast.success("Avatar uploaded successfully");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload avatar",
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const isSessionValid = await isValidSession();
      if (!isSessionValid) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const userId = formData.get("id") as string;
      const name = formData.get("name") as string;

      await updateUserById(userId, { name });
      const user = await getUserById(userId);

      toast.success("Successfully updated user");
    } catch {
      toast.error("Could not update user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                <AvatarImage src={user.avatar} alt="Avatar" />
                <AvatarFallback className="bg-red-500 text-white text-xs">
                  {getInitials(user?.name)}
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
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user?.email} //todo: fix get prop
                disabled
              />
            </div>
          </div> */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={user?.name!}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          <input type="hidden" name="id" value={user?.id} />
        </CardContent>
      </Card>
      {/* todo: make pending state */}
      <Button type="submit" className="max-w-56">
        {"Save Changes"}
      </Button>
    </form>
  );
}
