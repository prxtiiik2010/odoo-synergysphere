import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  User, 
  Flag, 
  Tag, 
  CheckSquare, 
  Paperclip, 
  Clock,
  MessageSquare,
  Send
} from "lucide-react";

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

interface TaskDetailModalProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockChecklist = [
  { id: "1", text: "Research user requirements", completed: true },
  { id: "2", text: "Create wireframes", completed: true },
  { id: "3", text: "Design mockups", completed: false },
  { id: "4", text: "Get stakeholder approval", completed: false },
  { id: "5", text: "Implement design", completed: false },
];

const mockAttachments = [
  { id: "1", name: "requirements.pdf", size: "2.4 MB" },
  { id: "2", name: "wireframes.fig", size: "5.1 MB" },
  { id: "3", name: "mockup-v1.png", size: "1.8 MB" },
];

const mockActivity = [
  {
    id: "1",
    user: "Sarah Chen",
    action: "changed status from 'To Do' to 'In Progress'",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: "John Doe",
    action: "updated due date",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    user: "Mike Wilson",
    action: "added checklist item",
    timestamp: "2 days ago",
  },
];

export function TaskDetailModal({ task, open, onOpenChange }: TaskDetailModalProps) {
  const [checklist, setChecklist] = useState(mockChecklist);
  const [newComment, setNewComment] = useState("");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
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

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedTasks = checklist.filter(item => item.completed).length;
  const progressPercentage = (completedTasks / checklist.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Description */}
            <div>
              <h3 className="mb-2 font-semibold">Description</h3>
              <p className="text-muted-foreground">{task.description}</p>
            </div>

            {/* Checklist */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Checklist</h3>
                <span className="text-sm text-muted-foreground">
                  {completedTasks}/{checklist.length} completed
                </span>
              </div>
              
              <div className="mb-4">
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                    />
                    <span
                      className={
                        item.completed 
                          ? "text-muted-foreground line-through" 
                          : "text-foreground"
                      }
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attachments */}
            <div>
              <h3 className="mb-4 font-semibold">Attachments</h3>
              <div className="space-y-2">
                {mockAttachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center space-x-3 rounded-lg border p-3"
                  >
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{attachment.size}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div>
              <h3 className="mb-4 font-semibold">Activity</h3>
              <div className="space-y-4">
                {mockActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="mb-4 font-semibold">Comments</h3>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90">
                  <Send className="mr-2 h-4 w-4" />
                  Post Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <Select value={task.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To-Do</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assignee */}
            <div>
              <label className="mb-2 block text-sm font-medium">Assignee</label>
              <div className="flex items-center space-x-2 rounded-lg border p-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback className="text-xs">
                    {task.assignee.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{task.assignee.name}</span>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="mb-2 block text-sm font-medium">Due Date</label>
              <div className="flex items-center space-x-2 rounded-lg border p-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="mb-2 block text-sm font-medium">Priority</label>
              <Badge className={getPriorityBadgeColor(task.priority)}>
                <Flag className="mr-1 h-3 w-3" />
                {task.priority}
              </Badge>
            </div>

            {/* Labels */}
            <div>
              <label className="mb-2 block text-sm font-medium">Labels</label>
              <div className="flex flex-wrap gap-1">
                {task.labels.map((label) => (
                  <Badge key={label} variant="secondary">
                    <Tag className="mr-1 h-3 w-3" />
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}