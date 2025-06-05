
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, Search, Filter, Clock, Scissors, Stethoscope, 
  FileText, Activity, Calendar, DollarSign, AlertCircle,
  CheckCircle, XCircle, Timer
} from 'lucide-react';

interface Procedimento {
  id: string;
  nome: string;
  categoria: 'cirurgia' | 'consulta' | 'exame' | 'tratamento' | 'emergencia';
  paciente: string;
  cliente: string;
  veterinario: string;
  dataHora: string;
  duracao: number; // em minutos
  status: 'agendado' | 'em_andamento' | 'concluido' | 'cancelado' | 'adiado';
  valor: number;
  materiais: Array<{
    nome: string;
    quantidade: number;
    custo: number;
  }>;
  medicamentos: Array<{
    nome: string;
    dosagem: string;
    via: string;
  }>;
  observacoes: string;
  resultados: string;
  complicacoes: string;
  proximoRetorno: string;
  fotos: string[];
  anestesia?: {
    tipo: string;
    protocolo: string;
    monitoramento: boolean;
  };
}

interface TemplateProcedimento {
  id: string;
  nome: string;
  categoria: string;
  duracaoEstimada: number;
  valorBase: number;
  materiaisNecessarios: string[];
  medicamentosComuns: Array<{
    nome: string;
    dosagem: string;
    via: string;
  }>;
  observacoesTemplate: string;
}

