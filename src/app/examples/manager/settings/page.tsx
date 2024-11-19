"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash2, Github, FileText } from "lucide-react";

type Collaborator = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type QuickLink = {
  id: string;
  name: string;
  url: string;
  icon: "github" | "documentation";
};

export default function SettingsPage() {
  const [projectName, setProjectName] = useState("My Awesome Project");
  const [projectDescription, setProjectDescription] = useState(
    "This is a great project we're working on.",
  );
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([
    {
      id: "1",
      name: "GitHub",
      url: "https://github.com/myproject",
      icon: "github",
    },
    {
      id: "2",
      name: "Documentation",
      url: "https://docs.myproject.com",
      icon: "documentation",
    },
  ]);

  const handleSaveProject = () => {
    // Here you would typically send the project data to your backend
    console.log("Saving project:", { projectName, projectDescription });
  };

  const handleAddCollaborator = () => {
    if (newCollaboratorEmail) {
      const newCollaborator: Collaborator = {
        id: Date.now().toString(),
        name: newCollaboratorEmail.split("@")[0], // Use part of email as name for this example
        email: newCollaboratorEmail,
        avatar: "/placeholder.svg?height=40&width=40",
      };
      setCollaborators([...collaborators, newCollaborator]);
      setNewCollaboratorEmail("");
    }
  };

  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id));
  };

  const handleQuickLinkChange = (
    id: string,
    field: "name" | "url",
    value: string,
  ) => {
    setQuickLinks(
      quickLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link,
      ),
    );
  };

  const handleSaveQuickLinks = () => {
    // Here you would typically send the quick links data to your backend
    console.log("Saving quick links:", quickLinks);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Project Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Manage your project's basic information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea
              id="project-description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveProject}>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Collaborators</CardTitle>
          <CardDescription>
            Manage who has access to this project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={collaborator.avatar}
                      alt={collaborator.name}
                    />
                    <AvatarFallback>
                      {collaborator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{collaborator.name}</p>
                    <p className="text-sm text-gray-500">
                      {collaborator.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCollaborator(collaborator.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Email address"
              value={newCollaboratorEmail}
              onChange={(e) => setNewCollaboratorEmail(e.target.value)}
            />
            <Button onClick={handleAddCollaborator}>
              <Plus className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>
            Manage quick access links for your project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickLinks.map((link) => (
            <div key={link.id} className="flex items-center space-x-2">
              {link.icon === "github" ? (
                <Github className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
              <Input
                value={link.name}
                onChange={(e) =>
                  handleQuickLinkChange(link.id, "name", e.target.value)
                }
                className="w-1/3"
              />
              <Input
                value={link.url}
                onChange={(e) =>
                  handleQuickLinkChange(link.id, "url", e.target.value)
                }
                className="flex-grow"
              />
            </div>
          ))}
          <Button onClick={handleSaveQuickLinks}>Save Quick Links</Button>
        </CardContent>
      </Card>
    </div>
  );
}
