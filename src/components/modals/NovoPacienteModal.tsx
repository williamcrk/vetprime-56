
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PacienteService, Paciente } from '@/components/PacienteService';
import { ClienteService } from '@/components/ClienteService';

interface NovoPacienteModalProps {
  onPatientAdded: (patient: any) => void;
}

const NovoPacienteModal = ({ onPatientAdded }: NovoPacienteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tutores, setTutores] = useState<any[]>([]);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Omit<Paciente, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    especie: '',
    raca: '',
    sexo: undefined,
    cor: '',
    peso: undefined,
    data_nascimento: '',
    microchip: '',
    observacoes: '',
    tutor_id: ''
  });

  // Carregar tutores
  useEffect(() => {
    const loadTutores = async () => {
      try {
        const data = await ClienteService.getAll();
        setTutores(data);
      } catch (error) {
        console.error('Erro ao carregar tutores:', error);
      }
    };

    if (open) {
      loadTutores();
    }
  }, [open]);

  // Raças predefinidas por espécie
  const racasPorEspecie = {
    'Cão': [
      'Golden Retriever', 'Labrador', 'Pastor Alemão', 'Bulldog Francês', 
      'Poodle', 'Yorkshire', 'Shih Tzu', 'Border Collie', 'Rottweiler',
      'Husky Siberiano', 'Beagle', 'Dachshund', 'Boxer', 'SRD (Sem Raça Definida)'
    ],
    'Gato': [
      'Siamês', 'Persa', 'Maine Coon', 'British Shorthair', 'Ragdoll',
      'Bengal', 'Sphynx', 'Angorá', 'SRD (Sem Raça Definida)'
    ],
    'Ave': [
      'Canário', 'Periquito', 'Calopsita', 'Papagaio', 'Agapornis',
      'Diamante Gould', 'Mandarim'
    ],
    'Roedor': [
      'Hamster', 'Porquinho da Índia', 'Chinchila', 'Coelho', 'Gerbil'
    ],
    'Réptil': [
      'Iguana', 'Gecko', 'Jabuti', 'Cobra do Milho', 'Pogona'
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.tutor_id) {
      toast({
        title: "Erro",
        description: "Nome do animal e tutor são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const newPatient = await PacienteService.create(formData);
      
      onPatientAdded(newPatient);
      
      toast({
        title: "Paciente cadastrado!",
        description: `${formData.name} foi cadastrado com sucesso.`,
      });

      setFormData({
        name: '',
        especie: '',
        raca: '',
        sexo: undefined,
        cor: '',
        peso: undefined,
        data_nascimento: '',
        microchip: '',
        observacoes: '',
        tutor_id: ''
      });
      
      setOpen(false);
    } catch (error: any) {
      console.error('Erro ao cadastrar paciente:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível cadastrar o paciente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome do Animal *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nome do pet"
                required
              />
            </div>

            <div>
              <Label htmlFor="tutor_id">Tutor *</Label>
              <Select value={formData.tutor_id} onValueChange={(value) => setFormData({...formData, tutor_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tutor" />
                </SelectTrigger>
                <SelectContent>
                  {tutores.map((tutor) => (
                    <SelectItem key={tutor.id} value={tutor.id}>
                      {tutor.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="especie">Espécie</Label>
              <Select value={formData.especie} onValueChange={(value) => setFormData({...formData, especie: value, raca: ''})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cão">Cão</SelectItem>
                  <SelectItem value="Gato">Gato</SelectItem>
                  <SelectItem value="Ave">Ave</SelectItem>
                  <SelectItem value="Roedor">Roedor</SelectItem>
                  <SelectItem value="Réptil">Réptil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="raca">Raça</Label>
              <Select value={formData.raca || ''} onValueChange={(value) => setFormData({...formData, raca: value})} disabled={!formData.especie}>
                <SelectTrigger>
                  <SelectValue placeholder={formData.especie ? "Selecione a raça" : "Selecione espécie primeiro"} />
                </SelectTrigger>
                <SelectContent>
                  {formData.especie && racasPorEspecie[formData.especie as keyof typeof racasPorEspecie]?.map((raca) => (
                    <SelectItem key={raca} value={raca}>
                      {raca}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sexo">Sexo</Label>
              <Select value={formData.sexo || ''} onValueChange={(value) => setFormData({...formData, sexo: value as 'Macho' | 'Fêmea'})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Macho">Macho</SelectItem>
                  <SelectItem value="Fêmea">Fêmea</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cor">Cor</Label>
              <Input
                id="cor"
                value={formData.cor || ''}
                onChange={(e) => setFormData({...formData, cor: e.target.value})}
                placeholder="Cor do animal"
              />
            </div>

            <div>
              <Label htmlFor="peso">Peso (kg)</Label>
              <Input
                id="peso"
                type="number"
                step="0.1"
                value={formData.peso || ''}
                onChange={(e) => setFormData({...formData, peso: e.target.value ? Number(e.target.value) : undefined})}
                placeholder="15.5"
              />
            </div>

            <div>
              <Label htmlFor="data_nascimento">Data de Nascimento</Label>
              <Input
                id="data_nascimento"
                type="date"
                value={formData.data_nascimento || ''}
                onChange={(e) => setFormData({...formData, data_nascimento: e.target.value})}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="microchip">Microchip</Label>
              <Input
                id="microchip"
                value={formData.microchip || ''}
                onChange={(e) => setFormData({...formData, microchip: e.target.value})}
                placeholder="Número do microchip"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes || ''}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                placeholder="Observações gerais sobre o paciente..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || !formData.name.trim() || !formData.tutor_id} className="w-full sm:w-auto">
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NovoPacienteModal;
