
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RevenueChart from '@/components/charts/RevenueChart';
import ServiceChart from '@/components/charts/ServiceChart';
import { BarChart3, Download, FileText, TrendingUp, Users, Heart, Calendar } from 'lucide-react';

const Relatorios = () => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const revenueData = [
    { month: 'Jun', revenue: 36500, expenses: 22000, profit: 14500 },
    { month: 'Jul', revenue: 39800, expenses: 24500, profit: 15300 },
    { month: 'Ago', revenue: 41200, expenses: 25800, profit: 15400 },
    { month: 'Set', revenue: 38900, expenses: 23500, profit: 15400 },
    { month: 'Out', revenue: 42150, expenses: 26200, profit: 15950 },
    { month: 'Nov', revenue: 45290, expenses: 28150, profit: 17140 },
  ];

  const serviceData = [
    { name: 'Consultas', value: 18500, color: '#3b82f6' },
    { name: 'Cirurgias', value: 15200, color: '#10b981' },
    { name: 'Internações', value: 8900, color: '#f59e0b' },
    { name: 'Vacinações', value: 2690, color: '#ef4444' },
  ];

  const reports = [
    { name: 'Relatório Financeiro Mensal', description: 'Receitas, despesas e lucro do mês', icon: BarChart3, color: 'text-green-600' },
    { name: 'Relatório de Consultas', description: 'Quantidade e tipos de consultas realizadas', icon: Heart, color: 'text-blue-600' },
    { name: 'Relatório de Clientes', description: 'Dados dos clientes e seus pets', icon: Users, color: 'text-purple-600' },
    { name: 'Relatório de Estoque', description: 'Produtos em estoque e movimentações', icon: FileText, color: 'text-orange-600' },
  ];

  const quickStats = [
    { label: 'Consultas este mês', value: '247', change: '+12%', trend: 'up' },
    { label: 'Novos clientes', value: '23', change: '+8%', trend: 'up' },
    { label: 'Receita média por consulta', value: 'R$ 183', change: '+5%', trend: 'up' },
    { label: 'Taxa de retorno', value: '78%', change: '-2%', trend: 'down' },
  ];

  return (
    <PageLayout title="Relatórios Avançados">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="charts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <div className="flex gap-2">
              <Button 
                variant={chartType === 'line' ? 'default' : 'outline'}
                onClick={() => setChartType('line')}
                size="sm"
              >
                Linha
              </Button>
              <Button 
                variant={chartType === 'bar' ? 'default' : 'outline'}
                onClick={() => setChartType('bar')}
                size="sm"
              >
                Barras
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart data={revenueData} type={chartType} />
              <ServiceChart data={serviceData} />
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Disponíveis</CardTitle>
                <CardDescription>Gere relatórios detalhados sobre diferentes aspectos da clínica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reports.map((report, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <report.icon className={`w-6 h-6 ${report.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{report.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <FileText className="w-3 h-3 mr-1" />
                              Visualizar
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Download className="w-3 h-3 mr-1" />
                              Baixar PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho Mensal</CardTitle>
                  <CardDescription>Comparativo dos últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: 'Nov 2024', consultas: 247, receita: 45290, crescimento: 7.5 },
                      { month: 'Out 2024', consultas: 231, receita: 42150, crescimento: 8.4 },
                      { month: 'Set 2024', consultas: 198, receita: 38900, crescimento: -5.6 },
                      { month: 'Ago 2024', consultas: 215, receita: 41200, crescimento: 3.5 },
                      { month: 'Jul 2024', consultas: 203, receita: 39800, crescimento: 9.0 },
                      { month: 'Jun 2024', consultas: 189, receita: 36500, crescimento: 12.1 },
                    ].map((data, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <span className="font-medium">{data.month}</span>
                        <div className="text-right">
                          <p className="font-medium">{data.consultas} consultas</p>
                          <p className="text-sm text-gray-600">R$ {data.receita.toLocaleString()}</p>
                          <p className={`text-xs ${data.crescimento > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.crescimento > 0 ? '+' : ''}{data.crescimento}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ranking de Serviços</CardTitle>
                  <CardDescription>Serviços mais realizados este mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { service: 'Consulta de Rotina', count: 89, percentage: 36, trend: 'up' },
                      { service: 'Vacinação', count: 67, percentage: 27, trend: 'up' },
                      { service: 'Cirurgia', count: 32, percentage: 13, trend: 'down' },
                      { service: 'Exames', count: 28, percentage: 11, trend: 'up' },
                      { service: 'Emergência', count: 21, percentage: 9, trend: 'up' },
                      { service: 'Outros', count: 10, percentage: 4, trend: 'down' },
                    ].map((data, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{data.service}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">{data.count}</span>
                              <TrendingUp className={`w-3 h-3 ${data.trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${data.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Relatorios;
