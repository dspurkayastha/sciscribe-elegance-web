
import { useState } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, Search, Filter, Calendar, Clock, Users, 
  CheckSquare, Square, Star, Flag, MoreHorizontal,
  ChevronDown, ChevronRight, List, Kanban
} from "lucide-react";

const taskStatuses = ["All", "To Do", "In Progress", "In Review", "Completed"];
const taskPriorities = ["High", "Medium", "Low"];

const sampleTasks = [
  {
    id: 1,
    title: "Review protein folding algorithm",
    description: "Analyze the latest deep learning model performance metrics",
    status: "In Progress",
    priority: "High",
    project: "Protein Folding Analysis",
    assignee: { name: "Dr. Smith", avatar: "DS" },
    dueDate: "2024-01-10",
    progress: 75,
    subtasks: [
      { id: 11, title: "Collect performance data", completed: true },
      { id: 12, title: "Run benchmark tests", completed: true },
      { id: 13, title: "Document findings", completed: false }
    ],
    tags: ["Research", "AI"],
    createdAt: "2024-01-05",
    comments: 3,
    attachments: 2
  },
  {
    id: 2,
    title: "Prepare clinical trial report",
    description: "Compile statistical analysis for Phase III trial results",
    status: "To Do",
    priority: "Medium",
    project: "Clinical Trial Data Management",
    assignee: { name: "Dr. Brown", avatar: "DB" },
    dueDate: "2024-01-15",
    progress: 0,
    subtasks: [
      { id: 21, title: "Gather trial data", completed: false },
      { id: 22, title: "Perform statistical analysis", completed: false },
      { id: 23, title: "Write executive summary", completed: false }
    ],
    tags: ["Clinical", "Statistics"],
    createdAt: "2024-01-03",
    comments: 1,
    attachments: 5
  },
  {
    id: 3,
    title: "Validate gene expression markers",
    description: "Cross-reference biomarkers with existing literature",
    status: "Completed",
    priority: "High",
    project: "Gene Expression Study",
    assignee: { name: "Dr. Garcia", avatar: "DG" },
    dueDate: "2023-12-28",
    progress: 100,
    subtasks: [
      { id: 31, title: "Literature review", completed: true },
      { id: 32, title: "Biomarker validation", completed: true },
      { id: 33, title: "Final documentation", completed: true }
    ],
    tags: ["Genomics", "Validation"],
    createdAt: "2023-12-20",
    comments: 8,
    attachments: 3
  }
];

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do": return "bg-gray-100 text-gray-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "In Review": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    const color = priority === "High" ? "text-red-500" : 
                 priority === "Medium" ? "text-yellow-500" : "text-green-500";
    return <Flag className={`w-4 h-4 ${color}`} />;
  };

  const toggleTaskExpansion = (taskId: number) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const filteredTasks = sampleTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || task.status === selectedStatus;
    const matchesPriority = selectedPriority === "All" || task.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const tasksByStatus = taskStatuses.slice(1).reduce((acc, status) => {
    acc[status] = filteredTasks.filter(task => task.status === status);
    return acc;
  }, {} as Record<string, typeof sampleTasks>);

  return (
    <ResearchLayout activeView="tasks">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-sciscribe-navy">Tasks</h1>
            <p className="text-sciscribe-slate mt-1">Manage and track your research tasks</p>
          </div>
          <Button className="bg-sciscribe-navy hover:bg-sciscribe-blue text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sciscribe-slate" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {taskStatuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Priorities</SelectItem>
                {taskPriorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
            <div className="flex rounded-lg border">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-sciscribe-navy" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "board" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("board")}
                className={viewMode === "board" ? "bg-sciscribe-navy" : ""}
              >
                <Kanban className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tasks Content */}
        {viewMode === "list" ? (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Checkbox 
                      checked={task.status === "Completed"}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleTaskExpansion(task.id)}
                            className="p-0 h-6 w-6"
                          >
                            {expandedTasks.has(task.id) ? 
                              <ChevronDown className="w-4 h-4" /> : 
                              <ChevronRight className="w-4 h-4" />
                            }
                          </Button>
                          
                          <div>
                            <h3 className="font-medium text-sciscribe-navy">{task.title}</h3>
                            <p className="text-sm text-sciscribe-slate mt-1">{task.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {getPriorityIcon(task.priority)}
                          
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                          
                          <div className="flex items-center text-sm text-sciscribe-slate">
                            <Calendar className="w-4 h-4 mr-1" />
                            {task.dueDate}
                          </div>
                          
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-sciscribe-gold text-xs text-sciscribe-navy">
                              {task.assignee.avatar}
                            </AvatarFallback>
                          </Avatar>

                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {expandedTasks.has(task.id) && (
                        <div className="mt-4 ml-6 space-y-3">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-sciscribe-navy">Progress:</span>
                            <div className="flex-1 max-w-xs">
                              <Progress value={task.progress} className="h-2" />
                            </div>
                            <span className="text-sm text-sciscribe-slate">{task.progress}%</span>
                          </div>

                          <div className="space-y-2">
                            <span className="text-sm font-medium text-sciscribe-navy">Subtasks:</span>
                            {task.subtasks.map((subtask) => (
                              <div key={subtask.id} className="flex items-center space-x-2 ml-4">
                                <Checkbox checked={subtask.completed} className="h-4 w-4" />
                                <span className={`text-sm ${subtask.completed ? 'line-through text-sciscribe-slate' : 'text-sciscribe-navy'}`}>
                                  {subtask.title}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-sciscribe-slate">
                            <span>Project: {task.project}</span>
                            <span>Comments: {task.comments}</span>
                            <span>Attachments: {task.attachments}</span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
              <div key={status} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sciscribe-navy">{status}</h3>
                  <Badge variant="outline">{tasks.length}</Badge>
                </div>
                
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <Card key={task.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sciscribe-navy text-sm">{task.title}</h4>
                          {getPriorityIcon(task.priority)}
                        </div>
                        
                        <p className="text-xs text-sciscribe-slate line-clamp-2">{task.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-sciscribe-slate">
                            <Calendar className="w-3 h-3 mr-1" />
                            {task.dueDate}
                          </div>
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-sciscribe-gold text-xs text-sciscribe-navy">
                              {task.assignee.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {task.progress > 0 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-sciscribe-slate">Progress</span>
                              <span className="text-sciscribe-navy">{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-1" />
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-sciscribe-slate mx-auto mb-4" />
            <h3 className="text-lg font-medium text-sciscribe-navy mb-2">No tasks found</h3>
            <p className="text-sciscribe-slate">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </ResearchLayout>
  );
}
