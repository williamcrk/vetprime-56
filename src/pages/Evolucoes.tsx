
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
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, Search, Plus, Calendar, Clock, 
  CheckCircle, User, Stethoscope, Heart,
  FileText, Edit, Eye, AlertTriangle
} from 'lucide-react';

const Evolucoes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  
  const evolucoes = [
    {
      id: 'EV001',
      petName: 'Rex',
      owner: 'Maria Silva',
      phone: '11999998888',
      veterinarian: 'Dr. João Silva',
      date: '15/11/2024',
      time: '14:30',
      type: 'Consulta Retorno',
      status: 'estavel',
      evolution: 'Paciente apresenta melhora significativa. Ferida cirúrgica cicatrizando bem. Apetite normalizado.',
      treatment: 'Continuar com antibiótico por mais 5 dias. Retirar pontos em 7 dias.',
      nextAppointment: '22/11/2024',
      weight: '25.5kg',
      temperature: '38.5°C',
      heartRate: '95 bpm'
    },
    {
      id: 'EV002',
      petName: 'Luna',
      owner: 'João Santos',
      phone: '11888887777',
      veterinarian: 'Dra. Maria Santos',
      date: '14/11/2024',
      time: '16:00',
      type: 'Internamento',
      status: 'critico',
      evolution: 'Paciente com quadro de vômitos persistentes. Desidratação moderada. Iniciada fluidoterapia.',
      treatment: 'Soro fisiológico 500ml + Dipirona. Jejum de 12h. Reavaliação a cada 4h.',
      nextAppointment: '15/11/2024',
      weight: '8.2kg',
      temperature: '39.2°C',
      heartRate: '125 bpm'
    },
    {
      id: 'EV003',
      petName: 'Thor',
      owner: 'Ana Costa',
      phone: '11777776666',
      veterinarian: 'Dr. Pedro Costa',
      date: '13/11/2024',
      time: '10:15',
      type: 'Pós-Cirúrgico',
      status: 'estavel',
      evolution: 'Paciente recuperando bem da castração. Sem sinais de infecção. Comportamento normal.',
      treatment: 'Anti-inflamatório por 3 dias. Repouso. Colar elisabetano.',
      nextAppointment: '20/11/2024',
      weight: '32.1kg',
      temperature: '38.3°C',
      heartRate: '88 bpm'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'estavel': return 'bg-green-100 text-green-800';
      case 'critico': return 'bg-red-100 text-red-800';
      case 'observacao': return 'bg-yellow-100 text-yellow-800';
      case 'alta': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'estavel': return <CheckCircle className="w-4 h-4" />;
      case 'critico': return <AlertTriangle className="w-4 h-4" />;
      case 'observacao': return <Clock className="w-4 h-4" />;
      case 'alta': return <Heart className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const filteredEvolucoes = evolucoes.filter(evolucao => {
    const matchesSearch = evolucao.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evolucao.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evolucao.veterinarian.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || evolucao.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleNewEvolution = () => {
    toast({
      title: "Nova Evolução",
      description: "Abrindo formulário para nova evolução...",
    });
  };

  const handleWhatsApp = (phone: string, petName: string) => {
    const message = `Olá! Informações sobre a evolução de ${petName}. Como posso ajudar?`;
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <PageLayout title="Evoluções e Anotações">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar evolução..." 
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="estavel">Estável</SelectItem>
                <SelectItem value="critico">Crítico</SelectItem>
                <SelectItem value="observacao">Observação</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nova Evolução
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nova Evolução</DialogTitle>
                <DialogDescription>
                  Registre a evolução do paciente
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Paciente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rex">Rex - Maria Silva</SelectItem>
                      <SelectItem value="luna">Luna - João Santos</SelectItem>
                      <SelectItem value="thor">Thor - Ana Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Status do paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="estavel">Estável</SelectItem>
                      <SelectItem value="critico">Crítico</SelectItem>
                      <SelectItem value="observacao">Observação</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Peso (kg)</Label>
                  <Input placeholder="25.5" />
                </div>
                <div>
                  <Label>Temperatura (°C)</Label>
                  <Input placeholder="38.5" />
                </div>
                <div>
                  <Label>Frequência Cardíaca</Label>
                  <Input placeholder="95 bpm" />
                </div>
                <div>
                  <Label>Próximo Retorno</Label>
                  <Input type="date" />
                </div>
                <div className="col-span-2">
                  <Label>Evolução do Quadro</Label>
                  <Textarea placeholder="Descreva a evolução do paciente..." />
                </div>
                <div className="col-span-2">
                  <Label>Tratamento Prescrito</Label>
                  <Textarea placeholder="Descreva o tratamento..." />
                </div>
                <div className="col-span-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleNewEvolution}>
                    <Plus className="w-4 h-4 mr-2" />
                    Salvar Evolução
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
                <Activity className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{evolucoes.length}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{evolucoes.filter(e => e.status === 'estavel').length}</p>
                  <p className="text-sm text-gray-600">Estáveis</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{evolucoes.filter(e => e.status === 'critico').length}</p>
                  <p className="text-sm text-gray-600">Críticos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{evolucoes.filter(e => e.status === 'observacao').length}</p>
                  <p className="text-sm text-gray-600">Observação</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registro de Evoluções</CardTitle>
            <CardDescription>
              {filteredEvolucoes.length} evolução(ões) encontrada(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvolucoes.map((evolucao) => (
                <div key={evolucao.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getStatusIcon(evolucao.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-medium">#{evolucao.id} - {evolucao.petName}</h3>
                        <Badge className={getStatusColor(evolucao.status)}>
                          {evolucao.status === 'estavel' ? 'Estável' :
                           evolucao.status === 'critico' ? 'Crítico' :
                           evolucao.status === 'observacao' ? 'Observação' :
                           'Alta'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{evolucao.owner}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {evolucao.veterinarian}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {evolucao.date} às {evolucao.time}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>{evolucao.type}</span>
                      </div>
                      <div className="mt-2 text-sm">
                        <p className="text-gray-700">{evolucao.evolution}</p>
                        <p className="text-blue-600 mt-1">Tratamento: {evolucao.treatment}</p>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500 mt-2">
                        <span>Peso: {evolucao.weight}</span>
                        <span>Temp: {evolucao.temperature}</span>
                        <span>FC: {evolucao.heartRate}</span>
                        {evolucao.nextAppointment && (
                          <span>Retorno: {evolucao.nextAppointment}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleWhatsApp(evolucao.phone, evolucao.petName)}
                      className="flex-1 lg:flex-none"
                    >
                      WhatsApp
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 lg:flex-none"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 lg:flex-none"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                  </div>
                </div>
              ))}

              {filteredEvolucoes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhuma evolução encontrada</p>
                  {searchTerm && (
                    <p className="text-sm mt-2">
                      Tente buscar por outro termo ou{' '}
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-blue-600 hover:underline"
                      >
                        limpar filtros
                      </button>
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Evolucoes;
