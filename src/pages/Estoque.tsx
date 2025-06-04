
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Package, Search, Plus, AlertTriangle, TrendingDown } from 'lucide-react';

const Estoque = () => {
  const products = [
    { name: 'Vacina V10', category: 'Medicamentos', stock: 25, minStock: 10, price: 45.00, status: 'Normal' },
    { name: 'Antibiótico Amoxicilina', category: 'Medicamentos', stock: 5, minStock: 15, price: 32.50, status: 'Baixo' },
    { name: 'Ração Premium Cães', category: 'Alimentação', stock: 50, minStock: 20, price: 89.90, status: 'Normal' },
    { name: 'Anti-inflamatório', category: 'Medicamentos', stock: 2, minStock: 10, price: 28.00, status: 'Crítico' },
    { name: 'Shampoo Medicinal', category: 'Higiene', stock: 12, minStock: 8, price: 24.90, status: 'Normal' },
    { name: 'Luvas Cirúrgicas', category: 'Materiais', stock: 8, minStock: 20, price: 15.50, status: 'Baixo' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Baixo': return 'bg-yellow-100 text-yellow-800';
      case 'Crítico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const normalCount = products.filter(p => p.status === 'Normal').length;
  const lowCount = products.filter(p => p.status === 'Baixo').length;
  const criticalCount = products.filter(p => p.status === 'Crítico').length;
  const totalValue = products.reduce((sum, product) => sum + (product.stock * product.price), 0);

  return (
    <PageLayout title="Controle de Estoque">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input placeholder="Buscar produto..." className="pl-9 w-80" />
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{products.length}</p>
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
                  <p className="text-2xl font-bold">{criticalCount}</p>
                  <p className="text-sm text-gray-600">Estoque Crítico</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{lowCount}</p>
                  <p className="text-sm text-gray-600">Estoque Baixo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {totalValue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Valor Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Produtos em Estoque</CardTitle>
            <CardDescription>Lista completa de produtos e seus níveis de estoque</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                      <p className="text-xs text-gray-500">
                        Preço unitário: R$ {product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold">{product.stock}</p>
                    <p className="text-xs text-gray-500">unidades</p>
                    <p className="text-xs text-gray-500">Mín: {product.minStock}</p>
                  </div>
                  
                  <div className="text-right">
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                    <p className="text-sm font-medium mt-1">
                      R$ {(product.stock * product.price).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Repor
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas de Estoque</CardTitle>
            <CardDescription>Produtos que precisam de reposição urgente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products.filter(p => p.status !== 'Normal').map((product, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  product.status === 'Crítico' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        Estoque atual: {product.stock} | Mínimo: {product.minStock}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Solicitar Reposição
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Estoque;
