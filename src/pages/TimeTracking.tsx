import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  Square,
  ArrowLeft,
  Clock,
  Calendar,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Timer
} from "lucide-react";

interface TimeEntry {
  id: string;
  project: string;
  task: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  date: string;
  billable: boolean;
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: "1",
    project: "Website Redesign",
    task: "Homepage Design",
    description: "Working on the new homepage layout and components",
    startTime: "09:00",
    endTime: "11:30", 
    duration: 150,
    date: "2024-01-15",
    billable: true
  },
  {
    id: "2",
    project: "Mobile App",
    task: "User Authentication",
    description: "Implementing JWT authentication flow",
    startTime: "13:00",
    endTime: "16:45",
    duration: 225,
    date: "2024-01-15", 
    billable: true
  },
  {
    id: "3",
    project: "Marketing Campaign",
    task: "Content Creation",
    description: "Writing blog posts and social media content",
    startTime: "10:00",
    endTime: "12:00",
    duration: 120,
    date: "2024-01-14",
    billable: false
  }
];

const projects = ["Website Redesign", "Mobile App", "Marketing Campaign", "Internal Training"];

export default function TimeTracking() {
  const navigate = useNavigate();
  const [timeEntries] = useState<TimeEntry[]>(mockTimeEntries);
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedProject, setSelectedProject] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [notes, setNotes] = useState("");

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTracking = () => {
    setIsTracking(true);
    setCurrentTime(0);
  };

  const pauseTracking = () => {
    setIsTracking(false);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setCurrentTime(0);
    setSelectedProject("");
    setTaskDescription("");
    setNotes("");
  };

  const getTotalHours = (entries: TimeEntry[]) => {
    return entries.reduce((total, entry) => total + entry.duration, 0);
  };

  const getBillableHours = (entries: TimeEntry[]) => {
    return entries.filter(entry => entry.billable).reduce((total, entry) => total + entry.duration, 0);
  };

  const getWeeklyData = () => {
    const today = new Date();
    const thisWeek = timeEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      return entryDate >= startOfWeek;
    });
    return thisWeek;
  };

  const weeklyEntries = getWeeklyData();

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
              Back to Dashboard
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Time Tracking</h1>
              <p className="text-muted-foreground">
                Track time spent on projects and tasks
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button className="bg-gradient-primary text-white">
                <Plus className="mr-2 h-4 w-4" />
                Manual Entry
              </Button>
            </div>
          </div>
        </div>

        {/* Time Tracker Widget */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-4xl font-mono font-bold text-foreground mb-2">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Session</div>
                </div>
                
                <div className="space-y-3">
                  <select 
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-48 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    disabled={isTracking}
                  >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                  
                  <Input
                    placeholder="Task description..."
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="w-48"
                    disabled={isTracking}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!isTracking ? (
                  <Button 
                    onClick={startTracking}
                    disabled={!selectedProject || !taskDescription}
                    className="bg-success text-white hover:bg-success/90"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </Button>
                ) : (
                  <>
                    <Button onClick={pauseTracking} variant="outline">
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                    <Button onClick={stopTracking} variant="destructive">
                      <Square className="mr-2 h-4 w-4" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {isTracking && (
              <div className="mt-4 pt-4 border-t border-border">
                <Textarea
                  placeholder="Add notes about your work..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatDuration(getTotalHours(timeEntries.filter(e => e.date === "2024-01-15")))}
                  </p>
                </div>
                <Timer className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatDuration(getTotalHours(weeklyEntries))}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Billable Hours</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatDuration(getBillableHours(weeklyEntries))}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Daily</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatDuration(Math.round(getTotalHours(weeklyEntries) / 7))}
                  </p>
                </div>
                <Timer className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recent">Recent Entries</TabsTrigger>
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="projects">By Project</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Time Entries</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-12 bg-primary rounded-full"></div>
                        <div>
                          <h4 className="font-medium text-foreground">{entry.task}</h4>
                          <p className="text-sm text-muted-foreground">{entry.project}</p>
                          <p className="text-xs text-muted-foreground mt-1">{entry.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {entry.startTime} - {entry.endTime}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            {formatDuration(entry.duration)}
                          </p>
                          {entry.billable && (
                            <Badge variant="default" className="text-xs">
                              Billable
                            </Badge>
                          )}
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-7">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                    const dayEntries = weeklyEntries.filter(entry => {
                      const entryDay = new Date(entry.date).getDay();
                      return entryDay === (index + 1) % 7;
                    });
                    const totalMinutes = getTotalHours(dayEntries);
                    
                    return (
                      <div key={day} className="text-center p-4 border border-border rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-2">{day}</div>
                        <div className="text-lg font-bold text-foreground">
                          {formatDuration(totalMinutes)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {dayEntries.length} entries
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Time by Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => {
                    const projectEntries = timeEntries.filter(entry => entry.project === project);
                    const totalMinutes = getTotalHours(projectEntries);
                    const billableMinutes = getBillableHours(projectEntries);
                    
                    return (
                      <div key={project} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium text-foreground">{project}</h4>
                          <p className="text-sm text-muted-foreground">
                            {projectEntries.length} entries
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            {formatDuration(totalMinutes)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDuration(billableMinutes)} billable
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}