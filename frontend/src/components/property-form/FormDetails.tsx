import React from 'react';
import type { CreatePropertyDTO } from '../../types/property.types';
import { FIELD_LABELS, PROPERTY_TYPE_OPTIONS, PROPERTY_STATUS_OPTIONS } from '../../constants';

interface Props {
  formData: CreatePropertyDTO;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function FormDetails({ formData, errors, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Prix */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{FIELD_LABELS.PRICE} *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={onChange}
          className={`input-field ${errors.price ? 'border-red-500' : ''}`}
          min="1000"
        />
        {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
      </div>

      {/* Surface */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{FIELD_LABELS.SURFACE} *</label>
        <input
          type="number"
          name="surface"
          value={formData.surface}
          onChange={onChange}
          className={`input-field ${errors.surface ? 'border-red-500' : ''}`}
          min="10"
        />
        {errors.surface && <p className="text-red-600 text-sm mt-1">{errors.surface}</p>}
      </div>

      {/* Pièces */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{FIELD_LABELS.ROOMS} *</label>
        <input type="number" name="rooms" value={formData.rooms} onChange={onChange} className="input-field" min="1" />
      </div>

      {/* Chambres */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{FIELD_LABELS.BEDROOMS} *</label>
        <input
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={onChange}
          className={`input-field ${errors.bedrooms ? 'border-red-500' : ''}`}
          min="0"
        />
        {errors.bedrooms && <p className="text-red-600 text-sm mt-1">{errors.bedrooms}</p>}
      </div>

      {/* Salles de bain */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{FIELD_LABELS.BATHROOMS} *</label>
        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={onChange} className="input-field" min="1" />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{FIELD_LABELS.TYPE} *</label>
        <select name="type" value={formData.type} onChange={onChange} className="input-field">
          {PROPERTY_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Statut */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{FIELD_LABELS.STATUS} *</label>
        <select name="status" value={formData.status} onChange={onChange} className="input-field">
          {PROPERTY_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
