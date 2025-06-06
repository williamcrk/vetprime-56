import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, MessageCircle, Mail, Printer } from 'lucide-react';
import NovaReceitaModal from '@/components/prescricao/NovaReceitaModal';

const PrescricaoDigital = () => {
  const [isNewRecipeOpen, setIsNewRecipeOpen] = useState(false);

  const prescricoes = [
    {
      id: 'R001',
      petName: 'Rex',
      owner: 'Maria Silva',
      veterinarian: 'Dr. João Silva',
      date: '15/11/2024',
      medications: ['Amoxicilina 500mg', 'Anti-inflamatório'],
      status: 'ativa'
    },
    {
      id: 'R002',
      petName: 'Luna',
      owner: 'João Santos',
      veterinarian: 'Dra. Maria Santos',
      date: '14/11/2024',
      medications: ['Vitaminas', 'Probióticos'],
      status: 'finalizada'
    }
  ];

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
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600">Enviadas por WhatsApp</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-600">Enviadas por Email</p>
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
                      <h3 className="font-medium">Receita #{receita.id}</h3>
                      <Badge className={receita.status === 'ativa' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {receita.status === 'ativa' ? 'Ativa' : 'Finalizada'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{receita.petName} - {receita.owner}</p>
                    <p className="text-sm font-medium">{receita.veterinarian}</p>
                    <p className="text-xs text-gray-500">
                      {receita.date} • {receita.medications.join(', ')}
                    </p>
                  </div>
                  <div className="flex gap-2">
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
            </div>
          </CardContent>
        </Card>

        <NovaReceitaModal
          open={isNewRecipeOpen}
          onOpenChange={setIsNewRecipeOpen}
          onSuccess={() => {
            // Refresh data
          }}
        />
      </div>
    </PageLayout>
  );
};

export default PrescricaoDigital;
