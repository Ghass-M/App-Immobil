/**
 * Centralized constants for the property management application
 */

// Property type labels with icons
export const PROPERTY_TYPE_LABELS = {
  appartement: '🏢 Appartement',
  maison: '🏠 Maison',
  studio: '🏢 Studio',
  loft: '🏭 Loft',
  villa: '🏰 Villa',
} as const;

// Property type options for forms (label, value pairs)
export const PROPERTY_TYPE_OPTIONS = [
  { value: 'appartement', label: 'Appartement' },
  { value: 'maison', label: 'Maison' },
  { value: 'studio', label: 'Studio' },
  { value: 'loft', label: 'Loft' },
  { value: 'villa', label: 'Villa' },
] as const;

// Property status labels (human-readable names)
export const PROPERTY_STATUS_LABELS = {
  disponible: 'Disponible',
  vendu: 'Vendu',
  loue: 'Loué',
  reserve: 'Réservé',
} as const;

// Property status colors for UI badges
export const PROPERTY_STATUS_COLORS = {
  disponible: 'bg-green-100 text-green-800',
  vendu: 'bg-red-100 text-red-800',
  loue: 'bg-blue-100 text-blue-800',
  reserve: 'bg-yellow-100 text-yellow-800',
} as const;

// Property status options for forms
export const PROPERTY_STATUS_OPTIONS = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'vendu', label: 'Vendu' },
  { value: 'loue', label: 'Loué' },
  { value: 'reserve', label: 'Réservé' },
] as const;

// Form validation rules
export const VALIDATION_RULES = {
  title: {
    minLength: 3,
    errorMessage: 'Le titre doit contenir au moins 3 caractères',
  },
  description: {
    minLength: 10,
    errorMessage: 'La description doit contenir au moins 10 caractères',
  },
  city: {
    minLength: 2,
    errorMessage: 'Ville invalide',
  },
  address: {
    minLength: 5,
    errorMessage: 'Adresse invalide',
  },
  price: {
    minValue: 1000,
    errorMessage: 'Prix minimum : 1000€',
  },
  surface: {
    minValue: 10,
    errorMessage: 'Surface minimum : 10m²',
  },
  imageUrl: {
    errorMessage: 'URL invalide',
  },
  bedrooms: {
    errorMessage: 'Le nombre de chambres ne peut pas dépasser le nombre de pièces',
  },
} as const;

// Pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 9,
  MAX_VISIBLE_PAGES: 7,
} as const;

// API settings
export const API_CONFIG = {
  DEFAULT_LIMIT: 10,
  TIMEOUT_MS: 30000,
} as const;

// Empty state message
export const EMPTY_STATE = {
  NO_PROPERTIES_ICON: '🏠',
  NO_PROPERTIES_TITLE: 'Aucune propriété trouvée',
  NO_PROPERTIES_DESCRIPTION: 'Essayez de modifier vos filtres ou ajoutez une nouvelle propriété',
} as const;

// Loading state messages
export const LOADING_MESSAGES = {
  LOADING: 'Chargement...',
  SAVING: 'Enregistrement...',
} as const;

// Button labels
export const BUTTON_LABELS = {
  ADD_PROPERTY: 'Ajouter un bien',
  BACK: 'Retour',
  CANCEL: 'Annuler',
  PREVIOUS: '← Précédent',
  NEXT: 'Suivant →',
  CREATE: 'Créer',
  UPDATE: 'Mettre à jour',
  FILTERS: '🔍 Filtres',
  APPLY_FILTERS: 'Appliquer',
  RESET_FILTERS: 'Réinitialiser',
  DELETE: 'Supprimer',
  EDIT: 'Modifier',
} as const;

// Filter labels
export const FILTER_LABELS = {
  CITY: 'Ville',
  MIN_PRICE: 'Prix minimum',
  MAX_PRICE: 'Prix maximum',
  TYPE: 'Type',
  STATUS: 'Statut',
  MIN_ROOMS: 'Nombre minimum de pièces',
  MIN_SURFACE: 'Surface minimum (m²)',
} as const;

// Field labels for forms
export const FIELD_LABELS = {
  TITLE: 'Titre',
  DESCRIPTION: 'Description',
  CITY: 'Ville',
  ADDRESS: 'Adresse',
  PRICE: 'Prix (€)',
  SURFACE: 'Surface (m²)',
  ROOMS: 'Nombre de pièces',
  BEDROOMS: 'Chambres',
  BATHROOMS: 'Salles de bain',
  TYPE: 'Type',
  STATUS: 'Statut',
  IMAGE_URL: 'URL de l\'image (optionnel)',
} as const;

// Placeholder texts
export const PLACEHOLDERS = {
  TITLE: 'Appartement moderne au centre-ville',
  DESCRIPTION: 'Décrivez la propriété...',
  CITY: 'Paris',
  ADDRESS: '10 rue de la Paix',
  IMAGE_URL: 'https://example.com/image.jpg',
  MIN_PRICE: '0',
  MAX_PRICE: '1000000',
} as const;

// Form page titles
export const PAGE_TITLES = {
  PROPERTIES: 'Nos Propriétés',
  NEW_PROPERTY: 'Nouvelle propriété',
  EDIT_PROPERTY: 'Modifier la propriété',
  PROPERTY_DETAIL: 'Détails de la propriété',
} as const;
