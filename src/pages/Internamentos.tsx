import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Search, Plus, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import NovoInternamentoModalInteligente from '@/components/internamento/NovoInternamentoModalInteligente';
import { useToast } from '@/hooks/use-toast';
import { InternamentosService, type Internamento } from '@/services/InternamentosService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Internamentos = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [internamentos, setInternamentos] = useState<Internamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const loadInternamentos = async () => {
    try {
      setLoading(true);
      const data = await InternamentosService.getAll();
      setInternamentos(data);
    } catch (error) {
      console.error('Erro ao carregar internamentos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os internamentos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInternamentos();
  }, []);

  const filteredInternamentos = internamentos.filter(internamento =>
    (internamento.pets?.name && internamento.pets.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (internamento.pets?.tutores?.nome && internamento.pets.tutores.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
    internamento.motivo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFinalizarInternamento = async (id: string) => {
    try {
      await InternamentosService.finalizarInternamento(id);
      toast({
        title: "Sucesso!",
        description: "Internamento finalizado com sucesso",
      });
      loadInternamentos();
    } catch (error) {
      console.error('Erro ao finalizar internamento:', error);
      toast({
        title: "Erro",
        description: "Não foi possível finalizar o internamento",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Internado': return 'bg-blue-100 text-blue-800';
      case 'Alta': return 'bg-green-100 text-green-800';
      case 'Óbito': return 'bg-red-100 text-red-800';
      case 'Transferido': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Internado': return <Heart className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'Alta': return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'Óbito': return <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      default: return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  const calcularTempoInternacao = (dataEntrada: string, dataSaida?: string) => {
    const entrada = new Date(dataEntrada);
    const saida = dataSaida ? new Date(dataSaida) : new Date();
    const diffTime = Math.abs(saida.getTime() - entrada.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const internadosAtivos = internamentos.filter(i => i.status === 'Internado').length;
  const altasHoje = internamentos.filter(i => {
    if (!i.data_saida) return false;
    const hoje = new Date().toDateString();
    return new Date(i.data_saida).toDateString() === hoje;
  }).length;

  if (loading) {
    return (
      <PageLayout title="Internamentos">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500 text-sm">Carregando internamentos...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Internamentos">
      <div className="space-y-3 sm:space-y-4">
        {/* Header Actions */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Buscar paciente ou tutor..." 
              className="pl-9 text-sm h-8 sm:h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setModalOpen(true)} className="text-xs sm:text-sm h-8 sm:h-9">
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Novo Internamento
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <Card>
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm sm:text-lg font-bold">{internamentos.length}</p>
                  <p className="text-xs text-gray-600 truncate">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm sm:text-lg font-bold">{internadosAtivos}</p>
                  <p className="text-xs text-gray-600 truncate">Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm sm:text-lg font-bold">{altasHoje}</p>
                  <p className="text-xs text-gray-600 truncate">Altas Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm sm:text-lg font-bold">
                    {internamentos.length > 0 ? 
                      Math.round(internamentos.reduce((acc, i) => acc + calcularTempoInternacao(i.data_entrada, i.data_saida), 0) / internamentos.length) 
                      : 0}
                  </p>
                  <p className="text-xs text-gray-600 truncate">Média Dias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Internamentos List */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-sm sm:text-base">Lista de Internamentos</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {filteredInternamentos.length} internamento(s) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-3">
            <div className="space-y-2 sm:space-y-3">
              {filteredInternamentos.map((internamento) => (
                <div key={internamento.id} className="p-2 sm:p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex flex-col space-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-xs sm:text-sm truncate">{internamento.pets?.name}</h3>
                          <p className="text-xs text-gray-600 truncate">
                            Tutor: {internamento.pets?.tutores?.nome}
                          </p>
                        </div>
                      </div>
                      <span className={`px-1 sm:px-2 py-1 rounded-full text-xs flex items-center gap-1 flex-shrink-0 ${getStatusColor(internamento.status || 'Internado')}`}>
                        {getStatusIcon(internamento.status || 'Internado')}
                        <span className="hidden sm:inline">{internamento.status || 'Internado'}</span>
                      </span>
                    </div>

                    {/* Details */}
                    <div className="text-xs text-gray-700">
                      <p><strong>Motivo:</strong> {internamento.motivo}</p>
                      {internamento.diagnostico && (
                        <p><strong>Diagnóstico:</strong> {internamento.diagnostico}</p>
                      )}
                    </div>

                    {/* Dates and Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-gray-500">
                      <span>
                        Entrada: {format(new Date(internamento.data_entrada), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </span>
                      {internamento.data_saida ? (
                        <span>
                          Saída: {format(new Date(internamento.data_saida), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </span>
                      ) : (
                        <span>
                          Internado há: {calcularTempoInternacao(internamento.data_entrada)} dia(s)
                        </span>
                      )}
                      {internamento.veterinarios && (
                        <span>Dr(a): {internamento.veterinarios.nome}</span>
                      )}
                      {internamento.pets?.tutores?.telefone && (
                        <span>Tel: {internamento.pets.tutores.telefone}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 sm:gap-2 pt-1">
                      <Button variant="outline" size="sm" className="text-xs h-6 sm:h-7 flex-1 sm:flex-none">
                        Ver Detalhes
                      </Button>
                      {internamento.status === 'Internado' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-6 sm:h-7 flex-1 sm:flex-none"
                          onClick={() => handleFinalizarInternamento(internamento.id!)}
                        >
                          Dar Alta
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredInternamentos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-4 text-gray-300" />
                  <p className="text-xs sm:text-sm">Nenhum internamento encontrado</p>
                  {searchTerm && (
                    <p className="text-xs mt-2">
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

        <NovoInternamentoModalInteligente
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSuccess={loadInternamentos}
        />
      </div>
    </PageLayout>
  );
};

export default Internamentos;
