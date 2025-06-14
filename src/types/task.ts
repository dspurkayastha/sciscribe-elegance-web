
// Define types for Subtask and CustomField
export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface CustomField {
  id: string;
  name: string;
  value: string | number | boolean;
  type: 'text' | 'select' | 'number' | 'boolean' | 'date';
  options?: string[];
}

export interface Task {
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
