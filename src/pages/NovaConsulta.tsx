
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, User, Heart } from 'lucide-react';

const NovaConsulta = () => {
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
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maria">Maria Silva</SelectItem>
                    <SelectItem value="joao">João Santos</SelectItem>
                    <SelectItem value="ana">Ana Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pet">Paciente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o pet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rex">Rex (Golden Retriever)</SelectItem>
                    <SelectItem value="luna">Luna (Siamês)</SelectItem>
                    <SelectItem value="thor">Thor (Pastor Alemão)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input type="date" id="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input type="time" id="time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Consulta</Label>
              <Select>
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea 
                id="observations" 
                placeholder="Observações adicionais..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Consulta
              </Button>
              <Button variant="outline" className="flex-1">
                Cancelar
              </Button>
            </div>
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
                {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00'].map((time) => (
                  <Button key={time} variant="outline" size="sm" className="text-xs">
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Dr. João Silva" />
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
