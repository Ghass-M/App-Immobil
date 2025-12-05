import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyStore } from '../stores/propertyStore';
import PropertyCard from '../components/PropertyCard';
import Filters from '../components/Filters';
import { PAGE_TITLES, BUTTON_LABELS, EMPTY_STATE } from '../constants';

export default function PropertyList() {
  const navigate = useNavigate();
  const { properties, loading, error, pagination, fetchProperties, setFilters, setPage } = usePropertyStore();

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading && properties.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {PAGE_TITLES.PROPERTIES}
            </h1>
            <p className="text-gray-600 mt-2">
              {pagination.total} bien{pagination.total > 1 ? 's' : ''} disponible{pagination.total > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => navigate('/properties/new')}
            className="btn-primary flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            {BUTTON_LABELS.ADD_PROPERTY}
          </button>
        </div>

        {/* Filtres */}
        <Filters onFilterChange={setFilters} />

        {/* Erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Grille de propriétés */}
        {properties.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">{EMPTY_STATE.NO_PROPERTIES_ICON}</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {EMPTY_STATE.NO_PROPERTIES_TITLE}
            </h3>
            <p className="text-gray-500">
              {EMPTY_STATE.NO_PROPERTIES_DESCRIPTION}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setPage(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {BUTTON_LABELS.PREVIOUS}
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        page === pagination.page
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {BUTTON_LABELS.NEXT}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}