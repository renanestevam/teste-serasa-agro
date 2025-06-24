import React from 'react';
import styled from 'styled-components';
import { Card, CardContent } from '../../atoms/Card';
import { Heading, Text } from '../../atoms/Typography';
import { PieChart } from '../../molecules/PieChart';
import { DashboardData } from '../../../types';

const StatsContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const MetricsContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-bottom: 2rem;
`;

const MetricCard = styled(Card)`
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

const ChartContainer = styled(Card)`
  height: 400px;
`;

interface DashboardStatsProps {
  data: DashboardData;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
  const farmsByStateData = data.farmsByState.map(item => ({
    name: item.state,
    value: item.count,
  }));

  const culturesByTypeData = data.culturesByType.map(item => ({
    name: item.type,
    value: item.count,
  }));

  const landUseData = [
    { name: 'Cultivável', value: data.landUse.cultivable },
    { name: 'Vegetação', value: data.landUse.vegetation },
  ];

  return (
    <div>
      <MetricsContainer>
        <MetricCard>
          <CardContent>
            <MetricValue>{data.totalFarms}</MetricValue>
            <MetricLabel>Total de Fazendas</MetricLabel>
          </CardContent>
        </MetricCard>
        <MetricCard>
          <CardContent>
            <MetricValue>{data.totalHectares.toLocaleString()}</MetricValue>
            <MetricLabel>Total de Hectares</MetricLabel>
          </CardContent>
        </MetricCard>
      </MetricsContainer>

      <StatsContainer>
        <ChartContainer>
          <CardContent>
            <PieChart data={farmsByStateData} title="Fazendas por Estado" />
          </CardContent>
        </ChartContainer>

        <ChartContainer>
          <CardContent>
            <PieChart data={culturesByTypeData} title="Culturas por Tipo" />
          </CardContent>
        </ChartContainer>

        <ChartContainer>
          <CardContent>
            <PieChart data={landUseData} title="Distribuição do Uso da Terra" />
          </CardContent>
        </ChartContainer>
      </StatsContainer>
    </div>
  );
};