const Procedimentos = () => {
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>([
    {
      id: '1',
      nome: 'Castração Felina',
      categoria: 'cirurgia',
      paciente: 'Luna',
      cliente: 'Ana Costa',
      veterinario: 'Dr. João',
      dataHora: '2024-01-15 09:00',
      duracao: 45,
      status: 'concluido',
      valor: 300,
      materiais: [
        { nome: 'Fio de sutura', quantidade: 2, custo: 15 },
        { nome: 'Gaze estéril', quantidade: 5, custo: 10 }
      ],
      medicamentos: [
        { nome: 'Tramadol', dosagem: '2mg/kg', via: 'SC' },
        { nome: 'Meloxicam', dosagem: '0.1mg/kg', via: 'SC' }
      ],
      observacoes: 'Procedimento sem intercorrências',
      resultados: 'Cirurgia realizada com sucesso',
      complicacoes: '',
      proximoRetorno: '2024-01-22',
      fotos: [],
      anestesia: {
        tipo: 'Geral',
        protocolo: 'Acepromazina + Propofol + Isoflurano',
        monitoramento: true
      }
    }
  ]);

  const [templates] = useState<TemplateProcedimento[]>([
    {
      id: '1',
      nome: 'Castração Canina',
      categoria: 'cirurgia',
      duracaoEstimada: 60,
      valorBase: 400,
      materiaisNecessarios: ['Fio de sutura', 'Gaze estéril', 'Lâmina de bisturi'],
      medicamentosComuns: [
        { nome: 'Tramadol', dosagem: '2-4mg/kg', via: 'SC' },
        { nome: 'Meloxicam', dosagem: '0.1mg/kg', via: 'SC' }
      ],
      observacoesTemplate: 'Procedimento cirúrgico de rotina. Jejum de 12h necessário.'
    },
    {
      id: '2',
      nome: 'Consulta de Rotina',
      categoria: 'consulta',
      duracaoEstimada: 30,
      valorBase: 80,
      materiaisNecessarios: ['Ficha clínica'],
      medicamentosComuns: [],
      observacoesTemplate: 'Exame clínico geral, verificação de peso e temperatura.'
    }
  ]);

  const [novoProcedimento, setNovoProcedimento] = useState<Partial<Procedimento>>({});
  const [templateSelecionado, setTemplateSelecionado] = useState<string>('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState<Procedimento | null>(null);

  const procedimentosFiltrados = procedimentos.filter(proc => {
    const matchBusca = proc.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      proc.paciente.toLowerCase().includes(busca.toLowerCase()) ||
                      proc.cliente.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = filtroCategoria === 'todos' || proc.categoria === filtroCategoria;
    const matchStatus = filtroStatus === 'todos' || proc.status === filtroStatus;
    return matchBusca && matchCategoria && matchStatus;
  });

  const aplicarTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setNovoProcedimento({
        ...novoProcedimento,
        nome: template.nome,
        categoria: template.categoria as any,
        duracao: template.duracaoEstimada,
        valor: template.valorBase,
        observacoes: template.observacoesTemplate,
        medicamentos: template.medicamentosComuns
      });
    }
  };

  const criarProcedimento = () => {
    const procedimento: Procedimento = {
      id: Date.now().toString(),
      nome: novoProcedimento.nome || '',
      categoria: novoProcedimento.categoria || 'consulta',
      paciente: novoProcedimento.paciente || '',
      cliente: novoProcedimento.cliente || '',
      veterinario: novoProcedimento.veterinario || '',
      dataHora: novoProcedimento.dataHora || '',
      duracao: novoProcedimento.duracao || 30,
      status: 'agendado',
      valor: novoProcedimento.valor || 0,
      materiais: novoProcedimento.materiais || [],
      medicamentos: novoProcedimento.medicamentos || [],
      observacoes: novoProcedimento.observacoes || '',
      resultados: '',
      complicacoes: '',
      proximoRetorno: '',
      fotos: []
    };

    setProcedimentos([...procedimentos, procedimento]);
    setNovoProcedimento({});
    setDialogAberto(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'adiado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendado': return <Clock className="w-4 h-4" />;
      case 'em_andamento': return <Timer className="w-4 h-4" />;
      case 'concluido': return <CheckCircle className="w-4 h-4" />;
      case 'cancelado': return <XCircle className="w-4 h-4" />;
      case 'adiado': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'cirurgia': return <Scissors className="w-4 h-4" />;
      case 'consulta': return <Stethoscope className="w-4 h-4" />;
      case 'exame': return <FileText className="w-4 h-4" />;
      case 'tratamento': return <Activity className="w-4 h-4" />;
      case 'emergencia': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const estatisticas = {
    totalProcedimentos: procedimentos.length,
    agendados: procedimentos.filter(p => p.status === 'agendado').length,
    emAndamento: procedimentos.filter(p => p.status === 'em_andamento').length,
    concluidos: procedimentos.filter(p => p.status === 'concluido').length,
    receitaTotal: procedimentos.filter(p => p.status === 'concluido').reduce((acc, p) => acc + p.valor, 0)
  };

  return (
    <PageLayout title="Módulo de Procedimentos">
      <div className="space-y-6">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold">{estatisticas.totalProcedimentos}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Agendados</p>
                  <p className="text-2xl font-bold text-blue-600">{estatisticas.agendados}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Em Andamento</p>
                  <p className="text-2xl font-bold text-yellow-600">{estatisticas.emAndamento}</p>
                </div>
                <Timer className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Concluídos</p>
                  <p className="text-2xl font-bold text-green-600">{estatisticas.concluidos}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita</p>
                  <p className="text-2xl font-bold text-green-600">R$ {estatisticas.receitaTotal.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Procedimentos */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Gestão de Procedimentos</CardTitle>
                <CardDescription>Controle detalhado de todos os procedimentos realizados</CardDescription>
              </div>
              <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Procedimento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Novo Procedimento</DialogTitle>
                    <DialogDescription>
                      Registre um novo procedimento ou use um template
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="basico" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basico">Informações Básicas</TabsTrigger>
                      <TabsTrigger value="materiais">Materiais & Medicamentos</TabsTrigger>
                      <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basico" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Template</Label>
                          <Select 
                            value={templateSelecionado} 
                            onValueChange={(value) => {
                              setTemplateSelecionado(value);
                              aplicarTemplate(value);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um template" />
                            </SelectTrigger>
                            <SelectContent>
                              {templates.map(template => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Nome do Procedimento</Label>
                          <Input
                            value={novoProcedimento.nome || ''}
                            onChange={(e) => setNovoProcedimento({...novoProcedimento, nome: e.target.value})}
                            placeholder="Nome do procedimento"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Categoria</Label>
                          <Select onValueChange={(value) => setNovoProcedimento({...novoProcedimento, categoria: value as any})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cirurgia">Cirurgia</SelectItem>
                              <SelectItem value="consulta">Consulta</SelectItem>
                              <SelectItem value="exame">Exame</SelectItem>
                              <SelectItem value="tratamento">Tratamento</SelectItem>
                              <SelectItem value="emergencia">Emergência</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Paciente</Label>
                          <Input
                            value={novoProcedimento.paciente || ''}
                            onChange={(e) => setNovoProcedimento({...novoProcedimento, paciente: e.target.value})}
                            placeholder="Nome do animal"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Cliente</Label>
                          <Input
                            value={novoProcedimento.cliente || ''}
                            onChange={(e) => setNovoProcedimento({...novoProcedimento, cliente: e.target.value})}
                            placeholder="Nome do proprietário"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Veterinário</Label>
                          <Select onValueChange={(value) => setNovoProcedimento({...novoProcedimento, veterinario: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o veterinário" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Dr. João">Dr. João</SelectItem>
                              <SelectItem value="Dra. Ana">Dra. Ana</SelectItem>
                              <SelectItem value="Dr. Carlos">Dr. Carlos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Data e Hora</Label>
                          <Input
                            type="datetime-local"
                            value={novoProcedimento.dataHora || ''}
                            onChange={(e) => setNovoProcedimento({...novoProcedimento, dataHora: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Duração (minutos)</Label>
                          <Input
                            type="number"
                            value={novoProcedimento.duracao || ''}
                            onChange={(e) => setNovoProcedimento({...novoProcedimento, duracao: parseInt(e.target.value)})}
                            placeholder="Duração em minutos"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Valor (R$)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={novoProcedimento.valor || ''}
                            onChange={(e) => setNovoProcedimento({...novoProcedimento, valor: parseFloat(e.target.value)})}
                            placeholder="Valor do procedimento"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="materiais" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label>Materiais Utilizados</Label>
                          <Textarea
                            placeholder="Liste os materiais utilizados (um por linha)"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Medicamentos Aplicados</Label>
                          <Textarea
                            placeholder="Liste os medicamentos, dosagens e vias de aplicação"
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="detalhes" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label>Observações</Label>
                          <Textarea
                            value={novoProcedimento.observacoes || ''}
                            onChange={(e) => setNovoProcedimento({...novoProcedimento, observacoes: e.target.value})}
                            placeholder="Observações sobre o procedimento"
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setDialogAberto(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={criarProcedimento}>
                      Criar Procedimento
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por procedimento, paciente ou cliente..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Categorias</SelectItem>
                  <SelectItem value="cirurgia">Cirurgia</SelectItem>
                  <SelectItem value="consulta">Consulta</SelectItem>
                  <SelectItem value="exame">Exame</SelectItem>
                  <SelectItem value="tratamento">Tratamento</SelectItem>
                  <SelectItem value="emergencia">Emergência</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="agendado">Agendado</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="adiado">Adiado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Procedimento</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {procedimentosFiltrados.map((procedimento) => (
                  <TableRow key={procedimento.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoriaIcon(procedimento.categoria)}
                        <div>
                          <p className="font-medium">{procedimento.nome}</p>
                          <p className="text-sm text-gray-500 capitalize">{procedimento.categoria}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{procedimento.paciente}</TableCell>
                    <TableCell>{procedimento.cliente}</TableCell>
                    <TableCell>{new Date(procedimento.dataHora).toLocaleString()}</TableCell>
                    <TableCell>{procedimento.duracao} min</TableCell>
                    <TableCell>R$ {procedimento.valor.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(procedimento.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(procedimento.status)}
                          {procedimento.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setProcedimentoSelecionado(procedimento)}
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detalhes do procedimento selecionado */}
        {procedimentoSelecionado && (
          <Card>
            <CardHeader>
              <CardTitle>Detalhes - {procedimentoSelecionado.nome}</CardTitle>
              <CardDescription>Informações completas do procedimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Informações Gerais</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Paciente:</strong> {procedimentoSelecionado.paciente}</p>
                      <p><strong>Cliente:</strong> {procedimentoSelecionado.cliente}</p>
                      <p><strong>Veterinário:</strong> {procedimentoSelecionado.veterinario}</p>
                      <p><strong>Data/Hora:</strong> {new Date(procedimentoSelecionado.dataHora).toLocaleString()}</p>
                      <p><strong>Duração:</strong> {procedimentoSelecionado.duracao} minutos</p>
                      <p><strong>Valor:</strong> R$ {procedimentoSelecionado.valor.toLocaleString()}</p>
                    </div>
                  </div>

                  {procedimentoSelecionado.materiais.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Materiais Utilizados</h4>
                      <div className="space-y-1 text-sm">
                        {procedimentoSelecionado.materiais.map((material, index) => (
                          <p key={index}>
                            {material.nome} - Qtd: {material.quantidade} - R$ {material.custo.toFixed(2)}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {procedimentoSelecionado.medicamentos.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Medicamentos</h4>
                      <div className="space-y-1 text-sm">
                        {procedimentoSelecionado.medicamentos.map((med, index) => (
                          <p key={index}>
                            {med.nome} - {med.dosagem} - Via: {med.via}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {procedimentoSelecionado.observacoes && (
                    <div>
                      <h4 className="font-semibold mb-2">Observações</h4>
                      <p className="text-sm text-gray-600">{procedimentoSelecionado.observacoes}</p>
                    </div>
                  )}

                  {procedimentoSelecionado.resultados && (
                    <div>
                      <h4 className="font-semibold mb-2">Resultados</h4>
                      <p className="text-sm text-gray-600">{procedimentoSelecionado.resultados}</p>
                    </div>
                  )}

                  {procedimentoSelecionado.anestesia && (
                    <div>
                      <h4 className="font-semibold mb-2">Anestesia</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Tipo:</strong> {procedimentoSelecionado.anestesia.tipo}</p>
                        <p><strong>Protocolo:</strong> {procedimentoSelecionado.anestesia.protocolo}</p>
                        <p><strong>Monitoramento:</strong> {procedimentoSelecionado.anestesia.monitoramento ? 'Sim' : 'Não'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default Procedimentos;
