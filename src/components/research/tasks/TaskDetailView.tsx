import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Task, Subtask } from '@/types/task'; // CustomField is implicitly used via CustomFieldList
import SubtaskList from './SubtaskList';
import CustomFieldList from './CustomFieldList';

interface TaskDetailViewProps {
  task: Task;
  onSubtaskChange: (taskId: number, subtaskId: string, completed: boolean) => void;
}

const TaskDetailView: React.FC<TaskDetailViewProps> = ({ task, onSubtaskChange }) => {
  return (
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
      <SubtaskList taskId={task.id} subtasks={task.subtasks} onSubtaskChange={onSubtaskChange} />

      {/* Custom Fields Section */}
      {task.customFields && <CustomFieldList customFields={task.customFields} />}
      
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
  );
};

export default TaskDetailView;
