
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface NovoInternamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NovoInternamentoModal = ({ open, onOpenChange, onSuccess }: NovoInternamentoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    petName: '',
    owner: '',
    veterinarian: '',
    reason: '',
    room: '',
    status: 'ativo',
    observations: '',
    medications: ['']
  });

  const handleSubmit = () => {
    if (!formData.petName || !formData.owner || !formData.reason) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Simular salvamento
    toast({
      title: "Sucesso!",
      description: `${formData.petName} foi internado com sucesso`,
    });

    setFormData({
      petName: '',
      owner: '',
      veterinarian: '',
      reason: '',
      room: '',
      status: 'ativo',
      observations: '',
      medications: ['']
    });

    onSuccess();
    onOpenChange(false);
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, '']
    }));
  };

  const updateMedication = (index: number, value: string) => {
    const newMedications = [...formData.medications];
    newMedications[index] = value;
    setFormData(prev => ({ ...prev, medications: newMedications }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Internamento</DialogTitle>
          <DialogDescription>
            Registre um novo paciente para internamento
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
              <Label>Veterinário Responsável</Label>
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
              <Label>Quarto/UTI</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, room: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTI 01">UTI 01</SelectItem>
                  <SelectItem value="UTI 02">UTI 02</SelectItem>
                  <SelectItem value="Internação 01">Internação 01</SelectItem>
                  <SelectItem value="Internação 02">Internação 02</SelectItem>
                  <SelectItem value="Observação">Observação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Motivo do Internamento *</Label>
            <Input
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              placeholder="Ex: Cirurgia ortopédica, Intoxicação..."
            />
          </div>

          <div>
            <Label>Observações Iniciais</Label>
            <Textarea
              value={formData.observations}
              onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
              placeholder="Observações sobre o estado do animal..."
              rows={3}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Medicações Prescritas</Label>
              <Button type="button" onClick={addMedication} variant="outline" size="sm">
                + Adicionar Medicação
              </Button>
            </div>
            {formData.medications.map((med, index) => (
              <Input
                key={index}
                value={med}
                onChange={(e) => updateMedication(index, e.target.value)}
                placeholder="Ex: Amoxicilina 500mg - 8/8h"
                className="mb-2"
              />
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Internar Paciente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoInternamentoModal;
