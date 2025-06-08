
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ProfissionaisService, type Profissional } from '@/services/ProfissionaisService';
import { InternamentosService, type Internamento } from '@/services/InternamentosService';
import { EvolucoesService } from '@/services/EvolucoesService';

interface NovaEvolucaoModalInteligenteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  internamentoId?: string;
}

const NovaEvolucaoModalInteligente = ({ open, onOpenChange, onSuccess, internamentoId }: NovaEvolucaoModalInteligenteProps) => {
  const { toast } = useToast();
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [internamentos, setInternamentos] = useState<Internamento[]>([]);
  const [internamentoSelecionado, setInternamentoSelecionado] = useState<Internamento | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    internamentoId: internamentoId || '',
    temperatura: '',
    peso: '',
    frequenciaCardiaca: '',
    frequenciaRespiratoria: '',
    pressaoArterial: '',
    comportamento: '',
    apetite: '',
    hidratacao: '',
    mucosas: '',
    observacoes: '',
    medicamentos: '',
    procedimentos: '',
    veterinarioId: '',
    status: 'estavel'
  });

  const comportamentos = ['Alerta', 'Apático', 'Agitado', 'Sonolento', 'Agressivo'];
  const apetites = ['Normal', 'Diminuído', 'Ausente', 'Aumentado'];
  const hidratacoes = ['Normal', 'Leve desidratação', 'Moderada desidratação', 'Severa desidratação'];
  const mucosas = ['Rosadas', 'Pálidas', 'Cianóticas', 'Ictéricas'];
  const statusOptions = ['estavel', 'observacao', 'critico', 'alta'];

  useEffect(() => {
    if (open) {
      loadInitialData();
      if (internamentoId) {
        setFormData(prev => ({ ...prev, internamentoId }));
      }
    }
  }, [open, internamentoId]);

  useEffect(() => {
    if (formData.internamentoId) {
      const internamento = internamentos.find(i => i.id === formData.internamentoId);
      setInternamentoSelecionado(internamento || null);
    }
  }, [formData.internamentoId, internamentos]);

  const loadInitialData = async () => {
    try {
      const [profissionaisData, internamentosData] = await Promise.all([
        ProfissionaisService.getAll(),
        InternamentosService.getAll()
      ]);
      setProfissionais(profissionaisData);
      // Filtra apenas internamentos ativos
      const internamentosAtivos = internamentosData.filter(i => i.status !== 'Finalizado');
      setInternamentos(internamentosAtivos);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.internamentoId || !internamentoSelecionado) {
      toast({
        title: "Erro",
        description: "Selecione um internamento",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      await EvolucoesService.create({
        paciente_id: internamentoSelecionado.paciente_id,
        internamento_id: formData.internamentoId,
        data_evolucao: new Date().toISOString(),
        temperatura: formData.temperatura ? parseFloat(formData.temperatura) : undefined,
        peso: formData.peso ? parseFloat(formData.peso) : undefined,
        frequencia_cardiaca: formData.frequenciaCardiaca ? parseInt(formData.frequenciaCardiaca) : undefined,
        frequencia_respiratoria: formData.frequenciaRespiratoria ? parseInt(formData.frequenciaRespiratoria) : undefined,
        pressao_arterial: formData.pressaoArterial || undefined,
        comportamento: formData.comportamento || undefined,
        apetite: formData.apetite || undefined,
        hidratacao: formData.hidratacao || undefined,
        mucosas: formData.mucosas || undefined,
        observacoes: formData.observacoes || undefined,
        medicamentos: formData.medicamentos || undefined,
        procedimentos: formData.procedimentos || undefined,
        veterinario_id: formData.veterinarioId || undefined,
        status: formData.status as 'estavel' | 'observacao' | 'critico' | 'alta'
      });

      toast({
        title: "Sucesso!",
        description: "Evolução registrada com sucesso",
      });

      // Reset form
      setFormData({
        internamentoId: internamentoId || '',
        temperatura: '',
        peso: '',
        frequenciaCardiaca: '',
        frequenciaRespiratoria: '',
        pressaoArterial: '',
        comportamento: '',
        apetite: '',
        hidratacao: '',
        mucosas: '',
        observacoes: '',
        medicamentos: '',
        procedimentos: '',
        veterinarioId: '',
        status: 'estavel'
      });

      setInternamentoSelecionado(null);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao registrar evolução:', error);
      toast({
        title: "Erro",
        description: "Não foi possível registrar a evolução",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">Nova Evolução Clínica</DialogTitle>
          <DialogDescription className="text-sm">
            Registre a evolução do paciente internado
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {!internamentoId && (
            <div>
              <Label className="text-sm font-medium">Internamento *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, internamentoId: value }))} value={formData.internamentoId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o internamento..." />
                </SelectTrigger>
                <SelectContent>
                  {internamentos.map((internamento) => (
                    <SelectItem key={internamento.id} value={internamento.id!}>
                      {internamento.pets?.name} - {internamento.motivo} ({internamento.pets?.tutores?.nome})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {internamentoSelecionado && (
            <div className="p-3 bg-blue-50 rounded-lg text-sm">
              <p><strong>Paciente:</strong> {internamentoSelecionado.pets?.name}</p>
              <p><strong>Tutor:</strong> {internamentoSelecionado.pets?.tutores?.nome}</p>
              <p><strong>Motivo:</strong> {internamentoSelecionado.motivo}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium">Temperatura (°C)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.temperatura}
                onChange={(e) => setFormData(prev => ({ ...prev, temperatura: e.target.value }))}
                placeholder="38.5"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Peso (kg)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.peso}
                onChange={(e) => setFormData(prev => ({ ...prev, peso: e.target.value }))}
                placeholder="15.2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">FC (bpm)</Label>
              <Input
                type="number"
                value={formData.frequenciaCardiaca}
                onChange={(e) => setFormData(prev => ({ ...prev, frequenciaCardiaca: e.target.value }))}
                placeholder="120"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">FR (mrpm)</Label>
              <Input
                type="number"
                value={formData.frequenciaRespiratoria}
                onChange={(e) => setFormData(prev => ({ ...prev, frequenciaRespiratoria: e.target.value }))}
                placeholder="30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Pressão Arterial</Label>
              <Input
                value={formData.pressaoArterial}
                onChange={(e) => setFormData(prev => ({ ...prev, pressaoArterial: e.target.value }))}
                placeholder="120/80 mmHg"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))} value={formData.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="estavel">Estável</SelectItem>
                  <SelectItem value="observacao">Em Observação</SelectItem>
                  <SelectItem value="critico">Crítico</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium">Comportamento</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, comportamento: value }))} value={formData.comportamento}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {comportamentos.map((comp) => (
                    <SelectItem key={comp} value={comp}>
                      {comp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Apetite</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, apetite: value }))} value={formData.apetite}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {apetites.map((ap) => (
                    <SelectItem key={ap} value={ap}>
                      {ap}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Hidratação</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, hidratacao: value }))} value={formData.hidratacao}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {hidratacoes.map((hid) => (
                    <SelectItem key={hid} value={hid}>
                      {hid}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Mucosas</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, mucosas: value }))} value={formData.mucosas}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {mucosas.map((muc) => (
                    <SelectItem key={muc} value={muc}>
                      {muc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Veterinário</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, veterinarioId: value }))} value={formData.veterinarioId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o veterinário" />
              </SelectTrigger>
              <SelectContent>
                {profissionais.map((prof) => (
                  <SelectItem key={prof.id} value={prof.id!}>
                    {prof.nome} - {prof.crmv}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Medicamentos</Label>
              <Textarea
                value={formData.medicamentos}
                onChange={(e) => setFormData(prev => ({ ...prev, medicamentos: e.target.value }))}
                placeholder="Medicamentos administrados..."
                rows={3}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Procedimentos</Label>
              <Textarea
                value={formData.procedimentos}
                onChange={(e) => setFormData(prev => ({ ...prev, procedimentos: e.target.value }))}
                placeholder="Procedimentos realizados..."
                rows={3}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Observações</Label>
            <Textarea
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Observações gerais sobre a evolução do paciente..."
              rows={4}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Salvando...' : 'Registrar Evolução'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaEvolucaoModalInteligente;
