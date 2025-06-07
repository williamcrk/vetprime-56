
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

const Vacinas = () => {
  const { toast } = useToast();
  const [vacinacoes, setVacinacoes] = useState<Vacinacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

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
    const matchesSearch = vacinacao.pets?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      case 'Aplicada': return <CheckCircle className="w-4 h-4" />;
      case 'Agendada': return <Calendar className="w-4 h-4" />;
      case 'Cancelada': return <AlertTriangle className="w-4 h-4" />;
      default: return <Syringe className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <PageLayout title="Vacinas">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Carregando vacinações...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Vacinas">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar por paciente ou vacina..." 
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              value={filtroStatus} 
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="todos">Todos</option>
              <option value="Agendada">Agendadas</option>
              <option value="Aplicada">Aplicadas</option>
              <option value="Cancelada">Canceladas</option>
            </select>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Vacinação
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Syringe className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{vacinacoes.length}</p>
                  <p className="text-sm text-gray-600">Total de Vacinas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{vacinasPendentes}</p>
                  <p className="text-sm text-gray-600">Agendadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{vacinasAplicadas}</p>
                  <p className="text-sm text-gray-600">Aplicadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{vacinasVencidas}</p>
                  <p className="text-sm text-gray-600">Vencidas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Vacinações</CardTitle>
            <CardDescription>
              {vacinacoesFiltradas.length} vacinação(ões) encontrada(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vacinacoesFiltradas.map((vacinacao) => (
                <div key={vacinacao.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Syringe className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{vacinacao.vacina}</h3>
                      <p className="text-sm text-gray-600">
                        Paciente: {vacinacao.pets?.name} ({vacinacao.pets?.especie})
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        {vacinacao.data_aplicacao && (
                          <span className="text-xs text-gray-500">
                            Aplicação: {format(new Date(vacinacao.data_aplicacao), 'dd/MM/yyyy', { locale: ptBR })}
                          </span>
                        )}
                        {vacinacao.data_vencimento && (
                          <>
                            <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                            <span className="text-xs text-gray-500">
                              Vencimento: {format(new Date(vacinacao.data_vencimento), 'dd/MM/yyyy', { locale: ptBR })}
                            </span>
                          </>
                        )}
                        {vacinacao.lote && (
                          <>
                            <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                            <span className="text-xs text-gray-500">
                              Lote: {vacinacao.lote}
                            </span>
                          </>
                        )}
                      </div>
                      {vacinacao.veterinarios && (
                        <p className="text-xs text-gray-500 mt-1">
                          Veterinário: {vacinacao.veterinarios.nome}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(vacinacao.status || 'Agendada')}`}>
                      {getStatusIcon(vacinacao.status || 'Agendada')}
                      {vacinacao.status || 'Agendada'}
                    </span>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                        Editar
                      </Button>
                      {vacinacao.status === 'Agendada' && (
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          Aplicar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {vacinacoesFiltradas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Syringe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhuma vacinação encontrada</p>
                  {searchTerm && (
                    <p className="text-sm mt-2">
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
      </div>
    </PageLayout>
  );
};

export default Vacinas;
