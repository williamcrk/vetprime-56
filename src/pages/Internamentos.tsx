
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pill, AlertCircle, Clock, TrendingUp } from 'lucide-react';

const Internamentos = () => {
  const inpatients = [
    { 
      name: 'Buddy', 
      owner: 'Pedro Alves', 
      condition: 'Pós-cirúrgico - Fratura de fêmur', 
      status: 'Estável', 
      admitted: '10/11/2024',
      veterinarian: 'Dr. João Silva',
      room: 'Internação 01'
    },
    { 
      name: 'Princesa', 
      owner: 'Lucia Rocha', 
      condition: 'Gastroenterite severa', 
      status: 'Crítico', 
      admitted: '12/11/2024',
      veterinarian: 'Dra. Maria Santos',
      room: 'UTI 01'
    },
    { 
      name: 'Simba', 
      owner: 'Roberto Dias', 
      condition: 'Recuperação de cirurgia cardíaca', 
      status: 'Estável', 
      admitted: '08/11/2024',
      veterinarian: 'Dr. Pedro Costa',
      room: 'Internação 02'
    },
    { 
      name: 'Mel', 
      owner: 'Sandra Oliveira', 
      condition: 'Intoxicação alimentar', 
      status: 'Crítico', 
      admitted: '13/11/2024',
      veterinarian: 'Dr. João Silva',
      room: 'UTI 02'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Estável': return 'bg-green-100 text-green-800';
      case 'Crítico': return 'bg-red-100 text-red-800';
      case 'Observação': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const criticalCount = inpatients.filter(p => p.status === 'Crítico').length;
  const stableCount = inpatients.filter(p => p.status === 'Estável').length;

  return (
    <PageLayout title="Internamentos">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{inpatients.length}</p>
                  <p className="text-sm text-gray-600">Total Internados</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{criticalCount}</p>
                  <p className="text-sm text-gray-600">Estado Crítico</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stableCount}</p>
                  <p className="text-sm text-gray-600">Estado Estável</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">3.2</p>
                  <p className="text-sm text-gray-600">Dias médios</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pacientes Internados</CardTitle>
            <CardDescription>Lista de todos os pacientes em internação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inpatients.map((patient, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-lg">{patient.name}</h3>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Tutor:</p>
                          <p className="font-medium">{patient.owner}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Veterinário:</p>
                          <p className="font-medium">{patient.veterinarian}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Local:</p>
                          <p className="font-medium">{patient.room}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-gray-600 text-sm">Condição:</p>
                        <p className="font-medium">{patient.condition}</p>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">
                          Internado em: {patient.admitted}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver Prontuário
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Atualizar
                      </Button>
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

export default Internamentos;
