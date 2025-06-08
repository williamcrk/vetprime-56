
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Plus, Eye, Edit, Activity } from 'lucide-react';
import NovaEvolucaoModalInteligente from '@/components/evolucoes/NovaEvolucaoModalInteligente';
import { useToast } from '@/hooks/use-toast';
import { EvolucoesService, type Evolucao } from '@/services/EvolucoesService';
import { InternamentosService, type Internamento } from '@/services/InternamentosService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Evolucoes = () => {
  const { toast } = useToast();
  const [isNovaEvolucaoOpen, setIsNovaEvolucaoOpen] = useState(false);
  const [evolucoes, setEvolucoes] = useState<Evolucao[]>([]);
  const [internamentos, setInternamentos] = useState<Internamento[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [evolucoesData, internamentosData] = await Promise.all([
        EvolucoesService.getAll(),
        InternamentosService.getAll()
      ]);
      setEvolucoes(evolucoesData);
      // Filtra apenas internamentos ativos
      const internamentosAtivos = internamentosData.filter(i => i.status !== 'Finalizado');
      setInternamentos(internamentosAtivos);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const evolucaoHoje = evolucoes.filter(e => {
    const hoje = new Date();
    const dataEvolucao = new Date(e.data_evolucao);
    return dataEvolucao.toDateString() === hoje.toDateString();
  }).length;

  const pacientesEstaveis = evolucoes.filter(e => e.status === 'estavel').length;
  const pacientesObservacao = evolucoes.filter(e => e.status === 'observacao').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'estavel': return 'bg-green-100 text-green-800';
      case 'observacao': return 'bg-yellow-100 text-yellow-800';
      case 'critico': return 'bg-red-100 text-red-800';
      case 'alta': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'estavel': return 'Estável';
      case 'observacao': return 'Observação';
      case 'critico': return 'Crítico';
      case 'alta': return 'Alta';
      default: return 'Indefinido';
    }
  };

  if (loading) {
    return (
      <PageLayout title="Evoluções">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500 text-sm">Carregando evoluções...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Evoluções">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Evoluções Clínicas</h2>
            <p className="text-gray-600">Acompanhe a evolução dos pacientes internados</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsNovaEvolucaoOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Evolução
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{evolucaoHoje}</p>
                  <p className="text-sm text-gray-600">Evoluções Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{pacientesEstaveis}</p>
                  <p className="text-sm text-gray-600">Pacientes Estáveis</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{pacientesObservacao}</p>
                  <p className="text-sm text-gray-600">Em Observação</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{internamentos.length}</p>
                  <p className="text-sm text-gray-600">Pacientes Internados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Evoluções Recentes</CardTitle>
              <CardDescription>Últimas evoluções registradas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evolucoes.slice(0, 5).map((evolucao) => (
                  <div key={evolucao.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{evolucao.pets?.name}</h3>
                        <Badge className={getStatusColor(evolucao.status || 'estavel')}>
                          {getStatusLabel(evolucao.status || 'estavel')}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{evolucao.pets?.tutores?.nome}</p>
                    <p className="text-sm font-medium">{evolucao.veterinarios?.nome}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(evolucao.data_evolucao), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      {evolucao.temperatura && ` • Temp: ${evolucao.temperatura}°C`}
                    </p>
                    {evolucao.observacoes && (
                      <p className="text-xs text-gray-600 mt-1">
                        {evolucao.observacoes.substring(0, 60)}...
                      </p>
                    )}
                  </div>
                ))}
                
                {evolucoes.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="w-8 h-8 mx-auto mb-4 text-gray-300" />
                    <p>Nenhuma evolução encontrada</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pacientes Internados</CardTitle>
              <CardDescription>Selecione um paciente para nova evolução</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {internamentos.map((internamento) => (
                  <div key={internamento.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{internamento.pets?.name}</h3>
                      <p className="text-sm text-gray-600">{internamento.pets?.tutores?.nome}</p>
                      <p className="text-xs text-gray-500">{internamento.motivo}</p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => setIsNovaEvolucaoOpen(true)}
                    >
                      Nova Evolução
                    </Button>
                  </div>
                ))}
                
                {internamentos.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">Nenhum paciente internado</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <NovaEvolucaoModalInteligente
          open={isNovaEvolucaoOpen}
          onOpenChange={setIsNovaEvolucaoOpen}
          onSuccess={loadData}
        />
      </div>
    </PageLayout>
  );
};

export default Evolucoes;
