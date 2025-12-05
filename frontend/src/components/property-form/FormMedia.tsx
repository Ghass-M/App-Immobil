import React from 'react';
import type { CreatePropertyDTO } from '../../types/property.types';
import { FIELD_LABELS, PLACEHOLDERS } from '../../constants';

interface Props {
  formData: CreatePropertyDTO;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function FormMedia({ formData, errors, onChange }: Props) {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">{FIELD_LABELS.IMAGE_URL}</label>
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={onChange}
        className={`input-field ${errors.imageUrl ? 'border-red-500' : ''}`}
        placeholder={PLACEHOLDERS.IMAGE_URL}
      />
      {errors.imageUrl && <p className="text-red-600 text-sm mt-1">{errors.imageUrl}</p>}
    </div>
  );
}
