
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, Bell, Clock, Mail, MessageCircle, 
  Users, Shield, Database, Palette, Save,
  Calendar, DollarSign, FileText, Zap
} from 'lucide-react';

const Configuracoes = () => {
  const [emailTemplates] = useState([
    { 
      name: 'Confirmação de Consulta', 
      subject: 'Sua consulta está confirmada - {pet_name}',
      active: true,
      usage: 156
    },
    { 
      name: 'Lembrete de Vacinação', 
      subject: 'Hora da vacina do {pet_name}!',
      active: true,
      usage: 89
    },
    { 
      name: 'Cobrança Pendente', 
      subject: 'Pagamento pendente - {owner_name}',
      active: false,
      usage: 23
    }
  ]);

  const [businessHours] = useState([
    { day: 'Segunda-feira', open: '08:00', close: '18:00', active: true },
    { day: 'Terça-feira', open: '08:00', close: '18:00', active: true },
    { day: 'Quarta-feira', open: '08:00', close: '18:00', active: true },
    { day: 'Quinta-feira', open: '08:00', close: '18:00', active: true },
    { day: 'Sexta-feira', open: '08:00', close: '18:00', active: true },
    { day: 'Sábado', open: '08:00', close: '12:00', active: true },
    { day: 'Domingo', open: '09:00', close: '12:00', active: false },
  ]);

  const [automationRules] = useState([
    {
      name: 'Lembrete Automático de Consulta',
      description: 'Envia WhatsApp 1 dia antes da consulta',
      active: true,
      trigger: '24h antes',
      action: 'WhatsApp'
    },
    {
      name: 'Alerta de Estoque Baixo',
      description: 'Notifica quando produto atinge estoque mínimo',
      active: true,
      trigger: 'Estoque < 20%',
      action: 'Notificação + Email'
    },
    {
      name: 'Cobrança Automática',
      description: 'Envia link de pagamento após 3 dias em atraso',
      active: false,
      trigger: '3 dias atraso',
      action: 'WhatsApp + Email'
    }
  ]);

  return (
    <PageLayout title="Configurações Avançadas">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Sistema de Configurações</h2>
            <p className="text-gray-600">Personalize templates, horários e automações</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        <Tabs defaultValue="templates" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="schedule">Horários</TabsTrigger>
            <TabsTrigger value="automation">Automação</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Templates de Email</CardTitle>
                  <CardDescription>Personalize mensagens automáticas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emailTemplates.map((template, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.subject}</p>
                          <p className="text-xs text-gray-500">Usado {template.usage} vezes</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={template.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {template.active ? 'Ativo' : 'Inativo'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Novo Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Editor de Template</CardTitle>
                  <CardDescription>Criar ou editar template de mensagem</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome do Template</label>
                    <Input placeholder="Ex: Confirmação de Consulta" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Assunto</label>
                    <Input placeholder="Ex: Sua consulta está confirmada" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Conteúdo</label>
                    <Textarea 
                      placeholder="Olá {owner_name}! A consulta do {pet_name} está confirmada para {date} às {time}."
                      rows={6}
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">Variáveis disponíveis:</p>
                    <div className="flex flex-wrap gap-2">
                      {['{owner_name}', '{pet_name}', '{date}', '{time}', '{doctor}', '{service}'].map((variable) => (
                        <Badge key={variable} variant="outline" className="text-xs">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Salvar Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Horários de Funcionamento</CardTitle>
                <CardDescription>Configure os horários de atendimento da clínica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-24">
                          <p className="font-medium">{schedule.day}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="time" 
                            value={schedule.open} 
                            className="w-20"
                            disabled={!schedule.active}
                          />
                          <span className="text-gray-500">às</span>
                          <Input 
                            type="time" 
                            value={schedule.close} 
                            className="w-20"
                            disabled={!schedule.active}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={schedule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {schedule.active ? 'Aberto' : 'Fechado'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {schedule.active ? 'Fechar' : 'Abrir'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Configurações Especiais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tempo de Consulta (min)</label>
                      <Input type="number" placeholder="30" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Intervalo entre Consultas (min)</label>
                      <Input type="number" placeholder="15" className="w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation">
            <Card>
              <CardHeader>
                <CardTitle>Regras de Automação</CardTitle>
                <CardDescription>Configure ações automáticas do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automationRules.map((rule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{rule.name}</h4>
                          <p className="text-sm text-gray-600">{rule.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>Gatilho: {rule.trigger}</span>
                            <span>Ação: {rule.action}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={rule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {rule.active ? 'Ativa' : 'Inativa'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {rule.active ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Nova Regra de Automação
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificação</CardTitle>
                <CardDescription>Personalize como e quando receber alertas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Alertas de Sistema</h3>
                      <div className="space-y-3">
                        {[
                          'Estoque baixo',
                          'Pagamentos em atraso',
                          'Consultas canceladas',
                          'Novos agendamentos'
                        ].map((alert) => (
                          <div key={alert} className="flex items-center justify-between">
                            <span className="text-sm">{alert}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8">
                                <Bell className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm" className="h-8">
                                <Mail className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm" className="h-8">
                                <MessageCircle className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Frequência de Relatórios</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Relatório Financeiro</label>
                          <select className="w-full p-2 border rounded-lg">
                            <option>Diário</option>
                            <option>Semanal</option>
                            <option>Mensal</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Relatório de Estoque</label>
                          <select className="w-full p-2 border rounded-lg">
                            <option>Semanal</option>
                            <option>Quinzenal</option>
                            <option>Mensal</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrações Externas</CardTitle>
                <CardDescription>Conecte com serviços externos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Serviços de Pagamento</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'WhatsApp Business', status: 'Conectado', color: 'green' },
                        { name: 'Stripe Payments', status: 'Configurar', color: 'yellow' },
                        { name: 'PagSeguro', status: 'Desconectado', color: 'gray' },
                      ].map((service) => (
                        <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{service.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge className={`bg-${service.color}-100 text-${service.color}-800`}>
                              {service.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              {service.status === 'Conectado' ? 'Configurar' : 'Conectar'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">APIs e Webhooks</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">URL do Webhook</label>
                        <Input placeholder="https://sua-api.com/webhook" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Token de API</label>
                        <Input type="password" placeholder="Seu token secreto" />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Testar Conexão
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Configuracoes;
