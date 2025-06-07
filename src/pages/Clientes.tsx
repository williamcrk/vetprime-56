
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Search, Plus, Phone, Mail, Loader2 } from 'lucide-react';
import NovoClienteModal from '@/components/modals/NovoClienteModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useToast } from '@/hooks/use-toast';
import { ClienteService, Cliente } from '@/components/ClienteService';

const Clientes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar clientes do Supabase
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await ClienteService.getAll();
      setClients(data);
    } catch (error: any) {
      console.error('Erro ao carregar clientes:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os clientes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client =>
    client.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.telefone?.includes(searchTerm)
  );

  const handleAddClient = (newClient: Cliente) => {
    setClients(prev => [newClient, ...prev]);
  };

  const handleViewProfile = (client: Cliente) => {
    toast({
      title: `Perfil de ${client.nome}`,
      description: `Abrindo perfil completo do cliente...`,
    });
    console.log('Ver perfil do cliente:', client);
  };

  const handleCall = (phone: string) => {
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  };

  const totalThisMonth = clients.filter(client => {
    if (!client.created_at) return false;
    const clientDate = new Date(client.created_at);
    const now = new Date();
    return clientDate.getMonth() === now.getMonth() && clientDate.getFullYear() === now.getFullYear();
  }).length;

  if (loading) {
    return (
      <PageLayout title="Clientes">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Carregando clientes...</span>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Clientes">
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input 
              placeholder="Buscar cliente..." 
              className="pl-9 w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <NovoClienteModal onClientAdded={handleAddClient} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <p className="text-2xl font-bold">100%</p>
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
                <div key={client.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{client.nome}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600">
                        {client.telefone && (
                          <button 
                            onClick={() => handleCall(client.telefone!)}
                            className="flex items-center gap-1 hover:text-blue-600 text-left truncate"
                          >
                            <Phone className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{client.telefone}</span>
                          </button>
                        )}
                        {client.email && (
                          <div className="flex items-center gap-1 truncate">
                            <Mail className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{client.email}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {client.cidade && client.estado && `${client.cidade}, ${client.estado}`}
                        {client.created_at && ` • Cliente desde: ${new Date(client.created_at).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full lg:w-auto">
                    {client.telefone && (
                      <WhatsAppButton 
                        phone={client.telefone}
                        message={`Olá ${client.nome}! Como podemos ajudá-lo hoje?`}
                        className="flex-1 lg:flex-none"
                      />
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewProfile(client)}
                      className="flex-1 lg:flex-none"
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
