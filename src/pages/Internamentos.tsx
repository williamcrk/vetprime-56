
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pill, AlertCircle, Clock, TrendingUp, Syringe, Calendar, Activity } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useNavigate } from 'react-router-dom';

const Internamentos = () => {
  const navigate = useNavigate();
  
  const inpatients = [
    { 
      name: 'Buddy', 
      owner: 'Pedro Alves', 
      phone: '11999887766',
      condition: 'Pós-cirúrgico - Fratura de fêmur', 
      status: 'Estável', 
      admitted: '10/11/2024',
      veterinarian: 'Dr. João Silva',
      room: 'Internação 01',
      nextMedication: '14:00 - Antibiótico 5ml',
      medicationsToday: 3,
      medicationsApplied: 2
    },
    { 
      name: 'Princesa', 
      owner: 'Lucia Rocha', 
      phone: '11988776655',
      condition: 'Gastroenterite severa', 
      status: 'Crítico', 
      admitted: '12/11/2024',
      veterinarian: 'Dra. Maria Santos',
      room: 'UTI 01',
      nextMedication: '15:30 - Soro 100ml',
      medicationsToday: 4,
      medicationsApplied: 1
    },
    { 
      name: 'Simba', 
      owner: 'Roberto Dias', 
      phone: '11977665544',
      condition: 'Recuperação de cirurgia cardíaca', 
      status: 'Estável', 
      admitted: '08/11/2024',
      veterinarian: 'Dr. Pedro Costa',
      room: 'Internação 02',
      nextMedication: '16:00 - Anti-inflamatório 3ml',
      medicationsToday: 2,
      medicationsApplied: 2
    },
    { 
      name: 'Mel', 
      owner: 'Sandra Oliveira', 
      phone: '11966554433',
      condition: 'Intoxicação alimentar', 
      status: 'Crítico', 
      admitted: '13/11/2024',
      veterinarian: 'Dr. João Silva',
      room: 'UTI 02',
      nextMedication: '13:45 - Antídoto 2ml (ATRASADO)',
      medicationsToday: 5,
      medicationsApplied: 2
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
  const overdueMedications = inpatients.filter(p => p.nextMedication.includes('ATRASADO')).length;

  return (
    <PageLayout title="Internamentos">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Internamentos</h1>
            <p className="text-gray-600">Gestão completa de pacientes internados</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/painel-internamento')} className="bg-blue-600 hover:bg-blue-700">
              <Activity className="w-4 h-4 mr-2" />
              Painel Tempo Real
            </Button>
          </div>
        </div>

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
                <Syringe className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{overdueMedications}</p>
                  <p className="text-sm text-gray-600">Medicações Atrasadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pacientes Internados</CardTitle>
            <CardDescription>Lista de todos os pacientes em internação com controle de medicação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inpatients.map((patient, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-medium text-lg">{patient.name}</h3>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                        {patient.nextMedication.includes('ATRASADO') && (
                          <Badge className="bg-red-100 text-red-800 animate-pulse">
                            MEDICAÇÃO ATRASADA
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Tutor:</p>
                          <p className="font-medium">{patient.owner}</p>
                          <WhatsAppButton 
                            phone={patient.phone}
                            message={`Olá ${patient.owner}! Temos atualizações sobre o ${patient.name}. Entre em contato conosco.`}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <p className="text-gray-600">Veterinário:</p>
                          <p className="font-medium">{patient.veterinarian}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Local:</p>
                          <p className="font-medium">{patient.room}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Medicações Hoje:</p>
                          <p className="font-medium">
                            {patient.medicationsApplied}/{patient.medicationsToday}
                            <span className="text-xs text-gray-500 ml-1">aplicadas</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600 text-sm">Condição:</p>
                          <p className="font-medium">{patient.condition}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Próxima Medicação:</p>
                          <p className={`font-medium ${patient.nextMedication.includes('ATRASADO') ? 'text-red-600' : ''}`}>
                            {patient.nextMedication}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">
                          Internado em: {patient.admitted}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        Ver Prontuário
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Syringe className="w-3 h-3 mr-1" />
                        Aplicar Medicação
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Atualizar Status
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
