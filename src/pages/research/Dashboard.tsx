
import { useSearchParams } from "react-router-dom";
import { useResearchAuth } from "@/hooks/useResearchAuth";
import { useFirebase } from "@/hooks/useFirebase";
import ResearchLayout from "@/components/research/ResearchLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, MoreHorizontal, Clock, Users, TrendingUp, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { useState } from "react";

const recentProjects = [
  {
    id: 1,
    name: "Protein Folding Analysis",
    description: "Deep learning models for protein structure prediction",
    progress: 75,
    dueDate: "2024-01-15",
    team: ["Dr. Smith", "Dr. Johnson", "Dr. Wilson"],
    status: "on-track",
    tasks: { completed: 12, total: 16 }
  },
  {
    id: 2,
    name: "Clinical Trial Data Management",
    description: "Statistical analysis of Phase III trial results",
    progress: 45,
    dueDate: "2024-02-20",
    team: ["Dr. Brown", "Dr. Davis"],
    status: "at-risk",
    tasks: { completed: 8, total: 18 }
  },
  {
    id: 3,
    name: "Gene Expression Study",
    description: "RNA-seq analysis for cancer biomarker discovery",
    progress: 90,
    dueDate: "2023-12-30",
    team: ["Dr. Miller", "Dr. Garcia", "Dr. Taylor", "Dr. Anderson"],
    status: "completed",
    tasks: { completed: 22, total: 22 }
  }
];

const upcomingTasks = [
  { id: 1, title: "Review manuscript draft", project: "Protein Folding Analysis", dueDate: "Today", priority: "high" },
  { id: 2, title: "Data quality check", project: "Clinical Trial Data", dueDate: "Tomorrow", priority: "medium" },
  { id: 3, title: "Team meeting preparation", project: "Gene Expression Study", dueDate: "Dec 28", priority: "low" },
  { id: 4, title: "Statistical analysis", project: "Clinical Trial Data", dueDate: "Dec 29", priority: "high" },
];

export default function ResearchDashboard() {
  const { loading, authenticated } = useResearchAuth();
  const { isFirebaseAvailable } = useFirebase();
  const [searchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const isDemoMode = searchParams.get("demo") === "true";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "on-track": return "bg-blue-100 text-blue-800";
      case "at-risk": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sciscribe-light">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-sciscribe-gold h-4 w-4"></div>
          <div className="rounded-full bg-sciscribe-blue h-4 w-4"></div>
          <div className="rounded-full bg-sciscribe-navy h-4 w-4"></div>
        </div>
      </div>
    );
  }

  if (!isFirebaseAvailable && !isDemoMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sciscribe-light">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-sciscribe-navy">Configuration Required</CardTitle>
            <CardDescription>
              Please configure Firebase or use demo mode to access the research portal.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isFirebaseAvailable && !authenticated && !isDemoMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sciscribe-light">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-sciscribe-navy">Authentication Required</CardTitle>
            <CardDescription>
              Please log in to access the research collaboration platform.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <ResearchLayout activeView="home">
      <div className="p-6 space-y-6">
        {isDemoMode && (
          <div className="bg-sciscribe-gold/10 border border-sciscribe-gold/20 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-sciscribe-gold" />
              <span className="font-medium text-sciscribe-navy">Demo Mode</span>
            </div>
            <p className="text-sm text-sciscribe-navy/70 mt-1">
              You're viewing a demonstration of the research collaboration platform. Some features may be limited.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-sciscribe-navy">Research Dashboard</h1>
            <p className="text-sciscribe-slate mt-1">Welcome back! Here's what's happening with your research projects.</p>
          </div>
          <Button className="bg-sciscribe-navy hover:bg-sciscribe-blue text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-sciscribe-navy to-sciscribe-blue text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Active Projects</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-sciscribe-gold to-sciscribe-amber text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Completed Tasks</p>
                  <p className="text-3xl font-bold">247</p>
                </div>
                <CheckCircle className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-sciscribe-purple to-sciscribe-pink text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Team Members</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-sciscribe-emerald to-sciscribe-teal text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Deadlines This Week</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <Clock className="w-8 h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sciscribe-navy">Recent Projects</CardTitle>
                <CardDescription>Your active research collaborations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedProject === project.id 
                        ? "border-sciscribe-gold bg-sciscribe-gold/5" 
                        : "border-sciscribe-mist hover:border-sciscribe-gold/50"
                    }`}
                    onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sciscribe-navy">{project.name}</h3>
                        <p className="text-sm text-sciscribe-slate mt-1">{project.description}</p>
                        
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center space-x-2">
                            <Progress value={project.progress} className="w-20" />
                            <span className="text-sm text-sciscribe-slate">{project.progress}%</span>
                          </div>
                          
                          <Badge className={getStatusColor(project.status)}>
                            {project.status.replace("-", " ")}
                          </Badge>
                          
                          <div className="flex items-center text-sm text-sciscribe-slate">
                            <Calendar className="w-4 h-4 mr-1" />
                            {project.dueDate}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex -space-x-2">
                            {project.team.slice(0, 3).map((member, index) => (
                              <Avatar key={index} className="w-6 h-6 border-2 border-white">
                                <AvatarFallback className="bg-sciscribe-gold text-xs text-sciscribe-navy">
                                  {member.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {project.team.length > 3 && (
                              <div className="w-6 h-6 rounded-full bg-sciscribe-mist border-2 border-white flex items-center justify-center">
                                <span className="text-xs text-sciscribe-slate">+{project.team.length - 3}</span>
                              </div>
                            )}
                          </div>
                          
                          <span className="text-sm text-sciscribe-slate">
                            {project.tasks.completed}/{project.tasks.total} tasks
                          </span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon" className="ml-2">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-sciscribe-navy">Upcoming Tasks</CardTitle>
                <CardDescription>Your next priorities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-3 rounded-lg border border-sciscribe-mist hover:border-sciscribe-gold/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sciscribe-navy text-sm">{task.title}</h4>
                        <p className="text-xs text-sciscribe-slate mt-1">{task.project}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-sciscribe-slate">{task.dueDate}</span>
                        </div>
                      </div>
                      {task.priority === "high" && (
                        <AlertCircle className="w-4 h-4 text-red-500 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ResearchLayout>
  );
}
