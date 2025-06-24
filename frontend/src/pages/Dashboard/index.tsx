import React, { useEffect } from "react";
import { Card, CardContent } from "../../components/atoms/Card";
import { Text, Title } from "../../components/atoms/Typography";
import { DashboardStats } from "../../components/organisms/DashboardStats";
import { Layout } from "../../components/templates/Layout";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchDashboardData } from "../../store/slices/dashboardSlice";

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return (
      <Layout>
        <Card>
          <CardContent>
            <Text>Carregando dados do dashboard...</Text>
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
            <Text>Erro ao carregar dados do dashboard: {error}</Text>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <Card>
          <CardContent>
            <Text>Nenhum dado disponível</Text>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <Title>Dashboard</Title>
      <DashboardStats data={data} />
    </Layout>
  );
};
