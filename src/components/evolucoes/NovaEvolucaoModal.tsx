
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface NovaEvolucaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  paciente?: any;
}

const NovaEvolucaoModal = ({ open, onOpenChange, onSuccess, paciente }: NovaEvolucaoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    petName: paciente?.name || '',
    owner: paciente?.owner || '',
    veterinarian: '',
    temperatura: '',
    peso: '',
    frequenciaCardiaca: '',
    frequenciaRespiratoria: '',
    alimentacao: '',
    hidratacao: '',
    evacuacao: '',
    urinacao: '',
    comportamento: '',
    observacoes: '',
    medicacoes: '',
    proximaEvolucao: ''
  });

  const handleSubmit = () => {
    if (!formData.petName || !formData.observacoes) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const evolucaoId = `EV${Date.now().toString().slice(-3)}`;
    
    toast({
      title: "Evolução Registrada!",
      description: `Evolução #${evolucaoId} criada para ${formData.petName}`,
    });

    // Reset form
    setFormData({
      petName: '',
      owner: '',
      veterinarian: '',
      temperatura: '',
      peso: '',
      frequenciaCardiaca: '',
      frequenciaRespiratoria: '',
      alimentacao: '',
      hidratacao: '',
      evacuacao: '',
      urinacao: '',
      comportamento: '',
      observacoes: '',
      medicacoes: '',
      proximaEvolucao: ''
    });

    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Evolução</DialogTitle>
          <DialogDescription>
            Registre a evolução clínica do paciente internado
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
              <Label>Tutor</Label>
              <Input
                value={formData.owner}
                onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                placeholder="Ex: Maria Silva"
              />
            </div>
          </div>

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

          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label>Temperatura (°C)</Label>
              <Input
                value={formData.temperatura}
                onChange={(e) => setFormData(prev => ({ ...prev, temperatura: e.target.value }))}
                placeholder="38.5"
              />
            </div>
            <div>
              <Label>Peso (kg)</Label>
              <Input
                value={formData.peso}
                onChange={(e) => setFormData(prev => ({ ...prev, peso: e.target.value }))}
                placeholder="15.2"
              />
            </div>
            <div>
              <Label>FC (bpm)</Label>
              <Input
                value={formData.frequenciaCardiaca}
                onChange={(e) => setFormData(prev => ({ ...prev, frequenciaCardiaca: e.target.value }))}
                placeholder="120"
              />
            </div>
            <div>
              <Label>FR (rpm)</Label>
              <Input
                value={formData.frequenciaRespiratoria}
                onChange={(e) => setFormData(prev => ({ ...prev, frequenciaRespiratoria: e.target.value }))}
                placeholder="25"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Alimentação</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, alimentacao: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Reduzida">Reduzida</SelectItem>
                  <SelectItem value="Ausente">Ausente</SelectItem>
                  <SelectItem value="Forçada">Forçada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Hidratação</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, hidratacao: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Leve desidratação">Leve desidratação</SelectItem>
                  <SelectItem value="Moderada desidratação">Moderada desidratação</SelectItem>
                  <SelectItem value="Severa desidratação">Severa desidratação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Evacuação</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, evacuacao: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Diarreia">Diarreia</SelectItem>
                  <SelectItem value="Constipação">Constipação</SelectItem>
                  <SelectItem value="Ausente">Ausente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Urinação</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, urinacao: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Poliúria">Poliúria</SelectItem>
                  <SelectItem value="Oligúria">Oligúria</SelectItem>
                  <SelectItem value="Anúria">Anúria</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Comportamento</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, comportamento: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alerta e ativo">Alerta e ativo</SelectItem>
                <SelectItem value="Quieto mas responsivo">Quieto mas responsivo</SelectItem>
                <SelectItem value="Apático">Apático</SelectItem>
                <SelectItem value="Letárgico">Letárgico</SelectItem>
                <SelectItem value="Agressivo">Agressivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Observações Clínicas *</Label>
            <Textarea
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Estado geral, evolução do quadro, resposta ao tratamento..."
              rows={4}
            />
          </div>

          <div>
            <Label>Medicações Administradas</Label>
            <Textarea
              value={formData.medicacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, medicacoes: e.target.value }))}
              placeholder="Liste as medicações aplicadas neste período..."
              rows={3}
            />
          </div>

          <div>
            <Label>Próxima Evolução</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, proximaEvolucao: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6 horas">6 horas</SelectItem>
                <SelectItem value="12 horas">12 horas</SelectItem>
                <SelectItem value="24 horas">24 horas</SelectItem>
                <SelectItem value="48 horas">48 horas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Registrar Evolução
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaEvolucaoModal;
