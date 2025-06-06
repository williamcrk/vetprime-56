import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import NovaVacinacaoModal from '@/components/vacinas/NovaVacinacaoModal';
import { useToast } from '@/hooks/use-toast';

const Vacinas = () => {
  const { toast } = useToast();
  const [isNewVaccinationOpen, setIsNewVaccinationOpen] = useState(false);

  const vaccinations = [
    { 
      pet: 'Rex', 
      owner: 'Maria Silva', 
      vaccine: 'V10 (Déctupla)', 
      lastDate: '15/10/2024',
      nextDate: '15/10/2025',
      status: 'Em dia',
      veterinarian: 'Dr. João Silva'
    },
    { 
      pet: 'Luna', 
      owner: 'João Santos', 
      vaccine: 'Antirrábica', 
      lastDate: '12/11/2024',
      nextDate: '12/11/2025',
      status: 'Em dia',
      veterinarian: 'Dra. Maria Santos'
    },
    { 
      pet: 'Thor', 
      owner: 'Ana Costa', 
      vaccine: 'V10 (Déctupla)', 
      lastDate: '10/05/2024',
      nextDate: '10/05/2025',
      status: 'Vencendo',
      veterinarian: 'Dr. Pedro Costa'
    },
    { 
      pet: 'Mimi', 
      owner: 'Carlos Lima', 
      vaccine: 'V8 (Óctupla)', 
      lastDate: '08/01/2024',
      nextDate: '08/01/2025',
      status: 'Atrasada',
      veterinarian: 'Dr. João Silva'
    },
  ];

  const upcomingVaccinations = [
    { date: '18/11/2024', pet: 'Buddy', owner: 'Pedro Alves', vaccine: 'Antirrábica', time: '09:00' },
    { date: '20/11/2024', pet: 'Princesa', owner: 'Lucia Rocha', vaccine: 'V10', time: '10:30' },
    { date: '22/11/2024', pet: 'Max', owner: 'Sandra Oliveira', vaccine: 'V8', time: '14:00' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em dia': return 'bg-green-100 text-green-800';
      case 'Vencendo': return 'bg-yellow-100 text-yellow-800';
      case 'Atrasada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Em dia': return <CheckCircle className="w-4 h-4" />;
      case 'Vencendo': return <Clock className="w-4 h-4" />;
      case 'Atrasada': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const upToDateCount = vaccinations.filter(v => v.status === 'Em dia').length;
  const expiringSoonCount = vaccinations.filter(v => v.status === 'Vencendo').length;
  const overdueCount = vaccinations.filter(v => v.status === 'Atrasada').length;

  const handleUpdateVaccination = (vaccination: any) => {
    toast({
      title: "Vacinação Atualizada",
      description: `Status de ${vaccination.pet} atualizado`,
    });
  };

  const handleConfirmAppointment = (appointment: any) => {
    toast({
      title: "Consulta Confirmada",
      description: `Vacinação de ${appointment.pet} confirmada para ${appointment.date}`,
    });
  };

  return (
    <PageLayout title="Controle de Vacinas">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{vaccinations.length}</p>
                  <p className="text-sm text-gray-600">Total de Pacientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{upToDateCount}</p>
                  <p className="text-sm text-gray-600">Em Dia</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{expiringSoonCount}</p>
                  <p className="text-sm text-gray-600">Vencendo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{overdueCount}</p>
                  <p className="text-sm text-gray-600">Atrasadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Status das Vacinas</CardTitle>
              <CardDescription>Controle do status vacinal dos pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vaccinations.map((vaccination, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{vaccination.pet}</h3>
                        <Badge className={getStatusColor(vaccination.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(vaccination.status)}
                            {vaccination.status}
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{vaccination.owner}</p>
                      <p className="text-sm font-medium">{vaccination.vaccine}</p>
                      <p className="text-xs text-gray-500">
                        Última: {vaccination.lastDate} • Próxima: {vaccination.nextDate}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUpdateVaccination(vaccination)}
                    >
                      Atualizar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Vacinações</CardTitle>
              <CardDescription>Vacinações agendadas para os próximos dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingVaccinations.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{appointment.date} - {appointment.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{appointment.pet} - {appointment.owner}</p>
                      <p className="text-sm font-medium text-blue-600">{appointment.vaccine}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleConfirmAppointment(appointment)}
                    >
                      Confirmar
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsNewVaccinationOpen(true)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Agendar Nova Vacinação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <NovaVacinacaoModal
          open={isNewVaccinationOpen}
          onOpenChange={setIsNewVaccinationOpen}
          onSuccess={() => {
            // Refresh data
          }}
        />
      </div>
    </PageLayout>
  );
};

export default Vacinas;
