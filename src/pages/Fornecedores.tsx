
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Truck, Search, Plus, Phone, Mail, MapPin } from 'lucide-react';

const Fornecedores = () => {
  const suppliers = [
    { 
      name: 'MedVet Distribuidora', 
      category: 'Medicamentos', 
      contact: 'João Silva',
      phone: '(11) 3333-4444',
      email: 'contato@medvet.com.br',
      address: 'São Paulo, SP',
      status: 'Ativo',
      lastOrder: '10/11/2024'
    },
    { 
      name: 'Pet Food Premium', 
      category: 'Alimentação', 
      contact: 'Maria Santos',
      phone: '(11) 5555-6666',
      email: 'vendas@petfood.com.br',
      address: 'Guarulhos, SP',
      status: 'Ativo',
      lastOrder: '05/11/2024'
    },
    { 
      name: 'Cirúrgica Veterinária', 
      category: 'Materiais Cirúrgicos', 
      contact: 'Pedro Costa',
      phone: '(11) 7777-8888',
      email: 'pedidos@cirurgica.com.br',
      address: 'São Paulo, SP',
      status: 'Ativo',
      lastOrder: '08/11/2024'
    },
    { 
      name: 'HigiPet Produtos', 
      category: 'Higiene e Limpeza', 
      contact: 'Ana Oliveira',
      phone: '(11) 9999-0000',
      email: 'ana@higipet.com.br',
      address: 'Osasco, SP',
      status: 'Inativo',
      lastOrder: '15/09/2024'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Inativo': return 'bg-red-100 text-red-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeCount = suppliers.filter(s => s.status === 'Ativo').length;
  const inactiveCount = suppliers.filter(s => s.status === 'Inativo').length;

  return (
    <PageLayout title="Fornecedores">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input placeholder="Buscar fornecedor..." className="pl-9 w-80" />
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Fornecedor
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{suppliers.length}</p>
                  <p className="text-sm text-gray-600">Total de Fornecedores</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{activeCount}</p>
                  <p className="text-sm text-gray-600">Fornecedores Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{inactiveCount}</p>
                  <p className="text-sm text-gray-600">Fornecedores Inativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-600">Pedidos este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Fornecedores</CardTitle>
            <CardDescription>Todos os fornecedores cadastrados no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers.map((supplier, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Truck className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-lg">{supplier.name}</h3>
                          <Badge className={getStatusColor(supplier.status)}>
                            {supplier.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Categoria:</p>
                            <p className="font-medium">{supplier.category}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Contato:</p>
                            <p className="font-medium">{supplier.contact}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Último Pedido:</p>
                            <p className="font-medium">{supplier.lastOrder}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {supplier.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {supplier.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {supplier.address}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver Histórico
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Novo Pedido
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Últimos pedidos realizados aos fornecedores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">MedVet Distribuidora</p>
                  <p className="text-sm text-gray-600">Pedido #001 - R$ 2.450,00</p>
                  <p className="text-xs text-gray-500">10/11/2024</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Pet Food Premium</p>
                  <p className="text-sm text-gray-600">Pedido #002 - R$ 1.890,00</p>
                  <p className="text-xs text-gray-500">05/11/2024</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Entregue</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Fornecedores;
