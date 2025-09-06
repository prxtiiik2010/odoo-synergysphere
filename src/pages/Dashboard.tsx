import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, Users, MoreHorizontal, ArrowLeft } from "lucide-react";
import { CreateProjectModal } from "@/components/features/CreateProjectModal";
import { EmptyState } from "@/components/ui/EmptyState";

interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  owner: {
    name: string;
    avatar: string;
  };
  progress: {
    completed: number;
    total: number;
  };
  dueDate: string;
  members: Array<{
    name: string;
    avatar: string;
  }>;
  priority: "low" | "medium" | "high";
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Complete overhaul of the company website with modern design",
    coverImage: "",
    owner: {
      name: "Sarah Chen",
      avatar: "",
    },
    progress: {
      completed: 7,
      total: 20,
    },
    dueDate: "2024-02-15",
    members: [
      { name: "John Doe", avatar: "" },
      { name: "Jane Smith", avatar: "" },
      { name: "Mike Wilson", avatar: "" },
    ],
    priority: "high",
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement",
    coverImage: "",
    owner: {
      name: "Alex Johnson",
      avatar: "",
    },
    progress: {
      completed: 12,
      total: 25,
    },
    dueDate: "2024-03-20",
    members: [
      { name: "Sarah Chen", avatar: "" },
      { name: "David Lee", avatar: "" },
    ],
    priority: "medium",
  },
  {
    id: "3",
    title: "Marketing Campaign Q1",
    description: "Launch comprehensive marketing campaign for Q1 targets",
    coverImage: "",
    owner: {
      name: "Emma Davis",
      avatar: "",
    },
    progress: {
      completed: 15,
      total: 18,
    },
    dueDate: "2024-01-30",
    members: [
      { name: "Tom Brown", avatar: "" },
      { name: "Lisa Wang", avatar: "" },
      { name: "Chris Taylor", avatar: "" },
      { name: "Amy Zhang", avatar: "" },
    ],
    priority: "high",
  },
];

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const handleCreateProject = (projectData: any) => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: projectData.name,
      description: projectData.description,
      coverImage: "",
      owner: {
        name: "You",
        avatar: "",
      },
      progress: {
        completed: 0,
        total: 1,
      },
      dueDate: projectData.dueDate || "2024-12-31",
      members: [],
      priority: projectData.priority || "medium",
    };
    
    setProjects(prev => [newProject, ...prev]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Project Dashboard</h1>
              <p className="text-muted-foreground">
                Manage and track all your projects in one place
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-primary text-white hover:opacity-90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="Create your first project to get started with team collaboration."
            actionLabel="Create Project"
            onAction={() => setIsCreateModalOpen(true)}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group cursor-pointer transition-all hover:shadow-md-custom hover:-translate-y-1"
                onClick={() => handleProjectClick(project.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Cover Image Placeholder */}
                  <div className="mt-3 h-32 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary opacity-20">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Owner */}
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={project.owner.avatar} />
                      <AvatarFallback className="text-xs">
                        {project.owner.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {project.owner.name}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {project.progress.completed}/{project.progress.total} tasks
                      </span>
                    </div>
                    <Progress
                      value={(project.progress.completed / project.progress.total) * 100}
                      className="h-2"
                    />
                  </div>

                  {/* Due Date & Priority */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="secondary" className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                  </div>

                  {/* Members */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                          +{project.members.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{project.members.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Project Modal */}
        <CreateProjectModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onSubmit={handleCreateProject}
        />
      </div>
    </div>
  );
}