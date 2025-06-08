
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
import { LembretesService } from '@/services/LembretesService';

interface NovoLembreteModalInteligenteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NovoLembreteModalInteligente = ({ open, onOpenChange, onSuccess }: NovoLembreteModalInteligenteProps) => {
  const { toast } = useToast();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    clienteId: '',
    petId: '',
    tipo: '',
    titulo: '',
    mensagem: '',
    dataEnvio: '',
    horaEnvio: '',
    canal: 'whatsapp'
  });

  const tiposLembrete = [
    { value: 'vacina', label: 'Vacina' },
    { value: 'retorno', label: 'Retorno' },
    { value: 'consulta', label: 'Consulta' },
    { value: 'medicamento', label: 'Medicamento' },
    { value: 'outro', label: 'Outro' }
  ];

  const templates = {
    vacina: "Olá {cliente}! 🐾\n\nLembramos que a vacina do {pet} está agendada para {data} às {hora}.\n\nConfirme sua presença!\n\nVetPrime - Cuidando com amor 💙",
    retorno: "Olá {cliente}! 🐾\n\nLembramos que o retorno do {pet} está agendado para {data} às {hora}.\n\nAguardamos vocês!\n\nVetPrime - Cuidando com amor 💙",
    consulta: "Olá {cliente}! 🐾\n\nLembramos que a consulta do {pet} está agendada para {data} às {hora}.\n\nConfirme sua presença!\n\nVetPrime - Cuidando com amor 💙",
    medicamento: "Olá {cliente}! 🐾\n\nLembre-se de administrar o medicamento do {pet} conforme prescrito.\n\nVetPrime - Cuidando com amor 💙",
    outro: "Olá {cliente}! 🐾\n\nEste é um lembrete sobre o {pet}.\n\nVetPrime - Cuidando com amor 💙"
  };

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

  useEffect(() => {
    if (formData.tipo && clienteSelecionado) {
      const template = templates[formData.tipo as keyof typeof templates] || templates.outro;
      const pet = pacientesFiltrados.find(p => p.id === formData.petId);
      
      let mensagemPersonalizada = template
        .replace('{cliente}', clienteSelecionado.nome)
        .replace('{pet}', pet?.name || '{pet}');

      if (formData.dataEnvio && formData.horaEnvio) {
        const dataFormatada = new Date(formData.dataEnvio).toLocaleDateString('pt-BR');
        mensagemPersonalizada = mensagemPersonalizada
          .replace('{data}', dataFormatada)
          .replace('{hora}', formData.horaEnvio);
      }

      setFormData(prev => ({ ...prev, mensagem: mensagemPersonalizada }));
    }
  }, [formData.tipo, formData.petId, formData.dataEnvio, formData.horaEnvio, clienteSelecionado, pacientesFiltrados]);

  const loadInitialData = async () => {
    try {
      const clientesData = await ClienteService.getAll();
      setClientes(clientesData);
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
    if (!formData.petId || !formData.tipo || !formData.titulo || !formData.dataEnvio || !formData.horaEnvio) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const dataEnvio = new Date(`${formData.dataEnvio}T${formData.horaEnvio}`);
      
      await LembretesService.create({
        pet_id: formData.petId,
        tutor_id: clienteSelecionado?.id,
        tipo: formData.tipo as any,
        titulo: formData.titulo,
        mensagem: formData.mensagem,
        data_envio: dataEnvio.toISOString(),
        canal: formData.canal as any,
        status: 'agendado'
      });

      toast({
        title: "Sucesso!",
        description: "Lembrete criado com sucesso",
      });

      // Reset form
      setFormData({
        clienteId: '',
        petId: '',
        tipo: '',
        titulo: '',
        mensagem: '',
        dataEnvio: '',
        horaEnvio: '',
        canal: 'whatsapp'
      });
      setClienteSelecionado(null);
      setPacientesFiltrados([]);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao criar lembrete:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o lembrete",
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
          <DialogTitle className="text-lg">Novo Lembrete</DialogTitle>
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
              <Label className="text-sm font-medium">Tipo *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value }))} value={formData.tipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposLembrete.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Canal</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, canal: value }))} value={formData.canal}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Título *</Label>
            <Input
              value={formData.titulo}
              onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
              placeholder="Ex: Lembrete de Vacina"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Data *</Label>
              <Input
                type="date"
                value={formData.dataEnvio}
                onChange={(e) => setFormData(prev => ({ ...prev, dataEnvio: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Horário *</Label>
              <Input
                type="time"
                value={formData.horaEnvio}
                onChange={(e) => setFormData(prev => ({ ...prev, horaEnvio: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Mensagem *</Label>
            <Textarea
              value={formData.mensagem}
              onChange={(e) => setFormData(prev => ({ ...prev, mensagem: e.target.value }))}
              placeholder="Mensagem do lembrete..."
              rows={5}
            />
            <p className="text-xs text-gray-500 mt-1">
              A mensagem será personalizada automaticamente com os dados do cliente e pet
            </p>
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
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700"
            >
              {loading ? 'Salvando...' : 'Criar Lembrete'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoLembreteModalInteligente;
