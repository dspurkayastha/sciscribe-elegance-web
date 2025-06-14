
import React from 'react';
import { Tag } from 'lucide-react';
import { CustomField } from '@/types/task';

interface CustomFieldListProps {
  customFields: CustomField[];
}

const CustomFieldList: React.FC<CustomFieldListProps> = ({ customFields }) => {
  if (!customFields || customFields.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-sciscribe-navy">Custom Fields:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 ml-4">
        {customFields.map((field) => (
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
  );
};

export default CustomFieldList;
