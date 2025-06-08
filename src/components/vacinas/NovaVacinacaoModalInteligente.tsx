
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ClienteService, type Cliente } from '@/components/ClienteService';
import { PacienteService, type Paciente } from '@/components/PacienteService';
import { ProfissionaisService, type Profissional } from '@/services/ProfissionaisService';
import { VacinasService } from '@/services/VacinasService';
import { Search } from 'lucide-react';

interface NovaVacinacaoModalInteligenteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NovaVacinacaoModalInteligente = ({ open, onOpenChange, onSuccess }: NovaVacinacaoModalInteligenteProps) => {
  const { toast } = useToast();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    clienteId: '',
    pacienteId: '',
    vacina: '',
    dataAplicacao: '',
    dataVencimento: '',
    veterinarioId: '',
    lote: '',
    observacoes: ''
  });

  const vaccines = [
    { name: 'V8 (Óctupla)', interval: 12 },
    { name: 'V10 (Déctupla)', interval: 12 },
    { name: 'Antirrábica', interval: 12 },
    { name: 'Giardia', interval: 12 },
    { name: 'Gripe Canina', interval: 6 },
    { name: 'Leishmaniose', interval: 12 }
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
      );
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

  const calculateNextDose = (vaccineType: string, dataAplicacao: string) => {
    const vaccine = vaccines.find(v => v.name === vaccineType);
    if (vaccine && dataAplicacao) {
      const nextDate = new Date(dataAplicacao);
      nextDate.setMonth(nextDate.getMonth() + vaccine.interval);
      return nextDate.toISOString().split('T')[0];
    }
    return '';
  };

  const handleVaccineChange = (vaccine: string) => {
    setFormData(prev => {
      const newData = { ...prev, vacina: vaccine };
      if (newData.dataAplicacao) {
        newData.dataVencimento = calculateNextDose(vaccine, newData.dataAplicacao);
      }
      return newData;
    });
  };

  const handleDateChange = (date: string) => {
    setFormData(prev => {
      const newData = { ...prev, dataAplicacao: date };
      if (newData.vacina) {
        newData.dataVencimento = calculateNextDose(newData.vacina, date);
      }
      return newData;
    });
  };

  const handleSubmit = async () => {
    if (!formData.pacienteId || !formData.vacina || !formData.dataAplicacao) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      await VacinasService.create({
        paciente_id: formData.pacienteId,
        vacina: formData.vacina,
        data_aplicacao: new Date(formData.dataAplicacao).toISOString(),
        data_vencimento: formData.dataVencimento ? new Date(formData.dataVencimento).toISOString() : undefined,
        veterinario_id: formData.veterinarioId || undefined,
        lote: formData.lote || undefined,
        observacoes: formData.observacoes || undefined,
        status: 'Agendada'
      });

      toast({
        title: "Sucesso!",
        description: "Vacinação agendada com sucesso",
      });

      // Reset form
      setFormData({
        clienteId: '',
        pacienteId: '',
        vacina: '',
        dataAplicacao: '',
        dataVencimento: '',
        veterinarioId: '',
        lote: '',
        observacoes: ''
      });

      setClienteSelecionado(null);
      setPacientesFiltrados([]);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao criar vacinação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível agendar a vacinação",
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
          <DialogTitle className="text-lg">Nova Vacinação</DialogTitle>
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
              <Label className="text-sm font-medium">Vacina *</Label>
              <Select onValueChange={handleVaccineChange} value={formData.vacina}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a vacina" />
                </SelectTrigger>
                <SelectContent>
                  {vaccines.map((vaccine) => (
                    <SelectItem key={vaccine.name} value={vaccine.name}>
                      {vaccine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Data de Aplicação *</Label>
              <Input
                type="date"
                value={formData.dataAplicacao}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Data de Vencimento</Label>
              <Input
                type="date"
                value={formData.dataVencimento}
                onChange={(e) => setFormData(prev => ({ ...prev, dataVencimento: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Lote</Label>
            <Input
              value={formData.lote}
              onChange={(e) => setFormData(prev => ({ ...prev, lote: e.target.value }))}
              placeholder="Número do lote"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Observações</Label>
            <Input
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Observações sobre a vacinação"
            />
          </div>

          {formData.vacina && formData.dataVencimento && (
            <div className="p-3 bg-green-50 rounded-lg text-sm">
              <p className="text-green-800">
                💡 <strong>Próxima dose:</strong> {new Date(formData.dataVencimento).toLocaleDateString()}
              </p>
            </div>
          )}

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
              {loading ? 'Salvando...' : 'Agendar Vacinação'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaVacinacaoModalInteligente;
