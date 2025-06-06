
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Plus, Eye, Phone, MessageCircle } from 'lucide-react';

const Agenda = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([
    { id: '1', time: '09:00', pet: 'Rex', owner: 'Maria Silva', phone: '11999999999', type: 'Consulta de rotina', status: 'confirmado' },
    { id: '2', time: '09:30', pet: 'Luna', owner: 'João Santos', phone: '11888888888', type: 'Vacinação', status: 'confirmado' },
    { id: '3', time: '10:00', pet: 'Thor', owner: 'Ana Costa', phone: '11777777777', type: 'Check-up', status: 'pendente' },
    { id: '4', time: '10:30', pet: 'Mimi', owner: 'Carlos Lima', phone: '11666666666', type: 'Consulta urgente', status: 'em andamento' },
    { id: '5', time: '11:00', pet: 'Buddy', owner: 'Pedro Alves', phone: '11555555555', type: 'Retorno', status: 'confirmado' },
    { id: '6', time: '11:30', pet: 'Princesa', owner: 'Lucia Rocha', phone: '11444444444', type: 'Cirurgia', status: 'confirmado' },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    time: '',
    pet: '',
    owner: '',
    phone: '',
    type: '',
    status: 'pendente'
  });

  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'em andamento': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewAppointment = () => {
    if (!newAppointment.time || !newAppointment.pet || !newAppointment.owner) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const appointment = {
      id: Date.now().toString(),
      ...newAppointment
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      time: '',
      pet: '',
      owner: '',
      phone: '',
      type: '',
      status: 'pendente'
    });
    setIsNewAppointmentOpen(false);

    toast({
      title: "Sucesso!",
      description: `Consulta agendada para ${appointment.pet} às ${appointment.time}`,
    });
  };

  const handleViewAppointment = (appointment: any) => {
    toast({
      title: "Detalhes da Consulta",
      description: `${appointment.pet} - ${appointment.owner} - ${appointment.type}`,
    });
  };

  const handleWhatsApp = (phone: string, petName: string) => {
    const message = `Olá! Confirmando consulta do ${petName} agendada para hoje.`;
    window.open(`https://wa.me/55${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
    
    toast({
      title: "Status atualizado",
      description: `Consulta marcada como ${newStatus}`,
    });
  };

  return (
    <PageLayout title="Agenda">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-medium">Hoje - {new Date().toLocaleDateString()}</span>
          </div>
          
          <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Agendamento</DialogTitle>
                <DialogDescription>
                  Agende uma nova consulta para hoje
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Horário *</Label>
                    <Input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Nome do Pet *</Label>
                    <Input
                      value={newAppointment.pet}
                      onChange={(e) => setNewAppointment({...newAppointment, pet: e.target.value})}
                      placeholder="Ex: Rex"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tutor *</Label>
                    <Input
                      value={newAppointment.owner}
                      onChange={(e) => setNewAppointment({...newAppointment, owner: e.target.value})}
                      placeholder="Ex: Maria Silva"
                    />
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <Input
                      value={newAppointment.phone}
                      onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                      placeholder="Ex: 11999999999"
                    />
                  </div>
                </div>

                <div>
                  <Label>Tipo de Consulta</Label>
                  <Select onValueChange={(value) => setNewAppointment({...newAppointment, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consulta de rotina">Consulta de rotina</SelectItem>
                      <SelectItem value="Vacinação">Vacinação</SelectItem>
                      <SelectItem value="Check-up">Check-up</SelectItem>
                      <SelectItem value="Emergência">Emergência</SelectItem>
                      <SelectItem value="Cirurgia">Cirurgia</SelectItem>
                      <SelectItem value="Retorno">Retorno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleNewAppointment} className="bg-blue-600 hover:bg-blue-700">
                    Agendar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Consultas do Dia</CardTitle>
              <CardDescription>{appointments.length} consultas agendadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                      <Select
                        value={appointment.status}
                        onValueChange={(value) => handleStatusChange(appointment.id, value)}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="confirmado">Confirmado</SelectItem>
                          <SelectItem value="em andamento">Em andamento</SelectItem>
                          <SelectItem value="concluido">Concluído</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Ver
                      </Button>
                      
                      {appointment.phone && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleWhatsApp(appointment.phone, appointment.pet)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <MessageCircle className="w-3 h-3" />
                        </Button>
                      )}
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
