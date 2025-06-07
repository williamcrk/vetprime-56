
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, Filter } from 'lucide-react';
import { AgendaService, type AgendaEvento } from '@/services/AgendaService';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Agenda = () => {
  const { toast } = useToast();
  const [eventos, setEventos] = useState<AgendaEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');

  const loadEventos = async () => {
    try {
      setLoading(true);
      const data = await AgendaService.getAll();
      setEventos(data);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os eventos da agenda.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEventos();
  }, []);

  const eventosFiltrados = eventos.filter(evento => 
    filtroTipo === 'todos' || evento.tipo === filtroTipo
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado': return 'bg-blue-100 text-blue-800';
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'realizado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'consulta': return '🩺';
      case 'cirurgia': return '⚕️';
      case 'vacina': return '💉';
      case 'retorno': return '🔄';
      default: return '📅';
    }
  };

  if (loading) {
    return (
      <PageLayout title="Agenda">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Carregando agenda...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Agenda">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              <select 
                value={filtroTipo} 
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="bg-transparent border-none outline-none"
              >
                <option value="todos">Todos</option>
                <option value="consulta">Consultas</option>
                <option value="cirurgia">Cirurgias</option>
                <option value="vacina">Vacinas</option>
                <option value="retorno">Retornos</option>
              </select>
            </Button>
          </div>
          <Button onClick={() => console.log('Novo evento')}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{eventos.length}</p>
                  <p className="text-sm text-gray-600">Total de Eventos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {eventos.filter(e => e.status === 'agendado').length}
                  </p>
                  <p className="text-sm text-gray-600">Agendados</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {eventos.filter(e => 
                      new Date(e.data_inicio).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                  <p className="text-sm text-gray-600">Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>
              {eventosFiltrados.length} evento(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventosFiltrados.map((evento) => (
                <div key={evento.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl">
                      {getTipoIcon(evento.tipo)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{evento.titulo}</h3>
                      <p className="text-sm text-gray-600 capitalize">{evento.tipo}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(evento.data_inicio), 'dd/MM/yyyy', { locale: ptBR })}
                        </span>
                        <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(evento.data_inicio), 'HH:mm', { locale: ptBR })}
                        </span>
                      </div>
                      {evento.pets && (
                        <p className="text-xs text-gray-500 mt-1">
                          Paciente: {evento.pets.name} ({evento.pets.especie})
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(evento.status || 'agendado')}`}>
                      {evento.status || 'agendado'}
                    </span>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {eventosFiltrados.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum evento encontrado</p>
                  <p className="text-sm mt-2">
                    <Button variant="link" onClick={() => setFiltroTipo('todos')}>
                      Limpar filtros
                    </Button>
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Agenda;
