import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePropertyStore } from '../stores/propertyStore';
import { propertyService } from '../services/api.service';

const statusColors = {
  disponible: 'bg-green-100 text-green-800',
  vendu: 'bg-red-100 text-red-800',
  loue: 'bg-blue-100 text-blue-800',
  reserve: 'bg-yellow-100 text-yellow-800',
};

const typeLabels = {
  appartement: '🏢 Appartement',
  maison: '🏠 Maison',
  studio: '🏢 Studio',
  loft: '🏭 Loft',
  villa: '🏰 Villa',
};

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentProperty, loading, fetchPropertyById } = usePropertyStore();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPropertyById(Number(id));
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id || !confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) return;

    setDeleting(true);
    try {
      await propertyService.delete(Number(id));
      navigate('/');
    } catch (error) {
      alert('Erreur lors de la suppression');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!currentProperty) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Propriété non trouvée</h2>
          <button onClick={() => navigate('/')} className="btn-primary mt-4">
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="btn-secondary mb-6 flex items-center gap-2"
        >
          ← Retour
        </button>

        <div className="card overflow-hidden">
          {/* Image */}
          <div className="relative h-96 bg-gray-200">
            {currentProperty.imageUrl ? (
              <img
                src={currentProperty.imageUrl}
                alt={currentProperty.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-9xl">
                🏡
              </div>
            )}
            <span className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-semibold ${statusColors[currentProperty.status]}`}>
              {currentProperty.status}
            </span>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {currentProperty.title}
                </h1>
                <p className="text-lg text-gray-600">
                  {typeLabels[currentProperty.type]}
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary-600 mb-1">
                  {currentProperty.price.toLocaleString('fr-FR')} €
                </div>
                <div className="text-gray-500">
                  {currentProperty.surface} m²
                </div>
              </div>
            </div>

            {/* Localisation */}
            <div className="flex items-center gap-2 text-gray-700 mb-6 pb-6 border-b">
              <span className="text-xl">📍</span>
              <span className="font-medium">{currentProperty.address}, {currentProperty.city}</span>
            </div>

            {/* Caractéristiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b">
              <div className="text-center">
                <div className="text-3xl mb-2">🛏️</div>
                <div className="text-2xl font-bold text-gray-900">{currentProperty.bedrooms}</div>
                <div className="text-sm text-gray-600">Chambres</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚿</div>
                <div className="text-2xl font-bold text-gray-900">{currentProperty.bathrooms}</div>
                <div className="text-sm text-gray-600">Salles de bain</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚪</div>
                <div className="text-2xl font-bold text-gray-900">{currentProperty.rooms}</div>
                <div className="text-sm text-gray-600">Pièces</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📐</div>
                <div className="text-2xl font-bold text-gray-900">{currentProperty.surface}</div>
                <div className="text-sm text-gray-600">m²</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {currentProperty.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/properties/${currentProperty.id}`)}
                className="flex-1 btn-primary"
              >
                Modifier
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 btn-danger disabled:opacity-50"
              >
                {deleting ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}