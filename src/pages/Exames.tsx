import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestTube, Plus, Eye, Clock, CheckCircle } from 'lucide-react';
import SolicitarExameModal from '@/components/exames/SolicitarExameModal';
import VerExameModal from '@/components/exames/VerExameModal';

const Exames = () => {
  const [isSolicitarOpen, setIsSolicitarOpen] = useState(false);
  const [isVerOpen, setIsVerOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const exames = [
    {
      id: 'E001',
      petName: 'Rex',
      owner: 'Maria Silva',
      type: 'Hemograma Completo',
      veterinarian: 'Dr. João Silva',
      date: '15/11/2024',
      status: 'Concluído',
      urgency: 'rotina'
    },
    {
      id: 'E002',
      petName: 'Luna',
      owner: 'João Santos',
      type: 'Bioquímica Sérica',
      veterinarian: 'Dra. Maria Santos',
      date: '16/11/2024',
      status: 'Pendente',
      urgency: 'urgente'
    },
    {
      id: 'E003',
      petName: 'Max',
      owner: 'Ana Costa',
      type: 'Raio-X Tórax',
      veterinarian: 'Dr. Pedro Costa',
      date: '14/11/2024',
      status: 'Concluído',
      urgency: 'rotina'
    }
  ];

  const handleVerExame = (exame: any) => {
    setSelectedExam(exame);
    setIsVerOpen(true);
  };

  return (
    <PageLayout title="Exames">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Controle de Exames</h2>
            <p className="text-gray-600">Solicite e visualize resultados de exames</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsSolicitarOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Solicitar Exame
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TestTube className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{exames.length}</p>
                  <p className="text-sm text-gray-600">Total de Exames</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{exames.filter(e => e.status === 'Pendente').length}</p>
                  <p className="text-sm text-gray-600">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{exames.filter(e => e.status === 'Concluído').length}</p>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TestTube className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{exames.filter(e => e.urgency === 'urgente').length}</p>
                  <p className="text-sm text-gray-600">Urgentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Exames</CardTitle>
            <CardDescription>Exames solicitados e resultados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exames.map((exame) => (
                <div key={exame.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">#{exame.id}</h3>
                        <Badge className={exame.status === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {exame.status}
                        </Badge>
                        {exame.urgency === 'urgente' && (
                          <Badge className="bg-red-100 text-red-800">Urgente</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{exame.petName} - {exame.owner}</p>
                      <p className="text-sm font-medium">{exame.type}</p>
                      <p className="text-xs text-gray-500">
                        {exame.date} • {exame.veterinarian}
                      </p>
                    </div>
                    
                    <Button 
                      size="sm" 
                      onClick={() => handleVerExame(exame)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Resultado
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <SolicitarExameModal
          open={isSolicitarOpen}
          onOpenChange={setIsSolicitarOpen}
          onSuccess={() => {
            // Refresh data
          }}
        />

        <VerExameModal
          open={isVerOpen}
          onOpenChange={setIsVerOpen}
          exame={selectedExam}
        />
      </div>
    </PageLayout>
  );
};

export default Exames;
