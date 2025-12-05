export interface Property {
  id: number;
  title: string;
  description: string;
  city: string;
  address: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  type: PropertyType;
  status: PropertyStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type PropertyType = 'appartement' | 'maison' | 'studio' | 'loft' | 'villa';
export type PropertyStatus = 'disponible' | 'vendu' | 'loue' | 'reserve';

export interface CreatePropertyDTO {
  title: string;
  description: string;
  city: string;
  address: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  type: PropertyType;
  status: PropertyStatus;
  imageUrl?: string;
}

export interface UpdatePropertyDTO extends Partial<CreatePropertyDTO> {}

export interface PropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: PropertyType;
  status?: PropertyStatus;
  minRooms?: number;
  minSurface?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}