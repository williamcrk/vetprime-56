
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, TrendingUp, TrendingDown, DollarSign, Plus } from 'lucide-react';

const Financeiro = () => {
  const recentTransactions = [
    { id: '001', type: 'Consulta', client: 'Maria Silva', amount: 150, date: '15/11/2024', status: 'Pago' },
    { id: '002', type: 'Cirurgia', client: 'Ana Costa', amount: 800, date: '10/11/2024', status: 'Pendente' },
    { id: '003', type: 'Vacinação', client: 'João Santos', amount: 80, date: '12/11/2024', status: 'Pago' },
    { id: '004', type: 'Internação', client: 'Pedro Alves', amount: 1200, date: '08/11/2024', status: 'Parcial' },
  ];

  const monthlyRevenue = 45290;
  const monthlyExpenses = 28150;
  const profit = monthlyRevenue - monthlyExpenses;
  const profitPercentage = ((profit / monthlyRevenue) * 100).toFixed(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return 'bg-green-100 text-green-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Parcial': return 'bg-blue-100 text-blue-800';
      case 'Vencido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout title="Financeiro">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {monthlyRevenue.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold">R$ {monthlyExpenses.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Despesas Mensais</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {profit.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Lucro Líquido</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{profitPercentage}%</p>
                  <p className="text-sm text-gray-600">Margem de Lucro</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Transações Recentes</CardTitle>
                  <CardDescription>Últimas movimentações financeiras</CardDescription>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Cobrança
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">#{transaction.id} - {transaction.type}</p>
                        <p className="text-sm text-gray-600">{transaction.client}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-lg">R$ {transaction.amount}</p>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo por Categoria</CardTitle>
              <CardDescription>Receita por tipo de serviço este mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Consultas</span>
                  <div className="text-right">
                    <span className="font-medium">R$ 18.500</span>
                    <p className="text-xs text-gray-500">41% do total</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cirurgias</span>
                  <div className="text-right">
                    <span className="font-medium">R$ 15.200</span>
                    <p className="text-xs text-gray-500">34% do total</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Internações</span>
                  <div className="text-right">
                    <span className="font-medium">R$ 8.900</span>
                    <p className="text-xs text-gray-500">20% do total</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Vacinações</span>
                  <div className="text-right">
                    <span className="font-medium">R$ 2.690</span>
                    <p className="text-xs text-gray-500">5% do total</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contas a Receber</CardTitle>
            <CardDescription>Pendências financeiras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">R$ 4.250</p>
                <p className="text-sm text-gray-600">Em Atraso</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">R$ 7.800</p>
                <p className="text-sm text-gray-600">Vence em 30 dias</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">R$ 12.340</p>
                <p className="text-sm text-gray-600">Recebido este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Financeiro;
