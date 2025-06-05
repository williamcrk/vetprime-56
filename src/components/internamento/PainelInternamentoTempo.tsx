
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Clock, AlertTriangle, CheckCircle, Syringe, User, Volume2, VolumeX } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import WhatsAppButton from '@/components/WhatsAppButton';

interface MedicationAlert {
  id: string;
  petName: string;
  medication: string;
  dosage: string;
  scheduledTime: string;
  status: 'pending' | 'overdue' | 'applied';
  veterinarian: string;
  veterinarianPhone: string;
  roomNumber: string;
  patientStatus: 'stable' | 'critical' | 'observation';
  ownerPhone: string;
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
      veterinarianPhone: '11999998888',
      roomNumber: 'UTI 01',
      patientStatus: 'stable',
      ownerPhone: '11999887766'
    },
    {
      id: '2',
      petName: 'Luna',
      medication: 'Anti-inflamatório',
      dosage: '3ml',
      scheduledTime: '15:30',
      status: 'pending',
      veterinarian: 'Dra. Maria Santos',
      veterinarianPhone: '11988776655',
      roomNumber: 'Internação 02',
      patientStatus: 'critical',
      ownerPhone: '11977665544'
    },
    {
      id: '3',
      petName: 'Max',
      medication: 'Soro',
      dosage: '100ml',
      scheduledTime: '16:00',
      status: 'applied',
      veterinarian: 'Dr. Pedro Costa',
      veterinarianPhone: '11966554433',
      roomNumber: 'Internação 01',
      patientStatus: 'observation',
      ownerPhone: '11955443322'
    }
  ]);

  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (notifications) {
      const overdueCount = alerts.filter(alert => alert.status === 'overdue').length;
      if (overdueCount > 0) {
        // Som de alerta não intrusivo
        if (soundEnabled) {
          // Aqui você pode adicionar um som suave
          console.log('🔔 Alerta sonoro: Medicações em atraso');
        }
        
        toast({
          title: "⚠️ Medicações em atraso",
          description: `${overdueCount} dose(s) precisam ser aplicadas urgentemente`,
          duration: 5000,
        });
      }
    }
  }, [alerts, notifications, soundEnabled]);

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
      case 'critical': return 'bg-red-100 text-red-800 animate-pulse';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600 animate-bounce" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleApplyMedication = (alertId: string) => {
    const alert = alerts.find(a => a.id === alertId);
    if (!alert) return;

    setAlerts(prev => prev.map(a => 
      a.id === alertId 
        ? { ...a, status: 'applied' as const }
        : a
    ));
    
    toast({
      title: "✅ Medicação aplicada",
      description: `${alert.medication} (${alert.dosage}) aplicado em ${alert.petName}`,
    });

    // Simular baixa no estoque e cobrança
    setTimeout(() => {
      toast({
        title: "📦 Estoque atualizado",
        description: `${alert.medication} removido do estoque automaticamente`,
      });
    }, 1000);

    setTimeout(() => {
      toast({
        title: "💰 Cobrança adicionada",
        description: `Valor da medicação adicionado ao orçamento do cliente`,
      });
    }, 2000);
  };

  const pendingAlerts = alerts.filter(a => a.status !== 'applied');
  const overdueAlerts = alerts.filter(a => a.status === 'overdue');
  const appliedToday = alerts.filter(a => a.status === 'applied');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📊 Painel de Internamento - Tempo Real</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-sm">Som</span>
          </div>
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

      {/* Resumo com animações */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={overdueAlerts.length > 0 ? 'border-red-300 shadow-red-100' : ''}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`w-5 h-5 text-red-500 ${overdueAlerts.length > 0 ? 'animate-pulse' : ''}`} />
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

      {/* Lista de Medicações com integração WhatsApp */}
      <Card>
        <CardHeader>
          <CardTitle>Medicações Programadas - Tempo Real</CardTitle>
          <CardDescription>Status em tempo real das aplicações • Clique nos números para contato via WhatsApp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 border rounded-lg transition-all duration-300 hover:shadow-md ${
                  alert.status === 'overdue' ? 'border-red-300 bg-red-50 shadow-red-100' : 
                  alert.patientStatus === 'critical' ? 'border-orange-300 bg-orange-50' : 'hover:bg-gray-50'
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
                      <p className="font-medium text-lg">{alert.scheduledTime}</p>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status === 'applied' ? '✅ Aplicada' : 
                         alert.status === 'pending' ? '⏳ Pendente' : '🚨 Atrasada'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-3 h-3" />
                        <span className="text-xs">{alert.veterinarian}</span>
                        <WhatsAppButton
                          phone={alert.veterinarianPhone}
                          message={`Olá Dr(a)! Lembrete: ${alert.medication} ${alert.dosage} para ${alert.petName} às ${alert.scheduledTime}`}
                          size="sm"
                          variant="ghost"
                        />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <WhatsAppButton
                          phone={alert.ownerPhone}
                          message={`Olá! Informamos que ${alert.petName} recebeu a medicação ${alert.medication} conforme prescrito. Atenciosamente, Clínica VetPrime.`}
                          size="sm"
                          variant="outline"
                        />
                      </div>
                      <Badge className={getPatientStatusColor(alert.patientStatus)}>
                        {alert.patientStatus === 'stable' ? '💚 Estável' : 
                         alert.patientStatus === 'observation' ? '🟡 Observação' : '🔴 Crítico'}
                      </Badge>
                    </div>
                    
                    {alert.status !== 'applied' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
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

      {/* Alertas automáticos para doses críticas */}
      {overdueAlerts.length > 0 && (
        <Card className="border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
              ⚠️ ATENÇÃO: Medicações em Atraso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {overdueAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-2 bg-white rounded border-l-4 border-red-500">
                  <span className="font-medium">
                    {alert.petName} - {alert.medication} ({alert.dosage}) - Previsto: {alert.scheduledTime}
                  </span>
                  <div className="flex gap-2">
                    <WhatsAppButton
                      phone={alert.veterinarianPhone}
                      message={`🚨 URGENTE: ${alert.medication} para ${alert.petName} está atrasado (previsto ${alert.scheduledTime})`}
                      size="sm"
                    />
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleApplyMedication(alert.id)}
                    >
                      Aplicar Agora
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PainelInternamentoTempo;
