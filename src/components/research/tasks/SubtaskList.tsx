
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Subtask } from '@/types/task';

interface SubtaskListProps {
  taskId: number;
  subtasks: Subtask[];
  onSubtaskChange: (taskId: number, subtaskId: string, completed: boolean) => void;
}

const SubtaskList: React.FC<SubtaskListProps> = ({ taskId, subtasks, onSubtaskChange }) => {
  if (!subtasks || subtasks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-sciscribe-navy">Subtasks:</h4>
      {subtasks.map((subtask) => (
        <div key={subtask.id} className="flex items-center space-x-2 ml-4">
          <Checkbox
            id={`subtask-${taskId}-${subtask.id}`}
            checked={subtask.completed}
            onCheckedChange={(checked) => onSubtaskChange(taskId, subtask.id, !!checked)}
            className="h-4 w-4"
          />
          <label
            htmlFor={`subtask-${taskId}-${subtask.id}`}
            className={`text-sm cursor-pointer ${subtask.completed ? 'line-through text-sciscribe-slate' : 'text-sciscribe-navy'}`}
          >
            {subtask.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SubtaskList;
