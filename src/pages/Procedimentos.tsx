
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Scissors, Search, Plus, Clock, DollarSign, Percent } from 'lucide-react';
import { ServicosService, type Servico } from '@/services/ServicosService';
import { useToast } from '@/hooks/use-toast';

const Procedimentos = () => {
  const { toast } = useToast();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadServicos = async () => {
    try {
      setLoading(true);
      const data = await ServicosService.getAll();
      setServicos(data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os serviços.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServicos();
  }, []);

  const servicosFiltrados = servicos.filter(servico =>
    servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (servico.descricao && servico.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const precoMedio = servicos.length > 0 
    ? servicos.reduce((total, s) => total + s.preco, 0) / servicos.length 
    : 0;

  if (loading) {
    return (
      <PageLayout title="Procedimentos">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Carregando procedimentos...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Procedimentos">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar procedimento..." 
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Procedimento
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{servicos.length}</p>
                  <p className="text-sm text-gray-600">Total de Procedimentos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {precoMedio.toFixed(0)}</p>
                  <p className="text-sm text-gray-600">Preço Médio</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {servicos.filter(s => s.duracao_minutos).length}
                  </p>
                  <p className="text-sm text-gray-600">Com Duração</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {servicos.filter(s => s.comissao_percentual && s.comissao_percentual > 0).length}
                  </p>
                  <p className="text-sm text-gray-600">Com Comissão</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Procedimentos</CardTitle>
            <CardDescription>
              {servicosFiltrados.length} procedimento(s) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {servicosFiltrados.map((servico) => (
                <div key={servico.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Scissors className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{servico.nome}</h3>
                      {servico.descricao && (
                        <p className="text-sm text-gray-600">{servico.descricao}</p>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          R$ {servico.preco.toFixed(2)}
                        </span>
                        {servico.duracao_minutos && (
                          <>
                            <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {servico.duracao_minutos} min
                            </span>
                          </>
                        )}
                        {servico.comissao_percentual && servico.comissao_percentual > 0 && (
                          <>
                            <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Percent className="w-3 h-3" />
                              {servico.comissao_percentual}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      Detalhes
                    </Button>
                  </div>
                </div>
              ))}
              
              {servicosFiltrados.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Scissors className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum procedimento encontrado</p>
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

export default Procedimentos;
