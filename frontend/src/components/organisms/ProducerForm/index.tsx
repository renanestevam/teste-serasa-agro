import React, { useState } from 'react';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { Card, CardContent, CardFooter } from '../../atoms/Card';
import { Heading } from '../../atoms/Typography';
import { CreateProducerDto } from '../../../types';
import { validateCpfOrCnpj, formatCpfCnpj } from '../../../utils/validation';

interface ProducerFormProps {
  onSubmit: (data: CreateProducerDto) => void;
  onCancel: () => void;
  initialData?: Partial<CreateProducerDto>;
  isEditing?: boolean;
}

export const ProducerForm: React.FC<ProducerFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<CreateProducerDto>({
    cpfCnpj: initialData?.cpfCnpj || '',
    producerName: initialData?.producerName || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateProducerDto, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cpfCnpj') {
      const formattedValue = formatCpfCnpj(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name as keyof CreateProducerDto]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateProducerDto, string>> = {};

    if (!formData.cpfCnpj.trim()) {
      newErrors.cpfCnpj = 'CPF/CNPJ é obrigatório';
    } else if (!validateCpfOrCnpj(formData.cpfCnpj)) {
      newErrors.cpfCnpj = 'CPF/CNPJ inválido';
    }

    if (!formData.producerName.trim()) {
      newErrors.producerName = 'Nome do produtor é obrigatório';
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
        <Heading>{isEditing ? 'Editar Produtor' : 'Novo Produtor'}</Heading>
        <form onSubmit={handleSubmit}>
          <FormField
            label="CPF/CNPJ"
            name="cpfCnpj"
            value={formData.cpfCnpj}
            onChange={handleChange}
            error={errors.cpfCnpj}
            placeholder="000.000.000-00 or 00.000.000/0000-00"
            required
          />
          <FormField
            label="Nome do Produtor"
            name="producerName"
            value={formData.producerName}
            onChange={handleChange}
            error={errors.producerName}
            placeholder="Digite o nome do produtor"
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