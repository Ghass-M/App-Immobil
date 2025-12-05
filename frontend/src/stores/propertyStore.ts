import { create } from 'zustand';
import type { Property, PropertyFilters } from '../types/property.types';
import { propertyService } from '../services/api.service';

interface PropertyStore {
  properties: Property[];
  currentProperty: Property | null;
  filters: PropertyFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchProperties: () => Promise<void>;
  fetchPropertyById: (id: number) => Promise<void>;
  setFilters: (filters: PropertyFilters) => void;
  setPage: (page: number) => void;
  clearError: () => void;
}

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: [],
  currentProperty: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,

  fetchProperties: async () => {
    set({ loading: true, error: null });
    try {
      const { filters, pagination } = get();
      const response = await propertyService.getAll(filters, pagination.page, pagination.limit);
      
      set({
        properties: response.data || [],
        pagination: response.pagination || pagination,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors du chargement',
        loading: false,
      });
    }
  },

  fetchPropertyById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await propertyService.getById(id);
      set({
        currentProperty: response.data || null,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Propriété non trouvée',
        loading: false,
      });
    }
  },

  setFilters: (filters: PropertyFilters) => {
    set({ filters, pagination: { ...get().pagination, page: 1 } });
    get().fetchProperties();
  },

  setPage: (page: number) => {
    set({ pagination: { ...get().pagination, page } });
    get().fetchProperties();
  },

  clearError: () => set({ error: null }),
}));