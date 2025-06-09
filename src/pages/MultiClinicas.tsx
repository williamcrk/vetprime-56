
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, Plus, MapPin, Phone, Mail, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Clinica {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone?: string;
  email?: string;
  status: 'ativa' | 'inativa';
  usuarios_count: number;
  created_at: string;
}

const MultiClinicas = () => {
  const { toast } = useToast();
  const [clinicas, setClinicas] = useState<Clinica[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Dados de exemplo
  const clinicasExample: Clinica[] = [
    {
      id: '1',
      nome: 'Clínica Veterinária Pet Care Central',
      cnpj: '12.345.678/0001-90',
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      telefone: '(11) 3456-7890',
      email: 'central@petcare.com.br',
      status: 'ativa',
      usuarios_count: 8,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      nome: 'Pet Care Unidade Moema',
      cnpj: '12.345.678/0002-71',
      endereco: 'Av. Ibirapuera, 456',
      cidade: 'São Paulo',
      estado: 'SP',
      telefone: '(11) 3456-7891',
      email: 'moema@petcare.com.br',
      status: 'ativa',
      usuarios_count: 5,
      created_at: '2024-02-10'
    },
    {
      id: '3',
      nome: 'Pet Care Unidade Vila Madalena',
      cnpj: '12.345.678/0003-52',
      endereco: 'Rua Harmonia, 789',
      cidade: 'São Paulo',
      estado: 'SP',
      telefone: '(11) 3456-7892',
      email: 'vilamadalena@petcare.com.br',
      status: 'inativa',
      usuarios_count: 3,
      created_at: '2024-03-05'
    }
  ];

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setClinicas(clinicasExample);
      setLoading(false);
    }, 1000);
  }, []);

  const clinicasFiltradas = clinicas.filter(clinica =>
    clinica.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinica.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinica.cnpj.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    return status === 'ativa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <PageLayout title="Multi-Clínicas">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Carregando clínicas...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Multi-Clínicas">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              Gestão de Clínicas
            </h2>
            <p className="text-gray-600">Gerencie todas as unidades da sua rede</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Clínica
          </Button>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input 
              placeholder="Buscar clínica..." 
              className="pl-9 w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{clinicas.length}</p>
                  <p className="text-sm text-gray-600">Total de Clínicas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{clinicas.filter(c => c.status === 'ativa').length}</p>
                  <p className="text-sm text-gray-600">Clínicas Ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{clinicas.reduce((acc, c) => acc + c.usuarios_count, 0)}</p>
                  <p className="text-sm text-gray-600">Total de Usuários</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{new Set(clinicas.map(c => c.cidade)).size}</p>
                  <p className="text-sm text-gray-600">Cidades</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Clínicas</CardTitle>
            <CardDescription>
              {clinicasFiltradas.length} clínica(s) encontrada(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clinicasFiltradas.map((clinica) => (
                <div key={clinica.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-lg">{clinica.nome}</h3>
                          <Badge className={getStatusColor(clinica.status)}>
                            {clinica.status === 'ativa' ? 'Ativa' : 'Inativa'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">CNPJ: {clinica.cnpj}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="w-3 h-3" />
                            {clinica.endereco}, {clinica.cidade} - {clinica.estado}
                          </div>
                          {clinica.telefone && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <Phone className="w-3 h-3" />
                              {clinica.telefone}
                            </div>
                          )}
                          {clinica.email && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <Mail className="w-3 h-3" />
                              {clinica.email}
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-gray-600">
                            <Users className="w-3 h-3" />
                            {clinica.usuarios_count} usuário(s)
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Acessar
                      </Button>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Configurar
                      </Button>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Relatórios
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {clinicasFiltradas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhuma clínica encontrada</p>
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

export default MultiClinicas;
