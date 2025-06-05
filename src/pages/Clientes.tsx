
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Search, Plus, Phone, Mail } from 'lucide-react';
import NovoClienteModal from '@/components/modals/NovoClienteModal';
import { useToast } from '@/hooks/use-toast';

const Clientes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([
    { id: '1', name: 'Maria Silva', phone: '(11) 99999-9999', email: 'maria@email.com', pets: ['Rex'], address: 'São Paulo, SP', joined: '2023-01-15' },
    { id: '2', name: 'João Santos', phone: '(11) 88888-8888', email: 'joao@email.com', pets: ['Luna'], address: 'São Paulo, SP', joined: '2023-02-20' },
    { id: '3', name: 'Ana Costa', phone: '(11) 77777-7777', email: 'ana@email.com', pets: ['Thor', 'Bella'], address: 'São Paulo, SP', joined: '2023-03-10' },
    { id: '4', name: 'Carlos Lima', phone: '(11) 66666-6666', email: 'carlos@email.com', pets: ['Mimi'], address: 'São Paulo, SP', joined: '2023-04-05' },
    { id: '5', name: 'Pedro Alves', phone: '(11) 55555-5555', email: 'pedro@email.com', pets: ['Buddy', 'Max'], address: 'São Paulo, SP', joined: '2023-05-12' },
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleAddClient = (newClient: any) => {
    setClients(prev => [newClient, ...prev]);
  };

  const handleViewProfile = (client: any) => {
    toast({
      title: `Perfil de ${client.name}`,
      description: `Abrindo perfil completo do cliente...`,
    });
    console.log('Ver perfil do cliente:', client);
  };

  const handleWhatsApp = (phone: string, clientName: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = `Olá ${clientName}! Como podemos ajudá-lo hoje?`;
    const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const totalThisMonth = clients.filter(client => {
    const clientDate = new Date(client.joined);
    const now = new Date();
    return clientDate.getMonth() === now.getMonth() && clientDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <PageLayout title="Clientes">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar cliente..." 
                className="pl-9 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <NovoClienteModal onClientAdded={handleAddClient} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{clients.length}</p>
                  <p className="text-sm text-gray-600">Total de Clientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{totalThisMonth}</p>
                  <p className="text-sm text-gray-600">Novos este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-sm text-gray-600">Taxa de retenção</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Clientes</CardTitle>
            <CardDescription>
              {filteredClients.length} cliente(s) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <button 
                          onClick={() => handleCall(client.phone)}
                          className="flex items-center gap-1 hover:text-blue-600"
                        >
                          <Phone className="w-3 h-3" />
                          {client.phone}
                        </button>
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Pets: {client.pets.join(', ')} • Cliente desde: {new Date(client.joined).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{client.pets.length} pet(s)</p>
                    <p className="text-xs text-gray-500">{client.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleWhatsApp(client.phone, client.name)}
                      className="text-green-600 hover:text-green-700"
                    >
                      WhatsApp
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewProfile(client)}
                    >
                      Ver Perfil
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredClients.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum cliente encontrado</p>
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

export default Clientes;
