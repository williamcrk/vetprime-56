
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus } from 'lucide-react';

const Agenda = () => {
  const appointments = [
    { time: '09:00', pet: 'Rex', owner: 'Maria Silva', type: 'Consulta de rotina', status: 'confirmado' },
    { time: '09:30', pet: 'Luna', owner: 'João Santos', type: 'Vacinação', status: 'confirmado' },
    { time: '10:00', pet: 'Thor', owner: 'Ana Costa', type: 'Check-up', status: 'pendente' },
    { time: '10:30', pet: 'Mimi', owner: 'Carlos Lima', type: 'Consulta urgente', status: 'em andamento' },
    { time: '11:00', pet: 'Buddy', owner: 'Pedro Alves', type: 'Retorno', status: 'confirmado' },
    { time: '11:30', pet: 'Princesa', owner: 'Lucia Rocha', type: 'Cirurgia', status: 'confirmado' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'em andamento': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout title="Agenda">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-medium">Hoje - {new Date().toLocaleDateString()}</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Consultas do Dia</CardTitle>
              <CardDescription>6 consultas agendadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {appointment.time}
                      </div>
                      <div>
                        <p className="font-medium">{appointment.pet}</p>
                        <p className="text-sm text-gray-600">{appointment.owner}</p>
                        <p className="text-xs text-gray-500">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <Button variant="outline" size="sm">Ver</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo Semanal</CardTitle>
              <CardDescription>Estatísticas da semana</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Consultas realizadas</span>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex justify-between">
                  <span>Cirurgias</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergências</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de ocupação</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Agenda;
