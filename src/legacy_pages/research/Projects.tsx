
import { useState } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Search, Filter, Grid3X3, List, Calendar, 
  MoreHorizontal, Star, Users, Clock, CheckCircle,
  AlertCircle, TrendingUp, FolderOpen, Archive
} from "lucide-react";

const projectStatuses = ["All", "Active", "On Hold", "Completed", "Archived"];
const projectPriorities = ["High", "Medium", "Low"];

const sampleProjects = [
  {
    id: 1,
    name: "Protein Folding Analysis",
    description: "Deep learning models for protein structure prediction using advanced neural networks",
    status: "Active",
    priority: "High",
    progress: 75,
    dueDate: "2024-01-15",
    team: [
      { id: 1, name: "Dr. Smith", avatar: "DS", role: "Lead Researcher" },
      { id: 2, name: "Dr. Johnson", avatar: "DJ", role: "Data Scientist" },
      { id: 3, name: "Dr. Wilson", avatar: "DW", role: "ML Engineer" }
    ],
    tasks: { completed: 12, total: 16 },
    budget: "$125,000",
    client: "Stanford University",
    tags: ["AI", "Biology", "Research"],
    lastActivity: "2 hours ago",
    starred: true
  },
  {
    id: 2,
    name: "Clinical Trial Data Management",
    description: "Statistical analysis and management of Phase III clinical trial data",
    status: "Active",
    priority: "Medium",
    progress: 45,
    dueDate: "2024-02-20",
    team: [
      { id: 4, name: "Dr. Brown", avatar: "DB", role: "Statistician" },
      { id: 5, name: "Dr. Davis", avatar: "DD", role: "Clinical Data Manager" }
    ],
    tasks: { completed: 8, total: 18 },
    budget: "$89,000",
    client: "PharmaCorp Inc.",
    tags: ["Clinical", "Statistics", "Healthcare"],
    lastActivity: "1 day ago",
    starred: false
  },
  {
    id: 3,
    name: "Gene Expression Study",
    description: "RNA-seq analysis for cancer biomarker discovery and validation",
    status: "Completed",
    priority: "High",
    progress: 100,
    dueDate: "2023-12-30",
    team: [
      { id: 6, name: "Dr. Miller", avatar: "DM", role: "Genomics Specialist" },
      { id: 7, name: "Dr. Garcia", avatar: "DG", role: "Bioinformatician" },
      { id: 8, name: "Dr. Taylor", avatar: "DT", role: "Research Associate" }
    ],
    tasks: { completed: 22, total: 22 },
    budget: "$156,000",
    client: "Cancer Research Institute",
    tags: ["Genomics", "Cancer", "Biomarkers"],
    lastActivity: "1 week ago",
    starred: true
  }
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Hold": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProjects = sampleProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <ResearchLayout activeView="projects">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-sciscribe-navy">Projects</h1>
            <p className="text-sciscribe-slate mt-1">Manage and track your research projects</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Archive className="w-4 h-4 mr-2" />
              Archived
            </Button>
            <Button className="bg-sciscribe-navy hover:bg-sciscribe-blue text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sciscribe-slate" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              {projectStatuses.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className={selectedStatus === status ? "bg-sciscribe-navy" : ""}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <div className="flex rounded-lg border">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-sciscribe-navy" : ""}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-sciscribe-navy" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-sciscribe-gold/50"
                onClick={() => setSelectedProject(project.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="w-5 h-5 text-sciscribe-navy" />
                      {project.starred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-sciscribe-navy">{project.name}</CardTitle>
                    <CardDescription className="text-sm mt-1 line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sciscribe-slate">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-sciscribe-mist rounded-full h-2">
                      <div 
                        className="bg-sciscribe-gold h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-sciscribe-slate">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {project.dueDate}
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {project.tasks.completed}/{project.tasks.total}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                          <AvatarFallback className="bg-sciscribe-gold text-xs text-sciscribe-navy">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-sciscribe-mist border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-sciscribe-slate">+{project.team.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-sciscribe-navy">{project.budget}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <FolderOpen className="w-5 h-5 text-sciscribe-navy" />
                        {project.starred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-sciscribe-navy">{project.name}</h3>
                        <p className="text-sm text-sciscribe-slate">{project.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-sciscribe-navy">{project.progress}%</div>
                        <div className="text-xs text-sciscribe-slate">Progress</div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm font-medium text-sciscribe-navy">
                          {project.tasks.completed}/{project.tasks.total}
                        </div>
                        <div className="text-xs text-sciscribe-slate">Tasks</div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm font-medium text-sciscribe-navy">{project.dueDate}</div>
                        <div className="text-xs text-sciscribe-slate">Due Date</div>
                      </div>

                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>

                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-sciscribe-slate mx-auto mb-4" />
            <h3 className="text-lg font-medium text-sciscribe-navy mb-2">No projects found</h3>
            <p className="text-sciscribe-slate">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </ResearchLayout>
  );
}
