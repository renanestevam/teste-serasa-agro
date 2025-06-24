import React, { useState } from 'react';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { Card, CardContent, CardFooter } from '../../atoms/Card';
import { Heading } from '../../atoms/Typography';
import { CreatePropertyDto } from '../../../types';

const BRAZILIAN_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

interface PropertyFormProps {
  onSubmit: (data: CreatePropertyDto) => void;
  onCancel: () => void;
  initialData?: Partial<CreatePropertyDto>;
  isEditing?: boolean;
  producerId: string;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
  producerId,
}) => {
  const [formData, setFormData] = useState<CreatePropertyDto>({
    farmName: initialData?.farmName || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    totalArea: initialData?.totalArea || 0,
    cultivableArea: initialData?.cultivableArea || 0,
    vegetationArea: initialData?.vegetationArea || 0,
    producerId,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreatePropertyDto, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const processedValue = ['totalArea', 'cultivableArea', 'vegetationArea'].includes(name)
      ? parseFloat(value) || 0
      : value;

    setFormData(prev => ({ ...prev, [name]: processedValue }));
    
    if (errors[name as keyof CreatePropertyDto]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreatePropertyDto, string>> = {};

    if (!formData.farmName.trim()) {
      newErrors.farmName = 'Nome da fazenda é obrigatório';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }

    if (!formData.state) {
      newErrors.state = 'Estado é obrigatório';
    }

    if (formData.totalArea <= 0) {
      newErrors.totalArea = 'Área total deve ser maior que 0';
    }

    if (formData.cultivableArea <= 0) {
      newErrors.cultivableArea = 'Área cultivável deve ser maior que 0';
    }

    if (formData.vegetationArea <= 0) {
      newErrors.vegetationArea = 'Área de vegetação deve ser maior que 0';
    }

    if (formData.cultivableArea + formData.vegetationArea > formData.totalArea) {
      newErrors.totalArea = 'Área total deve ser maior ou igual à soma das áreas cultivável e de vegetação';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <CardContent>
        <Heading>{isEditing ? 'Editar Propriedade' : 'Nova Propriedade'}</Heading>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nome da Fazenda"
            name="farmName"
            value={formData.farmName}
            onChange={handleChange}
            error={errors.farmName}
            placeholder="Digite o nome da fazenda"
            required
          />
          <FormField
            label="Cidade"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            placeholder="Digite a cidade"
            required
          />
          <FormField
            label="Estado"
            name="state"
            type="select"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
            options={BRAZILIAN_STATES}
            required
          />
          <FormField
            label="Área Total (hectares)"
            name="totalArea"
            type="number"
            value={formData.totalArea}
            onChange={handleChange}
            error={errors.totalArea}
            placeholder="0.00"
            required
          />
          <FormField
            label="Área Cultivável (hectares)"
            name="cultivableArea"
            type="number"
            value={formData.cultivableArea}
            onChange={handleChange}
            error={errors.cultivableArea}
            placeholder="0.00"
            required
          />
          <FormField
            label="Área de Vegetação (hectares)"
            name="vegetationArea"
            type="number"
            value={formData.vegetationArea}
            onChange={handleChange}
            error={errors.vegetationArea}
            placeholder="0.00"
            required
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          {isEditing ? 'Atualizar' : 'Criar'}
        </Button>
      </CardFooter>
    </Card>
  );
};