
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, Clock, AlertTriangle, Syringe, Pill, 
  Thermometer, Heart, Droplets, Bell, User,
  CheckCircle, Package, PlayCircle, XCircle,
  Plus, MessageSquare
} from 'lucide-react';

const PainelInternamentoTempo = () => {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(timer);
  }, []);

  const internments = [
    {
      id: 1,
      petName: 'Buddy',
      owner: 'Maria Silva',
      phone: '11999998888',
      species: 'Cão',
      breed: 'Golden Retriever',
      room: 'UTI 01',
      veterinarian: 'Dr. João Silva',
      startDate: '2024-11-10',
      status: 'critico',
      temperature: 39.2,
      weight: 28.5,
      medications: [
        { 
          name: 'Amoxicilina', 
          dose: '500mg', 
          frequency: '8h', 
          nextDose: '14:00',
          stock: 25,
          cost: 12.50,
          lastApplied: '06:00',
          appliedBy: 'Enf. Ana',
          status: 'pendente'
        },
        { 
          name: 'Dipirona', 
          dose: '2ml', 
          frequency: '6h', 
          nextDose: '12:00',
          stock: 15,
          cost: 8.00,
          lastApplied: '06:00',
          appliedBy: 'Enf. Ana',
          status: 'aplicado'
        }
      ],
      materials: [
        { name: 'Agulha 25x7', used: 2, stock: 150, cost: 0.50 },
        { name: 'Seringa 5ml', used: 2, stock: 80, cost: 1.20 }
      ],
      totalCost: 44.40,
      observations: 'Paciente apresentou melhora após medicação. Monitorar temperatura.'
    },
    {
      id: 2,
      petName: 'Luna',
      owner: 'João Santos',
      phone: '11888887777',
      species: 'Gato',
      breed: 'Siamês',
      room: 'Internação 02',
      veterinarian: 'Dra. Maria Santos',
      startDate: '2024-11-12',
      status: 'observacao',
      temperature: 38.5,
      weight: 4.2,
      medications: [
        { 
          name: 'Metacam', 
          dose: '0.5ml', 
          frequency: '12h', 
          nextDose: '16:00',
          stock: 8,
          cost: 15.80,
          lastApplied: '04:00',
          appliedBy: 'Dr. Pedro',
          status: 'pendente'
        }
      ],
      materials: [
        { name: 'Agulha 13x4.5', used: 1, stock: 200, cost: 0.30 }
      ],
      totalCost: 16.10,
      observations: 'Respondendo bem ao tratamento. Continuar observação.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'critico': return 'bg-red-100 text-red-800 border-red-200';
      case 'observacao': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'estavel': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critico': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'observacao': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'estavel': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleApplyMedication = (internmentId, medicationName) => {
    toast({
      title: "Medicação Aplicada",
      description: `${medicationName} aplicado com sucesso. Estoque e orçamento atualizados.`,
    });
  };

  const handleWhatsApp = (phone, petName) => {
    const message = `Olá! Informações sobre o internamento de ${petName}. Como posso ajudar?`;
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isPending = (nextDose) => {
    const now = new Date();
    const doseTime = new Date();
    const [hours, minutes] = nextDose.split(':');
    doseTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return now >= doseTime;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Painel de Internamento - Tempo Real</h2>
          <p className="text-gray-600">
            Última atualização: {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notificações (3)
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Internação
          </Button>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{internments.length}</p>
                <p className="text-sm text-gray-600">Pacientes Internados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">
                  {internments.filter(i => i.status === 'critico').length}
                </p>
                <p className="text-sm text-gray-600">Estado Crítico</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Syringe className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">
                  {internments.flatMap(i => i.medications.filter(m => isPending(m.nextDose))).length}
                </p>
                <p className="text-sm text-gray-600">Doses Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  R$ {internments.reduce((sum, i) => sum + i.totalCost, 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Custo Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de pacientes internados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {internments.map((internment) => (
          <Card key={internment.id} className={`border-l-4 ${
            internment.status === 'critico' ? 'border-l-red-500' :
            internment.status === 'observacao' ? 'border-l-yellow-500' : 'border-l-green-500'
          }`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(internment.status)}
                    {internment.petName}
                  </CardTitle>
                  <CardDescription>
                    {internment.owner} • {internment.species} • {internment.breed}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(internment.status)}>
                    {internment.status === 'critico' ? 'Crítico' :
                     internment.status === 'observacao' ? 'Observação' : 'Estável'}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleWhatsApp(internment.phone, internment.petName)}
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Informações básicas */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{internment.veterinarian}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <span>{internment.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-gray-500" />
                  <span>{internment.temperature}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span>{internment.weight}kg</span>
                </div>
              </div>

              {/* Medicações */}
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Pill className="w-4 h-4" />
                  Medicações
                </h4>
                <div className="space-y-2">
                  {internment.medications.map((med, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      isPending(med.nextDose) ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{med.name}</span>
                            <Badge variant={isPending(med.nextDose) ? 'destructive' : 'outline'}>
                              {isPending(med.nextDose) ? 'Pendente' : 'OK'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {med.dose} • a cada {med.frequency} • Próxima: {med.nextDose}
                          </p>
                          <p className="text-xs text-gray-500">
                            Última aplicação: {med.lastApplied} por {med.appliedBy}
                          </p>
                          <p className="text-xs text-green-600">
                            Estoque: {med.stock}un • Custo: R$ {med.cost.toFixed(2)}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className={isPending(med.nextDose) ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                              disabled={!isPending(med.nextDose)}
                            >
                              <Syringe className="w-3 h-3 mr-1" />
                              Aplicar
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Aplicar Medicação</DialogTitle>
                              <DialogDescription>
                                Registrar aplicação de {med.name} para {internment.petName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Medicamento</Label>
                                <Input value={med.name} disabled />
                              </div>
                              <div>
                                <Label>Dose</Label>
                                <Input value={med.dose} disabled />
                              </div>
                              <div>
                                <Label>Materiais Utilizados</Label>
                                <div className="space-y-2">
                                  {internment.materials.map((material, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <Input type="number" placeholder="Qtd" className="w-20" />
                                      <span className="text-sm">{material.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <Label>Observações</Label>
                                <Textarea placeholder="Observações sobre a aplicação..." />
                              </div>
                              <Button 
                                className="w-full bg-green-600 hover:bg-green-700"
                                onClick={() => handleApplyMedication(internment.id, med.name)}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Confirmar Aplicação
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observações */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-1 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Observações
                </h4>
                <p className="text-sm text-gray-700">{internment.observations}</p>
              </div>

              {/* Custo total */}
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Custo Total do Internamento:</span>
                <span className="text-lg font-bold text-green-600">
                  R$ {internment.totalCost.toFixed(2)}
                </span>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="w-3 h-3 mr-1" />
                  Evolução
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Activity className="w-3 h-3 mr-1" />
                  Sinais Vitais
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Alta
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alertas em tempo real */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Bell className="w-5 h-5" />
            Alertas em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>Buddy (UTI 01) - Dose de Amoxicilina atrasada há 2 horas</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span>Luna (Internação 02) - Próxima dose de Metacam em 30 minutos</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-blue-500" />
              <span>Estoque baixo: Amoxicilina 500mg (25 unidades restantes)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PainelInternamentoTempo;
