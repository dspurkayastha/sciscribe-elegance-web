
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, MoreHorizontal, ChevronDown, ChevronRight } from 'lucide-react';
import { Task } from '@/types/task';
import TaskDetailView from './TaskDetailView';

interface TaskItemProps {
  task: Task;
  isExpanded: boolean;
  onToggleExpansion: (taskId: number) => void;
  onTaskCompletionToggle: (taskId: number, currentStatus: string) => void;
  onSubtaskChange: (taskId: number, subtaskId: string, completed: boolean) => void;
  getStatusColor: (status: string) => string;
  getPriorityIcon: (priority: string) => JSX.Element;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isExpanded,
  onToggleExpansion,
  onTaskCompletionToggle,
  onSubtaskChange,
  getStatusColor,
  getPriorityIcon,
}) => {
  return (
    <div className="p-4">
      <div className="flex items-start space-x-4">
        <Checkbox
          checked={task.status === "Completed"}
          onCheckedChange={() => onTaskCompletionToggle(task.id, task.status)}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleExpansion(task.id)}
                className="p-0 h-6 w-6 hover:bg-gray-200 rounded"
              >
                {isExpanded ? 
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
          {isExpanded && <TaskDetailView task={task} onSubtaskChange={onSubtaskChange} />}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
