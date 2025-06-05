
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  UserCheck, Search, Plus, Phone, Mail, Calendar, Clock, 
  CheckCircle, AlertTriangle, Edit, Trash2, Star, Award,
  Activity, Users, Shield, Settings, UserPlus, User, Heart, Stethoscope
} from 'lucide-react';

const Profissionais = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('veterinarios');

  const veterinarians = [
    {
      id: 1,
      name: 'Dr. João Silva',
      crmv: 'CRMV-SP 12345',
      specialty: 'Cirurgia Geral',
      email: 'joao.silva@vetprime.com',
      phone: '11999998888',
      consultations: 127,
      rating: 4.9,
      revenue: 28500,
      schedule: 'Segunda a Sexta',
      status: 'ativo',
      avatar: '/placeholder.svg',
      experience: '15 anos',
      certifications: ['Cirurgia Ortopédica', 'Anestesiologia']
    },
    {
      id: 2,
      name: 'Dra. Maria Santos',
      crmv: 'CRMV-SP 23456',
      specialty: 'Clínica Geral',
      email: 'maria.santos@vetprime.com',
      phone: '11888887777',
      consultations: 98,
      rating: 4.8,
      revenue: 24300,
      schedule: 'Terça a Sábado',
      status: 'ativo',
      avatar: '/placeholder.svg',
      experience: '10 anos',
      certifications: ['Dermatologia', 'Cardiologia']
    },
    {
      id: 3,
      name: 'Dr. Pedro Costa',
      crmv: 'CRMV-SP 34567',
      specialty: 'Dermatologia',
      email: 'pedro.costa@vetprime.com',
      phone: '11777776666',
      consultations: 85,
      rating: 4.7,
      revenue: 19800,
      schedule: 'Segunda a Quinta',
      status: 'ferias',
      avatar: '/placeholder.svg',
      experience: '8 anos',
      certifications: ['Dermatologia Avançada']
    }
  ];

  const receptionists = [
    {
      id: 1,
      name: 'Ana Oliveira',
      role: 'Recepcionista Sênior',
      email: 'ana.oliveira@vetprime.com',
      phone: '11999881111',
      schedule: 'Segunda a Sexta - 8h às 18h',
      status: 'ativo',
      avatar: '/placeholder.svg',
      permissions: ['Agenda', 'Financeiro', 'Clientes'],
      admissionDate: '2022-03-15'
    },
    {
      id: 2,
      name: 'Carlos Mendes',
      role: 'Atendente',
      email: 'carlos.mendes@vetprime.com',
      phone: '11888772222',
      schedule: 'Terça a Sábado - 7h às 16h',
      status: 'ativo',
      avatar: '/placeholder.svg',
      permissions: ['Agenda', 'Clientes'],
      admissionDate: '2023-01-10'
    }
  ];

  const assistants = [
    {
      id: 1,
      name: 'Enfª. Sandra Lima',
      role: 'Auxiliar Veterinária',
      email: 'sandra.lima@vetprime.com',
      phone: '11777663333',
      schedule: 'Segunda a Sexta - 7h às 19h',
      status: 'ativo',
      avatar: '/placeholder.svg',
      certifications: ['Técnico em Veterinária', 'Primeiros Socorros'],
      specialties: ['Cirurgia', 'Internamento']
    },
    {
      id: 2,
      name: 'Roberto Silva',
      role: 'Auxiliar Geral',
      email: 'roberto.silva@vetprime.com',
      phone: '11666554444',
      schedule: 'Terça a Sábado - 6h às 15h',
      status: 'ativo',
      avatar: '/placeholder.svg',
      certifications: ['Manuseio de Animais'],
      specialties: ['Limpeza', 'Manutenção']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'ferias': return 'bg-yellow-100 text-yellow-800';
      case 'afastado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleWhatsApp = (phone, name) => {
    const message = `Olá ${name}! Como posso ajudar?`;
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleNewProfessional = () => {
    toast({
      title: "Novo Profissional",
      description: "Abrindo formulário para cadastrar novo profissional...",
    });
  };

  const filteredVeterinarians = veterinarians.filter(vet =>
    vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.crmv.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReceptionists = receptionists.filter(rec =>
    rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAssistants = assistants.filter(ass =>
    ass.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ass.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout title="Gestão de Profissionais">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar profissional..." 
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Novo Profissional
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Profissional</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo profissional
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome Completo</Label>
                  <Input placeholder="Nome do profissional" />
                </div>
                <div>
                  <Label>Tipo de Profissional</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veterinario">Veterinário</SelectItem>
                      <SelectItem value="recepcionista">Recepcionista</SelectItem>
                      <SelectItem value="auxiliar">Auxiliar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@vetprime.com" />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input placeholder="(11) 99999-9999" />
                </div>
                <div>
                  <Label>CRMV (se veterinário)</Label>
                  <Input placeholder="CRMV-SP 12345" />
                </div>
                <div>
                  <Label>Especialidade</Label>
                  <Input placeholder="Ex: Cirurgia Geral" />
                </div>
                <div className="col-span-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleNewProfessional}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Cadastrar Profissional
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{veterinarians.length}</p>
                  <p className="text-sm text-gray-600">Veterinários</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{receptionists.length}</p>
                  <p className="text-sm text-gray-600">Recepcionistas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{assistants.length}</p>
                  <p className="text-sm text-gray-600">Auxiliares</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {veterinarians.filter(v => v.status === 'ativo').length + 
                     receptionists.filter(r => r.status === 'ativo').length + 
                     assistants.filter(a => a.status === 'ativo').length}
                  </p>
                  <p className="text-sm text-gray-600">Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="veterinarios">Veterinários</TabsTrigger>
            <TabsTrigger value="recepcionistas">Recepcionistas</TabsTrigger>
            <TabsTrigger value="auxiliares">Auxiliares</TabsTrigger>
            <TabsTrigger value="escalas">Escalas</TabsTrigger>
          </TabsList>

          <TabsContent value="veterinarios">
            <Card>
              <CardHeader>
                <CardTitle>Veterinários</CardTitle>
                <CardDescription>Gestão da equipe médica veterinária</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredVeterinarians.map((vet) => (
                    <div key={vet.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{vet.name}</h3>
                          <p className="text-sm text-gray-600">{vet.crmv} • {vet.specialty}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {vet.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {vet.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {vet.certifications.map((cert, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center mx-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="font-medium">{vet.consultations}</p>
                            <p className="text-xs text-gray-500">Consultas</p>
                          </div>
                          <div>
                            <p className="font-medium flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              {vet.rating}
                            </p>
                            <p className="text-xs text-gray-500">Avaliação</p>
                          </div>
                          <div>
                            <p className="font-medium text-green-600">R$ {vet.revenue.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Receita</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{vet.schedule}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(vet.status)}>
                          {vet.status === 'ativo' ? 'Ativo' : 
                           vet.status === 'ferias' ? 'Férias' : 'Afastado'}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleWhatsApp(vet.phone, vet.name)}
                        >
                          WhatsApp
                        </Button>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recepcionistas">
            <Card>
              <CardHeader>
                <CardTitle>Recepcionistas e Atendentes</CardTitle>
                <CardDescription>Equipe de atendimento e recepção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReceptionists.map((rec) => (
                    <div key={rec.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{rec.name}</h3>
                          <p className="text-sm text-gray-600">{rec.role}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {rec.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {rec.phone}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Admissão: {new Date(rec.admissionDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center mx-4">
                        <p className="text-sm font-medium">{rec.schedule}</p>
                        <div className="flex gap-1 mt-2">
                          {rec.permissions.map((perm, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(rec.status)}>
                          Ativo
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleWhatsApp(rec.phone, rec.name)}
                        >
                          WhatsApp
                        </Button>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auxiliares">
            <Card>
              <CardHeader>
                <CardTitle>Auxiliares e Técnicos</CardTitle>
                <CardDescription>Equipe de apoio técnico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAssistants.map((ass) => (
                    <div key={ass.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                          <Heart className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{ass.name}</h3>
                          <p className="text-sm text-gray-600">{ass.role}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {ass.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {ass.phone}
                            </span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {ass.certifications.map((cert, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center mx-4">
                        <p className="text-sm font-medium">{ass.schedule}</p>
                        <div className="flex gap-1 mt-2">
                          {ass.specialties.map((spec, index) => (
                            <Badge key={index} className="text-xs bg-purple-100 text-purple-800">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(ass.status)}>
                          Ativo
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleWhatsApp(ass.phone, ass.name)}
                        >
                          WhatsApp
                        </Button>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escalas">
            <Card>
              <CardHeader>
                <CardTitle>Escalas e Plantões</CardTitle>
                <CardDescription>Gestão de horários e plantões</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Escala desta Semana</h3>
                    <div className="space-y-3">
                      {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day, index) => (
                        <div key={day} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{day}</span>
                            <Badge variant="outline">2 profissionais</Badge>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Dr. João Silva (8h-18h) • Ana Oliveira (7h-16h)
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Plantões de Emergência</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="font-medium">Plantão 24h</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Dr. João Silva • 18h às 8h
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span className="font-medium">Fim de Semana</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Dra. Maria Santos • Sábado e Domingo
                        </p>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Gerenciar Escalas
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Profissionais;
