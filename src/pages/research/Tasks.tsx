import { useState, ChangeEvent } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import { Card, CardContent } from "@/components/ui/card";
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
  ChevronDown, ChevronRight, List, Kanban, Edit3, Tag
} from "lucide-react";

// Define types for Subtask and CustomField
interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface CustomField {
  id: string;
  name: string;
  value: string | number | boolean;
  type: 'text' | 'select' | 'number' | 'boolean' | 'date';
  options?: string[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  project: string;
  assignee: { name: string; avatar: string };
  dueDate: string;
  progress: number;
  subtasks: Subtask[];
  tags: string[];
  createdAt: string;
  comments: number;
  attachments: number;
  customFields?: CustomField[];
}

const initialSampleTasks: Task[] = [
  {
    id: 1,
    title: "Review protein folding algorithm",
    description: "Analyze the latest deep learning model performance metrics",
    status: "In Progress",
    priority: "High",
    project: "Protein Folding Analysis",
    assignee: { name: "Dr. Smith", avatar: "DS" },
    dueDate: "2024-07-10",
    progress: 75,
    subtasks: [
      { id: "sub1-1", title: "Collect performance data", completed: true },
      { id: "sub1-2", title: "Run benchmark tests", completed: true },
      { id: "sub1-3", title: "Document findings", completed: false }
    ],
    tags: ["Research", "AI", "Deep Learning"],
    createdAt: "2024-07-05",
    comments: 3,
    attachments: 2,
    customFields: [
      { id: "cf1", name: "Review Cycle", value: "2nd", type: "number" },
      { id: "cf2", name: "Hypothesis Validated", value: false, type: "boolean" }
    ]
  },
  {
    id: 2,
    title: "Prepare clinical trial report",
    description: "Compile statistical analysis for Phase III trial results",
    status: "To Do",
    priority: "Medium",
    project: "Clinical Trial Data Management",
    assignee: { name: "Dr. Brown", avatar: "DB" },
    dueDate: "2024-07-15",
    progress: 10, // Updated progress
    subtasks: [
      { id: "sub2-1", title: "Gather trial data (Source A)", completed: true },
      { id: "sub2-2", title: "Gather trial data (Source B)", completed: false },
      { id: "sub2-3", title: "Perform statistical analysis", completed: false },
      { id: "sub2-4", title: "Write executive summary", completed: false }
    ],
    tags: ["Clinical", "Statistics", "Reporting"],
    createdAt: "2024-07-03",
    comments: 1,
    attachments: 5,
    customFields: [
      { id: "cf3", name: "Data Source", value: "Internal DB", type: "text" },
      { id: "cf4", name: "Urgency", value: "Medium", type: "select", options: ["Low", "Medium", "High"] }
    ]
  },
  {
    id: 3,
    title: "Validate gene expression markers",
    description: "Cross-reference biomarkers with existing literature and databases",
    status: "Completed",
    priority: "High",
    project: "Gene Expression Study",
    assignee: { name: "Dr. Garcia", avatar: "DG" },
    dueDate: "2024-06-28",
    progress: 100,
    subtasks: [
      { id: "sub3-1", title: "Literature review", completed: true },
      { id: "sub3-2", title: "Biomarker validation (Database A)", completed: true },
      { id: "sub3-3", title: "Biomarker validation (Database B)", completed: true },
      { id: "sub3-4", title: "Final documentation", completed: true }
    ],
    tags: ["Genomics", "Validation", "Biomarkers"],
    createdAt: "2024-06-20",
    comments: 8,
    attachments: 3,
    customFields: [
      { id: "cf5", name: "Validation Method", value: "Cross-sectional", type: "select", options: ["Cross-sectional", "Longitudinal"] },
      { id: "cf6", name: "Publication Target", value: "Nature Genetics", type: "text" }
    ]
  }
];

const taskStatuses = ["All", "To Do", "In Progress", "In Review", "Completed"];
const taskPriorities = ["All", "High", "Medium", "Low"]; // Added "All"

export default function TasksPage() {
  const [tasksData, setTasksData] = useState<Task[]>(initialSampleTasks);
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

  const handleSubtaskChange = (taskId: number, subtaskId: string, completed: boolean) => {
    setTasksData(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map(subtask =>
                subtask.id === subtaskId ? { ...subtask, completed } : subtask
              ),
            }
          : task
      )
    );
  };
  
  const handleTaskCompletionToggle = (taskId: number, currentStatus: string) => {
    setTasksData(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: currentStatus === "Completed" ? "In Progress" : "Completed", // Basic toggle
              progress: currentStatus === "Completed" ? (task.subtasks.filter(st => st.completed).length / task.subtasks.length * 100 || 0) : 100,
            }
          : task
      )
    );
  };

  const filteredTasks = tasksData.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.customFields && task.customFields.some(cf => String(cf.value).toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesStatus = selectedStatus === "All" || task.status === selectedStatus;
    const matchesPriority = selectedPriority === "All" || task.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const tasksByStatus = taskStatuses.slice(1).reduce((acc, status) => {
    acc[status] = filteredTasks.filter(task => task.status === status);
    return acc;
  }, {} as Record<string, Task[]>);

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
                placeholder="Search tasks, descriptions, custom fields..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 w-72" // Increased width slightly
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
                {taskPriorities.map((priority) => ( // Use updated taskPriorities
                  <SelectItem key={priority} value={priority}>
                    {priority === "All" ? "All Priorities" : priority}
                  </SelectItem>
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
                      onCheckedChange={() => handleTaskCompletionToggle(task.id, task.status)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleTaskExpansion(task.id)}
                            className="p-0 h-6 w-6 hover:bg-gray-200 rounded"
                          >
                            {expandedTasks.has(task.id) ? 
                              <ChevronDown className="w-4 h-4 text-sciscribe-slate" /> : 
                              <ChevronRight className="w-4 h-4 text-sciscribe-slate" />
                            }
                          </Button>
                          
                          <div>
                            <h3 className={`font-medium text-sciscribe-navy ${task.status === "Completed" ? "line-through text-sciscribe-slate" : ""}`}>{task.title}</h3>
                            <p className="text-sm text-sciscribe-slate mt-1 line-clamp-1">{task.description}</p>
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

                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-200 rounded">
                            <MoreHorizontal className="w-4 h-4 text-sciscribe-slate" />
                          </Button>
                        </div>
                      </div>

                      {expandedTasks.has(task.id) && (
                        <div className="mt-4 ml-10 pl-1 border-l-2 border-sciscribe-mist space-y-4 py-2">
                          {/* Progress Bar */}
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-sciscribe-navy">Progress:</span>
                            <div className="flex-1 max-w-xs">
                              <Progress value={task.progress} className="h-2" />
                            </div>
                            <span className="text-sm text-sciscribe-slate">{task.progress}%</span>
                          </div>

                          {/* Subtasks Section */}
                          {task.subtasks && task.subtasks.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-sciscribe-navy">Subtasks:</h4>
                              {task.subtasks.map((subtask) => (
                                <div key={subtask.id} className="flex items-center space-x-2 ml-4">
                                  <Checkbox
                                    id={`subtask-${task.id}-${subtask.id}`}
                                    checked={subtask.completed}
                                    onCheckedChange={(checked) => handleSubtaskChange(task.id, subtask.id, !!checked)}
                                    className="h-4 w-4"
                                  />
                                  <label
                                    htmlFor={`subtask-${task.id}-${subtask.id}`}
                                    className={`text-sm cursor-pointer ${subtask.completed ? 'line-through text-sciscribe-slate' : 'text-sciscribe-navy'}`}
                                  >
                                    {subtask.title}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Custom Fields Section */}
                          {task.customFields && task.customFields.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-sciscribe-navy">Custom Fields:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 ml-4">
                                {task.customFields.map((field) => (
                                  <div key={field.id} className="flex items-center space-x-2 text-sm">
                                    <Tag className="w-3.5 h-3.5 text-sciscribe-blue" />
                                    <span className="font-medium text-sciscribe-slate">{field.name}:</span>
                                    <span className="text-sciscribe-navy">
                                      {field.type === 'boolean' ? (field.value ? 'Yes' : 'No') : String(field.value)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Tags Section */}
                           {task.tags && task.tags.length > 0 && (
                            <div className="space-y-1">
                               <h4 className="text-sm font-medium text-sciscribe-navy">Tags:</h4>
                               <div className="flex flex-wrap gap-1 ml-4">
                                {task.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                                ))}
                            </div>
                            </div>
                           )}


                          {/* Other Details */}
                          <div className="flex items-center space-x-6 text-sm text-sciscribe-slate pt-2">
                            <span>Project: <Badge variant="outline">{task.project}</Badge></span>
                            <span><Clock className="w-3.5 h-3.5 inline mr-1" />Created: {task.createdAt}</span>
                            <span>Comments: {task.comments}</span>
                            <span>Attachments: {task.attachments}</span>
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
          // Kanban Board View (columns by status)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(tasksByStatus).map(([status, tasksInStatus]) => (
              <div key={status} className="bg-sciscribe-mist/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sciscribe-navy">{status}</h3>
                  <Badge variant="secondary">{tasksInStatus.length}</Badge>
                </div>
                
                <div className="space-y-3 min-h-[100px]"> {/* Added min-h for empty columns */}
                  {tasksInStatus.map((task) => (
                    <Card key={task.id} className="p-3 hover:shadow-lg transition-shadow cursor-pointer bg-white">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sciscribe-navy text-sm line-clamp-2">{task.title}</h4>
                          {getPriorityIcon(task.priority)}
                        </div>
                        
                        <p className="text-xs text-sciscribe-slate line-clamp-2">{task.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-sciscribe-slate">
                           <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {task.dueDate}
                          </div>
                           <Badge className={`${getStatusColor(task.status)} text-xs`}> {/* Removed size="sm" here */}
                            {task.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-1">
                             <Avatar className="w-6 h-6 border border-white">
                                <AvatarFallback className="bg-sciscribe-gold text-xs text-sciscribe-navy">
                                {task.assignee.avatar}
                                </AvatarFallback>
                            </Avatar>
                          </div>
                          {task.customFields && task.customFields.slice(0,1).map(cf => (
                            <Badge key={cf.id} variant="outline" className="text-xs truncate max-w-[100px]">
                                {cf.name}: {String(cf.value)}
                            </Badge>
                          ))}
                        </div>

                        {task.progress > 0 && (
                          <div className="space-y-1 pt-1">
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
                   {tasksInStatus.length === 0 && (
                    <div className="text-center text-sm text-sciscribe-slate py-4">
                        No tasks in this status.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-sciscribe-slate mx-auto mb-4" />
            <h3 className="text-lg font-medium text-sciscribe-navy mb-2">No tasks found</h3>
            <p className="text-sciscribe-slate">Try adjusting your search or filter criteria, or create a new task!</p>
          </div>
        )}
      </div>
    </ResearchLayout>
  );
}
