
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, AlertTriangle, CheckCircle, Syringe, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MedicationAlert {
  id: string;
  petName: string;
  medication: string;
  dosage: string;
  scheduledTime: string;
  status: 'pending' | 'overdue' | 'applied';
  veterinarian: string;
  roomNumber: string;
  patientStatus: 'stable' | 'critical' | 'observation';
}

const PainelInternamentoTempo = () => {
  const [alerts, setAlerts] = useState<MedicationAlert[]>([
    {
      id: '1',
      petName: 'Buddy',
      medication: 'Antibiótico',
      dosage: '5ml',
      scheduledTime: '14:00',
      status: 'overdue',
      veterinarian: 'Dr. João Silva',
      roomNumber: 'UTI 01',
      patientStatus: 'stable'
    },
    {
      id: '2',
      petName: 'Luna',
      medication: 'Anti-inflamatório',
      dosage: '3ml',
      scheduledTime: '15:30',
      status: 'pending',
      veterinarian: 'Dra. Maria Santos',
      roomNumber: 'Internação 02',
      patientStatus: 'critical'
    },
    {
      id: '3',
      petName: 'Max',
      medication: 'Soro',
      dosage: '100ml',
      scheduledTime: '16:00',
      status: 'applied',
      veterinarian: 'Dr. Pedro Costa',
      roomNumber: 'Internação 01',
      patientStatus: 'observation'
    }
  ]);

  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (notifications) {
      const overdueCount = alerts.filter(alert => alert.status === 'overdue').length;
      if (overdueCount > 0) {
        // Notificação visual não intrusiva
        toast({
          title: "Medicações em atraso",
          description: `${overdueCount} dose(s) precisam ser aplicadas`,
          duration: 5000,
        });
      }
    }
  }, [alerts, notifications]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPatientStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'observation': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleApplyMedication = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'applied' as const }
        : alert
    ));
    
    toast({
      title: "Medicação aplicada",
      description: "Dose registrada com sucesso",
    });
  };

  const pendingAlerts = alerts.filter(a => a.status !== 'applied');
  const overdueAlerts = alerts.filter(a => a.status === 'overdue');
  const appliedToday = alerts.filter(a => a.status === 'applied');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📊 Painel de Internamento - Tempo Real</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={notifications ? "default" : "outline"}
            size="sm"
            onClick={() => setNotifications(!notifications)}
          >
            <Bell className="w-4 h-4 mr-2" />
            {notifications ? "Notificações ON" : "Notificações OFF"}
          </Button>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">{overdueAlerts.length}</p>
                <p className="text-sm text-gray-600">Doses em Atraso</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{pendingAlerts.length}</p>
                <p className="text-sm text-gray-600">Doses Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{appliedToday.length}</p>
                <p className="text-sm text-gray-600">Aplicadas Hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Syringe className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{alerts.length}</p>
                <p className="text-sm text-gray-600">Total Medicações</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Medicações */}
      <Card>
        <CardHeader>
          <CardTitle>Medicações Programadas</CardTitle>
          <CardDescription>Status em tempo real das aplicações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 border rounded-lg hover:bg-gray-50 ${
                  alert.status === 'overdue' ? 'border-red-300 bg-red-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(alert.status)}
                      <div>
                        <h3 className="font-medium text-lg">{alert.petName}</h3>
                        <p className="text-sm text-gray-600">{alert.roomNumber}</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-medium">{alert.medication}</p>
                      <p className="text-sm text-gray-600">{alert.dosage}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-medium">{alert.scheduledTime}</p>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status === 'applied' ? 'Aplicada' : 
                         alert.status === 'pending' ? 'Pendente' : 'Atrasada'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <User className="w-3 h-3" />
                        <span className="text-xs">{alert.veterinarian}</span>
                      </div>
                      <Badge className={getPatientStatusColor(alert.patientStatus)}>
                        {alert.patientStatus === 'stable' ? 'Estável' : 
                         alert.patientStatus === 'observation' ? 'Observação' : 'Crítico'}
                      </Badge>
                    </div>
                    
                    {alert.status !== 'applied' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleApplyMedication(alert.id)}
                      >
                        <Syringe className="w-3 h-3 mr-1" />
                        Aplicar Agora
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
  );
};

export default PainelInternamentoTempo;
