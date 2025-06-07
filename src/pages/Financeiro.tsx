
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign, Search, Plus, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { FinanceiroService, type Financeiro } from '@/services/FinanceiroService';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Financeiro = () => {
  const { toast } = useToast();
  const [lancamentos, setLancamentos] = useState<Financeiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  const loadLancamentos = async () => {
    try {
      setLoading(true);
      const data = await FinanceiroService.getAll();
      setLancamentos(data);
    } catch (error) {
      console.error('Erro ao carregar lançamentos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os lançamentos financeiros.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLancamentos();
  }, []);

  const lancamentosFiltrados = lancamentos.filter(lancamento => {
    const matchesSearch = lancamento.tutores?.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filtroStatus === 'todos' || lancamento.status === filtroStatus;
    return matchesSearch && matchesStatus;
  });

  const totalReceitas = lancamentos
    .filter(l => l.status === 'pago')
    .reduce((total, l) => total + l.valor_total, 0);

  const totalPendente = lancamentos
    .filter(l => l.status === 'pendente')
    .reduce((total, l) => total + l.valor_total, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'vencido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormaPagamentoIcon = (forma?: string) => {
    switch (forma) {
      case 'cartao': return '💳';
      case 'dinheiro': return '💵';
      case 'pix': return '📱';
      case 'transferencia': return '🏦';
      default: return '💰';
    }
  };

  if (loading) {
    return (
      <PageLayout title="Financeiro">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Carregando dados financeiros...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Financeiro">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar por cliente..." 
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
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Lançamento
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {totalReceitas.toLocaleString('pt-BR')}</p>
                  <p className="text-sm text-gray-600">Total Recebido</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {totalPendente.toLocaleString('pt-BR')}</p>
                  <p className="text-sm text-gray-600">A Receber</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{lancamentos.length}</p>
                  <p className="text-sm text-gray-600">Total de Lançamentos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {lancamentos.filter(l => l.status === 'pago').length}
                  </p>
                  <p className="text-sm text-gray-600">Pagamentos Realizados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lançamentos Financeiros</CardTitle>
            <CardDescription>
              {lancamentosFiltrados.length} lançamento(s) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lancamentosFiltrados.map((lancamento) => (
                <div key={lancamento.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">
                        R$ {lancamento.valor_total.toFixed(2).replace('.', ',')}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Cliente: {lancamento.tutores?.nome || 'N/A'}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {format(new Date(lancamento.created_at!), 'dd/MM/yyyy', { locale: ptBR })}
                        </span>
                        {lancamento.forma_pagamento && (
                          <>
                            <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              {getFormaPagamentoIcon(lancamento.forma_pagamento)}
                              {lancamento.forma_pagamento}
                            </span>
                          </>
                        )}
                        {lancamento.parcelas && lancamento.parcelas > 1 && (
                          <>
                            <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                            <span className="text-xs text-gray-500">
                              {lancamento.parcelas}x
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(lancamento.status || 'pendente')}`}>
                      {lancamento.status || 'pendente'}
                    </span>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                        Detalhes
                      </Button>
                      {lancamento.status === 'pendente' && (
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          Receber
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {lancamentosFiltrados.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum lançamento encontrado</p>
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

export default Financeiro;
