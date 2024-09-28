"use client";

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
import { getInitials } from "@/helpers";
import { TabsContent } from "@radix-ui/react-tabs";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload, { FileType } from "@/components/file-upload";
import { uploadBlob } from "@/actions/blob.actions";
import { isValidSession, updateUserAvatar } from "@/actions/user.actions";
import { useRouter } from "next/navigation";

interface Props {
  user: any;
}

const AccountTab: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(user.avatar);
  const [name, setName] = useState<string>(user.name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarDelete = () => {
    setAvatar(null);
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        avatar,
        name: name,
      }),
    });
    if (res.ok) {
      toast.success("Successfully updated your profile", {
        duration: 2000,
      });
    } else {
      toast.error("Couldn't update your profile", {
        duration: 2000,
      });
    }
  };

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
      toast.success("File uploaded successfully");
      await updateUserAvatar(blob.url);
      setIsUploadingAvatar(false);
      router.refresh();
      setIsModalOpen(false);
    } else {
      setIsUploadingAvatar(false);
      toast.error("Failed to upload file");
    }
  };

  return (
    <TabsContent value="account" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
          <CardDescription>
            Update your personal information and profile picture.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <div className="w-36 grid place-items-center">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatar!} alt="Avatar" />
                <AvatarFallback className="bg-red-500 text-white text-xs">
                  {getInitials(user.name!)}
                </AvatarFallback>
              </Avatar>
            </div>
            <DialogTrigger asChild>
              <Button>
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
                type="email"
                placeholder={user.email}
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default AccountTab;
