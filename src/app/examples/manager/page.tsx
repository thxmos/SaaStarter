"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Github,
  Globe,
  GripVertical,
  LayoutDashboard,
  ListTodo,
  Menu,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type TaskColumns = {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
};

type Task = {
  id: string;
  content: string;
  priority: TaskPriority;
};

enum TaskPriority {
  Urgent = "Urgent",
  Normal = "Normal",
  Eventual = "Eventual",
}

const initialTasks: TaskColumns = {
  todo: [
    {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      content: "Design new landing page",
      priority: TaskPriority.Urgent,
    },
    {
      id: "7f8d5f1a-6b5e-4c1d-a2f9-3b3c3d4e5f6g",
      content: "Update user documentation",
      priority: TaskPriority.Normal,
    },
    {
      id: "a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14",
      content: "Refactor authentication module",
      priority: TaskPriority.Eventual,
    },
    {
      id: "b2c3d4e5-f6g7-h8i9-j10k-l11m12n13o14",
      content: "Implement new feature X",
      priority: TaskPriority.Urgent,
    },
    {
      id: "c3d4e5f6-g7h8-i9j10-k11l-m12n13o14p15",
      content: "Write unit tests for module Y",
      priority: TaskPriority.Normal,
    },
  ],
  inProgress: [
    {
      id: "d4e5f6g7-h8i9-j10k11-l12m-n13o14p15q16",
      content: "Optimize database queries",
      priority: TaskPriority.Urgent,
    },
    {
      id: "e5f6g7h8-i9j10-k11l12-m13n-o14p15q16r17",
      content: "Create onboarding tutorial",
      priority: TaskPriority.Normal,
    },
  ],
  done: [
    {
      id: "f6g7h8i9-j10k11-l12m13-n14o-p15q16r17s18",
      content: "Fix bug in payment gateway",
      priority: TaskPriority.Urgent,
    },
    {
      id: "g7h8i9j10-k11l12-m13n14-o15p-q16r17s18t19",
      content: "Update privacy policy",
      priority: TaskPriority.Normal,
    },
    {
      id: "h8i9j10k11-l12m13-n14o15-p16q-r17s18t19u20",
      content: "Conduct user research",
      priority: TaskPriority.Eventual,
    },
  ],
};

const priorityColors = {
  Urgent: "text-red-600",
  Normal: "text-green-600",
  Eventual: "text-orange-600",
};

export default function Component() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("");

  const filteredTasks = useCallback(
    (
      columnTasks: Array<{
        id: string;
        content: string;
        priority: TaskPriority;
      }>,
    ) => {
      return columnTasks.filter(
        (task) =>
          task.content.toLowerCase().includes(filter.toLowerCase()) ||
          task.priority.toLowerCase().includes(filter.toLowerCase()),
      );
    },
    [filter],
  );

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const newTasks = { ...tasks };
    const [movedTask] = newTasks[sourceColumn].splice(source.index, 1);
    newTasks[destColumn].splice(destination.index, 0, movedTask);

    setTasks(newTasks);
  };

  const renderTaskList = (columnId: string, columnTasks: any[]) => (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-2"
        >
          {filteredTasks(columnTasks).map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className="rounded-lg border bg-white p-2 text-sm shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span>{task.content}</span>
                    <div {...provided.dragHandleProps}>
                      <GripVertical className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div
                    className={`mt-1 text-xs font-medium ${
                      priorityColors[task.priority]
                    }`}
                  >
                    {task.priority}
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <h1 className="text-2xl font-semibold">Project Tasks</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Plus className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden w-64 overflow-y-auto border-r bg-white dark:border-gray-700 dark:bg-gray-800 md:block">
            <nav className="p-4">
              {[
                {
                  title: "Quick Links",
                  links: [
                    { icon: Github, text: "GitHub", url: "/github" },
                    { icon: Globe, text: "Website", url: "/website" },
                  ],
                },
                {
                  title: "Overview",
                  links: [
                    {
                      icon: LayoutDashboard,
                      text: "Dashboard",
                      url: "/dashboard",
                    },
                    { icon: Calendar, text: "Scheduling", url: "/scheduling" },
                    { icon: ListTodo, text: "Work Items", url: "/work-items" },
                  ],
                },
                {
                  title: "Analytics",
                  links: [
                    { icon: BarChart3, text: "Reports", url: "/reports" },
                  ],
                },
                {
                  title: "Settings",
                  links: [
                    {
                      icon: Settings,
                      text: "Project Settings",
                      url: "/settings",
                    },
                  ],
                },
              ].map((section, index) => (
                <div
                  key={index}
                  className={index > 0 ? "mt-8 space-y-1" : "space-y-1"}
                >
                  <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {section.title}
                  </h3>
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={`/examples/manager${link.url}`}
                      className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      <link.icon className="mr-3 h-6 w-6" />
                      {link.text}
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4">
            {/* Filter Tasks */}
            <div className="mb-6">
              <Input
                placeholder="Filter tasks..."
                type="search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            {/* Task Columns */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* To Do Column */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    To Do ({filteredTasks(tasks.todo).length})
                  </CardTitle>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add task</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    {renderTaskList("todo", tasks.todo)}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* In Progress Column */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    In Progress ({filteredTasks(tasks.inProgress).length})
                  </CardTitle>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add task</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    {renderTaskList("inProgress", tasks.inProgress)}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Done Column */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Done ({filteredTasks(tasks.done).length})
                  </CardTitle>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add task</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    {renderTaskList("done", tasks.done)}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </DragDropContext>
  );
}
