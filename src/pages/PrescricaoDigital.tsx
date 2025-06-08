
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, MessageCircle, Mail, Printer, Eye } from 'lucide-react';
import NovaPrescricaoModalInteligente from '@/components/prescricao/NovaPrescricaoModalInteligente';
import { useToast } from '@/hooks/use-toast';
import { PrescricoesService, type Prescricao } from '@/services/PrescricoesService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const PrescricaoDigital = () => {
  const { toast } = useToast();
  const [isNewRecipeOpen, setIsNewRecipeOpen] = useState(false);
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPrescricoes = async () => {
    try {
      setLoading(true);
      const data = await PrescricoesService.getAll();
      setPrescricoes(data);
    } catch (error) {
      console.error('Erro ao carregar prescrições:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as prescrições.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrescricoes();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'finalizada': return 'bg-gray-100 text-gray-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativa': return 'Ativa';
      case 'finalizada': return 'Finalizada';
      case 'cancelada': return 'Cancelada';
      default: return 'Indefinido';
    }
  };

  if (loading) {
    return (
      <PageLayout title="Prescrição Digital">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500 text-sm">Carregando prescrições...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Prescrição Digital">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Receitas Digitais</h2>
            <p className="text-gray-600">Crie e gerencie prescrições veterinárias</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsNewRecipeOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Receita
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{prescricoes.length}</p>
                  <p className="text-sm text-gray-600">Total de Receitas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{prescricoes.filter(p => p.status === 'ativa').length}</p>
                  <p className="text-sm text-gray-600">Receitas Ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{prescricoes.filter(p => p.status === 'finalizada').length}</p>
                  <p className="text-sm text-gray-600">Receitas Finalizadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Receitas Recentes</CardTitle>
            <CardDescription>Prescrições criadas recentemente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prescricoes.map((receita) => (
                <div key={receita.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">Receita #{receita.id?.slice(-8)}</h3>
                      <Badge className={getStatusColor(receita.status || 'ativa')}>
                        {getStatusLabel(receita.status || 'ativa')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{receita.pets?.name} - {receita.pets?.tutores?.nome}</p>
                    <p className="text-sm font-medium">{receita.veterinarios?.nome}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(receita.data_prescricao), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      {receita.itens && receita.itens.length > 0 && 
                        ` • ${receita.itens.length} medicamento${receita.itens.length > 1 ? 's' : ''}`
                      }
                    </p>
                    {receita.itens && receita.itens.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1">
                        {receita.itens.map(item => item.medicamento).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="w-3 h-3 mr-1" />
                      Imprimir
                    </Button>
                  </div>
                </div>
              ))}
              
              {prescricoes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-8 h-8 mx-auto mb-4 text-gray-300" />
                  <p>Nenhuma prescrição encontrada</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <NovaPrescricaoModalInteligente
          open={isNewRecipeOpen}
          onOpenChange={setIsNewRecipeOpen}
          onSuccess={loadPrescricoes}
        />
      </div>
    </PageLayout>
  );
};

export default PrescricaoDigital;
