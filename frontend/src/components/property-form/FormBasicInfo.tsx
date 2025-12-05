import React from 'react';
import type { CreatePropertyDTO } from '../../types/property.types';
import { FIELD_LABELS, PLACEHOLDERS } from '../../constants';

interface Props {
  formData: CreatePropertyDTO;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function FormBasicInfo({ formData, errors, onChange }: Props) {
  return (
    <>
      {/* Titre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {FIELD_LABELS.TITLE} *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          className={`input-field ${errors.title ? 'border-red-500' : ''}`}
          placeholder={PLACEHOLDERS.TITLE}
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {FIELD_LABELS.DESCRIPTION} *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={4}
          className={`input-field ${errors.description ? 'border-red-500' : ''}`}
          placeholder={PLACEHOLDERS.DESCRIPTION}
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ville */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {FIELD_LABELS.CITY} *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            className={`input-field ${errors.city ? 'border-red-500' : ''}`}
            placeholder={PLACEHOLDERS.CITY}
          />
          {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {FIELD_LABELS.ADDRESS} *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            className={`input-field ${errors.address ? 'border-red-500' : ''}`}
            placeholder={PLACEHOLDERS.ADDRESS}
          />
          {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
        </div>
      </div>
    </>
  );
}
