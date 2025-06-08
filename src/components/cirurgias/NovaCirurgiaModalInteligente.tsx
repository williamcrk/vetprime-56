
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ClienteService, type Cliente } from '@/components/ClienteService';
import { PacienteService, type Paciente } from '@/components/PacienteService';
import { ProfissionaisService, type Profissional } from '@/services/ProfissionaisService';
import { CirurgiasService } from '@/services/CirurgiasService';

interface NovaCirurgiaModalInteligenteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NovaCirurgiaModalInteligente = ({ open, onOpenChange, onSuccess }: NovaCirurgiaModalInteligenteProps) => {
  const { toast } = useToast();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    clienteId: '',
    pacienteId: '',
    procedimento: '',
    dataCirurgia: '',
    veterinarioId: '',
    anestesistaId: '',
    sala: '',
    observacoesPre: ''
  });

  const procedimentos = [
    'Castração',
    'Ovário-histerectomia',
    'Cirurgia Ortopédica',
    'Remoção de Tumor',
    'Cirurgia Gastrointestinal',
    'Cirurgia Cardíaca',
    'Cirurgia Oftálmica',
    'Cirurgia Dental',
    'Cirurgia de Emergência',
    'Biópsia'
  ];

  const salas = [
    'Centro Cirúrgico 1',
    'Centro Cirúrgico 2',
    'Sala de Emergência',
    'Sala de Pequenos Procedimentos'
  ];

  useEffect(() => {
    if (open) {
      loadInitialData();
    }
  }, [open]);

  useEffect(() => {
    if (clienteSelecionado) {
      loadPacientesDoCliente();
    }
  }, [clienteSelecionado]);

  const loadInitialData = async () => {
    try {
      const [clientesData, profissionaisData] = await Promise.all([
        ClienteService.getAll(),
        ProfissionaisService.getAll()
      ]);
      setClientes(clientesData);
      setProfissionais(profissionaisData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const loadPacientesDoCliente = async () => {
    if (!clienteSelecionado) return;
    
    try {
      const pacientesData = await PacienteService.getAll();
      const pacientesDoCliente = pacientesData.filter(p => 
        p.tutores && p.tutores.nome === clienteSelecionado.nome
      ).map(p => ({
        ...p,
        sexo: (p.sexo === 'Macho' || p.sexo === 'Fêmea') ? p.sexo : undefined
      })) as Paciente[];
      setPacientesFiltrados(pacientesDoCliente);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    }
  };

  const handleClienteChange = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    setClienteSelecionado(cliente || null);
    setFormData(prev => ({ ...prev, clienteId, pacienteId: '' }));
  };

  const handleSubmit = async () => {
    if (!formData.pacienteId || !formData.procedimento || !formData.dataCirurgia) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      await CirurgiasService.create({
        paciente_id: formData.pacienteId,
        procedimento: formData.procedimento,
        data_cirurgia: new Date(formData.dataCirurgia).toISOString(),
        veterinario_id: formData.veterinarioId || undefined,
        anestesista_id: formData.anestesistaId || undefined,
        sala: formData.sala || undefined,
        observacoes_pre: formData.observacoesPre || undefined,
        status: 'agendada'
      });

      toast({
        title: "Sucesso!",
        description: "Cirurgia agendada com sucesso",
      });

      // Reset form
      setFormData({
        clienteId: '',
        pacienteId: '',
        procedimento: '',
        dataCirurgia: '',
        veterinarioId: '',
        anestesistaId: '',
        sala: '',
        observacoesPre: ''
      });

      setClienteSelecionado(null);
      setPacientesFiltrados([]);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao agendar cirurgia:', error);
      toast({
        title: "Erro",
        description: "Não foi possível agendar a cirurgia",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">Agendar Cirurgia</DialogTitle>
          <DialogDescription className="text-sm">
            Selecione o cliente para carregar automaticamente seus pets
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Cliente *</Label>
            <Select onValueChange={handleClienteChange} value={formData.clienteId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Buscar cliente..." />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((cliente) => (
                  <SelectItem key={cliente.id} value={cliente.id!}>
                    {cliente.nome} {cliente.telefone && `- ${cliente.telefone}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Pet *</Label>
            <Select 
              onValueChange={(value) => setFormData(prev => ({ ...prev, pacienteId: value }))}
              value={formData.pacienteId}
              disabled={!clienteSelecionado}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={!clienteSelecionado ? "Selecione um cliente primeiro" : "Selecione o pet"} />
              </SelectTrigger>
              <SelectContent>
                {pacientesFiltrados.map((paciente) => (
                  <SelectItem key={paciente.id} value={paciente.id!}>
                    {paciente.name} ({paciente.especie} - {paciente.raca})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {clienteSelecionado && (
            <div className="p-3 bg-blue-50 rounded-lg text-sm">
              <p><strong>Cliente:</strong> {clienteSelecionado.nome}</p>
              {clienteSelecionado.telefone && <p><strong>Telefone:</strong> {clienteSelecionado.telefone}</p>}
              {clienteSelecionado.email && <p><strong>Email:</strong> {clienteSelecionado.email}</p>}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Procedimento *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, procedimento: value }))} value={formData.procedimento}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o procedimento" />
                </SelectTrigger>
                <SelectContent>
                  {procedimentos.map((proc) => (
                    <SelectItem key={proc} value={proc}>
                      {proc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Data da Cirurgia *</Label>
              <Input
                type="datetime-local"
                value={formData.dataCirurgia}
                onChange={(e) => setFormData(prev => ({ ...prev, dataCirurgia: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Veterinário</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, veterinarioId: value }))} value={formData.veterinarioId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
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

            <div>
              <Label className="text-sm font-medium">Anestesista</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, anestesistaId: value }))} value={formData.anestesistaId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
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
          </div>

          <div>
            <Label className="text-sm font-medium">Sala</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, sala: value }))} value={formData.sala}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a sala" />
              </SelectTrigger>
              <SelectContent>
                {salas.map((sala) => (
                  <SelectItem key={sala} value={sala}>
                    {sala}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Observações Pré-Cirúrgicas</Label>
            <Textarea
              value={formData.observacoesPre}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoesPre: e.target.value }))}
              placeholder="Preparação, jejum, medicações..."
              rows={3}
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
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Salvando...' : 'Agendar Cirurgia'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaCirurgiaModalInteligente;
