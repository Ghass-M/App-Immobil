import { useState } from 'react';
import type { PropertyFilters, PropertyType, PropertyStatus } from '../types/property.types';
import { PROPERTY_TYPE_OPTIONS, PROPERTY_STATUS_OPTIONS } from '../constants';

interface FiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof PropertyFilters, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    setFilters({});
    onFilterChange({});
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary flex items-center gap-2"
      >
        🔍 Filtres
        {Object.keys(filters).length > 0 && (
          <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
            {Object.keys(filters).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="mt-4 card p-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Ville */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <input
                type="text"
                placeholder="Paris, Lyon..."
                value={filters.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Prix min */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix minimum
              </label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) => handleChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="input-field"
              />
            </div>

            {/* Prix max */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix maximum
              </label>
              <input
                type="number"
                placeholder="1000000"
                value={filters.maxPrice || ''}
                onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="input-field"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={filters.type || ''}
                onChange={(e) => handleChange('type', e.target.value as PropertyType)}
                className="input-field"
              >
                <option value="">Tous</option>
                {PROPERTY_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Statut */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleChange('status', e.target.value as PropertyStatus)}
                className="input-field"
              >
                <option value="">Tous</option>
                {PROPERTY_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Pièces min */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pièces minimum
              </label>
              <input
                type="number"
                placeholder="1"
                value={filters.minRooms || ''}
                onChange={(e) => handleChange('minRooms', e.target.value ? Number(e.target.value) : undefined)}
                className="input-field"
              />
            </div>

            {/* Surface min */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surface minimum (m²)
              </label>
              <input
                type="number"
                placeholder="10"
                value={filters.minSurface || ''}
                onChange={(e) => handleChange('minSurface', e.target.value ? Number(e.target.value) : undefined)}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={applyFilters} className="btn-primary">
              Appliquer
            </button>
            <button onClick={resetFilters} className="btn-secondary">
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
}