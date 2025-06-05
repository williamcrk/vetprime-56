
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NovoPacienteModalProps {
  onPatientAdded: (patient: any) => void;
}

const NovoPacienteModal = ({ onPatientAdded }: NovoPacienteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    owner: '',
    weight: '',
    gender: '',
    observations: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular criação do paciente (aqui você integraria com o Supabase)
      const newPatient = {
        id: Date.now().toString(),
        ...formData,
        lastVisit: new Date().toLocaleDateString(),
        status: 'Saudável'
      };

      onPatientAdded(newPatient);
      
      toast({
        title: "Paciente cadastrado!",
        description: `${formData.name} foi cadastrado com sucesso.`,
      });

      setFormData({
        name: '',
        species: '',
        breed: '',
        age: '',
        owner: '',
        weight: '',
        gender: '',
        observations: ''
      });
      
      setOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar o paciente.",
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome do Animal</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="owner">Nome do Tutor</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => setFormData({...formData, owner: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="species">Espécie</Label>
              <Select value={formData.species} onValueChange={(value) => setFormData({...formData, species: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cao">Cão</SelectItem>
                  <SelectItem value="gato">Gato</SelectItem>
                  <SelectItem value="ave">Ave</SelectItem>
                  <SelectItem value="roedor">Roedor</SelectItem>
                  <SelectItem value="reptil">Réptil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="breed">Raça</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => setFormData({...formData, breed: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Idade</Label>
              <Input
                id="age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                placeholder="Ex: 2 anos"
              />
            </div>
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                placeholder="Ex: 15.5"
              />
            </div>
            <div>
              <Label htmlFor="gender">Sexo</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="macho">Macho</SelectItem>
                  <SelectItem value="femea">Fêmea</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={(e) => setFormData({...formData, observations: e.target.value})}
              placeholder="Observações gerais sobre o paciente..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NovoPacienteModal;
