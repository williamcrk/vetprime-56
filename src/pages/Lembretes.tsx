
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Bell, MessageCircle, Phone, AlertTriangle, Plus, Edit } from 'lucide-react';
import NovoLembreteModalInteligente from '@/components/lembretes/NovoLembreteModalInteligente';
import { LembretesService, type Lembrete } from '@/services/LembretesService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Lembretes = () => {
  const { toast } = useToast();
  const [isNewAlertOpen, setIsNewAlertOpen] = useState(false);
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLembretes = async () => {
    try {
      setLoading(true);
      const data = await LembretesService.getAll();
      setLembretes(data);
    } catch (error) {
      console.error('Erro ao carregar lembretes:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os lembretes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLembretes();
  }, []);

  const openWhatsApp = (lembrete: Lembrete) => {
    const telefone = lembrete.pets?.tutores?.telefone || lembrete.tutores?.telefone;
    if (!telefone) {
      toast({
        title: "Erro",
        description: "Telefone não encontrado para este cliente",
        variant: "destructive",
      });
      return;
    }

    const url = `https://wa.me/55${telefone.replace(/\D/g, '')}?text=${encodeURIComponent(lembrete.mensagem)}`;
    window.open(url, '_blank');
  };

  const markAsSent = async (lembrete: Lembrete) => {
    try {
      await LembretesService.marcarComoEnviado(lembrete.id!);
      await loadLembretes();
      
      toast({
        title: "Lembrete marcado como enviado",
        description: "O status foi atualizado com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status",
        variant: "destructive",
      });
    }
  };

  const getAlertColor = (tipo: string) => {
    switch (tipo) {
      case 'vacina': return 'bg-green-100 text-green-800';
      case 'retorno': return 'bg-blue-100 text-blue-800';
      case 'consulta': return 'bg-purple-100 text-purple-800';
      case 'medicamento': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado': return 'bg-yellow-100 text-yellow-800';
      case 'enviado': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'vacina': return 'Vacina';
      case 'retorno': return 'Retorno';
      case 'consulta': return 'Consulta';
      case 'medicamento': return 'Medicamento';
      default: return 'Outro';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'agendado': return 'Agendado';
      case 'enviado': return 'Enviado';
      case 'cancelado': return 'Cancelado';
      default: return 'Indefinido';
    }
  };

  if (loading) {
    return (
      <PageLayout title="Lembretes Automáticos">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500 text-sm">Carregando lembretes...</div>
        </div>
      </PageLayout>
    );
  }

  const lembretesHoje = lembretes.filter(l => {
    const hoje = new Date();
    const dataLembrete = new Date(l.data_envio);
    return dataLembrete.toDateString() === hoje.toDateString();
  }).length;

  return (
    <PageLayout title="Lembretes Automáticos">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Lembretes Automáticos</h2>
            <p className="text-gray-600">Sistema inteligente de notificações por WhatsApp</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setIsNewAlertOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Lembrete
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Bell className="w-4 h-4 mr-2" />
              Alertas
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{lembretes.filter(l => l.status === 'agendado').length}</p>
                  <p className="text-sm text-gray-600">Alertas Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{lembretes.filter(l => l.status === 'enviado').length}</p>
                  <p className="text-sm text-gray-600">Mensagens Enviadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{lembretesHoje}</p>
                  <p className="text-sm text-gray-600">Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lembretes Automáticos</CardTitle>
            <CardDescription>Lista de lembretes programados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lembretes.map((lembrete) => (
                <div key={lembrete.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{lembrete.pets?.name} - {lembrete.pets?.tutores?.nome || lembrete.tutores?.nome}</h3>
                        <Badge className={getAlertColor(lembrete.tipo)}>
                          {getTipoLabel(lembrete.tipo).toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(lembrete.status || 'agendado')}>
                          {getStatusLabel(lembrete.status || 'agendado').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{lembrete.titulo}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(lembrete.data_envio), 'dd/MM/yyyy', { locale: ptBR })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(lembrete.data_envio), 'HH:mm', { locale: ptBR })}
                        </span>
                        {(lembrete.pets?.tutores?.telefone || lembrete.tutores?.telefone) && (
                          <button 
                            onClick={() => openWhatsApp(lembrete)}
                            className="flex items-center gap-1 text-green-600 hover:text-green-800"
                          >
                            <Phone className="w-3 h-3" />
                            {lembrete.pets?.tutores?.telefone || lembrete.tutores?.telefone}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => openWhatsApp(lembrete)}
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      WhatsApp
                    </Button>
                    {lembrete.status === 'agendado' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markAsSent(lembrete)}
                      >
                        Marcar Enviado
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {lembretes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum lembrete encontrado</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <NovoLembreteModalInteligente
          open={isNewAlertOpen}
          onOpenChange={setIsNewAlertOpen}
          onSuccess={loadLembretes}
        />
      </div>
    </PageLayout>
  );
};

export default Lembretes;
