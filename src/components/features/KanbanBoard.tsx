import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, CheckCircle2, MoreHorizontal } from "lucide-react";
import { TaskDetailModal } from "@/components/features/TaskDetailModal";
import { CreateTaskModal } from "@/components/features/CreateTaskModal";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "inprogress" | "done";
  checklist: {
    completed: number;
    total: number;
  };
  labels: string[];
}

interface KanbanBoardProps {
  projectId: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create modern, responsive landing page design",
    assignee: {
      name: "Sarah Chen",
      avatar: "",
    },
    dueDate: "2024-01-25",
    priority: "high",
    status: "todo",
    checklist: {
      completed: 2,
      total: 5,
    },
    labels: ["design", "frontend"],
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Set up JWT-based authentication system",
    assignee: {
      name: "John Doe",
      avatar: "",
    },
    dueDate: "2024-01-28",
    priority: "high",
    status: "inprogress",
    checklist: {
      completed: 3,
      total: 4,
    },
    labels: ["backend", "security"],
  },
  {
    id: "3",
    title: "Database schema design",
    description: "Design and implement database schema",
    assignee: {
      name: "Mike Wilson",
      avatar: "",
    },
    dueDate: "2024-01-20",
    priority: "medium",
    status: "done",
    checklist: {
      completed: 4,
      total: 4,
    },
    labels: ["database"],
  },
];

const columns = [
  { id: "todo", title: "To Do", tasks: mockTasks.filter(t => t.status === "todo") },
  { id: "inprogress", title: "In Progress", tasks: mockTasks.filter(t => t.status === "inprogress") },
  { id: "done", title: "Done", tasks: mockTasks.filter(t => t.status === "done") },
];

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string>("");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCreateTask = (columnId: string) => {
    setActiveColumn(columnId);
    setIsCreateModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Kanban Board */}
      <div className="grid gap-6 lg:grid-cols-3">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {column.tasks.length}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCreateTask(column.id)}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className="cursor-pointer transition-all hover:shadow-md-custom hover:-translate-y-1"
                  onClick={() => handleTaskClick(task)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Task Header */}
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-foreground line-clamp-2">
                          {task.title}
                        </h4>
                        <Button variant="ghost" size="sm" className="h-auto w-auto p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Labels */}
                      {task.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.labels.map((label) => (
                            <Badge key={label} variant="secondary" className="text-xs">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Assignee and Due Date */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {task.assignee.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {task.assignee.name}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Priority */}
                      <div className="flex items-center justify-between">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>

                        {/* Checklist Progress */}
                        {task.checklist.total > 0 && (
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {task.checklist.completed}/{task.checklist.total}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {task.checklist.total > 0 && (
                        <Progress
                          value={(task.checklist.completed / task.checklist.total) * 100}
                          className="h-1"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Task Button */}
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={() => handleCreateTask(column.id)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add task
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          open={!!selectedTask}
          onOpenChange={() => setSelectedTask(null)}
        />
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        columnId={activeColumn}
        projectId={projectId}
      />
    </div>
  );
}