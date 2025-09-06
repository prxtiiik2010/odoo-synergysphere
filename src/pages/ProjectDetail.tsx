import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, Users, MoreHorizontal, Plus, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { KanbanBoard } from "@/components/features/KanbanBoard";
import { DiscussionsTab } from "@/components/features/DiscussionsTab";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock project data - enhanced with more details
  const project = {
    id: id,
    title: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved user experience",
    owner: {
      name: "Sarah Chen",
      avatar: "",
    },
    progress: {
      completed: 12,
      total: 20,
      inProgress: 4,
      todo: 4,
    },
    timeline: {
      startDate: "2024-01-15",
      dueDate: "2024-02-15",
      currentPhase: "Development"
    },
    members: [
      { name: "John Doe", avatar: "", role: "Frontend Developer" },
      { name: "Jane Smith", avatar: "", role: "UI/UX Designer" },
      { name: "Mike Wilson", avatar: "", role: "Backend Developer" },
      { name: "Sarah Chen", avatar: "", role: "Project Manager" },
    ],
    priority: "high",
    status: "active",
    budget: {
      allocated: 50000,
      spent: 32000
    },
    milestones: [
      { name: "Requirements Gathering", completed: true, date: "2024-01-20" },
      { name: "Design Phase", completed: true, date: "2024-01-30" },
      { name: "Development Phase", completed: false, date: "2024-02-10" },
      { name: "Testing & Launch", completed: false, date: "2024-02-15" }
    ]
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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{project.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Project Stats Row */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Progress Card */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Progress</h3>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{project.progress.completed}/{project.progress.total} tasks</span>
                      <span className="font-medium">
                        {Math.round((project.progress.completed / project.progress.total) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(project.progress.completed / project.progress.total) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>In Progress: {project.progress.inProgress}</span>
                      <span>Todo: {project.progress.todo}</span>
                    </div>
                  </div>
                </Card>

                {/* Timeline Card */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Due: {new Date(project.timeline.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Started: {new Date(project.timeline.startDate).toLocaleDateString()}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {project.timeline.currentPhase}
                    </Badge>
                  </div>
                </Card>

                {/* Team Card */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Team</h3>
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                          <span className="text-xs text-muted-foreground">+{project.members.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium">{project.members.length} members</p>
                    <p className="text-xs text-muted-foreground">Led by {project.owner.name}</p>
                  </div>
                </Card>

                {/* Status Card */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority} priority
                    </Badge>
                    <p className="text-sm font-medium capitalize">{project.status}</p>
                    <p className="text-xs text-muted-foreground">
                      Budget: ${project.budget.spent.toLocaleString()}/${project.budget.allocated.toLocaleString()}
                    </p>
                  </div>
                </Card>
              </div>

              {/* Milestones */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Project Milestones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {project.milestones.map((milestone, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{milestone.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(milestone.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className={`h-3 w-3 rounded-full ${
                          milestone.completed ? 'bg-primary' : 'bg-muted'
                        }`} />
                      </div>
                      {milestone.completed && (
                        <Badge variant="outline" className="text-xs mt-2">
                          Completed
                        </Badge>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <KanbanBoard projectId={project.id} />
          </TabsContent>

          <TabsContent value="discussions">
            <DiscussionsTab projectId={project.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}