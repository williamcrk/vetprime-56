
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface NovoProntuarioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NovoProntuarioModal = ({ open, onOpenChange, onSuccess }: NovoProntuarioModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    petName: '',
    owner: '',
    veterinarian: '',
    consultationType: '',
    diagnosis: '',
    treatment: '',
    observations: '',
    nextVisit: '',
    prescriptions: ['']
  });

  const handleSubmit = () => {
    if (!formData.petName || !formData.owner || !formData.diagnosis) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const newRecord = {
      id: `P${Date.now().toString().slice(-3)}`,
      ...formData,
      date: new Date().toLocaleDateString(),
      status: 'concluido'
    };

    toast({
      title: "Sucesso!",
      description: `Prontuário #${newRecord.id} criado para ${formData.petName}`,
    });

    // Reset form
    setFormData({
      petName: '',
      owner: '',
      veterinarian: '',
      consultationType: '',
      diagnosis: '',
      treatment: '',
      observations: '',
      nextVisit: '',
      prescriptions: ['']
    });

    onSuccess();
    onOpenChange(false);
  };

  const addPrescription = () => {
    setFormData(prev => ({
      ...prev,
      prescriptions: [...prev.prescriptions, '']
    }));
  };

  const updatePrescription = (index: number, value: string) => {
    const newPrescriptions = [...formData.prescriptions];
    newPrescriptions[index] = value;
    setFormData(prev => ({ ...prev, prescriptions: newPrescriptions }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Prontuário</DialogTitle>
          <DialogDescription>
            Registre uma nova consulta veterinária
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
              <Label>Tipo de Consulta</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, consultationType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consulta de rotina">Consulta de rotina</SelectItem>
                  <SelectItem value="Emergência">Emergência</SelectItem>
                  <SelectItem value="Retorno">Retorno</SelectItem>
                  <SelectItem value="Vacinação">Vacinação</SelectItem>
                  <SelectItem value="Cirurgia">Cirurgia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Diagnóstico/Observações *</Label>
            <Textarea
              value={formData.diagnosis}
              onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
              placeholder="Descreva o diagnóstico, sintomas observados..."
              rows={4}
            />
          </div>

          <div>
            <Label>Tratamento Prescrito</Label>
            <Textarea
              value={formData.treatment}
              onChange={(e) => setFormData(prev => ({ ...prev, treatment: e.target.value }))}
              placeholder="Tratamento recomendado, cuidados especiais..."
              rows={3}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Prescrições</Label>
              <Button type="button" onClick={addPrescription} variant="outline" size="sm">
                + Adicionar Medicação
              </Button>
            </div>
            {formData.prescriptions.map((prescription, index) => (
              <Input
                key={index}
                value={prescription}
                onChange={(e) => updatePrescription(index, e.target.value)}
                placeholder="Ex: Amoxicilina 500mg - 2x ao dia por 7 dias"
                className="mb-2"
              />
            ))}
          </div>

          <div>
            <Label>Data do Próximo Retorno</Label>
            <Input
              type="date"
              value={formData.nextVisit}
              onChange={(e) => setFormData(prev => ({ ...prev, nextVisit: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Salvar Prontuário
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoProntuarioModal;
