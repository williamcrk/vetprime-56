
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, FileText, TrendingUp, Users, Heart } from 'lucide-react';

const Relatorios = () => {
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
    <PageLayout title="Relatórios">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho Mensal</CardTitle>
              <CardDescription>Comparativo dos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: 'Nov 2024', consultas: 247, receita: 45290 },
                  { month: 'Out 2024', consultas: 231, receita: 42150 },
                  { month: 'Set 2024', consultas: 198, receita: 38900 },
                  { month: 'Ago 2024', consultas: 215, receita: 41200 },
                  { month: 'Jul 2024', consultas: 203, receita: 39800 },
                  { month: 'Jun 2024', consultas: 189, receita: 36500 },
                ].map((data, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <span className="font-medium">{data.month}</span>
                    <div className="text-right">
                      <p className="font-medium">{data.consultas} consultas</p>
                      <p className="text-sm text-gray-600">R$ {data.receita.toLocaleString()}</p>
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
                  { service: 'Consulta de Rotina', count: 89, percentage: 36 },
                  { service: 'Vacinação', count: 67, percentage: 27 },
                  { service: 'Cirurgia', count: 32, percentage: 13 },
                  { service: 'Exames', count: 28, percentage: 11 },
                  { service: 'Emergência', count: 21, percentage: 9 },
                  { service: 'Outros', count: 10, percentage: 4 },
                ].map((data, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{data.service}</span>
                        <span className="text-sm text-gray-600">{data.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
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
      </div>
    </PageLayout>
  );
};

export default Relatorios;
