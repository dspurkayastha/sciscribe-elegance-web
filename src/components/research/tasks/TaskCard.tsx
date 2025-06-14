
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Calendar, Pencil } from 'lucide-react'; // Added Pencil
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button'; // Added Button

interface TaskCardProps {
  task: Task;
  getStatusColor: (status: string) => string;
  getPriorityIcon: (priority: string) => JSX.Element;
  onEditTask: (task: Task) => void; // New prop
}

const TaskCard: React.FC<TaskCardProps> = ({ task, getStatusColor, getPriorityIcon, onEditTask }) => {
  return (
    <Card className="p-3 hover:shadow-lg transition-shadow bg-white relative group">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-1 right-1 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click if any
          onEditTask(task);
        }}
      >
        <Pencil className="w-3.5 h-3.5 text-sciscribe-slate" />
      </Button>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sciscribe-navy text-sm line-clamp-2 mr-8">{task.title}</h4>
          {getPriorityIcon(task.priority)}
        </div>
        <p className="text-xs text-sciscribe-slate line-clamp-2">{task.description}</p>
        <div className="flex items-center justify-between text-xs text-sciscribe-slate">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {task.dueDate}
          </div>
          <Badge className={`${getStatusColor(task.status)} text-xs`}>
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
  );
};

export default TaskCard;

