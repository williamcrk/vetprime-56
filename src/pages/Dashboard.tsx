
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import RevenueChart from '@/components/charts/RevenueChart';
import { 
  Heart, Calendar, DollarSign, Users, TrendingUp, 
  AlertTriangle, Package, Bell, Clock, Activity,
  PieChart, BarChart3, FileText
} from 'lucide-react';

const Dashboard = () => {
  const [realTimeData] = useState({
    patientsToday: 12,
    consultationsToday: 8,
    revenueToday: 2840,
    pendingPayments: 3,
    criticalStock: 2,
    onlineUsers: 5
  });

  const revenueData = [
    { month: 'Jun', revenue: 36500, expenses: 22000, profit: 14500 },
    { month: 'Jul', revenue: 39800, expenses: 24500, profit: 15300 },
    { month: 'Ago', revenue: 41200, expenses: 25800, profit: 15400 },
    { month: 'Set', revenue: 38900, expenses: 23500, profit: 15400 },
    { month: 'Out', revenue: 42150, expenses: 26200, profit: 15950 },
    { month: 'Nov', revenue: 45290, expenses: 28150, profit: 17140 },
  ];

  const upcomingAppointments = [
    { pet: 'Rex', owner: 'Maria Silva', time: '09:30', type: 'Consulta', doctor: 'Dr. João' },
    { pet: 'Luna', owner: 'José Santos', time: '10:00', type: 'Vacina', doctor: 'Dra. Ana' },
    { pet: 'Max', owner: 'Pedro Costa', time: '10:30', type: 'Cirurgia', doctor: 'Dr. João' },
  ];

  const quickActions = [
    { name: 'Nova Consulta', icon: Heart, color: 'bg-blue-500', route: '/consulta' },
    { name: 'Ver Agenda', icon: Calendar, color: 'bg-green-500', route: '/agenda' },
    { name: 'Financeiro', icon: DollarSign, color: 'bg-purple-500', route: '/financeiro' },
    { name: 'Estoque', icon: Package, color: 'bg-orange-500', route: '/estoque' },
  ];

  return (
    <PageLayout title="Dashboard Avançado">
      <div className="space-y-6">
        {/* Header com indicadores em tempo real */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
          <div>
            <h2 className="text-xl font-bold">VetPrime - Painel Principal</h2>
            <p className="text-blue-100">Sistema veterinário inteligente</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="text-sm">{realTimeData.onlineUsers} usuários online</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Indicadores principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pacientes Hoje</p>
                  <p className="text-2xl font-bold text-blue-600">{realTimeData.patientsToday}</p>
                </div>
                <Heart className="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-2">
                <Badge className="bg-blue-100 text-blue-800">
                  +2 desde ontem
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita Hoje</p>
                  <p className="text-2xl font-bold text-green-600">R$ {realTimeData.revenueToday.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-800">
                  +15% vs ontem
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pagamentos Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-600">{realTimeData.pendingPayments}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="mt-2">
                <Badge className="bg-yellow-100 text-yellow-800">
                  Ação necessária
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Estoque Crítico</p>
                  <p className="text-2xl font-bold text-red-600">{realTimeData.criticalStock}</p>
                </div>
                <Package className="w-8 h-8 text-red-500" />
              </div>
              <div className="mt-2">
                <Badge className="bg-red-100 text-red-800">
                  Repor urgente
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse funcionalidades principais rapidamente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col gap-2 hover:scale-105 transition-transform"
                >
                  <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{action.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de receita */}
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} type="line" />
          </div>

          {/* Central de notificações */}
          <NotificationCenter />
        </div>

        {/* Próximos agendamentos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
              <CardDescription>Consultas de hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.pet}</h4>
                        <p className="text-sm text-gray-600">{appointment.owner}</p>
                        <p className="text-xs text-gray-500">{appointment.doctor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.time}</p>
                      <Badge variant="outline">{appointment.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resumo financeiro */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>Performance do mês atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Receita Bruta</span>
                  <span className="font-bold text-green-600">R$ 45.290</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Despesas</span>
                  <span className="font-bold text-red-600">R$ 28.150</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="font-medium">Lucro Líquido</span>
                  <span className="font-bold text-blue-600 text-lg">R$ 17.140</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">37.9%</p>
                    <p className="text-xs text-gray-600">Margem de Lucro</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">+12%</p>
                    <p className="text-xs text-gray-600">vs mês anterior</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
