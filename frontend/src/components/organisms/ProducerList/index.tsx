import React from 'react';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import { Card, CardContent } from '../../atoms/Card';
import { Text } from '../../atoms/Typography';
import { Producer } from '../../../types';

const ListContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
`;

const ProducerCard = styled(Card)`
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ProducerHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProducerInfo = styled.div`
  flex: 1;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ProducerName = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

const ProducerDocument = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
`;

const PropertiesCount = styled.p`
  font-size: 0.875rem;
  color: #3b82f6;
  margin: 0;
  font-weight: 500;
`;

interface ProducerListProps {
  producers: Producer[];
  onEdit: (producer: Producer) => void;
  onDelete: (id: string) => void;
  onViewDetails: (producer: Producer) => void;
}

export const ProducerList: React.FC<ProducerListProps> = ({
  producers,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  if (producers.length === 0) {
    return (
      <Card>
        <CardContent>
          <Text>Nenhum produtor encontrado. Crie seu primeiro produtor para começar.</Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <ListContainer>
      {producers.map((producer) => (
        <ProducerCard key={producer.id}>
          <CardContent>
            <ProducerHeader>
              <ProducerInfo>
                <ProducerName>{producer.producerName}</ProducerName>
                <ProducerDocument>CPF/CNPJ: {producer.cpfCnpj}</ProducerDocument>
                <PropertiesCount>
                  {producer.properties?.length || 0} propriedades
                </PropertiesCount>
              </ProducerInfo>
            </ProducerHeader>
            <ActionsContainer>
              <Button
                variant="secondary"
                onClick={() => onViewDetails(producer)}
              >
                Ver Detalhes
              </Button>
              <Button
                variant="secondary"
                onClick={() => onEdit(producer)}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={() => onDelete(producer.id)}
              >
                Excluir
              </Button>
            </ActionsContainer>
          </CardContent>
        </ProducerCard>
      ))}
    </ListContainer>
  );
};