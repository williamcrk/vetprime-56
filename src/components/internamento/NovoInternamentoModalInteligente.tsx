
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
import { InternamentosService } from '@/services/InternamentosService';

interface NovoInternamentoModalInteligenteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NovoInternamentoModalInteligente = ({ open, onOpenChange, onSuccess }: NovoInternamentoModalInteligenteProps) => {
  const { toast } = useToast();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    clienteId: '',
    pacienteId: '',
    motivo: '',
    dataEntrada: new Date().toISOString().slice(0, 16),
    veterinarioId: '',
    diagnostico: '',
    tratamento: '',
    observacoes: ''
  });

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
    if (!formData.pacienteId || !formData.motivo || !formData.dataEntrada) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      await InternamentosService.create({
        paciente_id: formData.pacienteId,
        motivo: formData.motivo,
        data_entrada: new Date(formData.dataEntrada).toISOString(),
        veterinario_id: formData.veterinarioId || undefined,
        diagnostico: formData.diagnostico || undefined,
        tratamento: formData.tratamento || undefined,
        observacoes: formData.observacoes || undefined,
        status: 'Internado'
      });

      toast({
        title: "Sucesso!",
        description: "Internamento registrado com sucesso",
      });

      // Reset form
      setFormData({
        clienteId: '',
        pacienteId: '',
        motivo: '',
        dataEntrada: new Date().toISOString().slice(0, 16),
        veterinarioId: '',
        diagnostico: '',
        tratamento: '',
        observacoes: ''
      });

      setClienteSelecionado(null);
      setPacientesFiltrados([]);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao criar internamento:', error);
      toast({
        title: "Erro",
        description: "Não foi possível registrar o internamento",
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
          <DialogTitle className="text-lg">Novo Internamento</DialogTitle>
          <DialogDescription className="text-sm">
            Selecione o cliente para carregar automaticamente seus pets
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Cliente Selection */}
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

          {/* Pet Selection */}
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
              <Label className="text-sm font-medium">Motivo do Internamento *</Label>
              <Input
                value={formData.motivo}
                onChange={(e) => setFormData(prev => ({ ...prev, motivo: e.target.value }))}
                placeholder="Ex: Cirurgia, Observação..."
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Veterinário Responsável</Label>
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
          </div>

          <div>
            <Label className="text-sm font-medium">Data e Hora de Entrada *</Label>
            <Input
              type="datetime-local"
              value={formData.dataEntrada}
              onChange={(e) => setFormData(prev => ({ ...prev, dataEntrada: e.target.value }))}
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Diagnóstico Inicial</Label>
            <Textarea
              value={formData.diagnostico}
              onChange={(e) => setFormData(prev => ({ ...prev, diagnostico: e.target.value }))}
              placeholder="Diagnóstico ou suspeita clínica..."
              rows={2}
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Tratamento Proposto</Label>
            <Textarea
              value={formData.tratamento}
              onChange={(e) => setFormData(prev => ({ ...prev, tratamento: e.target.value }))}
              placeholder="Plano de tratamento..."
              rows={2}
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Observações</Label>
            <Textarea
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Observações adicionais..."
              rows={2}
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
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Salvando...' : 'Registrar Internamento'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoInternamentoModalInteligente;
