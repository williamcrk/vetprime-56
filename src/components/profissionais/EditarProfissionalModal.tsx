
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ProfissionaisService, type Profissional } from '@/services/ProfissionaisService';

interface EditarProfissionalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  profissional: Profissional | null;
}

const EditarProfissionalModal = ({ open, onOpenChange, onSuccess, profissional }: EditarProfissionalModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    crmv: '',
    especialidade: '',
    email: '',
    telefone: '',
    comissao_percentual: 0
  });

  const especialidades = [
    'Clínica Geral',
    'Cirurgia',
    'Cardiologia',
    'Dermatologia',
    'Neurologia',
    'Ortopedia',
    'Oftalmologia',
    'Oncologia',
    'Anestesiologia',
    'Radiologia',
    'Patologia',
    'Medicina de Felinos',
    'Medicina de Animais Silvestres',
    'Medicina Veterinária Preventiva'
  ];

  useEffect(() => {
    if (profissional && open) {
      setFormData({
        nome: profissional.nome || '',
        crmv: profissional.crmv || '',
        especialidade: profissional.especialidade || '',
        email: profissional.email || '',
        telefone: profissional.telefone || '',
        comissao_percentual: profissional.comissao_percentual || 0
      });
    }
  }, [profissional, open]);

  const handleSubmit = async () => {
    if (!profissional?.id) return;

    if (!formData.nome) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      await ProfissionaisService.update(profissional.id, {
        nome: formData.nome,
        crmv: formData.crmv || undefined,
        especialidade: formData.especialidade || undefined,
        email: formData.email || undefined,
        telefone: formData.telefone || undefined,
        comissao_percentual: formData.comissao_percentual || 0
      });

      toast({
        title: "Sucesso!",
        description: "Profissional atualizado com sucesso",
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao atualizar profissional:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o profissional",
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
          <DialogTitle className="text-lg">Editar Profissional</DialogTitle>
          <DialogDescription className="text-sm">
            Atualize as informações do profissional
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Nome *</Label>
              <Input
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Nome completo"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">CRMV</Label>
              <Input
                value={formData.crmv}
                onChange={(e) => setFormData(prev => ({ ...prev, crmv: e.target.value }))}
                placeholder="Ex: CRMV-SP 12345"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Especialidade</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, especialidade: value }))} value={formData.especialidade}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a especialidade" />
              </SelectTrigger>
              <SelectContent>
                {especialidades.map((esp) => (
                  <SelectItem key={esp} value={esp}>
                    {esp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@exemplo.com"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Telefone</Label>
              <Input
                value={formData.telefone}
                onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Comissão (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formData.comissao_percentual}
              onChange={(e) => setFormData(prev => ({ ...prev, comissao_percentual: parseFloat(e.target.value) || 0 }))}
              placeholder="0.0"
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
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditarProfissionalModal;
