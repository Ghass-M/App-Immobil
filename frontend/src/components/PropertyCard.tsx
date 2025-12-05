import type { Property } from '../types/property.types';
import { useNavigate } from 'react-router-dom';
import { PROPERTY_STATUS_COLORS, PROPERTY_TYPE_LABELS } from '../constants';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();

  return (
    <div className="card overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🏡
          </div>
        )}
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${PROPERTY_STATUS_COLORS[property.status]}`}>
          {property.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">
          {PROPERTY_TYPE_LABELS[property.type]}
        </p>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <span>📍</span>
          <span className="text-sm font-medium">{property.city}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary-600">
            {property.price.toLocaleString('fr-FR')} €
          </div>
          <div className="text-sm text-gray-500">
            {property.surface} m²
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-5 pb-5 border-b">
          <span>🛏️ {property.bedrooms}</span>
          <span>🚿 {property.bathrooms}</span>
          <span>🚪 {property.rooms} pièces</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/properties/${property.id}/detail`)}
            className="flex-1 btn-primary"
          >
            Voir
          </button>
          <button
            onClick={() => navigate(`/properties/${property.id}`)}
            className="flex-1 btn-secondary"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}