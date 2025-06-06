import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Plus, Eye, Edit, Activity } from 'lucide-react';
import NovaEvolucaoModal from '@/components/evolucoes/NovaEvolucaoModal';

const Evolucoes = () => {
  const [isNovaEvolucaoOpen, setIsNovaEvolucaoOpen] = useState(false);

  const evolucoes = [
    {
      id: 'EV001',
      petName: 'Buddy',
      owner: 'Maria Silva',
      veterinarian: 'Dr. João Silva',
      date: '16/11/2024',
      time: '14:30',
      temperatura: '38.2°C',
      comportamento: 'Alerta e ativo',
      observacoes: 'Paciente apresenta melhora significativa...',
      status: 'Estável'
    },
    {
      id: 'EV002',
      petName: 'Luna',
      owner: 'João Santos',
      veterinarian: 'Dra. Maria Santos',
      date: '16/11/2024',
      time: '10:15',
      temperatura: '39.1°C',
      comportamento: 'Quieto mas responsivo',
      observacoes: 'Febre persistente, mantendo medicação...',
      status: 'Observação'
    }
  ];

  const pacientesInternados = [
    { id: '1', name: 'Buddy', owner: 'Maria Silva' },
    { id: '2', name: 'Luna', owner: 'João Santos' },
    { id: '3', name: 'Max', owner: 'Ana Costa' }
  ];

  return (
    <PageLayout title="Evoluções">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Evoluções Clínicas</h2>
            <p className="text-gray-600">Acompanhe a evolução dos pacientes internados</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsNovaEvolucaoOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Evolução
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{evolucoes.length}</p>
                  <p className="text-sm text-gray-600">Evoluções Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{evolucoes.filter(e => e.status === 'Estável').length}</p>
                  <p className="text-sm text-gray-600">Pacientes Estáveis</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{evolucoes.filter(e => e.status === 'Observação').length}</p>
                  <p className="text-sm text-gray-600">Em Observação</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600">Pacientes Internados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Evoluções Recentes</CardTitle>
              <CardDescription>Últimas evoluções registradas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evolucoes.map((evolucao) => (
                  <div key={evolucao.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{evolucao.petName}</h3>
                        <Badge className={evolucao.status === 'Estável' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {evolucao.status}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{evolucao.owner}</p>
                    <p className="text-sm font-medium">{evolucao.veterinarian}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {evolucao.date} {evolucao.time} • Temp: {evolucao.temperatura}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {evolucao.observacoes.substring(0, 60)}...
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pacientes Internados</CardTitle>
              <CardDescription>Selecione um paciente para nova evolução</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pacientesInternados.map((paciente) => (
                  <div key={paciente.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{paciente.name}</h3>
                      <p className="text-sm text-gray-600">{paciente.owner}</p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => setIsNovaEvolucaoOpen(true)}
                    >
                      Nova Evolução
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <NovaEvolucaoModal
          open={isNovaEvolucaoOpen}
          onOpenChange={setIsNovaEvolucaoOpen}
          onSuccess={() => {
            // Refresh data
          }}
        />
      </div>
    </PageLayout>
  );
};

export default Evolucoes;
