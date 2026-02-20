import { useState, ChangeEvent, useMemo } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Plus, Search, Filter, Flag, List, Kanban, CheckSquare, Pencil
} from "lucide-react";

import { Task, Subtask, CustomField } from '@/types/task';
import TaskItem from "@/components/research/tasks/TaskItem";
import TaskCard from "@/components/research/tasks/TaskCard";
import TaskForm, { TaskFormData } from "@/components/research/tasks/TaskForm"; // Import TaskForm and its data type

// initialSampleTasks, Subtask, CustomField definitions moved or types imported

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
    progress: 10,
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
const taskPriorities = ["All", "High", "Medium", "Low"];

export default function TasksPage() {
  const [tasksData, setTasksData] = useState<Task[]>(initialSampleTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const taskStatusesForForm = useMemo(() => taskStatuses.filter(s => s !== "All"), []);
  const taskPrioritiesForForm = useMemo(() => taskPriorities.filter(p => p !== "All"), []);

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
              progress: task.subtasks.length > 0 
                        ? Math.round(
                            (task.subtasks.filter(st => st.id === subtaskId ? completed : st.completed).length / task.subtasks.length) * 100
                          ) 
                        : task.progress,
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
              status: currentStatus === "Completed" ? (task.subtasks.some(st => !st.completed) ? "In Progress" : "To Do") : "Completed",
              progress: currentStatus === "Completed" ? (task.subtasks.length > 0 ? Math.round((task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100) : 0) : 100,
            }
          : task
      )
    );
  };

  const openCreateTaskModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const calculateProgressFromSubtasks = (subtasks: Subtask[]): number => {
    if (!subtasks || subtasks.length === 0) return 0;
    const completedCount = subtasks.filter(st => st.completed).length;
    return Math.round((completedCount / subtasks.length) * 100);
  };

  const handleSaveTask = (data: TaskFormData) => {
    const assigneeAvatar = data.assigneeName.substring(0, 2).toUpperCase();
    const taskTags = data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    const formSubtasks = data.subtasks?.map(st => ({
        id: st.id || crypto.randomUUID(),
        title: st.title,
        completed: st.completed,
    })) || [];
    const progress = calculateProgressFromSubtasks(formSubtasks);

    if (editingTask) {
      // Update existing task
      const updatedTask: Task = {
        ...editingTask,
        title: data.title,
        description: data.description || '',
        status: data.status,
        priority: data.priority,
        project: data.project || '',
        assignee: { name: data.assigneeName, avatar: assigneeAvatar },
        dueDate: data.dueDate || '',
        tags: taskTags,
        subtasks: formSubtasks,
        progress: data.status === "Completed" ? 100 : progress,
        createdAt: editingTask.createdAt,
        comments: editingTask.comments,
        attachments: editingTask.attachments,
        id: editingTask.id,
        customFields: editingTask.customFields ?? [],
      };
      setTasksData(prevTasks => prevTasks.map(t => t.id === editingTask.id ? updatedTask : t));
    } else {
      // Create new task -- provide ALL required Task fields
      const now = new Date().toISOString().split('T')[0];
      const newTask: Task = {
        id: Date.now(),
        title: data.title,
        description: data.description || '',
        status: data.status,
        priority: data.priority,
        project: data.project || '',
        assignee: { name: data.assigneeName, avatar: assigneeAvatar },
        dueDate: data.dueDate || now,
        tags: taskTags,
        subtasks: formSubtasks,
        progress: data.status === "Completed" ? 100 : progress,
        createdAt: now,
        comments: 0,
        attachments: 0,
        customFields: [],
      };
      setTasksData(prevTasks => [newTask, ...prevTasks]);
    }
    closeTaskModal();
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
          <Button className="bg-sciscribe-navy hover:bg-sciscribe-blue text-white" onClick={openCreateTaskModal}>
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
                className="pl-10 w-72"
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
                {taskPriorities.map((priority) => (
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
                <CardContent className="p-0">
                  <TaskItem
                    task={task}
                    isExpanded={expandedTasks.has(task.id)}
                    onToggleExpansion={toggleTaskExpansion}
                    onTaskCompletionToggle={handleTaskCompletionToggle}
                    onSubtaskChange={handleSubtaskChange}
                    getStatusColor={getStatusColor}
                    getPriorityIcon={getPriorityIcon}
                    onEditTask={openEditTaskModal} // Pass edit handler
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(tasksByStatus).map(([status, tasksInStatus]) => (
              <div key={status} className="bg-sciscribe-mist/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sciscribe-navy">{status}</h3>
                  <Badge variant="secondary">{tasksInStatus.length}</Badge>
                </div>
                <div className="space-y-3 min-h-[100px]">
                  {tasksInStatus.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      getStatusColor={getStatusColor}
                      getPriorityIcon={getPriorityIcon}
                      onEditTask={openEditTaskModal} // Pass edit handler
                    />
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

      {/* Task Form Dialog */}
      <Dialog open={isTaskModalOpen} onOpenChange={(isOpen) => { if (!isOpen) closeTaskModal(); else setIsTaskModalOpen(true); }}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
            <DialogDescription>
              {editingTask ? 'Update the details of your task.' : 'Fill in the details for your new task.'}
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            onSubmit={handleSaveTask}
            onCancel={closeTaskModal}
            initialData={editingTask || undefined}
            taskStatuses={taskStatusesForForm}
            taskPriorities={taskPrioritiesForForm}
          />
        </DialogContent>
      </Dialog>
    </ResearchLayout>
  );
}
