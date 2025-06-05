
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Mail, MessageCircle, Download, Plus, Pill, Search, Printer } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useToast } from '@/hooks/use-toast';

const PrescricaoDigital = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'RX001',
      pet: 'Rex',
      owner: 'Maria Silva',
      veterinarian: 'Dr. João Silva',
      date: '2024-11-15',
      medications: [
        { name: 'Amoxicilina 500mg', dosage: '1 comprimido', frequency: '8/8h por 7 dias' },
        { name: 'Anti-inflamatório', dosage: '0.5ml', frequency: '12/12h por 3 dias' }
      ],
      status: 'Enviada',
      phone: '(11) 99999-9999',
      observations: 'Administrar com alimento'
    },
    {
      id: 'RX002', 
      pet: 'Luna',
      owner: 'João Santos',
      veterinarian: 'Dra. Maria Santos',
      date: '2024-11-14',
      medications: [
        { name: 'Vermífugo', dosage: '1 comprimido', frequency: 'Dose única' },
        { name: 'Vitamina B', dosage: '2ml', frequency: 'Uma vez ao dia por 5 dias' }
      ],
      status: 'Pendente',
      phone: '(11) 88888-8888',
      observations: 'Jejum de 12h antes do vermífugo'
    }
  ]);

  const [newPrescription, setNewPrescription] = useState({
    pet: '',
    owner: '',
    veterinarian: 'Dr. João Silva',
    medications: [{ name: '', dosage: '', frequency: '' }],
    observations: ''
  });

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.pet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMedication = () => {
    setNewPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: '' }]
    }));
  };

  const updateMedication = (index: number, field: string, value: string) => {
    setNewPrescription(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const removeMedication = (index: number) => {
    setNewPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const generatePrescription = () => {
    if (!newPrescription.pet || !newPrescription.owner || !newPrescription.medications[0].name) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha pelo menos pet, proprietário e um medicamento",
        variant: "destructive"
      });
      return;
    }

    const prescription = {
      id: `RX${String(prescriptions.length + 1).padStart(3, '0')}`,
      ...newPrescription,
      date: new Date().toLocaleDateString(),
      status: 'Gerada',
      phone: '(11) 99999-9999' // Mock
    };

    setPrescriptions(prev => [prescription, ...prev]);
    setNewPrescription({
      pet: '',
      owner: '',
      veterinarian: 'Dr. João Silva',
      medications: [{ name: '', dosage: '', frequency: '' }],
      observations: ''
    });

    toast({
      title: "Receita gerada",
      description: `Receita ${prescription.id} criada com sucesso`,
    });
  };

  const sendPrescription = (prescription: any, method: 'email' | 'whatsapp') => {
    const medicationsList = prescription.medications.map((med: any) => 
      `${med.name} - ${med.dosage} - ${med.frequency}`
    ).join('\n');

    if (method === 'whatsapp') {
      const message = `🐾 *RECEITA VETERINÁRIA* 🐾\n\n*Pet:* ${prescription.pet}\n*Receita:* ${prescription.id}\n*Data:* ${prescription.date}\n\n*MEDICAMENTOS:*\n${medicationsList}\n\n*Observações:* ${prescription.observations}\n\n*Veterinário:* ${prescription.veterinarian}\n\n_VetPrime - Cuidando com amor_ 💙`;
      
      window.open(`https://wa.me/55${prescription.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      toast({
        title: "Email Enviado",
        description: `Receita ${prescription.id} enviada por email para ${prescription.owner}`,
      });
    }

    // Atualizar status
    setPrescriptions(prev => prev.map(p => 
      p.id === prescription.id ? { ...p, status: 'Enviada' } : p
    ));
  };

  const printPrescription = (prescription: any) => {
    toast({
      title: "Imprimindo",
      description: `Gerando PDF da receita ${prescription.id}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Enviada': return 'bg-green-100 text-green-800';
      case 'Gerada': return 'bg-blue-100 text-blue-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout title="Prescrição Digital">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold">Receitas Veterinárias</h2>
            <p className="text-gray-600">Sistema digital de prescrições</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar receita..." 
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{prescriptions.length}</p>
                  <p className="text-sm text-gray-600">Receitas Emitidas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{prescriptions.filter(p => p.status === 'Enviada').length}</p>
                  <p className="text-sm text-gray-600">Enviadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{Math.floor(prescriptions.length * 0.7)}</p>
                  <p className="text-sm text-gray-600">Via WhatsApp</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Nova Receita</CardTitle>
              <CardDescription>Criar prescrição digital</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Pet *</label>
                  <Input 
                    placeholder="Nome do pet" 
                    value={newPrescription.pet}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, pet: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Proprietário *</label>
                  <Input 
                    placeholder="Nome do proprietário" 
                    value={newPrescription.owner}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, owner: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Veterinário</label>
                <Select value={newPrescription.veterinarian} onValueChange={(value) => setNewPrescription(prev => ({ ...prev, veterinarian: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. João Silva">Dr. João Silva</SelectItem>
                    <SelectItem value="Dra. Maria Santos">Dra. Maria Santos</SelectItem>
                    <SelectItem value="Dr. Pedro Costa">Dr. Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Medicamentos *</label>
                  <Button type="button" size="sm" variant="outline" onClick={addMedication}>
                    <Plus className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>
                <div className="space-y-2">
                  {newPrescription.medications.map((medication, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Input 
                          placeholder="Medicamento" 
                          value={medication.name}
                          onChange={(e) => updateMedication(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="w-24">
                        <Input 
                          placeholder="Dosagem" 
                          value={medication.dosage}
                          onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                        />
                      </div>
                      <div className="w-32">
                        <Input 
                          placeholder="Frequência" 
                          value={medication.frequency}
                          onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                        />
                      </div>
                      {newPrescription.medications.length > 1 && (
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline" 
                          onClick={() => removeMedication(index)}
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Observações</label>
                <Textarea 
                  placeholder="Instruções especiais..." 
                  rows={3} 
                  value={newPrescription.observations}
                  onChange={(e) => setNewPrescription(prev => ({ ...prev, observations: e.target.value }))}
                />
              </div>

              <Button onClick={generatePrescription} className="w-full bg-blue-600 hover:bg-blue-700">
                <FileText className="w-4 h-4 mr-2" />
                Gerar Receita
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receitas Recentes</CardTitle>
              <CardDescription>
                {filteredPrescriptions.length} receita(s) encontrada(s)
                {searchTerm && ` para "${searchTerm}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Pill className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{prescription.id}</h3>
                          <p className="text-sm text-gray-600">{prescription.pet} - {prescription.owner}</p>
                          <p className="text-xs text-gray-500">{prescription.veterinarian} • {prescription.date}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(prescription.status)}>
                        {prescription.status}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Medicamentos:</p>
                      {prescription.medications.map((med, index) => (
                        <p key={index} className="text-xs text-gray-600">
                          • {med.name} - {med.dosage} - {med.frequency}
                        </p>
                      ))}
                      {prescription.observations && (
                        <p className="text-xs text-gray-500 mt-1">
                          <strong>Obs:</strong> {prescription.observations}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => sendPrescription(prescription, 'email')}
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                      <WhatsAppButton 
                        phone={prescription.phone}
                        message=""
                        size="sm"
                        onClick={() => sendPrescription(prescription, 'whatsapp')}
                        showIcon={true}
                        className="text-xs"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => printPrescription(prescription)}
                      >
                        <Printer className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredPrescriptions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Pill className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhuma receita encontrada</p>
                    {searchTerm && (
                      <p className="text-sm mt-2">
                        Tente buscar por outro termo ou{' '}
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="text-blue-600 hover:underline"
                        >
                          limpar filtros
                        </button>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrescricaoDigital;
