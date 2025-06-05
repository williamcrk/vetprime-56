
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Search, Plus, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Prontuarios = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [records] = useState([
    { 
      id: '001', 
      pet: 'Rex', 
      owner: 'Maria Silva', 
      date: '15/11/2024', 
      type: 'Consulta', 
      veterinarian: 'Dr. João Silva', 
      diagnosis: 'Check-up de rotina - Animal saudável',
      phone: '(11) 99999-9999'
    },
    { 
      id: '002', 
      pet: 'Luna', 
      owner: 'João Santos', 
      date: '12/11/2024', 
      type: 'Vacinação', 
      veterinarian: 'Dra. Maria Santos', 
      diagnosis: 'Vacinação V10 aplicada',
      phone: '(11) 88888-8888'
    },
    { 
      id: '003', 
      pet: 'Thor', 
      owner: 'Ana Costa', 
      date: '10/11/2024', 
      type: 'Cirurgia', 
      veterinarian: 'Dr. Pedro Costa', 
      diagnosis: 'Castração realizada com sucesso',
      phone: '(11) 77777-7777'
    },
    { 
      id: '004', 
      pet: 'Mimi', 
      owner: 'Carlos Lima', 
      date: '08/11/2024', 
      type: 'Emergência', 
      veterinarian: 'Dr. João Silva', 
      diagnosis: 'Intoxicação alimentar - Tratamento iniciado',
      phone: '(11) 66666-6666'
    },
  ]);

  const filteredRecords = records.filter(record =>
    record.pet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.id.includes(searchTerm) ||
    record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewRecord = () => {
    toast({
      title: "Novo Prontuário",
      description: "Abrindo formulário para novo prontuário...",
    });
  };

  const handleDownloadPDF = (record: any) => {
    toast({
      title: "Download Iniciado",
      description: `Baixando prontuário #${record.id} de ${record.pet}`,
    });
  };

  const handleViewRecord = (record: any) => {
    toast({
      title: "Visualizar Prontuário",
      description: `Abrindo prontuário completo de ${record.pet}`,
    });
  };

  const thisMonthRecords = records.filter(record => {
    const recordDate = new Date(record.date.split('/').reverse().join('-'));
    const now = new Date();
    return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <PageLayout title="Prontuários">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar prontuário..." 
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNewRecord}>
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
                  <p className="text-2xl font-bold">{records.length}</p>
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
                  <p className="text-2xl font-bold">{thisMonthRecords}</p>
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
            <CardDescription>
              {filteredRecords.length} prontuário(s) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-medium">Prontuário #{record.id}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded w-fit">{record.type}</span>
                      </div>
                      <p className="text-sm text-gray-600">{record.pet} - {record.owner}</p>
                      <p className="text-xs text-gray-500">{record.veterinarian} • {record.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 lg:max-w-md">
                    <p className="text-sm">{record.diagnosis}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadPDF(record)}
                      className="flex-1 lg:flex-none"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewRecord(record)}
                      className="flex-1 lg:flex-none"
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}

              {filteredRecords.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum prontuário encontrado</p>
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
      </div>
    </PageLayout>
  );
};

export default Prontuarios;
