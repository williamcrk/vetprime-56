
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Settings, User, Bell, Shield, Database } from 'lucide-react';

const Configuracoes = () => {
  return (
    <PageLayout title="Configurações">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Perfil</p>
                  <p className="text-sm text-blue-700">Dados pessoais</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Notificações</p>
                  <p className="text-sm text-green-700">Alertas e avisos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-purple-900">Segurança</p>
                  <p className="text-sm text-purple-700">Senhas e acesso</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-900">Sistema</p>
                  <p className="text-sm text-orange-700">Backup e logs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações da Clínica
            </CardTitle>
            <CardDescription>Configure os dados básicos da sua clínica veterinária</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clinic-name">Nome da Clínica</Label>
                <Input id="clinic-name" defaultValue="VetPrime Clínica Veterinária" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" defaultValue="12.345.678/0001-90" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" defaultValue="(11) 3333-4444" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" defaultValue="contato@vetprime.com.br" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço Completo</Label>
              <Textarea 
                id="address" 
                defaultValue="Rua das Flores, 123 - Centro - São Paulo, SP - CEP: 01234-567"
                rows={3}
              />
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">
              Salvar Informações
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
            <CardDescription>Configure quando e como receber notificações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Consultas do dia</p>
                <p className="text-sm text-gray-600">Receber lembrete das consultas agendadas</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Estoque baixo</p>
                <p className="text-sm text-gray-600">Alertas quando produtos estiverem acabando</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Vacinas vencendo</p>
                <p className="text-sm text-gray-600">Lembrete de vacinas próximas do vencimento</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Relatórios mensais</p>
                <p className="text-sm text-gray-600">Receber relatório de desempenho por e-mail</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Segurança
            </CardTitle>
            <CardDescription>Gerencie a segurança da sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-medium">Autenticação de dois fatores</p>
                <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
              </div>
              <Switch />
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">
              Atualizar Senha
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Sistema
            </CardTitle>
            <CardDescription>Configurações gerais do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-medium mb-2">Backup Automático</p>
                <p className="text-sm text-gray-600 mb-3">Último backup: 15/11/2024 às 02:00</p>
                <Button size="sm" variant="outline">Fazer Backup Agora</Button>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="font-medium mb-2">Status do Sistema</p>
                <p className="text-sm text-green-600 mb-3">Todos os serviços operando normalmente</p>
                <Button size="sm" variant="outline">Ver Logs</Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="font-medium">Modo Manutenção</p>
                <p className="text-sm text-gray-600">Desabilita temporariamente o acesso ao sistema</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Configuracoes;
