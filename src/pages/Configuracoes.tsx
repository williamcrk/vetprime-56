import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Settings, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Configuracoes = () => {
  const { toast } = useToast();

  return (
    <PageLayout title="Configurações">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Configurações do Sistema</h2>
          <p className="text-gray-600">Personalize o sistema para suas necessidades</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Comissões</CardTitle>
              <CardDescription>Configure comissões por veterinário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Dr. João Silva</h3>
                    <p className="text-sm text-gray-600">Consultas: 15% • Cirurgias: 25%</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast({ title: "Configuração", description: "Comissões configuradas" })}>
                      Configurar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toast({ title: "Desativado", description: "Comissões desativadas" })}>
                      Desativar
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Dra. Maria Santos</h3>
                    <p className="text-sm text-gray-600">Consultas: 12% • Cirurgias: 20%</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast({ title: "Configuração", description: "Comissões configuradas" })}>
                      Configurar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toast({ title: "Desativado", description: "Comissões desativadas" })}>
                      Desativar
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" onClick={() => toast({ title: "Regras", description: "Regras de comissão configuradas" })}>
                <Settings className="w-4 h-4 mr-2" />
                Configurar Regras de Comissão
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Configure quais notificações receber</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Novas consultas</h3>
                    <p className="text-sm text-gray-600">Receber alertas de agendamentos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Lembrete de vacinação</h3>
                    <p className="text-sm text-gray-600">Alertas de vacinas vencendo</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Resultados de exames</h3>
                    <p className="text-sm text-gray-600">Quando exames ficarem prontos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Pagamentos pendentes</h3>
                    <p className="text-sm text-gray-600">Cobranças em atraso</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Internamentos críticos</h3>
                    <p className="text-sm text-gray-600">Pacientes em estado crítico</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Configuracoes;
