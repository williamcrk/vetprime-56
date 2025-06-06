
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface SolicitarExameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const SolicitarExameModal = ({ open, onOpenChange, onSuccess }: SolicitarExameModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    petName: '',
    owner: '',
    veterinarian: '',
    exams: [] as string[],
    urgency: '',
    observations: '',
    fasting: false,
    preparacao: ''
  });

  const examTypes = [
    { id: 'hemograma', name: 'Hemograma Completo' },
    { id: 'bioquimica', name: 'Bioquímica Sérica' },
    { id: 'urina', name: 'Exame de Urina' },
    { id: 'fezes', name: 'Exame de Fezes' },
    { id: 'raio-x', name: 'Raio-X' },
    { id: 'ultrassom', name: 'Ultrassom' },
    { id: 'ecocardiograma', name: 'Ecocardiograma' },
    { id: 'eletrocardiograma', name: 'Eletrocardiograma' },
    { id: 'citologia', name: 'Citologia' },
    { id: 'histopatologico', name: 'Histopatológico' }
  ];

  const handleExamChange = (examId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      exams: checked 
        ? [...prev.exams, examId]
        : prev.exams.filter(id => id !== examId)
    }));
  };

  const handleSubmit = () => {
    if (!formData.petName || !formData.owner || formData.exams.length === 0) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios e selecione pelo menos um exame",
        variant: "destructive",
      });
      return;
    }

    const examId = `E${Date.now().toString().slice(-3)}`;
    
    toast({
      title: "Exame Solicitado!",
      description: `Solicitação #${examId} criada para ${formData.petName}`,
    });

    // Reset form
    setFormData({
      petName: '',
      owner: '',
      veterinarian: '',
      exams: [],
      urgency: '',
      observations: '',
      fasting: false,
      preparacao: ''
    });

    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Solicitar Exame</DialogTitle>
          <DialogDescription>
            Solicite exames complementares para o diagnóstico
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
              <Label>Veterinário Solicitante</Label>
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
              <Label>Urgência</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rotina">Rotina</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                  <SelectItem value="emergencia">Emergência</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Exames Solicitados *</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {examTypes.map((exam) => (
                <div key={exam.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={exam.id}
                    checked={formData.exams.includes(exam.id)}
                    onCheckedChange={(checked) => handleExamChange(exam.id, checked as boolean)}
                  />
                  <label htmlFor={exam.id} className="text-sm cursor-pointer">
                    {exam.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="fasting"
              checked={formData.fasting}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, fasting: checked as boolean }))}
            />
            <label htmlFor="fasting" className="text-sm cursor-pointer">
              Exame requer jejum
            </label>
          </div>

          <div>
            <Label>Preparação Especial</Label>
            <Textarea
              value={formData.preparacao}
              onChange={(e) => setFormData(prev => ({ ...prev, preparacao: e.target.value }))}
              placeholder="Instruções especiais de preparação para o exame..."
              rows={2}
            />
          </div>

          <div>
            <Label>Observações Clínicas</Label>
            <Textarea
              value={formData.observations}
              onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
              placeholder="Sintomas, suspeitas diagnósticas, histórico relevante..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Solicitar Exame
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SolicitarExameModal;
