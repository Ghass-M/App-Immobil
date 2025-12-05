import axios, { AxiosError } from 'axios';
import type { Property, CreatePropertyDTO, UpdatePropertyDTO, PropertyFilters, ApiResponse } from '../types/property.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * API Error with standardized structure
 */
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  data?: unknown;
}

/**
 * Helper to create standardized error responses
 */
const createApiError = (statusCode: number, message: string, data?: unknown): ApiErrorResponse => ({
  statusCode,
  message,
  data,
});

/**
 * Extracts and standardizes error information from axios errors
 */
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: string; message?: string }>;
    const statusCode = axiosError.response?.status || 500;
    const errorMessage =
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Une erreur est survenue';

    const apiError = createApiError(statusCode, errorMessage, axiosError.response?.data);
    const err = new Error(errorMessage);
    Object.assign(err, apiError);
    throw err;
  }

  const apiError = createApiError(500, 'Une erreur inattendue est survenue', error);
  const err = new Error('Une erreur inattendue est survenue');
  Object.assign(err, apiError);
  throw err;
};

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

/**
 * Response interceptor to handle errors globally
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => handleApiError(error)
);

export const propertyService = {
  async getAll(filters?: PropertyFilters, page = 1, limit = 10) {
    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    if (filters?.city) params.append('city', filters.city);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.type) params.append('type', filters.type);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.minRooms) params.append('minRooms', filters.minRooms.toString());
    if (filters?.minSurface) params.append('minSurface', filters.minSurface.toString());

    const response = await apiClient.get<ApiResponse<Property[]>>(`/properties?${params}`);
    return response.data;
  },

  async getById(id: number) {
    const response = await apiClient.get<ApiResponse<Property>>(`/properties/${id}`);
    return response.data;
  },

  async create(data: CreatePropertyDTO) {
    const response = await apiClient.post<ApiResponse<Property>>('/properties', data);
    return response.data;
  },

  async update(id: number, data: UpdatePropertyDTO) {
    const response = await apiClient.put<ApiResponse<Property>>(`/properties/${id}`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await apiClient.delete<ApiResponse<void>>(`/properties/${id}`);
    return response.data;
  },
};
