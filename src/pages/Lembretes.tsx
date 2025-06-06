
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Bell, MessageCircle, Phone, AlertTriangle, Plus, Edit } from 'lucide-react';

const Lembretes = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'vacina',
      pet: 'Rex',
      owner: 'Maria Silva',
      phone: '11999999999',
      service: 'Vacina V10',
      date: '2024-11-20',
      time: '14:00',
      status: 'pendente'
    },
    {
      id: 2,
      type: 'retorno',
      pet: 'Luna',
      owner: 'João Santos',
      phone: '11888888888',
      service: 'Retorno Cirurgia',
      date: '2024-11-22',
      time: '09:30',
      status: 'pendente'
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    type: '',
    pet: '',
    owner: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    status: 'pendente'
  });

  const [isNewAlertOpen, setIsNewAlertOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  
  const [templates, setTemplates] = useState({
    vacina: "Olá {cliente}! 🐾\n\nLembramos que a vacina {servico} do {pet} está agendada para {data} às {hora}.\n\nConfirme sua presença!\n\nVetPrime - Cuidando com amor 💙",
    retorno: "Olá {cliente}! 🐾\n\nLembramos que o retorno do {pet} está agendado para {data} às {hora}.\n\nAguardamos vocês!\n\nVetPrime - Cuidando com amor 💙",
    consulta: "Olá {cliente}! 🐾\n\nLembramos que a consulta do {pet} está agendada para {data} às {hora}.\n\nConfirme sua presença!\n\nVetPrime - Cuidando com amor 💙"
  });

  const generateWhatsAppMessage = (alert: any) => {
    const template = templates[alert.type as keyof typeof templates] || templates.consulta;
    return template
      .replace('{cliente}', alert.owner)
      .replace('{pet}', alert.pet)
      .replace('{servico}', alert.service)
      .replace('{data}', new Date(alert.date).toLocaleDateString())
      .replace('{hora}', alert.time);
  };

  const openWhatsApp = (alert: any) => {
    const message = generateWhatsAppMessage(alert);
    const url = `https://wa.me/55${alert.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const markAsSent = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: 'enviado' } : alert
    ));
    
    toast({
      title: "Lembrete marcado como enviado",
      description: "O status foi atualizado com sucesso",
    });
  };

  const handleNewAlert = () => {
    if (!newAlert.pet || !newAlert.owner || !newAlert.date || !newAlert.time) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const alert = {
      id: Date.now(),
      ...newAlert
    };

    setAlerts([...alerts, alert]);
    setNewAlert({
      type: '',
      pet: '',
      owner: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      status: 'pendente'
    });
    setIsNewAlertOpen(false);

    toast({
      title: "Lembrete criado!",
      description: `Lembrete para ${alert.pet} foi agendado`,
    });
  };

  const handleSaveTemplates = () => {
    toast({
      title: "Configurações salvas",
      description: "Os templates de mensagem foram atualizados",
    });
    setConfigOpen(false);
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'vacina': return 'bg-green-100 text-green-800';
      case 'retorno': return 'bg-blue-100 text-blue-800';
      case 'consulta': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'enviado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout title="Lembretes Automáticos">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Lembretes Automáticos</h2>
            <p className="text-gray-600">Sistema inteligente de notificações por WhatsApp</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isNewAlertOpen} onOpenChange={setIsNewAlertOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Lembrete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo Lembrete</DialogTitle>
                  <DialogDescription>
                    Crie um novo lembrete automático
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nome do Pet *</Label>
                      <Input
                        value={newAlert.pet}
                        onChange={(e) => setNewAlert({...newAlert, pet: e.target.value})}
                        placeholder="Ex: Rex"
                      />
                    </div>
                    <div>
                      <Label>Tutor *</Label>
                      <Input
                        value={newAlert.owner}
                        onChange={(e) => setNewAlert({...newAlert, owner: e.target.value})}
                        placeholder="Ex: Maria Silva"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Telefone</Label>
                      <Input
                        value={newAlert.phone}
                        onChange={(e) => setNewAlert({...newAlert, phone: e.target.value})}
                        placeholder="Ex: 11999999999"
                      />
                    </div>
                    <div>
                      <Label>Tipo</Label>
                      <Select onValueChange={(value) => setNewAlert({...newAlert, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacina">Vacina</SelectItem>
                          <SelectItem value="retorno">Retorno</SelectItem>
                          <SelectItem value="consulta">Consulta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Serviço</Label>
                    <Input
                      value={newAlert.service}
                      onChange={(e) => setNewAlert({...newAlert, service: e.target.value})}
                      placeholder="Ex: Vacina V10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Data *</Label>
                      <Input
                        type="date"
                        value={newAlert.date}
                        onChange={(e) => setNewAlert({...newAlert, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Horário *</Label>
                      <Input
                        type="time"
                        value={newAlert.time}
                        onChange={(e) => setNewAlert({...newAlert, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsNewAlertOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleNewAlert} className="bg-blue-600 hover:bg-blue-700">
                      Criar Lembrete
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={configOpen} onOpenChange={setConfigOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Configurar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Configurações de Mensagens</DialogTitle>
                  <DialogDescription>
                    Personalize as mensagens automáticas
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Mensagem para Vacinas</Label>
                    <Textarea 
                      value={templates.vacina}
                      onChange={(e) => setTemplates({...templates, vacina: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Mensagem para Retornos</Label>
                    <Textarea 
                      value={templates.retorno}
                      onChange={(e) => setTemplates({...templates, retorno: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Mensagem para Consultas</Label>
                    <Textarea 
                      value={templates.consulta}
                      onChange={(e) => setTemplates({...templates, consulta: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setConfigOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveTemplates} className="bg-blue-600 hover:bg-blue-700">
                      Salvar Configurações
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Bell className="w-4 h-4 mr-2" />
              Alertas
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{alerts.filter(a => a.status === 'pendente').length}</p>
                  <p className="text-sm text-gray-600">Alertas Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{alerts.filter(a => a.status === 'enviado').length}</p>
                  <p className="text-sm text-gray-600">Mensagens Enviadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{alerts.filter(a => a.date === new Date().toISOString().split('T')[0]).length}</p>
                  <p className="text-sm text-gray-600">Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lembretes Automáticos</CardTitle>
            <CardDescription>Lista de lembretes programados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{alert.pet} - {alert.owner}</h3>
                        <Badge className={getAlertColor(alert.type)}>
                          {alert.type.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{alert.service}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(alert.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.time}
                        </span>
                        {alert.phone && (
                          <button 
                            onClick={() => window.open(`https://wa.me/55${alert.phone}`, '_blank')}
                            className="flex items-center gap-1 text-green-600 hover:text-green-800"
                          >
                            <Phone className="w-3 h-3" />
                            {alert.phone}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => openWhatsApp(alert)}
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      WhatsApp
                    </Button>
                    {alert.status === 'pendente' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markAsSent(alert.id)}
                      >
                        Marcar Enviado
                      </Button>
                    )}
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

export default Lembretes;
