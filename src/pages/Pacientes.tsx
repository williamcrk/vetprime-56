
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Search, Plus, Dog, Cat } from 'lucide-react';

const Pacientes = () => {
  const patients = [
    { name: 'Rex', species: 'Cão', breed: 'Golden Retriever', age: '3 anos', owner: 'Maria Silva', lastVisit: '15/11/2024', status: 'Saudável' },
    { name: 'Luna', species: 'Gato', breed: 'Siamês', age: '2 anos', owner: 'João Santos', lastVisit: '12/11/2024', status: 'Em tratamento' },
    { name: 'Thor', species: 'Cão', breed: 'Pastor Alemão', age: '5 anos', owner: 'Ana Costa', lastVisit: '10/11/2024', status: 'Saudável' },
    { name: 'Mimi', species: 'Gato', breed: 'Persa', age: '1 ano', owner: 'Carlos Lima', lastVisit: '08/11/2024', status: 'Vacinação pendente' },
    { name: 'Buddy', species: 'Cão', breed: 'Labrador', age: '4 anos', owner: 'Pedro Alves', lastVisit: '05/11/2024', status: 'Saudável' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Saudável': return 'bg-green-100 text-green-800';
      case 'Em tratamento': return 'bg-yellow-100 text-yellow-800';
      case 'Vacinação pendente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout title="Pacientes">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input placeholder="Buscar paciente..." className="pl-9 w-80" />
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">248</p>
                  <p className="text-sm text-gray-600">Total de Pacientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Dog className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-600">Cães</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Cat className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">92</p>
                  <p className="text-sm text-gray-600">Gatos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
            <CardDescription>Todos os pacientes cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                      {patient.species === 'Cão' ? 
                        <Dog className="w-6 h-6 text-white" /> : 
                        <Cat className="w-6 h-6 text-white" />
                      }
                    </div>
                    <div>
                      <h3 className="font-medium">{patient.name}</h3>
                      <p className="text-sm text-gray-600">{patient.breed} • {patient.age}</p>
                      <p className="text-xs text-gray-500">Tutor: {patient.owner}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Última visita: {patient.lastVisit}</p>
                  </div>
                  <Button variant="outline" size="sm">Ver Perfil</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Pacientes;
