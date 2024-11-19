"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Users, CheckCircle, Clock, AlertCircle } from "lucide-react";

// Mock data
const projectStats = {
  totalTasks: 120,
  completedTasks: 78,
  inProgressTasks: 32,
  pendingTasks: 10,
};

const contributors = [
  {
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    tasksCompleted: 25,
  },
  {
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    tasksCompleted: 18,
  },
  {
    name: "Charlie Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    tasksCompleted: 22,
  },
  {
    name: "Diana Prince",
    avatar: "/placeholder.svg?height=32&width=32",
    tasksCompleted: 13,
  },
];

const taskStatusData = [
  { name: "Completed", value: projectStats.completedTasks, color: "#10B981" },
  {
    name: "In Progress",
    value: projectStats.inProgressTasks,
    color: "#3B82F6",
  },
  { name: "Pending", value: projectStats.pendingTasks, color: "#EF4444" },
];

export default function ProjectManagementDashboard() {
  const completionPercentage =
    (projectStats.completedTasks / projectStats.totalTasks) * 100;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Project Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Tasks
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projectStats.completedTasks}
            </div>
            <p className="text-xs text-muted-foreground">+10% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projectStats.inProgressTasks}
            </div>
            <p className="text-xs text-muted-foreground">-3% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projectStats.pendingTasks}
            </div>
            <p className="text-xs text-muted-foreground">+4% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {completionPercentage.toFixed(1)}%
            </div>
            <Progress value={completionPercentage} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              {projectStats.completedTasks} out of {projectStats.totalTasks}{" "}
              tasks completed
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {contributors.map((contributor) => (
              <div key={contributor.name} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={contributor.avatar}
                    alt={contributor.name}
                  />
                  <AvatarFallback>
                    {contributor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {contributor.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {contributor.tasksCompleted} tasks completed
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {(
                    (contributor.tasksCompleted / projectStats.completedTasks) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
