"use client";

import { useState } from "react";
import { CalendarDays, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock data
const weeklyData = [
  {
    week: "Week 1",
    tasks: [
      { id: 1, title: "Implement login functionality", assignee: "Alice" },
      { id: 2, title: "Design homepage layout", assignee: "Bob" },
    ],
  },
  {
    week: "Week 2",
    tasks: [
      { id: 3, title: "Set up CI/CD pipeline", assignee: "Charlie" },
      { id: 4, title: "Write API documentation", assignee: "David" },
      { id: 5, title: "Optimize database queries", assignee: "Alice" },
    ],
  },
  {
    week: "Week 3",
    tasks: [
      { id: 6, title: "Implement user settings page", assignee: "Bob" },
      {
        id: 7,
        title: "Fix cross-browser compatibility issues",
        assignee: "Charlie",
      },
    ],
  },
];

const monthlyData = [
  {
    month: "January",
    tasks: [
      { id: 1, title: "Implement login functionality", assignee: "Alice" },
      { id: 2, title: "Design homepage layout", assignee: "Bob" },
      { id: 3, title: "Set up CI/CD pipeline", assignee: "Charlie" },
    ],
  },
  {
    month: "February",
    tasks: [
      { id: 4, title: "Write API documentation", assignee: "David" },
      { id: 5, title: "Optimize database queries", assignee: "Alice" },
      { id: 6, title: "Implement user settings page", assignee: "Bob" },
      {
        id: 7,
        title: "Fix cross-browser compatibility issues",
        assignee: "Charlie",
      },
    ],
  },
];

export default function TaskCompletionView() {
  const [isMonthly, setIsMonthly] = useState(false);
  const data = isMonthly ? monthlyData : weeklyData;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Completion Overview</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="view-mode"
            checked={isMonthly}
            onCheckedChange={setIsMonthly}
          />
          <Label htmlFor="view-mode">
            {isMonthly ? "Monthly" : "Weekly"} View
          </Label>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.map((period) => (
              <div key={period.week || period.month}>
                <h2 className="text-lg font-semibold mb-2">
                  {period.week || period.month} ({period.tasks.length})
                </h2>
                <div className="space-y-2">
                  {period.tasks.map((task) => (
                    <Card key={task.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <User className="w-4 h-4 mr-1" />
                              {task.assignee}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <CalendarDays className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
