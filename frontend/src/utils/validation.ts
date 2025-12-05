/**
 * Centralized validation utilities for property forms
 */

import { VALIDATION_RULES } from '../constants';
import type { CreatePropertyDTO } from '../types/property.types';

/**
 * Validation result object
 */
export interface ValidationErrors {
  [key: string]: string;
}

/**
 * Validates a title field
 */
export const validateTitle = (title: string): string | null => {
  if (!title || title.length < VALIDATION_RULES.title.minLength) {
    return VALIDATION_RULES.title.errorMessage;
  }
  return null;
};

/**
 * Validates a description field
 */
export const validateDescription = (description: string): string | null => {
  if (!description || description.length < VALIDATION_RULES.description.minLength) {
    return VALIDATION_RULES.description.errorMessage;
  }
  return null;
};

/**
 * Validates a city field
 */
export const validateCity = (city: string): string | null => {
  if (!city || city.length < VALIDATION_RULES.city.minLength) {
    return VALIDATION_RULES.city.errorMessage;
  }
  return null;
};

/**
 * Validates an address field
 */
export const validateAddress = (address: string): string | null => {
  if (!address || address.length < VALIDATION_RULES.address.minLength) {
    return VALIDATION_RULES.address.errorMessage;
  }
  return null;
};

/**
 * Validates a price field
 */
export const validatePrice = (price: number): string | null => {
  if (price < VALIDATION_RULES.price.minValue) {
    return VALIDATION_RULES.price.errorMessage;
  }
  return null;
};

/**
 * Validates a surface field
 */
export const validateSurface = (surface: number): string | null => {
  if (surface < VALIDATION_RULES.surface.minValue) {
    return VALIDATION_RULES.surface.errorMessage;
  }
  return null;
};

/**
 * Validates that bedrooms don't exceed rooms
 */
export const validateBedrooms = (bedrooms: number, rooms: number): string | null => {
  if (bedrooms > rooms) {
    return VALIDATION_RULES.bedrooms.errorMessage;
  }
  return null;
};

/**
 * Validates an image URL (optional field - only validate if provided)
 */
export const validateImageUrl = (imageUrl: string | undefined): string | null => {
  if (!imageUrl || imageUrl.trim() === '') {
    // URL is optional, so empty is valid
    return null;
  }

  try {
    new URL(imageUrl);
    return null;
  } catch {
    return VALIDATION_RULES.imageUrl.errorMessage;
  }
};

/**
 * Validates the entire form data and returns an object with all errors
 */
export const validatePropertyForm = (formData: CreatePropertyDTO): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate required fields
  const titleError = validateTitle(formData.title);
  if (titleError) errors.title = titleError;

  const descriptionError = validateDescription(formData.description);
  if (descriptionError) errors.description = descriptionError;

  const cityError = validateCity(formData.city);
  if (cityError) errors.city = cityError;

  const addressError = validateAddress(formData.address);
  if (addressError) errors.address = addressError;

  const priceError = validatePrice(formData.price);
  if (priceError) errors.price = priceError;

  const surfaceError = validateSurface(formData.surface);
  if (surfaceError) errors.surface = surfaceError;

  const bedroomsError = validateBedrooms(formData.bedrooms, formData.rooms);
  if (bedroomsError) errors.bedrooms = bedroomsError;

  const imageUrlError = validateImageUrl(formData.imageUrl);
  if (imageUrlError) errors.imageUrl = imageUrlError;

  return errors;
};

/**
 * Checks if there are any validation errors
 */
export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
