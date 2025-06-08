
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Syringe, Search, Plus, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { VacinasService, type Vacinacao } from '@/services/VacinasService';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import NovaVacinacaoModalInteligente from '@/components/vacinas/NovaVacinacaoModalInteligente';

const Vacinas = () => {
  const { toast } = useToast();
  const [vacinacoes, setVacinacoes] = useState<Vacinacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [modalOpen, setModalOpen] = useState(false);

  const loadVacinacoes = async () => {
    try {
      setLoading(true);
      const data = await VacinasService.getAll();
      setVacinacoes(data);
    } catch (error) {
      console.error('Erro ao carregar vacinações:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as vacinações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVacinacoes();
  }, []);

  const vacinacoesFiltradas = vacinacoes.filter(vacinacao => {
    const matchesSearch = 
      (vacinacao.pets?.name && vacinacao.pets.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      vacinacao.vacina.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filtroStatus === 'todos' || vacinacao.status === filtroStatus;
    return matchesSearch && matchesStatus;
  });

  const vacinasPendentes = vacinacoes.filter(v => v.status === 'Agendada').length;
  const vacinasAplicadas = vacinacoes.filter(v => v.status === 'Aplicada').length;
  const vacinasVencidas = vacinacoes.filter(v => {
    if (!v.data_vencimento) return false;
    return new Date(v.data_vencimento) < new Date() && v.status !== 'Aplicada';
  }).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aplicada': return 'bg-green-100 text-green-800';
      case 'Agendada': return 'bg-blue-100 text-blue-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aplicada': return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'Agendada': return <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'Cancelada': return <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />;
      default: return <Syringe className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  if (loading) {
    return (
      <PageLayout title="Vacinas">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500 text-sm">Carregando vacinações...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Vacinas">
      <div className="space-y-4">
        {/* Header Actions */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Buscar por paciente ou vacina..." 
                className="pl-9 text-sm h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              value={filtroStatus} 
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm h-9 min-w-[120px]"
            >
              <option value="todos">Todos</option>
              <option value="Agendada">Agendadas</option>
              <option value="Aplicada">Aplicadas</option>
              <option value="Cancelada">Canceladas</option>
            </select>
          </div>
          <Button onClick={() => setModalOpen(true)} className="text-sm h-9">
            <Plus className="w-4 h-4 mr-1" />
            Nova Vacinação
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Syringe className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg font-bold">{vacinacoes.length}</p>
                  <p className="text-xs text-gray-600 truncate">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg font-bold">{vacinasPendentes}</p>
                  <p className="text-xs text-gray-600 truncate">Agendadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg font-bold">{vacinasAplicadas}</p>
                  <p className="text-xs text-gray-600 truncate">Aplicadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg font-bold">{vacinasVencidas}</p>
                  <p className="text-xs text-gray-600 truncate">Vencidas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vacinations List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Histórico de Vacinações</CardTitle>
            <CardDescription className="text-sm">
              {vacinacoesFiltradas.length} vacinação(ões) encontrada(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="space-y-3">
              {vacinacoesFiltradas.map((vacinacao) => (
                <div key={vacinacao.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex flex-col space-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Syringe className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-sm truncate">{vacinacao.vacina}</h3>
                          <p className="text-xs text-gray-600 truncate">
                            {vacinacao.pets?.name} ({vacinacao.pets?.especie})
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 flex-shrink-0 ${getStatusColor(vacinacao.status || 'Agendada')}`}>
                        {getStatusIcon(vacinacao.status || 'Agendada')}
                        <span className="hidden sm:inline">{vacinacao.status || 'Agendada'}</span>
                      </span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-gray-500">
                      {vacinacao.data_aplicacao && (
                        <span>
                          Aplicação: {format(new Date(vacinacao.data_aplicacao), 'dd/MM/yyyy', { locale: ptBR })}
                        </span>
                      )}
                      {vacinacao.data_vencimento && (
                        <span>
                          Vencimento: {format(new Date(vacinacao.data_vencimento), 'dd/MM/yyyy', { locale: ptBR })}
                        </span>
                      )}
                      {vacinacao.lote && (
                        <span>Lote: {vacinacao.lote}</span>
                      )}
                      {vacinacao.veterinarios && (
                        <span>Dr(a): {vacinacao.veterinarios.nome}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <Button variant="outline" size="sm" className="text-xs h-7 flex-1 sm:flex-none">
                        Editar
                      </Button>
                      {vacinacao.status === 'Agendada' && (
                        <Button variant="outline" size="sm" className="text-xs h-7 flex-1 sm:flex-none">
                          Aplicar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {vacinacoesFiltradas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Syringe className="w-8 h-8 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">Nenhuma vacinação encontrada</p>
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

        <NovaVacinacaoModalInteligente 
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSuccess={loadVacinacoes}
        />
      </div>
    </PageLayout>
  );
};

export default Vacinas;
