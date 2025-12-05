import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { propertyService } from '../services/api.service';
import { PAGE_TITLES, BUTTON_LABELS, LOADING_MESSAGES } from '../constants';
// validation is handled by the `usePropertyForm` hook
import { usePropertyForm } from '../hooks/usePropertyForm';
import type { CreatePropertyDTO } from '../types/property.types';
import FormBasicInfo from '../components/property-form/FormBasicInfo';
import FormDetails from '../components/property-form/FormDetails';
import FormMedia from '../components/property-form/FormMedia';

export default function PropertyForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== 'new';

  const initialFormData: CreatePropertyDTO = {
    title: '',
    description: '',
    city: '',
    address: '',
    price: 0,
    surface: 0,
    rooms: 1,
    bedrooms: 0,
    bathrooms: 1,
    type: 'appartement',
    status: 'disponible',
    imageUrl: '',
  };

  const { formData, setFormData, errors, loading, setLoading, handleChange, validate } = usePropertyForm(initialFormData);

    useEffect(() => {
    if (isEditMode && id) {
        loadProperty();
    }
    }, [id]);

const loadProperty = async () => {
  try {
    const response = await propertyService.getById(Number(id));
    if (response.data) {
      const data = response.data;

      const parsedData = {
        ...data,
        price: Number(data.price?.toString().replace(',', '.')) || 0,
        surface: Number(data.surface?.toString().replace(',', '.')) || 0,
        rooms: Number(data.rooms) || 1,
        bedrooms: Number(data.bedrooms) || 0,
        bathrooms: Number(data.bathrooms) || 1,
        imageUrl: typeof data.imageUrl === 'string' ? data.imageUrl : '', // Normalisation
      };

      setFormData(parsedData);
    }
  } catch (error) {
    alert('Erreur lors du chargement');
    navigate('/');
  }
};



  

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);
  try {
    const payload = {
      ...formData,
      imageUrl: formData.imageUrl?.trim() ? formData.imageUrl : undefined,
    };

    if (isEditMode) {
      await propertyService.update(Number(id), payload);
    } else {
      await propertyService.create(payload);
    }

    navigate('/');
  } catch (error: any) {
    const errorMessage = (error as any).message || 'Erreur lors de la sauvegarde';
    alert(errorMessage);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="btn-secondary mb-6 flex items-center gap-2"
        >
          {BUTTON_LABELS.BACK}
        </button>

        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {isEditMode ? PAGE_TITLES.EDIT_PROPERTY : PAGE_TITLES.NEW_PROPERTY}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormBasicInfo formData={formData} errors={errors} onChange={handleChange} />
            <FormDetails formData={formData} errors={errors} onChange={handleChange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormMedia formData={formData} errors={errors} onChange={handleChange} />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {loading ? LOADING_MESSAGES.SAVING : (isEditMode ? BUTTON_LABELS.UPDATE : BUTTON_LABELS.CREATE)}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 btn-secondary"
              >
                {BUTTON_LABELS.CANCEL}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}