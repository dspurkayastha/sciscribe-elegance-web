
import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Task, Subtask, CustomField } from '@/types/task';
import { Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  priority: z.string().min(1, "Priority is required"),
  project: z.string().optional(),
  assigneeName: z.string().min(1, "Assignee name is required"),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format. Use YYYY-MM-DD.",
  }).optional().or(z.literal('')),
  tags: z.string().optional(),
  subtasks: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(1, "Subtask title cannot be empty"),
      completed: z.boolean(),
    })
  ).optional(),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  initialData?: Task;
  taskStatuses: string[];
  taskPriorities: string[];
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData, taskStatuses, taskPriorities }) => {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      status: initialData?.status || '',
      priority: initialData?.priority || '',
      project: initialData?.project || '',
      assigneeName: initialData?.assignee?.name || '',
      dueDate: initialData?.dueDate || '',
      tags: initialData?.tags?.join(', ') || '',
      subtasks: initialData?.subtasks?.map(st => ({ ...st })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        priority: initialData.priority,
        project: initialData.project,
        assigneeName: initialData.assignee?.name,
        dueDate: initialData.dueDate,
        tags: initialData.tags?.join(', ') || '',
        subtasks: initialData.subtasks?.map(st => ({ ...st })) || [],
      });
    } else {
       form.reset({ // Default for new task
        title: '',
        description: '',
        status: taskStatuses[0] || '',
        priority: taskPriorities[0] || '',
        project: '',
        assigneeName: '',
        dueDate: '',
        tags: '',
        subtasks: [],
       });
    }
  }, [initialData, form, taskStatuses, taskPriorities]);

  const handleSubmit = (data: TaskFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {taskStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {taskPriorities.map(priority => (
                      <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="assigneeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignee Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter assignee name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., research, AI, urgent" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Subtasks</FormLabel>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2 mt-2">
              <Controller
                name={`subtasks.${index}.completed`}
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Controller
                name={`subtasks.${index}.title`}
                control={form.control}
                render={({ field }) => (
                  <Input placeholder="Subtask title" {...field} className="flex-grow" />
                )}
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ title: '', completed: false, id: crypto.randomUUID() })}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Subtask
          </Button>
        </div>
        
        {initialData?.customFields && initialData.customFields.length > 0 && (
            <div>
                <FormLabel className="text-sm font-medium text-sciscribe-navy mb-1 block">Custom Fields (Read-only)</FormLabel>
                <div className="space-y-1 text-sm p-2 border rounded-md bg-gray-50">
                    {initialData.customFields.map(cf => (
                        <div key={cf.id}>
                            <span className="font-medium">{cf.name}: </span>
                            <span>{cf.type === 'boolean' ? (cf.value ? 'Yes' : 'No') : String(cf.value)}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-sciscribe-blue hover:bg-sciscribe-blue/90 text-white">
            {initialData ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;

