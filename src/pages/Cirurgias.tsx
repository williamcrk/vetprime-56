
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scissors, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Cirurgias = () => {
  const surgeries = [
    { 
      id: 'CIR001',
      pet: 'Thor', 
      owner: 'Ana Costa', 
      procedure: 'Castração', 
      status: 'Concluída', 
      date: '10/11/2024',
      time: '09:00',
      veterinarian: 'Dr. Pedro Costa',
      duration: '45 min',
      room: 'Centro Cirúrgico 1'
    },
    { 
      id: 'CIR002',
      pet: 'Buddy', 
      owner: 'Pedro Alves', 
      procedure: 'Correção de fratura - Fêmur', 
      status: 'Agendada', 
      date: '16/11/2024',
      time: '14:00',
      veterinarian: 'Dr. João Silva',
      duration: '2h 30min',
      room: 'Centro Cirúrgico 2'
    },
    { 
      id: 'CIR003',
      pet: 'Princesa', 
      owner: 'Lucia Rocha', 
      procedure: 'Remoção de tumor', 
      status: 'Em andamento', 
      date: '15/11/2024',
      time: '10:30',
      veterinarian: 'Dra. Maria Santos',
      duration: '1h 45min',
      room: 'Centro Cirúrgico 1'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluída': return 'bg-green-100 text-green-800';
      case 'Em andamento': return 'bg-blue-100 text-blue-800';
      case 'Agendada': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Concluída': return <CheckCircle className="w-4 h-4" />;
      case 'Em andamento': return <Clock className="w-4 h-4" />;
      case 'Agendada': return <Clock className="w-4 h-4" />;
      case 'Cancelada': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const completedCount = surgeries.filter(s => s.status === 'Concluída').length;
  const scheduledCount = surgeries.filter(s => s.status === 'Agendada').length;
  const inProgressCount = surgeries.filter(s => s.status === 'Em andamento').length;

  return (
    <PageLayout title="Cirurgias">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{surgeries.length}</p>
                  <p className="text-sm text-gray-600">Total de Cirurgias</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-sm text-gray-600">Concluídas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{scheduledCount}</p>
                  <p className="text-sm text-gray-600">Agendadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{inProgressCount}</p>
                  <p className="text-sm text-gray-600">Em Andamento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Agenda Cirúrgica</CardTitle>
            <CardDescription>Todas as cirurgias programadas e realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {surgeries.map((surgery, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-lg">Cirurgia #{surgery.id}</h3>
                        <Badge className={getStatusColor(surgery.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(surgery.status)}
                            {surgery.status}
                          </div>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Paciente:</p>
                          <p className="font-medium">{surgery.pet}</p>
                          <p className="text-xs text-gray-500">{surgery.owner}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Data/Hora:</p>
                          <p className="font-medium">{surgery.date}</p>
                          <p className="text-xs text-gray-500">{surgery.time}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Veterinário:</p>
                          <p className="font-medium">{surgery.veterinarian}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Local:</p>
                          <p className="font-medium">{surgery.room}</p>
                          <p className="text-xs text-gray-500">Duração: {surgery.duration}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-gray-600 text-sm">Procedimento:</p>
                        <p className="font-medium">{surgery.procedure}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                      {surgery.status === 'Agendada' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Iniciar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Cirurgias;
