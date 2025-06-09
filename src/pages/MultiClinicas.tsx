
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, Plus, MapPin, Phone, Mail, Users, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ClinicasService, type Clinica } from '@/services/ClinicasService';
import NovaClinicaModal from '@/components/multi-clinicas/NovaClinicaModal';

const MultiClinicas = () => {
  const { toast } = useToast();
  const [clinicas, setClinicas] = useState<Clinica[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNovaModalOpen, setIsNovaModalOpen] = useState(false);

  const loadClinicas = async () => {
    try {
      setLoading(true);
      const data = await ClinicasService.getAll();
      setClinicas(data);
    } catch (error) {
      console.error('Erro ao carregar clínicas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as clínicas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClinicas();
  }, []);

  const clinicasFiltradas = clinicas.filter(clinica =>
    clinica.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (clinica.cidade && clinica.cidade.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (clinica.cnpj && clinica.cnpj.includes(searchTerm))
  );

  const handleDelete = async (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a clínica ${nome}?`)) {
      try {
        await ClinicasService.delete(id);
        toast({
          title: "Sucesso!",
          description: "Clínica excluída com sucesso",
        });
        loadClinicas();
      } catch (error) {
        console.error('Erro ao excluir clínica:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir a clínica",
          variant: "destructive",
        });
      }
    }
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
          <Button onClick={() => setIsNovaModalOpen(true)}>
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
                  <p className="text-2xl font-bold">{clinicas.length}</p>
                  <p className="text-sm text-gray-600">Clínicas Ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{new Set(clinicas.filter(c => c.cidade).map(c => c.cidade)).size}</p>
                  <p className="text-sm text-gray-600">Cidades</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{clinicas.filter(c => c.email).length}</p>
                  <p className="text-sm text-gray-600">Com E-mail</p>
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
                          <Badge className="bg-green-100 text-green-800">
                            Ativa
                          </Badge>
                        </div>
                        {clinica.cnpj && (
                          <p className="text-sm text-gray-600 mb-2">CNPJ: {clinica.cnpj}</p>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          {(clinica.endereco || clinica.cidade) && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {[clinica.endereco, clinica.cidade, clinica.estado].filter(Boolean).join(', ')}
                            </div>
                          )}
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
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full sm:w-auto text-red-600 hover:text-red-700"
                        onClick={() => clinica.id && handleDelete(clinica.id, clinica.nome)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
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

        <NovaClinicaModal
          open={isNovaModalOpen}
          onOpenChange={setIsNovaModalOpen}
          onSuccess={loadClinicas}
        />
      </div>
    </PageLayout>
  );
};

export default MultiClinicas;
