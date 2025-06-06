
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  UserCheck, Plus, Phone, Mail, Calendar, 
  Edit, Trash2, MessageCircle, Activity
} from 'lucide-react';

const Profissionais = () => {
  const { toast } = useToast();
  const [professionals, setProfessionals] = useState([
    {
      id: '1',
      name: 'Dr. João Silva',
      role: 'Veterinário',
      specialty: 'Cirurgia Geral',
      phone: '11999999999',
      email: 'joao@vetprime.com',
      status: 'ativo',
      crmv: '12345-SP'
    },
    {
      id: '2',
      name: 'Dra. Maria Santos',
      role: 'Veterinária',
      specialty: 'Cardiologia',
      phone: '11888888888',
      email: 'maria@vetprime.com',
      status: 'ativo',
      crmv: '23456-SP'
    },
    {
      id: '3',
      name: 'Ana Costa',
      role: 'Recepcionista',
      specialty: 'Atendimento',
      phone: '11777777777',
      email: 'ana@vetprime.com',
      status: 'ativo',
      crmv: ''
    }
  ]);

  const [newProfessional, setNewProfessional] = useState({
    name: '',
    role: '',
    specialty: '',
    phone: '',
    email: '',
    crmv: '',
    status: 'ativo'
  });

  const [isNewProfessionalOpen, setIsNewProfessionalOpen] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState<any>(null);

  const handleSaveProfessional = () => {
    if (!newProfessional.name || !newProfessional.role) {
      toast({
        title: "Erro",
        description: "Nome e cargo são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    if (editingProfessional) {
      setProfessionals(professionals.map(prof => 
        prof.id === editingProfessional.id 
          ? { ...prof, ...newProfessional }
          : prof
      ));
      toast({
        title: "Sucesso!",
        description: "Profissional atualizado com sucesso",
      });
    } else {
      const professional = {
        id: Date.now().toString(),
        ...newProfessional
      };
      setProfessionals([...professionals, professional]);
      toast({
        title: "Sucesso!",
        description: "Novo profissional cadastrado",
      });
    }

    setNewProfessional({
      name: '',
      role: '',
      specialty: '',
      phone: '',
      email: '',
      crmv: '',
      status: 'ativo'
    });
    setIsNewProfessionalOpen(false);
    setEditingProfessional(null);
  };

  const handleEditProfessional = (professional: any) => {
    setNewProfessional(professional);
    setEditingProfessional(professional);
    setIsNewProfessionalOpen(true);
  };

  const handleDeleteProfessional = (professionalId: string) => {
    setProfessionals(professionals.filter(prof => prof.id !== professionalId));
    toast({
      title: "Profissional removido",
      description: "O profissional foi removido da equipe",
    });
  };

  const handleWhatsApp = (phone: string, name: string) => {
    const message = `Olá ${name}! Como posso ajudar?`;
    window.open(`https://wa.me/55${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'inativo': return 'bg-red-100 text-red-800';
      case 'ferias': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout title="Profissionais">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Equipe VetPrime</h2>
            <p className="text-gray-600">Gerencie sua equipe de profissionais</p>
          </div>
          
          <Dialog open={isNewProfessionalOpen} onOpenChange={setIsNewProfessionalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Profissional
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingProfessional ? 'Editar Profissional' : 'Novo Profissional'}
                </DialogTitle>
                <DialogDescription>
                  {editingProfessional ? 'Atualize os dados do profissional' : 'Adicione um novo membro à equipe'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome Completo *</Label>
                    <Input
                      value={newProfessional.name}
                      onChange={(e) => setNewProfessional({...newProfessional, name: e.target.value})}
                      placeholder="Ex: Dr. João Silva"
                    />
                  </div>
                  <div>
                    <Label>Cargo *</Label>
                    <Select 
                      value={newProfessional.role}
                      onValueChange={(value) => setNewProfessional({...newProfessional, role: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Veterinário">Veterinário</SelectItem>
                        <SelectItem value="Veterinária">Veterinária</SelectItem>
                        <SelectItem value="Auxiliar Veterinário">Auxiliar Veterinário</SelectItem>
                        <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Especialidade</Label>
                    <Input
                      value={newProfessional.specialty}
                      onChange={(e) => setNewProfessional({...newProfessional, specialty: e.target.value})}
                      placeholder="Ex: Cirurgia Geral"
                    />
                  </div>
                  <div>
                    <Label>CRMV</Label>
                    <Input
                      value={newProfessional.crmv}
                      onChange={(e) => setNewProfessional({...newProfessional, crmv: e.target.value})}
                      placeholder="Ex: 12345-SP"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Telefone</Label>
                    <Input
                      value={newProfessional.phone}
                      onChange={(e) => setNewProfessional({...newProfessional, phone: e.target.value})}
                      placeholder="Ex: 11999999999"
                    />
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <Input
                      type="email"
                      value={newProfessional.email}
                      onChange={(e) => setNewProfessional({...newProfessional, email: e.target.value})}
                      placeholder="Ex: joao@vetprime.com"
                    />
                  </div>
                </div>

                <div>
                  <Label>Status</Label>
                  <Select 
                    value={newProfessional.status}
                    onValueChange={(value) => setNewProfessional({...newProfessional, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="ferias">Férias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsNewProfessionalOpen(false);
                      setEditingProfessional(null);
                      setNewProfessional({
                        name: '',
                        role: '',
                        specialty: '',
                        phone: '',
                        email: '',
                        crmv: '',
                        status: 'ativo'
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveProfessional} className="bg-blue-600 hover:bg-blue-700">
                    {editingProfessional ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{professionals.filter(p => p.status === 'ativo').length}</p>
                  <p className="text-sm text-gray-600">Profissionais Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{professionals.filter(p => p.role.includes('Veterinári')).length}</p>
                  <p className="text-sm text-gray-600">Veterinários</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{professionals.filter(p => p.status === 'ferias').length}</p>
                  <p className="text-sm text-gray-600">Em Férias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Profissionais</CardTitle>
            <CardDescription>Gerencie sua equipe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {professionals.map((professional) => (
                <div key={professional.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{professional.name}</h3>
                        <Badge className={getStatusColor(professional.status)}>
                          {professional.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{professional.role} - {professional.specialty}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {professional.crmv && (
                          <span>CRMV: {professional.crmv}</span>
                        )}
                        {professional.phone && (
                          <button 
                            onClick={() => handleWhatsApp(professional.phone, professional.name)}
                            className="flex items-center gap-1 text-green-600 hover:text-green-800"
                          >
                            <Phone className="w-3 h-3" />
                            {professional.phone}
                          </button>
                        )}
                        {professional.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {professional.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {professional.phone && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleWhatsApp(professional.phone, professional.name)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <MessageCircle className="w-3 h-3" />
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditProfessional(professional)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteProfessional(professional.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Profissionais;
