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

interface Props {
  user: any;
}

const AccountTab: React.FC<Props> = ({ user }) => {
  const [avatar, setAvatar] = useState<string | null>(user.avatar);
  const [name, setName] = useState<string>(user.name);

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
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatar!} alt="Avatar" />
              <AvatarFallback className="bg-red-500 text-white text-xs">
                {getInitials(user.name!)}
              </AvatarFallback>{" "}
            </Avatar>
            <div className="grid grid-cols-2 gap-4">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                  <Upload size={16} />
                  <span>Upload new avatar</span>
                </div>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </Label>
              <Label onClick={handleAvatarDelete} className="cursor-pointer">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground text-red-600">
                  <X size={16} />
                  <span>Delete avatar</span>
                </div>
              </Label>
            </div>
          </div>
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
