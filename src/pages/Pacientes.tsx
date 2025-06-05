
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Search, Dog, Cat, Phone, Mail } from 'lucide-react';
import NovoPacienteModal from '@/components/modals/NovoPacienteModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useToast } from '@/hooks/use-toast';

const Pacientes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([
    { id: '1', name: 'Rex', species: 'Cão', breed: 'Golden Retriever', age: '3 anos', owner: 'Maria Silva', lastVisit: '15/11/2024', status: 'Saudável', phone: '(11) 99999-9999', email: 'maria@email.com' },
    { id: '2', name: 'Luna', species: 'Gato', breed: 'Siamês', age: '2 anos', owner: 'João Santos', lastVisit: '12/11/2024', status: 'Em tratamento', phone: '(11) 88888-8888', email: 'joao@email.com' },
    { id: '3', name: 'Thor', species: 'Cão', breed: 'Pastor Alemão', age: '5 anos', owner: 'Ana Costa', lastVisit: '10/11/2024', status: 'Saudável', phone: '(11) 77777-7777', email: 'ana@email.com' },
    { id: '4', name: 'Mimi', species: 'Gato', breed: 'Persa', age: '1 ano', owner: 'Carlos Lima', lastVisit: '08/11/2024', status: 'Vacinação pendente', phone: '(11) 66666-6666', email: 'carlos@email.com' },
    { id: '5', name: 'Buddy', species: 'Cão', breed: 'Labrador', age: '4 anos', owner: 'Pedro Alves', lastVisit: '05/11/2024', status: 'Saudável', phone: '(11) 55555-5555', email: 'pedro@email.com' },
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = (newPatient: any) => {
    setPatients(prev => [newPatient, ...prev]);
  };

  const handleViewProfile = (patient: any) => {
    toast({
      title: `Perfil de ${patient.name}`,
      description: `Abrindo perfil completo do paciente...`,
    });
    console.log('Ver perfil do paciente:', patient);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Saudável': return 'bg-green-100 text-green-800';
      case 'Em tratamento': return 'bg-yellow-100 text-yellow-800';
      case 'Vacinação pendente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalCaes = patients.filter(p => p.species === 'Cão').length;
  const totalGatos = patients.filter(p => p.species === 'Gato').length;

  return (
    <PageLayout title="Pacientes">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar paciente..." 
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <NovoPacienteModal onPatientAdded={handleAddPatient} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{patients.length}</p>
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
                  <p className="text-2xl font-bold">{totalCaes}</p>
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
                  <p className="text-2xl font-bold">{totalGatos}</p>
                  <p className="text-sm text-gray-600">Gatos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
            <CardDescription>
              {filteredPatients.length} paciente(s) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      {patient.species === 'Cão' ? 
                        <Dog className="w-6 h-6 text-white" /> : 
                        <Cat className="w-6 h-6 text-white" />
                      }
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{patient.name}</h3>
                      <p className="text-sm text-gray-600">{patient.breed} • {patient.age}</p>
                      <p className="text-xs text-gray-500">Tutor: {patient.owner}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        <button 
                          onClick={() => window.open(`tel:${patient.phone}`, '_self')}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                        >
                          <Phone className="w-3 h-3" />
                          {patient.phone}
                        </button>
                        <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {patient.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <div className="text-left sm:text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Última visita: {patient.lastVisit}</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <WhatsAppButton 
                        phone={patient.phone}
                        message={`Olá! Entrando em contato sobre o paciente ${patient.name}.`}
                        className="flex-1 sm:flex-none"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewProfile(patient)}
                        className="flex-1 sm:flex-none"
                      >
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum paciente encontrado</p>
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

export default Pacientes;
