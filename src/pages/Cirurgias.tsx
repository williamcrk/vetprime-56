
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scissors, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import ConcluirCirurgiaModal from '@/components/cirurgias/ConcluirCirurgiaModal';
import NovaCirurgiaModalInteligente from '@/components/cirurgias/NovaCirurgiaModalInteligente';
import { useToast } from '@/hooks/use-toast';
import { CirurgiasService, type Cirurgia } from '@/services/CirurgiasService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Cirurgias = () => {
  const { toast } = useToast();
  const [isConcluirOpen, setIsConcluirOpen] = useState(false);
  const [isNovaOpen, setIsNovaOpen] = useState(false);
  const [selectedSurgery, setSelectedSurgery] = useState<Cirurgia | null>(null);
  const [cirurgias, setCirurgias] = useState<Cirurgia[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCirurgias = async () => {
    try {
      setLoading(true);
      const data = await CirurgiasService.getAll();
      setCirurgias(data);
    } catch (error) {
      console.error('Erro ao carregar cirurgias:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as cirurgias.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCirurgias();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendada': return <Clock className="w-4 h-4" />;
      case 'em_andamento': return <AlertTriangle className="w-4 h-4" />;
      case 'concluida': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleConcluirCirurgia = (cirurgia: Cirurgia) => {
    setSelectedSurgery(cirurgia);
    setIsConcluirOpen(true);
  };

  const handleIniciarCirurgia = async (cirurgia: Cirurgia) => {
    try {
      await CirurgiasService.iniciarCirurgia(cirurgia.id!);
      toast({
        title: "Cirurgia Iniciada",
        description: `Cirurgia de ${cirurgia.pets?.name} foi iniciada`,
      });
      loadCirurgias();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível iniciar a cirurgia",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <PageLayout title="Cirurgias">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500 text-sm">Carregando cirurgias...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Cirurgias">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Controle de Cirurgias</h2>
            <p className="text-gray-600">Gerencie procedimentos cirúrgicos</p>
          </div>
          <Button onClick={() => setIsNovaOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Agendar Cirurgia
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{cirurgias.length}</p>
                  <p className="text-sm text-gray-600">Total de Cirurgias</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{cirurgias.filter(c => c.status === 'agendada').length}</p>
                  <p className="text-sm text-gray-600">Agendadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{cirurgias.filter(c => c.status === 'em_andamento').length}</p>
                  <p className="text-sm text-gray-600">Em Andamento</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{cirurgias.filter(c => c.status === 'concluida').length}</p>
                  <p className="text-sm text-gray-600">Concluídas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Cirurgias</CardTitle>
            <CardDescription>Procedimentos cirúrgicos agendados e realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cirurgias.map((cirurgia) => (
                <div key={cirurgia.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(cirurgia.status || 'agendada')}
                        <div>
                          <h3 className="font-medium text-lg">{cirurgia.pets?.name}</h3>
                          <p className="text-sm text-gray-600">{cirurgia.pets?.tutores?.nome}</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="font-medium">{cirurgia.procedimento}</p>
                        <p className="text-sm text-gray-600">{cirurgia.sala}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="font-medium">{cirurgia.veterinarios?.nome}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(cirurgia.data_cirurgia), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(cirurgia.status || 'agendada')}>
                        {cirurgia.status === 'agendada' ? 'Agendada' : 
                         cirurgia.status === 'em_andamento' ? 'Em Andamento' : 
                         cirurgia.status === 'concluida' ? 'Concluída' : 'Cancelada'}
                      </Badge>
                      
                      <div className="flex gap-2">
                        {cirurgia.status === 'agendada' && (
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleIniciarCirurgia(cirurgia)}
                          >
                            Iniciar
                          </Button>
                        )}
                        {cirurgia.status === 'em_andamento' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleConcluirCirurgia(cirurgia)}
                          >
                            Concluir
                          </Button>
                        )}
                        {cirurgia.status === 'concluida' && (
                          <Button size="sm" variant="outline">
                            Ver Detalhes
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {cirurgias.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Scissors className="w-8 h-8 mx-auto mb-4 text-gray-300" />
                  <p>Nenhuma cirurgia encontrada</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <NovaCirurgiaModalInteligente
          open={isNovaOpen}
          onOpenChange={setIsNovaOpen}
          onSuccess={loadCirurgias}
        />

        <ConcluirCirurgiaModal
          open={isConcluirOpen}
          onOpenChange={setIsConcluirOpen}
          cirurgia={selectedSurgery}
          onSuccess={loadCirurgias}
        />
      </div>
    </PageLayout>
  );
};

export default Cirurgias;
