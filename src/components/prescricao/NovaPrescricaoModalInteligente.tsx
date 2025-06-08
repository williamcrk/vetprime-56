
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ClienteService, type Cliente } from '@/components/ClienteService';
import { PacienteService, type Paciente } from '@/components/PacienteService';
import { ProfissionaisService, type Profissional } from '@/services/ProfissionaisService';
import { PrescricoesService, type ItemPrescricao } from '@/services/PrescricoesService';
import { Trash2, Plus } from 'lucide-react';

interface NovaPrescricaoModalInteligenteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NovaPrescricaoModalInteligente = ({ open, onOpenChange, onSuccess }: NovaPrescricaoModalInteligenteProps) => {
  const { toast } = useToast();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    clienteId: '',
    petId: '',
    veterinarioId: '',
    observacoes: ''
  });

  const [itens, setItens] = useState<ItemPrescricao[]>([{
    medicamento: '',
    dosagem: '',
    frequencia: '',
    duracao: '',
    instrucoes: ''
  }]);

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

  const handleAddItem = () => {
    setItens([...itens, {
      medicamento: '',
      dosagem: '',
      frequencia: '',
      duracao: '',
      instrucoes: ''
    }]);
  };

  const handleRemoveItem = (index: number) => {
    setItens(itens.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof ItemPrescricao, value: string) => {
    const novosItens = [...itens];
    novosItens[index] = { ...novosItens[index], [field]: value };
    setItens(novosItens);
  };

  const handleSubmit = async () => {
    if (!formData.petId || itens.length === 0 || !itens[0].medicamento) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      await PrescricoesService.create({
        paciente_id: formData.petId,
        veterinario_id: formData.veterinarioId || undefined,
        data_prescricao: new Date().toISOString(),
        observacoes: formData.observacoes || undefined,
        status: 'ativa',
        itens: itens.filter(item => item.medicamento.trim() !== '')
      });

      toast({
        title: "Sucesso!",
        description: "Prescrição criada com sucesso",
      });

      // Reset form
      setFormData({
        clienteId: '',
        petId: '',
        veterinarioId: '',
        observacoes: ''
      });
      setItens([{
        medicamento: '',
        dosagem: '',
        frequencia: '',
        duracao: '',
        instrucoes: ''
      }]);
      setClienteSelecionado(null);
      setPacientesFiltrados([]);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao criar prescrição:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a prescrição",
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
          <DialogTitle className="text-lg">Nova Prescrição</DialogTitle>
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

          <div>
            <Label className="text-sm font-medium">Veterinário Prescritor</Label>
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

          {/* Medicamentos */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Medicamentos</CardTitle>
                <Button type="button" onClick={handleAddItem} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {itens.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">Medicamento {index + 1}</h4>
                    {itens.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Medicamento *</Label>
                      <Input
                        value={item.medicamento}
                        onChange={(e) => handleItemChange(index, 'medicamento', e.target.value)}
                        placeholder="Nome do medicamento"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Dosagem *</Label>
                      <Input
                        value={item.dosagem}
                        onChange={(e) => handleItemChange(index, 'dosagem', e.target.value)}
                        placeholder="Ex: 1 comprimido"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Frequência *</Label>
                      <Input
                        value={item.frequencia}
                        onChange={(e) => handleItemChange(index, 'frequencia', e.target.value)}
                        placeholder="Ex: 2x ao dia"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Duração *</Label>
                      <Input
                        value={item.duracao}
                        onChange={(e) => handleItemChange(index, 'duracao', e.target.value)}
                        placeholder="Ex: 7 dias"
                        className="text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs">Instruções Especiais</Label>
                    <Textarea
                      value={item.instrucoes}
                      onChange={(e) => handleItemChange(index, 'instrucoes', e.target.value)}
                      placeholder="Instruções especiais de uso..."
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div>
            <Label className="text-sm font-medium">Observações Gerais</Label>
            <Textarea
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Observações adicionais sobre a prescrição..."
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
              {loading ? 'Salvando...' : 'Criar Prescrição'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaPrescricaoModalInteligente;
