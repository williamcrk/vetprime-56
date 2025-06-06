import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Relatorios = () => {
  const { toast } = useToast();

  return (
    <PageLayout title="Relatórios">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <CardDescription>Selecione o tipo de relatório que deseja gerar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4"
                  onClick={() => toast({ title: "Relatório", description: "Relatório financeiro sendo gerado..." })}
                >
                  <div className="text-left">
                    <h3 className="font-medium">Relatório Financeiro</h3>
                    <p className="text-sm text-gray-600">Faturamento, receitas e despesas</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4"
                  onClick={() => toast({ title: "Relatório", description: "Relatório de atendimentos sendo gerado..." })}
                >
                  <div className="text-left">
                    <h3 className="font-medium">Relatório de Atendimentos</h3>
                    <p className="text-sm text-gray-600">Consultas realizadas por período</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4"
                  onClick={() => toast({ title: "Relatório", description: "Relatório de vacinação sendo gerado..." })}
                >
                  <div className="text-left">
                    <h3 className="font-medium">Controle de Vacinação</h3>
                    <p className="text-sm text-gray-600">Status vacinal dos pacientes</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4"
                  onClick={() => toast({ title: "Relatório", description: "Relatório de estoque sendo gerado..." })}
                >
                  <div className="text-left">
                    <h3 className="font-medium">Relatório de Estoque</h3>
                    <p className="text-sm text-gray-600">Produtos em estoque e movimentação</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-4"
                  onClick={() => toast({ title: "Relatório", description: "Relatório de comissões sendo gerado..." })}
                >
                  <div className="text-left">
                    <h3 className="font-medium">Comissões de Veterinários</h3>
                    <p className="text-sm text-gray-600">Cálculo de comissões por profissional</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurar Relatório</CardTitle>
              <CardDescription>Personalize os parâmetros do relatório</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Período</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="semana">Esta semana</SelectItem>
                    <SelectItem value="mes">Este mês</SelectItem>
                    <SelectItem value="ano">Este ano</SelectItem>
                    <SelectItem value="personalizado">Período personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data Inicial</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Data Final</Label>
                  <Input type="date" />
                </div>
              </div>
              
              <div>
                <Label>Veterinário</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os veterinários" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="joao">Dr. João Silva</SelectItem>
                    <SelectItem value="maria">Dra. Maria Santos</SelectItem>
                    <SelectItem value="pedro">Dr. Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Formato</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => toast({ title: "Sucesso!", description: "Relatório gerado e salvo na área de downloads" })}
              >
                <Download className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Relatorios;
