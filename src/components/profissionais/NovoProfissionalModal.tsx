
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ProfissionaisService } from '@/services/ProfissionaisService';

interface NovoProfissionalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NovoProfissionalModal = ({ open, onOpenChange, onSuccess }: NovoProfissionalModalProps) => {
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

  const handleSubmit = async () => {
    if (!formData.nome || !formData.crmv) {
      toast({
        title: "Erro",
        description: "Nome e CRMV são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      await ProfissionaisService.create({
        nome: formData.nome,
        crmv: formData.crmv,
        especialidade: formData.especialidade || undefined,
        email: formData.email || undefined,
        telefone: formData.telefone || undefined,
        comissao_percentual: formData.comissao_percentual || 0
      });

      toast({
        title: "Sucesso!",
        description: "Profissional cadastrado com sucesso",
      });

      // Reset form
      setFormData({
        nome: '',
        crmv: '',
        especialidade: '',
        email: '',
        telefone: '',
        comissao_percentual: 0
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao cadastrar profissional:', error);
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar o profissional",
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
          <DialogTitle className="text-lg">Novo Profissional</DialogTitle>
          <DialogDescription className="text-sm">
            Cadastre um novo veterinário ou profissional da clínica
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
              <Label className="text-sm font-medium">CRMV *</Label>
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
              {loading ? 'Salvando...' : 'Salvar Profissional'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoProfissionalModal;
