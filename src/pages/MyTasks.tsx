import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateProjectModal } from "@/components/features/CreateProjectModal";
import { CreateTeamModal } from "@/components/features/CreateTeamModal";
import { TaskDetailModal } from "@/components/features/TaskDetailModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { 
  ArrowLeft, Calendar, CheckCircle2, Search, Clock, Plus, Users, 
  Mail, MoreVertical, Crown
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Interfaces
interface Task {
  id: string;
  title: string;
  description: string;
  projectName: string;
  projectId: string;
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

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  isLead?: boolean;
}

interface Team {
  id: string;
  name: string;
  description: string;
  department: string;
  lead: string;
  members: TeamMember[];
  createdAt: string;
  status: "active" | "inactive" | "project-based";
}

interface Project {
  id: string;
  name: string;
  key: string;
  manager: string;
  duration: string;
  priority: string;
  visibility: string;
  description: string;
  teamMembers: Array<{
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
  }>;
  createdAt: string;
  status: "planning" | "active" | "completed" | "on-hold";
  progress?: {
    completed: number;
    total: number;
  };
}

// Mock Data
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create modern, responsive landing page design",
    projectName: "Website Redesign",
    projectId: "1",
    assignee: { name: "You", avatar: "" },
    dueDate: "2024-01-25",
    priority: "high",
    status: "todo",
    checklist: { completed: 2, total: 5 },
    labels: ["design", "frontend"],
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Set up JWT-based authentication system",
    projectName: "Mobile App Development",
    projectId: "2",
    assignee: { name: "You", avatar: "" },
    dueDate: "2024-01-28",
    priority: "high",
    status: "inprogress",
    checklist: { completed: 3, total: 4 },
    labels: ["backend", "security"],
  },
];

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    key: "website-redesign",
    manager: "Sarah Chen",
    duration: "12",
    priority: "high",
    visibility: "team",
    description: "Complete redesign of the company website with modern UI/UX",
    teamMembers: [
      { id: "1", name: "Sarah Chen", email: "sarah@company.com", avatar: "", role: "Designer" },
      { id: "2", name: "Alex Johnson", email: "alex@company.com", avatar: "", role: "Developer" },
    ],
    createdAt: "2024-01-15",
    status: "active",
    progress: { completed: 12, total: 20 }
  },
  {
    id: "2",
    name: "Mobile App Development",
    key: "mobile-app-dev",
    manager: "Emma Davis",
    duration: "16",
    priority: "medium",
    visibility: "team",
    description: "Develop a cross-platform mobile application",
    teamMembers: [
      { id: "3", name: "Emma Davis", email: "emma@company.com", avatar: "", role: "Product Manager" },
      { id: "4", name: "Michael Brown", email: "michael@company.com", avatar: "", role: "Developer" },
    ],
    createdAt: "2024-02-01",
    status: "planning",
    progress: { completed: 3, total: 15 }
  }
];

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Frontend Development",
    description: "Responsible for user interface design and development using React and modern web technologies",
    department: "Engineering",
    lead: "Sarah Chen",
    members: [
      { id: "1", name: "Sarah Chen", email: "sarah@company.com", avatar: "", role: "Senior Frontend Developer", isLead: true },
      { id: "2", name: "Alex Johnson", email: "alex@company.com", avatar: "", role: "Frontend Developer" },
      { id: "3", name: "Emma Wilson", email: "emma@company.com", avatar: "", role: "UI/UX Designer" },
    ],
    createdAt: "2024-01-15",
    status: "active"
  },
  {
    id: "2",
    name: "Backend Engineering", 
    description: "Server-side development, API design, and database management",
    department: "Engineering",
    lead: "Michael Brown",
    members: [
      { id: "5", name: "Michael Brown", email: "michael@company.com", avatar: "", role: "Senior Backend Developer", isLead: true },
      { id: "6", name: "Lisa Wang", email: "lisa@company.com", avatar: "", role: "DevOps Engineer" },
    ],
    createdAt: "2024-01-20",
    status: "active"
  }
];

