
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users, Percent, Award } from 'lucide-react';

const PainelFinanceiro = () => {
  const veterinarians = [
    { name: 'Dr. João Silva', revenue: 28500, commission: 5700, services: 45, rank: 1 },
    { name: 'Dra. Maria Santos', revenue: 24300, commission: 4860, services: 38, rank: 2 },
    { name: 'Dr. Pedro Costa', revenue: 19800, commission: 3960, services: 32, rank: 3 },
  ];

  const serviceCommissions = [
    { service: 'Vacinas', percentage: 10, revenue: 12500 },
    { service: 'Cirurgias', percentage: 20, revenue: 35000 },
    { service: 'Consultas', percentage: 15, revenue: 18500 },
    { service: 'Exames', percentage: 12, revenue: 8900 },
  ];

  return (
    <PageLayout title="Painel Financeiro Completo">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">R$ 72.600</p>
                  <p className="text-sm text-gray-600">Receita Mensal</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">R$ 28.400</p>
                  <p className="text-sm text-gray-600">Despesas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">R$ 44.200</p>
                  <p className="text-sm text-gray-600">Lucro Líquido</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">60.9%</p>
                  <p className="text-sm text-gray-600">Margem de Lucro</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Comissões por Veterinário</CardTitle>
              <CardDescription>Ranking mensal com cálculo automático</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {veterinarians.map((vet) => (
                  <div key={vet.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{vet.rank}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{vet.name}</h3>
                        <p className="text-sm text-gray-600">{vet.services} atendimentos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">R$ {vet.commission.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">de R$ {vet.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comissões por Serviço</CardTitle>
              <CardDescription>Configuração e resultados por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceCommissions.map((item) => (
                  <div key={item.service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{item.service}</h3>
                      <p className="text-sm text-gray-600">Comissão: {item.percentage}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ {item.revenue.toLocaleString()}</p>
                      <p className="text-sm text-green-600">
                        +R$ {(item.revenue * item.percentage / 100).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Configurar Comissões
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Caixa Diário</CardTitle>
              <CardDescription>Entradas e saídas hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Entradas</span>
                  <span className="font-medium text-green-600">R$ 2.450</span>
                </div>
                <div className="flex justify-between">
                  <span>Saídas</span>
                  <span className="font-medium text-red-600">R$ 890</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Saldo</span>
                    <span className="font-bold text-blue-600">R$ 1.560</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receita por Serviço</CardTitle>
              <CardDescription>Distribuição mensal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Cirurgias</span>
                  <span className="font-medium">48%</span>
                </div>
                <div className="flex justify-between">
                  <span>Consultas</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Vacinas</span>
                  <span className="font-medium">17%</span>
                </div>
                <div className="flex justify-between">
                  <span>Exames</span>
                  <span className="font-medium">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meta do Mês</CardTitle>
              <CardDescription>Progresso atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
                <p className="text-sm text-gray-600 mb-4">R$ 56.500 de R$ 72.000</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default PainelFinanceiro;
