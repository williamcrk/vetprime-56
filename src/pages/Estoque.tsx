
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Search, AlertTriangle, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { EstoqueService, type Produto } from '@/services/EstoqueService';
import { useToast } from '@/hooks/use-toast';

const Estoque = () => {
  const { toast } = useToast();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadProdutos = async () => {
    try {
      setLoading(true);
      const data = await EstoqueService.getAll();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos do estoque.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProdutos();
  }, []);

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.codigo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const produtosBaixoEstoque = produtos.filter(p => 
    (p.estoque_atual || 0) <= (p.estoque_minimo || 0)
  );

  const valorTotalEstoque = produtos.reduce((total, produto) => 
    total + ((produto.estoque_atual || 0) * (produto.preco_custo || 0)), 0
  );

  const handleUpdateStock = async (produtoId: string, quantidade: number, tipo: 'entrada' | 'saida') => {
    try {
      await EstoqueService.updateStock(produtoId, quantidade, tipo);
      await loadProdutos();
      toast({
        title: "Sucesso",
        description: `Estoque ${tipo === 'entrada' ? 'adicionado' : 'removido'} com sucesso.`,
      });
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o estoque.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <PageLayout title="Estoque">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Carregando estoque...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Estoque">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input 
              placeholder="Buscar produto..." 
              className="pl-9 w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{produtos.length}</p>
                  <p className="text-sm text-gray-600">Total de Produtos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{produtosBaixoEstoque.length}</p>
                  <p className="text-sm text-gray-600">Baixo Estoque</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    R$ {valorTotalEstoque.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-gray-600">Valor Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {produtos.reduce((total, p) => total + (p.estoque_atual || 0), 0)}
                  </p>
                  <p className="text-sm text-gray-600">Itens em Estoque</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>
              {produtosFiltrados.length} produto(s) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {produtosFiltrados.map((produto) => (
                <div key={produto.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{produto.nome}</h3>
                      <p className="text-sm text-gray-600">{produto.categoria} • {produto.codigo}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          Estoque: {produto.estoque_atual || 0} {produto.unidade}
                        </span>
                        <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                        <span className="text-xs text-gray-500">
                          Preço: R$ {produto.preco_venda?.toFixed(2)}
                        </span>
                        {(produto.estoque_atual || 0) <= (produto.estoque_minimo || 0) && (
                          <>
                            <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                            <span className="text-xs text-red-600 font-medium">
                              ⚠️ Baixo estoque
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUpdateStock(produto.id!, 1, 'entrada')}
                      className="flex-1 sm:flex-none"
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +1
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUpdateStock(produto.id!, 1, 'saida')}
                      className="flex-1 sm:flex-none"
                      disabled={(produto.estoque_atual || 0) <= 0}
                    >
                      <TrendingDown className="w-4 h-4 mr-1" />
                      -1
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
              
              {produtosFiltrados.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum produto encontrado</p>
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

export default Estoque;
