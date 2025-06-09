
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Search, Plus, Stethoscope, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { ProfissionaisService, type Profissional } from '@/services/ProfissionaisService';
import { useToast } from '@/hooks/use-toast';
import NovoProfissionalModal from '@/components/profissionais/NovoProfissionalModal';
import EditarProfissionalModal from '@/components/profissionais/EditarProfissionalModal';

const Profissionais = () => {
  const { toast } = useToast();
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<Profissional | null>(null);

  const loadProfissionais = async () => {
    try {
      setLoading(true);
      const data = await ProfissionaisService.getAll();
      setProfissionais(data);
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os profissionais.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfissionais();
  }, []);

  const profissionaisFiltrados = profissionais.filter(profissional =>
    profissional.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (profissional.crmv && profissional.crmv.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (profissional.especialidade && profissional.especialidade.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (profissional: Profissional) => {
    setProfissionalSelecionado(profissional);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o profissional ${nome}?`)) {
      try {
        await ProfissionaisService.delete(id);
        toast({
          title: "Sucesso!",
          description: "Profissional excluído com sucesso",
        });
        loadProfissionais();
      } catch (error) {
        console.error('Erro ao excluir profissional:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o profissional",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <PageLayout title="Profissionais">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Carregando profissionais...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Profissionais">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar profissional..." 
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={() => setIsNovoModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Profissional
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{profissionais.length}</p>
                  <p className="text-sm text-gray-600">Total de Profissionais</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {profissionais.filter(p => p.especialidade).length}
                  </p>
                  <p className="text-sm text-gray-600">Com Especialidade</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {profissionais.filter(p => p.email).length}
                  </p>
                  <p className="text-sm text-gray-600">Com E-mail</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Profissionais</CardTitle>
            <CardDescription>
              {profissionaisFiltrados.length} profissional(is) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profissionaisFiltrados.map((profissional) => (
                <div key={profissional.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{profissional.nome}</h3>
                      {profissional.crmv && (
                        <p className="text-sm text-gray-600">CRMV: {profissional.crmv}</p>
                      )}
                      {profissional.especialidade && (
                        <p className="text-xs text-gray-500">{profissional.especialidade}</p>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        {profissional.telefone && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {profissional.telefone}
                          </span>
                        )}
                        {profissional.email && (
                          <>
                            <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {profissional.email}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    {profissional.comissao_percentual !== undefined && profissional.comissao_percentual > 0 && (
                      <div className="text-right">
                        <span className="text-xs text-gray-500">Comissão</span>
                        <p className="text-sm font-medium">{profissional.comissao_percentual}%</p>
                      </div>
                    )}
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 sm:flex-none"
                        onClick={() => handleEdit(profissional)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 sm:flex-none text-red-600 hover:text-red-700"
                        onClick={() => profissional.id && handleDelete(profissional.id, profissional.nome)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {profissionaisFiltrados.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum profissional encontrado</p>
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

        <NovoProfissionalModal
          open={isNovoModalOpen}
          onOpenChange={setIsNovoModalOpen}
          onSuccess={loadProfissionais}
        />

        <EditarProfissionalModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={loadProfissionais}
          profissional={profissionalSelecionado}
        />
      </div>
    </PageLayout>
  );
};

export default Profissionais;
