
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Mail, Printer } from 'lucide-react';

interface NovaReceitaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NovaReceitaModal = ({ open, onOpenChange, onSuccess }: NovaReceitaModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    petName: '',
    owner: '',
    ownerPhone: '',
    ownerEmail: '',
    veterinarian: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
  });

  const handleSubmit = () => {
    if (!formData.petName || !formData.owner || !formData.medications[0].name) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const receitaId = `R${Date.now().toString().slice(-3)}`;
    
    toast({
      title: "Receita Criada!",
      description: `Receita #${receitaId} criada para ${formData.petName}`,
    });

    // Reset form
    setFormData({
      petName: '',
      owner: '',
      ownerPhone: '',
      ownerEmail: '',
      veterinarian: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
    });

    onSuccess();
    onOpenChange(false);
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
    }));
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const newMedications = [...formData.medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setFormData(prev => ({ ...prev, medications: newMedications }));
  };

  const sendWhatsApp = () => {
    if (!formData.ownerPhone) {
      toast({
        title: "Erro",
        description: "Número do WhatsApp não informado",
        variant: "destructive",
      });
      return;
    }

    const medications = formData.medications.map(med => 
      `💊 ${med.name}\n   Dosagem: ${med.dosage}\n   Frequência: ${med.frequency}\n   Duração: ${med.duration}\n   ${med.instructions ? `Obs: ${med.instructions}` : ''}`
    ).join('\n\n');

    const message = `🐾 *RECEITA VETERINÁRIA* 🐾\n\n📋 Paciente: ${formData.petName}\n👤 Tutor: ${formData.owner}\n🩺 Veterinário: ${formData.veterinarian}\n\n*MEDICAÇÕES:*\n\n${medications}\n\n⚠️ *Importante:* Siga rigorosamente as orientações prescritas.\n\nVetPrime - Cuidando com amor 💙`;
    
    const cleanPhone = formData.ownerPhone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, '_blank');
    
    toast({
      title: "WhatsApp Enviado!",
      description: "Receita enviada via WhatsApp",
    });
  };

  const sendEmail = () => {
    if (!formData.ownerEmail) {
      toast({
        title: "Erro",
        description: "Email não informado",
        variant: "destructive",
      });
      return;
    }

    const medications = formData.medications.map(med => 
      `${med.name} - ${med.dosage} - ${med.frequency} por ${med.duration}${med.instructions ? ` (${med.instructions})` : ''}`
    ).join('\n');

    const subject = `Receita Veterinária - ${formData.petName}`;
    const body = `Receita Veterinária\n\nPaciente: ${formData.petName}\nTutor: ${formData.owner}\nVeterinário: ${formData.veterinarian}\n\nMedicações:\n${medications}\n\nVetPrime`;
    
    window.open(`mailto:${formData.ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    
    toast({
      title: "Email Aberto!",
      description: "Cliente de email aberto para envio",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Receita Digital</DialogTitle>
          <DialogDescription>
            Crie uma prescrição digital para o paciente
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome do Pet *</Label>
              <Input
                value={formData.petName}
                onChange={(e) => setFormData(prev => ({ ...prev, petName: e.target.value }))}
                placeholder="Ex: Rex"
              />
            </div>
            <div>
              <Label>Tutor *</Label>
              <Input
                value={formData.owner}
                onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                placeholder="Ex: Maria Silva"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>WhatsApp</Label>
              <Input
                value={formData.ownerPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, ownerPhone: e.target.value }))}
                placeholder="11999999999"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, ownerEmail: e.target.value }))}
                placeholder="cliente@email.com"
              />
            </div>
          </div>

          <div>
            <Label>Veterinário</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, veterinarian: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
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
              <Label>Medicações *</Label>
              <Button type="button" onClick={addMedication} variant="outline" size="sm">
                + Adicionar Medicação
              </Button>
            </div>
            
            {formData.medications.map((medication, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3 mb-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={medication.name}
                    onChange={(e) => updateMedication(index, 'name', e.target.value)}
                    placeholder="Nome da medicação"
                  />
                  <Input
                    value={medication.dosage}
                    onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                    placeholder="Dosagem (ex: 500mg)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={medication.frequency}
                    onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                    placeholder="Frequência (ex: 2x ao dia)"
                  />
                  <Input
                    value={medication.duration}
                    onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                    placeholder="Duração (ex: 7 dias)"
                  />
                </div>
                <Textarea
                  value={medication.instructions}
                  onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                  placeholder="Instruções especiais (opcional)"
                  rows={2}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <div className="flex gap-2">
              <Button variant="outline" onClick={sendWhatsApp} size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
              <Button variant="outline" onClick={sendEmail} size="sm">
                <Mail className="w-4 h-4 mr-1" />
                Email
              </Button>
              <Button variant="outline" onClick={() => window.print()} size="sm">
                <Printer className="w-4 h-4 mr-1" />
                Imprimir
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                Gerar Receita
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaReceitaModal;
