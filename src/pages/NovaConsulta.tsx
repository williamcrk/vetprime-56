
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, User, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NovaConsulta = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client: '',
    pet: '',
    date: '',
    time: '',
    type: '',
    symptoms: '',
    observations: '',
    veterinarian: 'joao'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Consulta Agendada!",
        description: `Consulta marcada para ${formData.date} às ${formData.time}`,
      });

      // Reset form
      setFormData({
        client: '',
        pet: '',
        date: '',
        time: '',
        type: '',
        symptoms: '',
        observations: '',
        veterinarian: 'joao'
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível agendar a consulta.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const availableTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

  return (
    <PageLayout title="Nova Consulta">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Informações da Consulta
            </CardTitle>
            <CardDescription>Preencha os dados para agendar uma nova consulta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Cliente</Label>
                  <Select value={formData.client} onValueChange={(value) => setFormData({...formData, client: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maria">Maria Silva</SelectItem>
                      <SelectItem value="joao">João Santos</SelectItem>
                      <SelectItem value="ana">Ana Costa</SelectItem>
                      <SelectItem value="carlos">Carlos Lima</SelectItem>
                      <SelectItem value="pedro">Pedro Alves</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pet">Paciente</Label>
                  <Select value={formData.pet} onValueChange={(value) => setFormData({...formData, pet: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o pet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rex">Rex (Golden Retriever)</SelectItem>
                      <SelectItem value="luna">Luna (Siamês)</SelectItem>
                      <SelectItem value="thor">Thor (Pastor Alemão)</SelectItem>
                      <SelectItem value="mimi">Mimi (Persa)</SelectItem>
                      <SelectItem value="buddy">Buddy (Labrador)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input 
                    type="date" 
                    id="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Consulta</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rotina">Consulta de Rotina</SelectItem>
                    <SelectItem value="vacinacao">Vacinação</SelectItem>
                    <SelectItem value="emergencia">Emergência</SelectItem>
                    <SelectItem value="retorno">Retorno</SelectItem>
                    <SelectItem value="cirurgia">Pré/Pós Cirúrgico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Sintomas/Motivo da Consulta</Label>
                <Textarea 
                  id="symptoms" 
                  placeholder="Descreva os sintomas ou motivo da consulta..."
                  rows={4}
                  value={formData.symptoms}
                  onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea 
                  id="observations" 
                  placeholder="Observações adicionais..."
                  rows={3}
                  value={formData.observations}
                  onChange={(e) => setFormData({...formData, observations: e.target.value})}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                  disabled={loading}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {loading ? 'Agendando...' : 'Agendar Consulta'}
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Horários Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <Button 
                    key={time} 
                    variant={formData.time === time ? "default" : "outline"} 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setFormData({...formData, time})}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Veterinário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Select value={formData.veterinarian} onValueChange={(value) => setFormData({...formData, veterinarian: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">Dr. João Silva</SelectItem>
                    <SelectItem value="maria">Dra. Maria Santos</SelectItem>
                    <SelectItem value="pedro">Dr. Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">CRMV-SP 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default NovaConsulta;
