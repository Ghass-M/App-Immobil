import { useCallback, useState } from 'react';
import type { CreatePropertyDTO } from '../types/property.types';
import { validatePropertyForm, hasValidationErrors } from '../utils/validation';

export function usePropertyForm(initial: CreatePropertyDTO) {
  const [formData, setFormData] = useState<CreatePropertyDTO>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      let newValue: string | number = value;

      if (type === 'number') {
        const parsed = Number(value.toString().replace(',', '.'));
        newValue = isNaN(parsed) ? 0 : parsed;
      }

      setFormData((prev) => ({ ...prev, [name]: newValue } as CreatePropertyDTO));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    },
    []
  );

  const validate = useCallback(() => {
    const newErrors = validatePropertyForm(formData);
    setErrors(newErrors);
    return !hasValidationErrors(newErrors);
  }, [formData]);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    loading,
    setLoading,
    handleChange,
    validate,
  } as const;
}
