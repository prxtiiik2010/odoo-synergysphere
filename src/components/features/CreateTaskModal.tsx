import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Upload, Paperclip } from "lucide-react";

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnId: string;
  projectId: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export function CreateTaskModal({ open, onOpenChange, columnId, projectId }: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    priority: "medium",
    labels: [] as string[],
    attachments: [] as File[],
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const availableLabels = ["frontend", "backend", "design", "bug", "feature", "urgent"];
  const teamMembers = [
    { id: "sarah", name: "Sarah Chen" },
    { id: "john", name: "John Doe" },
    { id: "jane", name: "Jane Smith" },
    { id: "mike", name: "Mike Wilson" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle task creation here
    console.log("Creating task:", { ...formData, checklist, status: columnId });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
      priority: "medium",
      labels: [],
      attachments: [],
    });
    setChecklist([]);
    setNewChecklistItem("");
    setNewLabel("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklist(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: newChecklistItem.trim(),
          completed: false,
        },
      ]);
      setNewChecklistItem("");
    }
  };

  const removeChecklistItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  const addLabel = (label: string) => {
    if (!formData.labels.includes(label)) {
      setFormData(prev => ({
        ...prev,
        labels: [...prev.labels, label],
      }));
    }
  };

  const removeLabel = (label: string) => {
    setFormData(prev => ({
      ...prev,
      labels: prev.labels.filter(l => l !== label),
    }));
  };

  const addCustomLabel = () => {
    if (newLabel.trim() && !formData.labels.includes(newLabel.trim())) {
      addLabel(newLabel.trim());
      setNewLabel("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "todo":
        return "To-Do";
      case "inprogress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return "Unknown";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to the "{getStatusLabel(columnId)}" column.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the task..."
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </div>

          {/* Assignment and Timeline */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Assignee</Label>
              <Select
                value={formData.assignee}
                onValueChange={(value) => setFormData(prev => ({ ...prev, assignee: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Labels */}
          <div className="space-y-2">
            <Label>Labels</Label>
            <div className="space-y-3">
              {/* Selected Labels */}
              {formData.labels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.labels.map((label) => (
                    <Badge key={label} variant="secondary" className="pr-1">
                      {label}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-auto w-auto p-0"
                        onClick={() => removeLabel(label)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Available Labels */}
              <div className="flex flex-wrap gap-1">
                {availableLabels
                  .filter(label => !formData.labels.includes(label))
                  .map((label) => (
                    <Button
                      key={label}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addLabel(label)}
                    >
                      {label}
                    </Button>
                  ))}
              </div>

              {/* Custom Label */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Add custom label"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomLabel())}
                />
                <Button type="button" variant="outline" onClick={addCustomLabel}>
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            <Label>Checklist</Label>
            <div className="space-y-3">
              {/* Existing Items */}
              {checklist.length > 0 && (
                <div className="space-y-2">
                  {checklist.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox checked={item.completed} disabled />
                      <span className="flex-1 text-sm">{item.text}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeChecklistItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Item */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Add checklist item"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addChecklistItem())}
                />
                <Button type="button" variant="outline" onClick={addChecklistItem}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="space-y-3">
              {/* Existing Attachments */}
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 rounded-lg border p-2"
                    >
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1 text-sm">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="file-upload"
                />
                <Card className="border-2 border-dashed border-muted-foreground/25 p-4 hover:border-muted-foreground/50 transition-colors">
                  <div className="flex flex-col items-center text-center">
                    <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-primary text-white hover:opacity-90"
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
