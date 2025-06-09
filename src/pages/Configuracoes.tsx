
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Building2, Bell, Shield, Palette, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Configuracoes = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [clinicaConfig, setClinicaConfig] = useState({
    nome: 'Clínica Veterinária Pet Care',
    cnpj: '12.345.678/0001-90',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    telefone: '(11) 3456-7890',
    email: 'contato@petcare.com.br',
    whatsapp: '(11) 99999-9999'
  });

  const [notificacoes, setNotificacoes] = useState({
    lembretes_automaticos: true,
    notificacao_agendamentos: true,
    alertas_estoque: true,
    relatorios_diarios: false,
    backup_automatico: true
  });

  const [sistema, setSistema] = useState({
    tema_escuro: false,
    idioma: 'pt-BR',
    fuso_horario: 'America/Sao_Paulo',
    formato_data: 'DD/MM/YYYY',
    moeda: 'BRL'
  });

  const handleSaveClinica = async () => {
    try {
      setLoading(true);
      // Aqui você salvaria as configurações da clínica
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula API call
      
      toast({
        title: "Sucesso!",
        description: "Configurações da clínica salvas com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotificacoes = async () => {
    try {
      setLoading(true);
      // Aqui você salvaria as configurações de notificações
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula API call
      
      toast({
        title: "Sucesso!",
        description: "Configurações de notificações salvas com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSistema = async () => {
    try {
      setLoading(true);
      // Aqui você salvaria as configurações do sistema
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula API call
      
      toast({
        title: "Sucesso!",
        description: "Configurações do sistema salvas com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Configurações">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Settings className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold">Configurações do Sistema</h2>
            <p className="text-gray-600">Gerencie as configurações da sua clínica</p>
          </div>
        </div>

        <Tabs defaultValue="clinica" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="clinica" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Clínica
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="sistema" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Sistema
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Segurança
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clinica">
            <Card>
              <CardHeader>
                <CardTitle>Dados da Clínica</CardTitle>
                <CardDescription>
                  Informações básicas da sua clínica veterinária
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nome da Clínica</Label>
                    <Input
                      value={clinicaConfig.nome}
                      onChange={(e) => setClinicaConfig(prev => ({ ...prev, nome: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>CNPJ</Label>
                    <Input
                      value={clinicaConfig.cnpj}
                      onChange={(e) => setClinicaConfig(prev => ({ ...prev, cnpj: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label>Endereço</Label>
                  <Input
                    value={clinicaConfig.endereco}
                    onChange={(e) => setClinicaConfig(prev => ({ ...prev, endereco: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Cidade</Label>
                    <Input
                      value={clinicaConfig.cidade}
                      onChange={(e) => setClinicaConfig(prev => ({ ...prev, cidade: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Estado</Label>
                    <Input
                      value={clinicaConfig.estado}
                      onChange={(e) => setClinicaConfig(prev => ({ ...prev, estado: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>CEP</Label>
                    <Input
                      value={clinicaConfig.cep}
                      onChange={(e) => setClinicaConfig(prev => ({ ...prev, cep: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Telefone</Label>
                    <Input
                      value={clinicaConfig.telefone}
                      onChange={(e) => setClinicaConfig(prev => ({ ...prev, telefone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={clinicaConfig.email}
                      onChange={(e) => setClinicaConfig(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>WhatsApp</Label>
                    <Input
                      value={clinicaConfig.whatsapp}
                      onChange={(e) => setClinicaConfig(prev => ({ ...prev, whatsapp: e.target.value }))}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveClinica} disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar Configurações'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>
                  Configure como você deseja receber notificações do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Lembretes Automáticos</h4>
                    <p className="text-sm text-gray-600">Envio automático de lembretes para tutores</p>
                  </div>
                  <Switch
                    checked={notificacoes.lembretes_automaticos}
                    onCheckedChange={(checked) => setNotificacoes(prev => ({ ...prev, lembretes_automaticos: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações de Agendamentos</h4>
                    <p className="text-sm text-gray-600">Alertas sobre novos agendamentos e alterações</p>
                  </div>
                  <Switch
                    checked={notificacoes.notificacao_agendamentos}
                    onCheckedChange={(checked) => setNotificacoes(prev => ({ ...prev, notificacao_agendamentos: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Alertas de Estoque</h4>
                    <p className="text-sm text-gray-600">Notificações quando produtos estão em baixa quantidade</p>
                  </div>
                  <Switch
                    checked={notificacoes.alertas_estoque}
                    onCheckedChange={(checked) => setNotificacoes(prev => ({ ...prev, alertas_estoque: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Relatórios Diários</h4>
                    <p className="text-sm text-gray-600">Receber relatório diário por email</p>
                  </div>
                  <Switch
                    checked={notificacoes.relatorios_diarios}
                    onCheckedChange={(checked) => setNotificacoes(prev => ({ ...prev, relatorios_diarios: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Backup Automático</h4>
                    <p className="text-sm text-gray-600">Backup automático dos dados da clínica</p>
                  </div>
                  <Switch
                    checked={notificacoes.backup_automatico}
                    onCheckedChange={(checked) => setNotificacoes(prev => ({ ...prev, backup_automatico: checked }))}
                  />
                </div>

                <Button onClick={handleSaveNotificacoes} disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar Notificações'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sistema">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>
                  Personalize a aparência e comportamento do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Tema Escuro</h4>
                    <p className="text-sm text-gray-600">Usar tema escuro na interface</p>
                  </div>
                  <Switch
                    checked={sistema.tema_escuro}
                    onCheckedChange={(checked) => setSistema(prev => ({ ...prev, tema_escuro: checked }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Idioma</Label>
                    <Input value="Português (Brasil)" disabled />
                  </div>
                  <div>
                    <Label>Fuso Horário</Label>
                    <Input value="America/Sao_Paulo" disabled />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Formato de Data</Label>
                    <Input value="DD/MM/YYYY" disabled />
                  </div>
                  <div>
                    <Label>Moeda</Label>
                    <Input value="Real Brasileiro (R$)" disabled />
                  </div>
                </div>

                <Button onClick={handleSaveSistema} disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar Sistema'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
                <CardDescription>
                  Gerencie aspectos de segurança e acesso ao sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Controle de Acesso</h4>
                  <p className="text-sm text-gray-600">
                    Configure permissões e níveis de acesso para diferentes usuários
                  </p>
                  <Button variant="outline">
                    Gerenciar Usuários
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Backup de Dados</h4>
                  <p className="text-sm text-gray-600">
                    Último backup: Hoje às 03:00
                  </p>
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    Fazer Backup Agora
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Logs de Sistema</h4>
                  <p className="text-sm text-gray-600">
                    Visualizar logs de atividades e acessos ao sistema
                  </p>
                  <Button variant="outline">
                    Ver Logs
                  </Button>
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
