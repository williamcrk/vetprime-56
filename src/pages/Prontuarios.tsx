
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Search, Plus, Download } from 'lucide-react';

const Prontuarios = () => {
  const records = [
    { id: '001', pet: 'Rex', owner: 'Maria Silva', date: '15/11/2024', type: 'Consulta', veterinarian: 'Dr. João Silva', diagnosis: 'Check-up de rotina - Animal saudável' },
    { id: '002', pet: 'Luna', owner: 'João Santos', date: '12/11/2024', type: 'Vacinação', veterinarian: 'Dra. Maria Santos', diagnosis: 'Vacinação V10 aplicada' },
    { id: '003', pet: 'Thor', owner: 'Ana Costa', date: '10/11/2024', type: 'Cirurgia', veterinarian: 'Dr. Pedro Costa', diagnosis: 'Castração realizada com sucesso' },
    { id: '004', pet: 'Mimi', owner: 'Carlos Lima', date: '08/11/2024', type: 'Emergência', veterinarian: 'Dr. João Silva', diagnosis: 'Intoxicação alimentar - Tratamento iniciado' },
  ];

  return (
    <PageLayout title="Prontuários">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input placeholder="Buscar prontuário..." className="pl-9 w-80" />
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Prontuário
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-gray-600">Total de Prontuários</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-gray-600">Este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-600">Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Prontuários Recentes</CardTitle>
            <CardDescription>Últimos prontuários criados ou atualizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {records.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Prontuário #{record.id}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded">{record.type}</span>
                      </div>
                      <p className="text-sm text-gray-600">{record.pet} - {record.owner}</p>
                      <p className="text-xs text-gray-500">{record.veterinarian} • {record.date}</p>
                    </div>
                  </div>
                  <div className="text-right max-w-md">
                    <p className="text-sm">{record.diagnosis}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">Ver</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Prontuarios;
