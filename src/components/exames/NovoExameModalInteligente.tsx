
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
import { ExamesService } from '@/services/ExamesService';

interface NovoExameModalInteligenteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NovoExameModalInteligente = ({ open, onOpenChange, onSuccess }: NovoExameModalInteligenteProps) => {
  const { toast } = useToast();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    clienteId: '',
    petId: '',
    tipoExame: '',
    veterinarioId: '',
    observacoes: ''
  });

  const tiposExame = [
    'Hemograma Completo',
    'Bioquímico',
    'Urinálise',
    'Parasitológico',
    'Radiografia',
    'Ultrassonografia',
    'Ecocardiograma',
    'Eletrocardiograma',
    'Citologia',
    'Histopatológico',
    'Microbiológico',
    'Sorologia'
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
    setFormData(prev => ({ ...prev, clienteId, petId: '' }));
  };

  const handleSubmit = async () => {
    if (!formData.petId || !formData.tipoExame) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      await ExamesService.create({
        pet_id: formData.petId,
        tipo_exame: formData.tipoExame,
        veterinario_id: formData.veterinarioId || undefined,
        observacoes: formData.observacoes || undefined,
        status: 'solicitado',
        data_solicitacao: new Date().toISOString()
      });

      toast({
        title: "Sucesso!",
        description: "Exame solicitado com sucesso",
      });

      // Reset form
      setFormData({
        clienteId: '',
        petId: '',
        tipoExame: '',
        veterinarioId: '',
        observacoes: ''
      });

      setClienteSelecionado(null);
      setPacientesFiltrados([]);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao solicitar exame:', error);
      toast({
        title: "Erro",
        description: "Não foi possível solicitar o exame",
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
          <DialogTitle className="text-lg">Solicitar Exame</DialogTitle>
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
              onValueChange={(value) => setFormData(prev => ({ ...prev, petId: value }))}
              value={formData.petId}
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
              <Label className="text-sm font-medium">Tipo de Exame *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, tipoExame: value }))} value={formData.tipoExame}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o exame" />
                </SelectTrigger>
                <SelectContent>
                  {tiposExame.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Veterinário Solicitante</Label>
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
            <Label className="text-sm font-medium">Observações</Label>
            <Textarea
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Informações adicionais sobre o exame..."
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
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
            >
              {loading ? 'Salvando...' : 'Solicitar Exame'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoExameModalInteligente;
