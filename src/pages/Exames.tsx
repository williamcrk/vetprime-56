
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Search, Plus, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import NovoExameModalInteligente from '@/components/exames/NovoExameModalInteligente';
import { useToast } from '@/hooks/use-toast';
import { ExamesService, type Exame } from '@/services/ExamesService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Exames = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [exames, setExames] = useState<Exame[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  const loadExames = async () => {
    try {
      setLoading(true);
      const data = await ExamesService.getAll();
      setExames(data);
    } catch (error) {
      console.error('Erro ao carregar exames:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os exames.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExames();
  }, []);

  const examesFiltrados = exames.filter(exame => {
    const matchesSearch = 
      (exame.pets?.name && exame.pets.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (exame.pets?.tutores?.nome && exame.pets.tutores.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      exame.tipo_exame.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filtroStatus === 'todos' || exame.status === filtroStatus;
    return matchesSearch && matchesStatus;
  });

  const examesSolicitados = exames.filter(e => e.status === 'solicitado').length;
  const examesAndamento = exames.filter(e => e.status === 'em_andamento').length;
  const examesConcluidos = exames.filter(e => e.status === 'concluido').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solicitado': return 'bg-yellow-100 text-yellow-800';
      case 'em_andamento': return 'bg-blue-100 text-blue-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solicitado': return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'em_andamento': return <FileText className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'concluido': return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'cancelado': return <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      default: return <FileText className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'solicitado': return 'Solicitado';
      case 'em_andamento': return 'Em Andamento';
      case 'concluido': return 'Concluído';
      case 'cancelado': return 'Cancelado';
      default: return 'Indefinido';
    }
  };

  if (loading) {
    return (
      <PageLayout title="Exames">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500 text-sm">Carregando exames...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Exames">
      <div className="space-y-3 sm:space-y-4">
        {/* Header Actions */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Buscar por paciente ou exame..." 
                className="pl-9 text-sm h-8 sm:h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              value={filtroStatus} 
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm h-8 sm:h-9 min-w-[120px]"
            >
              <option value="todos">Todos</option>
              <option value="solicitado">Solicitados</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluídos</option>
              <option value="cancelado">Cancelados</option>
            </select>
          </div>
          <Button onClick={() => setModalOpen(true)} className="text-xs sm:text-sm h-8 sm:h-9">
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Solicitar Exame
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <Card>
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm sm:text-lg font-bold">{exames.length}</p>
                  <p className="text-xs text-gray-600 truncate">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm sm:text-lg font-bold">{examesSolicitados}</p>
                  <p className="text-xs text-gray-600 truncate">Solicitados</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm sm:text-lg font-bold">{examesAndamento}</p>
                  <p className="text-xs text-gray-600 truncate">Em Andamento</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm sm:text-lg font-bold">{examesConcluidos}</p>
                  <p className="text-xs text-gray-600 truncate">Concluídos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exames List */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-sm sm:text-base">Lista de Exames</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {examesFiltrados.length} exame(s) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-3">
            <div className="space-y-2 sm:space-y-3">
              {examesFiltrados.map((exame) => (
                <div key={exame.id} className="p-2 sm:p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex flex-col space-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-xs sm:text-sm truncate">{exame.tipo_exame}</h3>
                          <p className="text-xs text-gray-600 truncate">
                            {exame.pets?.name} - {exame.pets?.tutores?.nome}
                          </p>
                        </div>
                      </div>
                      <span className={`px-1 sm:px-2 py-1 rounded-full text-xs flex items-center gap-1 flex-shrink-0 ${getStatusColor(exame.status || 'solicitado')}`}>
                        {getStatusIcon(exame.status || 'solicitado')}
                        <span className="hidden sm:inline">{getStatusLabel(exame.status || 'solicitado')}</span>
                      </span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-gray-500">
                      {exame.data_solicitacao && (
                        <span>
                          Solicitado: {format(new Date(exame.data_solicitacao), 'dd/MM/yyyy', { locale: ptBR })}
                        </span>
                      )}
                      {exame.data_resultado && (
                        <span>
                          Resultado: {format(new Date(exame.data_resultado), 'dd/MM/yyyy', { locale: ptBR })}
                        </span>
                      )}
                      {exame.veterinarios && (
                        <span>Dr(a): {exame.veterinarios.nome}</span>
                      )}
                      {exame.pets?.tutores?.telefone && (
                        <span>Tel: {exame.pets.tutores.telefone}</span>
                      )}
                    </div>

                    {/* Result */}
                    {exame.resultado && (
                      <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                        <p><strong>Resultado:</strong> {exame.resultado}</p>
                        {exame.interpretacao && (
                          <p><strong>Interpretação:</strong> {exame.interpretacao}</p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-1 sm:gap-2 pt-1">
                      <Button variant="outline" size="sm" className="text-xs h-6 sm:h-7 flex-1 sm:flex-none">
                        Ver Detalhes
                      </Button>
                      {exame.status === 'solicitado' && (
                        <Button variant="outline" size="sm" className="text-xs h-6 sm:h-7 flex-1 sm:flex-none">
                          Adicionar Resultado
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {examesFiltrados.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-4 text-gray-300" />
                  <p className="text-xs sm:text-sm">Nenhum exame encontrado</p>
                  {searchTerm && (
                    <p className="text-xs mt-2">
                      Tente buscar por outro termo ou{' '}
                      <button 
                        onClick={() => {setSearchTerm(''); setFiltroStatus('todos');}}
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

        <NovoExameModalInteligente 
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSuccess={loadExames}
        />
      </div>
    </PageLayout>
  );
};

export default Exames;
