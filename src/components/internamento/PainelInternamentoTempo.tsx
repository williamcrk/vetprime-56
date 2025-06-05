import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, Clock, AlertTriangle, Syringe, Pill, 
  CheckCircle, Users, Bell, Heart, TrendingUp,
  Calendar, User, Phone, Droplets, Timer
} from 'lucide-react';

const PainelInternamentoTempo = () => {
  const { toast } = useToast();
  const [medicationModalOpen, setMedicationModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  
  const [medicationForm, setMedicationForm] = useState({
    medication: '',
    dosage: '',
    route: '',
    time: '',
    observations: '',
    materials: []
  });

  const pacientes = [
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
      medicationsPending: 1,
      phone: '11999998888',
      medications: [
        { id: 'M1', name: 'Dipirona', dosage: '20mg/kg', route: 'IV', frequency: '8/8h', lastApplied: '08:00' },
        { id: 'M2', name: 'Cefazolina', dosage: '30mg/kg', route: 'IV', frequency: '6/6h', lastApplied: '10:00' },
        { id: 'M3', name: 'Tramadol', dosage: '2mg/kg', route: 'IM', frequency: '12/12h', lastApplied: '12:00' }
      ]
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
      medicationsPending: 0,
      phone: '11888887777',
      medications: [
        { id: 'M4', name: 'Metoclopramida', dosage: '0.5mg/kg', route: 'SC', frequency: '8/8h', lastApplied: '09:00' },
        { id: 'M5', name: 'Ranitidina', dosage: '2mg/kg', route: 'IV', frequency: '12/12h', lastApplied: '11:00' }
      ]
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
      medicationsPending: 2,
      phone: '11777776666',
      medications: [
        { id: 'M6', name: 'Furosemida', dosage: '2mg/kg', route: 'IV', frequency: '8/8h', lastApplied: '07:00' },
        { id: 'M7', name: 'Manitol', dosage: '0.5g/kg', route: 'IV', frequency: '6/6h', lastApplied: '09:00' },
        { id: 'M8', name: 'Bicarbonato', dosage: '1mEq/kg', route: 'IV', frequency: '12/12h', lastApplied: '11:00' },
        { id: 'M9', name: 'Dopamina', dosage: '5mcg/kg/min', route: 'CIV', frequency: 'Continuo', lastApplied: '12:00' },
        { id: 'M10', name: ' কৃষ্ণ ', dosage: ' حسب الحاجة ', route: 'IV', frequency: '4/4h', lastApplied: '13:00' }
      ]
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

  const handleApplyMedication = (patient: any, medication: any) => {
    setSelectedPatient(patient);
    setMedicationForm({
      medication: medication.name,
      dosage: medication.dosage,
      route: medication.route,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      observations: '',
      materials: []
    });
    setMedicationModalOpen(true);
  };

  const confirmMedicationApplication = () => {
    if (!medicationForm.time) {
      toast({
        title: "Erro",
        description: "Horário de aplicação é obrigatório",
        variant: "destructive",
      });
      return;
    }

    // Simular aplicação da medicação
    toast({
      title: "Medicação aplicada!",
      description: `${medicationForm.medication} aplicado em ${selectedPatient?.petName} às ${medicationForm.time}`,
    });

    // Aqui seria a integração com estoque e financeiro
    console.log('Baixa no estoque:', medicationForm.medication);
    console.log('Adicionado ao orçamento:', selectedPatient?.id);
    console.log('Materiais utilizados:', medicationForm.materials);

    // Fechar modal automaticamente
    setMedicationModalOpen(false);
    setMedicationForm({
      medication: '',
      dosage: '',
      route: '',
      time: '',
      observations: '',
      materials: []
    });
  };

  const handleWhatsApp = (phone: string, petName: string) => {
    const message = `Olá! Informações sobre o internamento de ${petName}. Como posso ajudar?`;
    window.open(`https://wa.me/55${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Painel de Internamento</h2>
          <p className="text-gray-600">Acompanhamento em tempo real dos pacientes internados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Ver Agenda
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Bell className="w-4 h-4 mr-2" />
            Alertas
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{pacientes.length}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pacientes.map((patient) => (
          <Card key={patient.id}>
            <CardHeader>
              <CardTitle>{patient.petName} - {patient.owner}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2">
                  {getStatusIcon(patient.status)}
                  <span className={getStatusColor(patient.status)}>
                    {patient.status === 'ativo' ? 'Estável' : 
                     patient.status === 'observacao' ? 'Observação' : 'Crítico'}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Quarto</p>
                  <p className="text-gray-600">{patient.room}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Veterinário</p>
                  <p className="text-gray-600">{patient.veterinarian}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Início</p>
                  <p className="text-gray-600">{new Date(patient.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Motivo</p>
                  <p className="text-gray-600">{patient.reason}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Medicações</h4>
                <div className="space-y-2">
                  {patient.medications.map((medication) => (
                    <div key={medication.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-gray-600">{medication.dosage} • {medication.route}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Próxima dose: {medication.frequency}
                        </p>
                        <p className="text-sm text-gray-500">
                          Última aplicação: {medication.lastApplied}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleApplyMedication(patient, medication)}
                        >
                          <Syringe className="w-3 h-3 mr-2" />
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Prontuário
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleWhatsApp(patient.phone, patient.petName)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Modal de Aplicação de Medicação */}
        <Dialog open={medicationModalOpen} onOpenChange={setMedicationModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Aplicar Medicação</DialogTitle>
              <DialogDescription>
                Registre a aplicação da medicação em {selectedPatient?.petName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Medicamento</Label>
                  <Input value={medicationForm.medication} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Dosagem</Label>
                  <Input value={medicationForm.dosage} readOnly className="bg-gray-50" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Via de Administração</Label>
                  <Input value={medicationForm.route} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Horário de Aplicação *</Label>
                  <Input
                    type="time"
                    value={medicationForm.time}
                    onChange={(e) => setMedicationForm({...medicationForm, time: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Materiais Utilizados</Label>
                <Select onValueChange={(value) => setMedicationForm({...medicationForm, materials: [...medicationForm.materials, value]})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os materiais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seringa-3ml">Seringa 3ml</SelectItem>
                    <SelectItem value="seringa-5ml">Seringa 5ml</SelectItem>
                    <SelectItem value="agulha-25g">Agulha 25G</SelectItem>
                    <SelectItem value="agulha-21g">Agulha 21G</SelectItem>
                    <SelectItem value="cateter">Cateter</SelectItem>
                    <SelectItem value="gaze">Gaze</SelectItem>
                    <SelectItem value="algodao">Algodão</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Observações</Label>
                <Textarea
                  value={medicationForm.observations}
                  onChange={(e) => setMedicationForm({...medicationForm, observations: e.target.value})}
                  placeholder="Observações sobre a aplicação..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setMedicationModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={confirmMedicationApplication} className="bg-green-600 hover:bg-green-700">
                  <Syringe className="w-4 h-4 mr-2" />
                  Confirmar Aplicação
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PainelInternamentoTempo;
