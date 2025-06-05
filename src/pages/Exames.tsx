
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
  FileText, Search, Plus, Download, Calendar, Clock, 
  CheckCircle, AlertTriangle, Eye, User, Stethoscope,
  Activity, Heart, Microscope, Camera, Zap
} from 'lucide-react';

const Exames = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  
  const exams = [
    {
      id: 'EX001',
      petName: 'Rex',
      owner: 'Maria Silva',
      phone: '11999998888',
      type: 'Hemograma Completo',
      category: 'Laboratorial',
      veterinarian: 'Dr. João Silva',
      requestDate: '15/11/2024',
      scheduledDate: '16/11/2024',
      status: 'agendado',
      priority: 'normal',
      observations: 'Jejum de 12 horas necessário',
      cost: 85.00,
      lab: 'Laboratório VetLab',
      preparation: 'Jejum de 12 horas'
    },
    {
      id: 'EX002',
      petName: 'Luna',
      owner: 'João Santos',
      phone: '11888887777',
      type: 'Raio-X Tórax',
      category: 'Imagem',
      veterinarian: 'Dra. Maria Santos',
      requestDate: '14/11/2024',
      scheduledDate: '15/11/2024',
      status: 'realizado',
      priority: 'urgente',
      observations: 'Suspeita de pneumonia',
      cost: 120.00,
      lab: 'Clínica Própria',
      preparation: 'Sedação leve',
      results: 'Imagem normal, sem alterações significativas'
    },
    {
      id: 'EX003',
      petName: 'Thor',
      owner: 'Ana Costa',
      phone: '11777776666',
      type: 'Ultrassom Abdominal',
      category: 'Imagem',
      veterinarian: 'Dr. Pedro Costa',
      requestDate: '13/11/2024',
      scheduledDate: '14/11/2024',
      status: 'em_andamento',
      priority: 'normal',
      observations: 'Investigação de massa abdominal',
      cost: 150.00,
      lab: 'Centro de Imagem Vet',
      preparation: 'Jejum de 8 horas'
    },
    {
      id: 'EX004',
      petName: 'Mimi',
      owner: 'Carlos Lima',
      phone: '11666665555',
      type: 'Biópsia Cutânea',
      category: 'Anatomopatológico',
      veterinarian: 'Dr. João Silva',
      requestDate: '12/11/2024',
      scheduledDate: '13/11/2024',
      status: 'resultado_disponivel',
      priority: 'normal',
      observations: 'Lesão suspeita na região dorsal',
      cost: 200.00,
      lab: 'Laboratório Histovet',
      preparation: 'Anestesia local',
      results: 'Processo inflamatório crônico, sem sinais de malignidade'
    }
  ];

  const examTypes = [
    { name: 'Hemograma Completo', category: 'Laboratorial', cost: 85.00, preparation: 'Jejum de 12 horas' },
    { name: 'Bioquímica Sérica', category: 'Laboratorial', cost: 120.00, preparation: 'Jejum de 12 horas' },
    { name: 'Urinálise', category: 'Laboratorial', cost: 45.00, preparation: 'Coleta asséptica' },
    { name: 'Raio-X Simples', category: 'Imagem', cost: 100.00, preparation: 'Contenção física' },
    { name: 'Raio-X Contrastado', category: 'Imagem', cost: 180.00, preparation: 'Jejum de 12 horas' },
    { name: 'Ultrassom Abdominal', category: 'Imagem', cost: 150.00, preparation: 'Jejum de 8 horas' },
    { name: 'Ecocardiograma', category: 'Imagem', cost: 200.00, preparation: 'Tricotomia torácica' },
    { name: 'Biópsia', category: 'Anatomopatológico', cost: 200.00, preparation: 'Anestesia local/geral' },
    { name: 'Citologia', category: 'Anatomopatológico', cost: 80.00, preparation: 'Contenção física' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'agendado': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'realizado': return 'bg-green-100 text-green-800';
      case 'resultado_disponivel': return 'bg-purple-100 text-purple-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'agendado': return <Calendar className="w-4 h-4" />;
      case 'em_andamento': return <Clock className="w-4 h-4" />;
      case 'realizado': return <CheckCircle className="w-4 h-4" />;
      case 'resultado_disponivel': return <FileText className="w-4 h-4" />;
      case 'cancelado': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgente': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Laboratorial': return <Microscope className="w-4 h-4" />;
      case 'Imagem': return <Camera className="w-4 h-4" />;
      case 'Anatomopatológico': return <Zap className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || exam.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleNewExam = () => {
    toast({
      title: "Novo Exame",
      description: "Abrindo formulário para solicitar novo exame...",
    });
  };

  const handleWhatsApp = (phone, petName, examType) => {
    const message = `Olá! Informações sobre o exame ${examType} de ${petName}. Como posso ajudar?`;
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDownloadResult = (examId, petName) => {
    toast({
      title: "Download Iniciado",
      description: `Baixando resultado do exame ${examId} de ${petName}`,
    });
  };

  const totalExams = exams.length;
  const pendingExams = exams.filter(e => e.status === 'agendado' || e.status === 'em_andamento').length;
  const completedExams = exams.filter(e => e.status === 'realizado' || e.status === 'resultado_disponivel').length;
  const totalRevenue = exams.filter(e => e.status !== 'cancelado').reduce((sum, e) => sum + e.cost, 0);

  return (
    <PageLayout title="Exames Solicitados">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar exame..." 
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
                <SelectItem value="agendado">Agendado</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="realizado">Realizado</SelectItem>
                <SelectItem value="resultado_disponivel">Resultado Disponível</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Solicitar Exame
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Solicitar Novo Exame</DialogTitle>
                <DialogDescription>
                  Preencha os dados para solicitar um novo exame
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
                  <Label>Tipo de Exame</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o exame" />
                    </SelectTrigger>
                    <SelectContent>
                      {examTypes.map((exam, index) => (
                        <SelectItem key={index} value={exam.name}>
                          {exam.name} - R$ {exam.cost.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Data Agendada</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Prioridade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label>Observações</Label>
                  <Textarea placeholder="Observações sobre o exame..." />
                </div>
                <div className="col-span-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleNewExam}>
                    <Plus className="w-4 h-4 mr-2" />
                    Solicitar Exame
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
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{totalExams}</p>
                  <p className="text-sm text-gray-600">Total de Exames</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{pendingExams}</p>
                  <p className="text-sm text-gray-600">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{completedExams}</p>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Receita Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Exames</CardTitle>
            <CardDescription>
              {filteredExams.length} exame(s) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredExams.map((exam) => (
                <div key={exam.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(exam.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-medium">#{exam.id} - {exam.type}</h3>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(exam.status)}>
                            {getStatusIcon(exam.status)}
                            <span className="ml-1">
                              {exam.status === 'agendado' ? 'Agendado' :
                               exam.status === 'em_andamento' ? 'Em Andamento' :
                               exam.status === 'realizado' ? 'Realizado' :
                               exam.status === 'resultado_disponivel' ? 'Resultado Disponível' :
                               'Cancelado'}
                            </span>
                          </Badge>
                          <Badge className={getPriorityColor(exam.priority)}>
                            {exam.priority === 'urgente' ? 'Urgente' : 'Normal'}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{exam.petName} - {exam.owner}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {exam.veterinarian}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Agendado: {exam.scheduledDate}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Stethoscope className="w-3 h-3" />
                          {exam.lab}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 lg:max-w-md">
                    <p className="text-sm font-medium text-green-600 mb-1">R$ {exam.cost.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{exam.observations}</p>
                    {exam.preparation && (
                      <p className="text-xs text-blue-600 mt-1">Preparo: {exam.preparation}</p>
                    )}
                    {exam.results && (
                      <p className="text-xs text-green-600 mt-1">Resultado: {exam.results}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleWhatsApp(exam.phone, exam.petName, exam.type)}
                      className="flex-1 lg:flex-none"
                    >
                      WhatsApp
                    </Button>
                    {exam.status === 'resultado_disponivel' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadResult(exam.id, exam.petName)}
                        className="flex-1 lg:flex-none"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Resultado
                      </Button>
                    )}
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

              {filteredExams.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum exame encontrado</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Exames Disponíveis</CardTitle>
              <CardDescription>Catálogo de exames com preços</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {examTypes.map((examType, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(examType.category)}
                      <div>
                        <p className="font-medium">{examType.name}</p>
                        <p className="text-sm text-gray-600">{examType.category}</p>
                        <p className="text-xs text-blue-600">{examType.preparation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">R$ {examType.cost.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas do Mês</CardTitle>
              <CardDescription>Resumo dos exames realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Exames Laboratoriais</span>
                  <div className="text-right">
                    <span className="font-medium">45</span>
                    <p className="text-xs text-gray-500">60% do total</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Exames de Imagem</span>
                  <div className="text-right">
                    <span className="font-medium">25</span>
                    <p className="text-xs text-gray-500">33% do total</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Anatomopatológico</span>
                  <div className="text-right">
                    <span className="font-medium">5</span>
                    <p className="text-xs text-gray-500">7% do total</p>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Receita Total</span>
                    <span className="font-bold text-green-600">R$ 8.750,00</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Exames;
