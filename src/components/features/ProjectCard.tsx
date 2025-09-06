import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PhotoPicker } from "@/components/ui/PhotoPicker";
import { Edit3, Check, X, Users, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  progress: number;
  dueDate: string;
  memberCount: number;
  priority: "low" | "medium" | "high";
}

interface ProjectCardProps {
  project: Project;
  onUpdate?: (project: Project) => void;
  canEdit?: boolean;
}

export function ProjectCard({ project, onUpdate, canEdit = false }: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);

  const handleSave = () => {
    onUpdate?.(editedProject);
    setIsEditing(false);
    toast.success("Project updated!");
  };

  const handleCancel = () => {
    setEditedProject(project);
    setIsEditing(false);
  };

  const handleImageSelected = (imageDataUrl: string) => {
    setEditedProject({ ...editedProject, coverImage: imageDataUrl });
  };

  const handleImageRemoved = () => {
    setEditedProject({ ...editedProject, coverImage: undefined });
  };

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

  return (
    <Card className="relative overflow-hidden">
      {/* Cover Image */}
      <div className="relative">
        {isEditing ? (
          <PhotoPicker
            currentImage={editedProject.coverImage}
            onImageSelected={handleImageSelected}
            onImageRemoved={handleImageRemoved}
            variant="banner"
            placeholder="Add project cover image"
            className="rounded-t-lg"
          />
        ) : (
          <div className="h-32 bg-muted flex items-center justify-center overflow-hidden">
            {project.coverImage ? (
              <img 
                src={project.coverImage} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold text-lg">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {canEdit && !isEditing && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>
          
          {isEditing && (
            <div className="flex items-center space-x-1 ml-2">
              <Button size="sm" variant="outline" onClick={handleCancel} className="h-7 w-7 p-0">
                <X className="h-3 w-3" />
              </Button>
              <Button size="sm" onClick={handleSave} className="h-7 w-7 p-0">
                <Check className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <Badge className={getPriorityColor(project.priority)}>
            {project.priority} priority
          </Badge>
          <span className="text-muted-foreground">{project.progress}% complete</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Progress value={project.progress} className="h-2" />
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {project.memberCount} members
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Due {new Date(project.dueDate).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}