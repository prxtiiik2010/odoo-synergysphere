import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  TrendingUp, 
  TrendingDown,
  Users, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart, 
  Bar,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const productivityData = [
  { month: "Jan", tasks: 45, completed: 38, efficiency: 84 },
  { month: "Feb", tasks: 52, completed: 46, efficiency: 88 },
  { month: "Mar", tasks: 48, completed: 44, efficiency: 92 },
  { month: "Apr", tasks: 61, completed: 55, efficiency: 90 },
  { month: "May", tasks: 67, completed: 62, efficiency: 93 },
  { month: "Jun", tasks: 58, completed: 54, efficiency: 93 }
];

const teamPerformance = [
  { name: "Sarah Chen", tasks: 23, completed: 21, efficiency: 91 },
  { name: "John Doe", tasks: 19, completed: 18, efficiency: 95 },
  { name: "Mike Wilson", tasks: 15, completed: 13, efficiency: 87 },
  { name: "Emma Davis", tasks: 17, completed: 16, efficiency: 94 }
];

const projectStatus = [
  { name: "Completed", value: 45, color: "#10b981" },
  { name: "In Progress", value: 30, color: "#f59e0b" },
  { name: "Planned", value: 25, color: "#6b7280" }
];

const timeTracking = [
  { day: "Mon", hours: 8.5, productive: 7.2 },
  { day: "Tue", hours: 7.8, productive: 6.9 },
  { day: "Wed", hours: 8.2, productive: 7.5 },
  { day: "Thu", hours: 8.0, productive: 7.1 },
  { day: "Fri", hours: 7.5, productive: 6.8 },
  { day: "Sat", hours: 4.2, productive: 3.8 },
  { day: "Sun", hours: 2.1, productive: 1.9 }
];

export default function Analytics() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days");

  const kpiData = [
    {
      title: "Total Projects",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: <CheckCircle2 className="h-5 w-5" />
    },
    {
      title: "Team Efficiency",
      value: "91%",
      change: "+5%", 
      trend: "up",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "Tasks Completed",
      value: "156",
      change: "+23%",
      trend: "up", 
      icon: <CheckCircle2 className="h-5 w-5" />
    },
    {
      title: "Avg. Response Time",
      value: "2.4h",
      change: "-15%",
      trend: "down",
      icon: <Clock className="h-5 w-5" />
    }
  ];

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
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive insights into team performance and project progress
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="last-7-days">Last 7 days</option>
                <option value="last-30-days">Last 30 days</option>
                <option value="last-90-days">Last 90 days</option>
                <option value="last-year">Last year</option>
              </select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    <div className="flex items-center mt-1">
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-success mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-success mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        kpi.trend === "up" ? "text-success" : "text-success"
                      }`}>
                        {kpi.change}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {kpi.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Task Completion Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={productivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="completed" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="tasks" stackId="2" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Project Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={projectStatus}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {projectStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Time Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timeTracking}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" fill="#6366f1" name="Total Hours" />
                    <Bar dataKey="productive" fill="#10b981" name="Productive Hours" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="productivity" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Efficiency Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Efficiency Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={productivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="efficiency" stroke="#6366f1" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Productivity Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Productivity Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Task Completion Rate</span>
                    <span className="text-sm text-muted-foreground">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">On-time Delivery</span>
                    <span className="text-sm text-muted-foreground">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Quality Score</span>
                    <span className="text-sm text-muted-foreground">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Team Satisfaction</span>
                    <span className="text-sm text-muted-foreground">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {member.completed}/{member.tasks} tasks completed
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{member.efficiency}%</p>
                          <p className="text-xs text-muted-foreground">Efficiency</p>
                        </div>
                        <Progress value={member.efficiency} className="w-20 h-2" />
                        <Badge variant={member.efficiency >= 90 ? "default" : "secondary"}>
                          {member.efficiency >= 90 ? "Excellent" : "Good"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Website Redesign</h4>
                        <p className="text-sm text-muted-foreground">Due: Feb 15, 2024</p>
                      </div>
                      <Badge variant="default" className="bg-warning text-warning-foreground">
                        In Progress
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Mobile App Development</h4>
                        <p className="text-sm text-muted-foreground">Due: Mar 20, 2024</p>
                      </div>
                      <Badge variant="secondary">
                        Planning
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Marketing Campaign Q1</h4>
                        <p className="text-sm text-muted-foreground">Due: Jan 30, 2024</p>
                      </div>
                      <Badge variant="default" className="bg-success text-success-foreground">
                        Completed
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Development Team</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Design Team</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Marketing Team</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>QA Team</span>
                      <span>89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}