export default function MyTasks() {
  // State management
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [activeTab, setActiveTab] = useState("tasks");
  
  // Tasks state
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  
  // Modal states
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  
  const navigate = useNavigate();

  // Helper functions
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive" as const;
      case "medium": return "secondary" as const;
      case "low": return "outline" as const;
      default: return "secondary" as const;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": case "inprogress": return "default" as const;
      case "planning": case "todo": return "secondary" as const;
      case "completed": case "done": return "outline" as const;
      case "on-hold": return "destructive" as const;
      case "inactive": return "secondary" as const;
      default: return "secondary" as const;
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department.toLowerCase()) {
      case "engineering": return "bg-primary/10 text-primary";
      case "design": return "bg-accent/10 text-accent-foreground";
      case "marketing": return "bg-success/10 text-success-foreground";
      case "sales": return "bg-warning/10 text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const isToday = (dueDate: string) => {
    return new Date(dueDate).toDateString() === new Date().toDateString();
  };

  // Event handlers
  const handleCreateProject = (projectData: any) => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      ...projectData,
      createdAt: new Date().toISOString().split('T')[0],
      status: "planning" as const
    };
    
    setProjects(prev => [newProject, ...prev]);
    setIsCreateProjectModalOpen(false);
    
    toast({
      title: "Project Created",
      description: `${projectData.name} has been successfully created.`,
    });
  };

  const handleCreateTeam = (teamData: any) => {
    const newTeam: Team = {
      id: Math.random().toString(36).substr(2, 9),
      ...teamData,
      createdAt: new Date().toISOString().split('T')[0],
      status: "active" as const
    };
    
    setTeams(prev => [newTeam, ...prev]);
    setIsCreateTeamModalOpen(false);
    
    toast({
      title: "Team Created",
      description: `${teamData.name} has been successfully created.`,
    });
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  // Apply task filters
  useEffect(() => {
    let filtered = tasks;

    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (projectFilter !== "all") {
      filtered = filtered.filter(task => task.projectName === projectFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, projectFilter, statusFilter, priorityFilter]);

  const projectsList = Array.from(new Set(tasks.map(task => task.projectName)));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Workspace</h1>
              <p className="text-muted-foreground">
                Manage your tasks, projects, and teams all in one place
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            {/* Tasks Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="lg:col-span-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Select value={projectFilter} onValueChange={setProjectFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Projects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      {projectsList.map((project) => (
                        <SelectItem key={project} value={project}>
                          {project}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="todo">To-Do</SelectItem>
                      <SelectItem value="inprogress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tasks List */}
            {filteredTasks.length === 0 ? (
              <EmptyState
                title="No tasks found"
                description="No tasks match your current filters. Try adjusting your search criteria."
                icon={<CheckCircle2 className="h-8 w-8 text-muted-foreground" />}
              />
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="cursor-pointer transition-all hover:shadow-md"
                    onClick={() => setSelectedTask(task)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-semibold text-foreground line-clamp-1">
                              {task.title}
                            </h3>
                            <Button
                              variant="link"
                              className="h-auto p-0 text-sm text-primary hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProjectClick(task.projectId);
                              }}
                            >
                              {task.projectName}
                            </Button>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {task.description}
                          </p>

                          {task.labels.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {task.labels.map((label) => (
                                <Badge key={label} variant="secondary" className="text-xs">
                                  {label}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {task.checklist.total > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">
                                  {task.checklist.completed}/{task.checklist.total} subtasks
                                </span>
                              </div>
                              <Progress
                                value={(task.checklist.completed / task.checklist.total) * 100}
                                className="h-2"
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end space-y-3">
                          <div className="flex space-x-2">
                            <Badge className={getStatusColor(task.status)}>
                              {task.status === "todo" ? "To-Do" : task.status === "inprogress" ? "In Progress" : "Done"}
                            </Badge>
                            <Badge variant={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span
                              className={
                                isOverdue(task.dueDate)
                                  ? "text-destructive font-medium"
                                  : isToday(task.dueDate)
                                  ? "text-warning font-medium"
                                  : "text-muted-foreground"
                              }
                            >
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                            {isOverdue(task.dueDate) && (
                              <Clock className="h-4 w-4 text-destructive" />
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback className="text-xs">
                                {task.assignee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              {task.assignee.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-end">
              <Button 
                onClick={() => setIsCreateProjectModalOpen(true)}
                className="bg-gradient-primary text-white hover:opacity-90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card 
                  key={project.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => handleProjectClick(project.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {project.key}
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Badge variant={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                      <Badge variant={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{project.duration} weeks</span>
                      </div>
                      <span className="text-muted-foreground">
                        Manager: {project.manager}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Team ({project.teamMembers.length})</span>
                      </div>
                      
                      <div className="flex -space-x-2">
                        {project.teamMembers.slice(0, 4).map((member) => (
                          <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.teamMembers.length > 4 && (
                          <div className="h-8 w-8 border-2 border-background rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">
                              +{project.teamMembers.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {project.progress && (
                      <div className="space-y-2 pt-2 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            {Math.round((project.progress.completed / project.progress.total) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(project.progress.completed / project.progress.total) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first project to get started with team collaboration
                </p>
                <Button 
                  onClick={() => setIsCreateProjectModalOpen(true)}
                  className="bg-gradient-primary text-white hover:opacity-90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-6">
            <div className="flex justify-end">
              <Button 
                onClick={() => setIsCreateTeamModalOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Team
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <Card key={team.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {team.department} • Led by {team.lead}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(team.status)}>
                        {team.status}
                      </Badge>
                      <span className={`text-xs px-2 py-1 rounded-md ${getDepartmentColor(team.department)}`}>
                        {team.department}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {team.description}
                    </p>
                    
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                      <Crown className="h-4 w-4 text-primary" />
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={team.members.find(m => m.isLead)?.avatar} />
                          <AvatarFallback className="text-xs">
                            {team.lead.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{team.lead}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Team Members ({team.members.length})</span>
                      </div>
                      
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 5).map((member) => (
                          <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {team.members.length > 5 && (
                          <div className="h-8 w-8 border-2 border-background rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">
                              +{team.members.length - 5}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          const leadEmail = team.members.find(m => m.isLead)?.email || '';
                          window.location.href = `mailto:${leadEmail}?subject=Contact%20${team.name}%20Team`;
                        }}
                      >
                        <Mail className="mr-1 h-3 w-3" />
                        Contact
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          toast({
                            title: "Team Details",
                            description: `Viewing details for ${team.name} team with ${team.members.length} members in ${team.department} department.`,
                          });
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {teams.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No teams yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first team to organize your workforce and improve collaboration
                </p>
                <Button 
                  onClick={() => setIsCreateTeamModalOpen(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Team
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Modals */}
        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            open={!!selectedTask}
            onOpenChange={() => setSelectedTask(null)}
          />
        )}

        <CreateProjectModal
          open={isCreateProjectModalOpen}
          onOpenChange={setIsCreateProjectModalOpen}
          onSubmit={handleCreateProject}
        />

        <CreateTeamModal
          open={isCreateTeamModalOpen}
          onOpenChange={setIsCreateTeamModalOpen}
          onSubmit={handleCreateTeam}
        />
      </div>
    </div>
  );
}