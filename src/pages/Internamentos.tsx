import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, AlertTriangle, Users, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NovoInternamentoModal from '@/components/internamento/NovoInternamentoModal';

const Internamentos = () => {
  const navigate = useNavigate();
  const [isNewInternmentOpen, setIsNewInternmentOpen] = useState(false);
  
  const internments = [
    {
      id: '1',
      petName: 'Buddy',
      owner: 'Maria Silva',
      startDate: '2024-11-10',
      status: 'ativo',
      reason: 'Cirurgia ortopédica',
      veterinarian: 'Dr. João Silva',
      room: 'UTI 01',
      medicationsToday: 3,
      medicationsPending: 1
    },
    {
      id: '2',
      petName: 'Luna',
      owner: 'João Santos',
      startDate: '2024-11-12',
      status: 'observacao',
      reason: 'Intoxicação alimentar',
      veterinarian: 'Dra. Maria Santos',
      room: 'Internação 02',
      medicationsToday: 2,
      medicationsPending: 0
    },
    {
      id: '3',
      petName: 'Max',
      owner: 'Ana Costa',
      startDate: '2024-11-14',
      status: 'critico',
      reason: 'Insuficiência renal',
      veterinarian: 'Dr. Pedro Costa',
      room: 'UTI 02',
      medicationsToday: 5,
      medicationsPending: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'observacao': return 'bg-yellow-100 text-yellow-800';
      case 'critico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo': return <Activity className="w-4 h-4 text-green-600" />;
      case 'observacao': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'critico': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <PageLayout title="Internamentos">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Pacientes Internados</h2>
            <p className="text-gray-600">Gestão de internamentos e medicações</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => navigate('/painel-internamento')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Painel Tempo Real
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsNewInternmentOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Internamento
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600">Internamentos Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-gray-600">Estado Crítico</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600">Medicações Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">10</p>
                  <p className="text-sm text-gray-600">Doses Aplicadas Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Internamentos</CardTitle>
            <CardDescription>Pacientes atualmente internados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {internments.map((internment) => (
                <div key={internment.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(internment.status)}
                        <div>
                          <h3 className="font-medium text-lg">{internment.petName}</h3>
                          <p className="text-sm text-gray-600">{internment.owner}</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="font-medium">{internment.room}</p>
                        <p className="text-sm text-gray-600">{internment.reason}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="font-medium">{internment.veterinarian}</p>
                        <p className="text-sm text-gray-600">Desde {new Date(internment.startDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge className={getStatusColor(internment.status)}>
                          {internment.status === 'ativo' ? 'Estável' : 
                           internment.status === 'observacao' ? 'Observação' : 'Crítico'}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {internment.medicationsToday} doses hoje • {internment.medicationsPending} pendentes
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <NovoInternamentoModal
          open={isNewInternmentOpen}
          onOpenChange={setIsNewInternmentOpen}
          onSuccess={() => {
            // Refresh data
          }}
        />
      </div>
    </PageLayout>
  );
};

export default Internamentos;
