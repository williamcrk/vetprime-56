
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Mail, MessageCircle, Download, Plus, Pill } from 'lucide-react';

const PrescricaoDigital = () => {
  const [prescriptions] = useState([
    {
      id: 'RX001',
      pet: 'Rex',
      owner: 'Maria Silva',
      veterinarian: 'Dr. João Silva',
      date: '2024-11-15',
      medications: ['Amoxicilina 500mg', 'Anti-inflamatório'],
      status: 'Enviada'
    },
    {
      id: 'RX002', 
      pet: 'Luna',
      owner: 'João Santos',
      veterinarian: 'Dra. Maria Santos',
      date: '2024-11-14',
      medications: ['Vermífugo', 'Vitamina B'],
      status: 'Pendente'
    }
  ]);

  const sendPrescription = (prescription: any, method: 'email' | 'whatsapp') => {
    if (method === 'whatsapp') {
      const message = `Olá ${prescription.owner}! 🐾\n\nA receita veterinária do ${prescription.pet} está pronta.\n\nReceita: ${prescription.id}\nMedicamentos: ${prescription.medications.join(', ')}\n\nVetPrime - Cuidando com amor 💙`;
      // Aqui você colocaria o número do cliente
      const url = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } else {
      // Simular envio por email
      alert(`Receita ${prescription.id} enviada por email para ${prescription.owner}`);
    }
  };

  return (
    <PageLayout title="Prescrição Digital">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Receitas Veterinárias</h2>
            <p className="text-gray-600">Sistema digital de prescrições</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Receita
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-600">Receitas Emitidas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">142</p>
                  <p className="text-sm text-gray-600">Enviadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-gray-600">Via WhatsApp</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Nova Receita</CardTitle>
              <CardDescription>Criar prescrição digital</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Pet</label>
                  <Input placeholder="Nome do pet" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Proprietário</label>
                  <Input placeholder="Nome do proprietário" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Medicamentos</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Medicamento" className="flex-1" />
                    <Input placeholder="Dosagem" className="w-24" />
                    <Input placeholder="Frequência" className="w-32" />
                    <Button size="sm" variant="outline">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Observações</label>
                <Textarea placeholder="Instruções especiais..." rows={3} />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Gerar Receita
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receitas Recentes</CardTitle>
              <CardDescription>Últimas prescrições emitidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Pill className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{prescription.id}</h3>
                        <p className="text-sm text-gray-600">{prescription.pet} - {prescription.owner}</p>
                        <p className="text-xs text-gray-500">{prescription.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={prescription.status === 'Enviada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {prescription.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => sendPrescription(prescription, 'email')}
                        >
                          <Mail className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => sendPrescription(prescription, 'whatsapp')}
                        >
                          <MessageCircle className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrescricaoDigital;
