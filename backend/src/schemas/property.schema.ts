import { z } from 'zod';

export const propertyTypeSchema = z.enum(['appartement', 'maison', 'studio', 'loft', 'villa']);
export const propertyStatusSchema = z.enum(['disponible', 'vendu', 'loue', 'reserve']);

export const createPropertySchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(200),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères').max(2000),
  city: z.string().min(2, 'La ville doit contenir au moins 2 caractères').max(100),
  address: z.string().min(5, 'L\'adresse doit contenir au moins 5 caractères').max(255),
  price: z.number().positive('Le prix doit être positif').min(1000, 'Prix minimum : 1000€'),
  surface: z.number().positive('La surface doit être positive').min(10, 'Surface minimum : 10m²'),
  rooms: z.number().int().positive().min(1, 'Au moins 1 pièce'),
  bedrooms: z.number().int().nonnegative().min(0),
  bathrooms: z.number().int().positive().min(1, 'Au moins 1 salle de bain'),
  type: propertyTypeSchema,
  status: propertyStatusSchema,
  imageUrl: z.string().url('URL invalide').optional(),
});

export const updatePropertySchema = createPropertySchema.partial();

export const propertyIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID invalide').transform(Number),
});

export const propertyFiltersSchema = z.object({
  city: z.string().optional(),
  minPrice: z.string().regex(/^\d+$/).transform(Number).optional(),
  maxPrice: z.string().regex(/^\d+$/).transform(Number).optional(),
  type: propertyTypeSchema.optional(),
  status: propertyStatusSchema.optional(),
  minRooms: z.string().regex(/^\d+$/).transform(Number).optional(),
  minSurface: z.string().regex(/^\d+$/).transform(Number).optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});

export type CreatePropertySchema = z.infer<typeof createPropertySchema>;
export type UpdatePropertySchema = z.infer<typeof updatePropertySchema>;
export type PropertyIdSchema = z.infer<typeof propertyIdSchema>;
export type PropertyFiltersSchema = z.infer<typeof propertyFiltersSchema>;