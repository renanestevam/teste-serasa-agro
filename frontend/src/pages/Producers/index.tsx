import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/templates/Layout';
import { ProducerList } from '../../components/organisms/ProducerList';
import { ProducerForm } from '../../components/organisms/ProducerForm';
import { PropertyForm } from '../../components/organisms/PropertyForm';
import { Modal } from '../../components/molecules/Modal';
import { Button } from '../../components/atoms/Button';
import { Card, CardContent } from '../../components/atoms/Card';
import { Title, Text } from '../../components/atoms/Typography';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  fetchProducers,
  createProducer,
  updateProducer,
  deleteProducer,
} from '../../store/slices/producerSlice';
import { createProperty } from '../../store/slices/propertySlice';
import { Producer, CreateProducerDto, CreatePropertyDto } from '../../types';
import styled from 'styled-components';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProducerDetails = styled.div`
  margin-bottom: 2rem;
`;

const PropertiesSection = styled.div`
  margin-top: 2rem;
`;

const PropertiesList = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
`;

const PropertyCard = styled(Card)`
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export const Producers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { producers, loading, error } = useAppSelector(state => state.producer);

  const [isProducerModalOpen, setIsProducerModalOpen] = useState(false);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingProducer, setEditingProducer] = useState<Producer | null>(null);
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);

  useEffect(() => {
    dispatch(fetchProducers());
  }, [dispatch]);

  const handleCreateProducer = () => {
    setEditingProducer(null);
    setIsProducerModalOpen(true);
  };

  const handleEditProducer = (producer: Producer) => {
    setEditingProducer(producer);
    setIsProducerModalOpen(true);
  };

  const handleDeleteProducer = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produtor?')) {
      dispatch(deleteProducer(id));
    }
  };

  const handleViewDetails = (producer: Producer) => {
    setSelectedProducer(producer);
    setIsDetailsModalOpen(true);
  };

  const handleProducerSubmit = (data: CreateProducerDto) => {
    if (editingProducer) {
      dispatch(updateProducer({ id: editingProducer.id, data }));
    } else {
      dispatch(createProducer(data));
    }
    setIsProducerModalOpen(false);
    setEditingProducer(null);
  };

  const handleAddProperty = () => {
    setIsPropertyModalOpen(true);
  };

  const handlePropertySubmit = (data: CreatePropertyDto) => {
    dispatch(createProperty(data));
    setIsPropertyModalOpen(false);
  };

  if (loading) {
    return (
      <Layout>
        <Card>
          <CardContent>
            <Text>Carregando produtores...</Text>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Card>
          <CardContent>
            <Text>Erro ao carregar produtores: {error}</Text>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader>
        <Title>Produtores</Title>
        <Button onClick={handleCreateProducer}>Novo Produtor</Button>
      </PageHeader>

      <ProducerList
        producers={producers}
        onEdit={handleEditProducer}
        onDelete={handleDeleteProducer}
        onViewDetails={handleViewDetails}
      />

      <Modal
        isOpen={isProducerModalOpen}
        onClose={() => setIsProducerModalOpen(false)}
        title={editingProducer ? 'Editar Produtor' : 'Novo Produtor'}
      >
        <ProducerForm
          onSubmit={handleProducerSubmit}
          onCancel={() => setIsProducerModalOpen(false)}
          initialData={editingProducer || undefined}
          isEditing={!!editingProducer}
        />
      </Modal>

      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Detalhes do Produtor"
      >
        {selectedProducer && (
          <div>
            <ProducerDetails>
              <h4>{selectedProducer.producerName}</h4>
              <p>CPF/CNPJ: {selectedProducer.cpfCnpj}</p>
            </ProducerDetails>

            <PropertiesSection>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h5>Propriedades ({selectedProducer.properties?.length || 0})</h5>
                <Button onClick={handleAddProperty}>Adicionar Propriedade</Button>
              </div>

              <PropertiesList>
                {selectedProducer.properties?.map((property) => (
                  <PropertyCard key={property.id}>
                    <CardContent>
                      <h6>{property.farmName}</h6>
                      <p>{property.city}, {property.state}</p>
                      <p>Área Total: {property.totalArea} ha</p>
                      <p>Cultivável: {property.cultivableArea} ha</p>
                      <p>Vegetação: {property.vegetationArea} ha</p>
                    </CardContent>
                  </PropertyCard>
                ))}
              </PropertiesList>
            </PropertiesSection>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isPropertyModalOpen}
        onClose={() => setIsPropertyModalOpen(false)}
        title="Nova Propriedade"
      >
        {selectedProducer && (
          <PropertyForm
            onSubmit={handlePropertySubmit}
            onCancel={() => setIsPropertyModalOpen(false)}
            producerId={selectedProducer.id}
          />
        )}
      </Modal>
    </Layout>
  );
};