
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, BellOff, Volume2, VolumeX, Clock, AlertTriangle, CheckCircle, Heart, Pill, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WhatsAppButton from '@/components/WhatsAppButton';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  applied: boolean;
  overdue: boolean;
  appliedBy?: string;
  notes?: string;
}

interface Patient {
  id: string;
  name: string;
  species: string;
  owner: string;
  phone: string;
  status: 'estavel' | 'critico' | 'observacao';
  entryDate: string;
  medications: Medication[];
  veterinarian: string;
  lastCheck: string;
}

const PainelInternamentoTempo = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data - em produção viria do banco
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Rex',
      species: 'Cão',
      owner: 'Maria Silva',
      phone: '(11) 99999-9999',
      status: 'estavel',
      entryDate: '2024-01-15T08:00:00',
      veterinarian: 'Dr. João Silva',
      lastCheck: '2024-01-15T14:30:00',
      medications: [
        { id: '1', name: 'Antibiótico', dosage: '5ml', time: '08:00', applied: true, overdue: false, appliedBy: 'Dr. João' },
        { id: '2', name: 'Anti-inflamatório', dosage: '2ml', time: '14:00', applied: true, overdue: false, appliedBy: 'Enf. Ana' },
        { id: '3', name: 'Antibiótico', dosage: '5ml', time: '20:00', applied: false, overdue: true },
      ]
    },
    {
      id: '2',
      name: 'Luna',
      species: 'Gato',
      owner: 'João Santos',
      phone: '(11) 88888-8888',
      status: 'critico',
      entryDate: '2024-01-15T10:00:00',
      veterinarian: 'Dra. Maria Santos',
      lastCheck: '2024-01-15T15:00:00',
      medications: [
        { id: '4', name: 'Soro', dosage: '100ml/h', time: '10:00', applied: true, overdue: false, appliedBy: 'Dra. Maria' },
        { id: '5', name: 'Vitamina B', dosage: '1ml', time: '16:00', applied: false, overdue: false },
      ]
    }
  ]);

  // Atualizar horário a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Verificar medicações atrasadas
  useEffect(() => {
    if (!notifications) return;

    const checkOverdueMedications = () => {
      patients.forEach(patient => {
        patient.medications.forEach(med => {
          if (!med.applied && !med.overdue) {
            const [hours, minutes] = med.time.split(':').map(Number);
            const medTime = new Date();
            medTime.setHours(hours, minutes, 0, 0);
            
            if (currentTime > medTime) {
              // Medicação atrasada
              if (sound) {
                // Reproduzir som de notificação
                const audio = new Audio('/notification.mp3');
                audio.play().catch(() => {});
              }
              
              toast({
                title: "Medicação Atrasada!",
                description: `${patient.name}: ${med.name} (${med.dosage}) - ${med.time}`,
                variant: "destructive",
              });
              
              // Marcar como atrasada
              med.overdue = true;
            }
          }
        });
      });
    };

    checkOverdueMedications();
  }, [currentTime, patients, notifications, sound, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'estavel': return 'bg-green-100 text-green-800 border-green-200';
      case 'critico': return 'bg-red-100 text-red-800 border-red-200 animate-pulse';
      case 'observacao': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'estavel': return <CheckCircle className="w-4 h-4" />;
      case 'critico': return <AlertTriangle className="w-4 h-4" />;
      case 'observacao': return <Clock className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const applyMedication = (patientId: string, medicationId: string) => {
    setPatients(prev => prev.map(patient => {
      if (patient.id === patientId) {
        return {
          ...patient,
          medications: patient.medications.map(med => {
            if (med.id === medicationId) {
              return {
                ...med,
                applied: true,
                overdue: false,
                appliedBy: 'Dr. João Silva', // Pegar do usuário logado
                notes: 'Aplicado conforme prescrito'
              };
            }
            return med;
          })
        };
      }
      return patient;
    }));

    toast({
      title: "Medicação Aplicada!",
      description: "Medicação registrada com sucesso.",
    });
  };

  const totalPatients = patients.length;
  const criticalPatients = patients.filter(p => p.status === 'critico').length;
  const overdueMedications = patients.reduce((acc, p) => 
    acc + p.medications.filter(m => m.overdue).length, 0
  );

  return (
    <div className="space-y-6">
      {/* Controles de Notificação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Configurações de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="notifications" 
                checked={notifications}
                onCheckedChange={setNotifications}
              />
              <Label htmlFor="notifications" className="flex items-center gap-1">
                {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                Notificações Visuais
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="sound" 
                checked={sound}
                onCheckedChange={setSound}
              />
              <Label htmlFor="sound" className="flex items-center gap-1">
                {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                Alertas Sonoros
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{totalPatients}</p>
                <p className="text-sm text-gray-600">Pacientes Internados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{criticalPatients}</p>
                <p className="text-sm text-gray-600">Estado Crítico</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{overdueMedications}</p>
                <p className="text-sm text-gray-600">Doses Atrasadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Pacientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {patients.map((patient) => (
          <Card key={patient.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {patient.name}
                    <Badge className={getStatusColor(patient.status)}>
                      {getStatusIcon(patient.status)}
                      {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {patient.species} • Tutor: {patient.owner}
                  </CardDescription>
                </div>
                <WhatsAppButton 
                  phone={patient.phone}
                  message={`Olá ${patient.owner}! Temos atualizações sobre ${patient.name}.`}
                  size="sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Veterinário:</p>
                    <p className="font-medium flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {patient.veterinarian}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Entrada:</p>
                    <p className="font-medium">
                      {new Date(patient.entryDate).toLocaleDateString()} às{' '}
                      {new Date(patient.entryDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-1">
                    <Pill className="w-4 h-4" />
                    Medicações
                  </h4>
                  <div className="space-y-2">
                    {patient.medications.map((med) => (
                      <div key={med.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 bg-gray-50 rounded gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{med.name}</p>
                          <p className="text-xs text-gray-600">
                            {med.dosage} às {med.time}
                            {med.appliedBy && ` • Aplicado por ${med.appliedBy}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {med.applied ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Aplicado
                            </Badge>
                          ) : med.overdue ? (
                            <Badge className="bg-red-100 text-red-800 animate-pulse">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Atrasado
                            </Badge>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => applyMedication(patient.id, med.id)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Aplicar Agora
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {patients.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Nenhum paciente internado no momento</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PainelInternamentoTempo;
