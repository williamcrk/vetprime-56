
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, TrendingUp, TrendingDown, DollarSign, Plus, Search, Calendar, Filter } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useToast } from '@/hooks/use-toast';

const Financeiro = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [transactions, setTransactions] = useState([
    { id: '001', type: 'Consulta', client: 'Maria Silva', amount: 150, date: '15/11/2024', status: 'Pago', phone: '(11) 99999-9999', paymentMethod: 'PIX' },
    { id: '002', type: 'Cirurgia', client: 'Ana Costa', amount: 800, date: '10/11/2024', status: 'Pendente', phone: '(11) 77777-7777', paymentMethod: 'Cartão' },
    { id: '003', type: 'Vacinação', client: 'João Santos', amount: 80, date: '12/11/2024', status: 'Pago', phone: '(11) 88888-8888', paymentMethod: 'Dinheiro' },
    { id: '004', type: 'Internação', client: 'Pedro Alves', amount: 1200, date: '08/11/2024', status: 'Parcial', phone: '(11) 55555-5555', paymentMethod: 'Cartão' },
    { id: '005', type: 'Consulta', client: 'Carlos Lima', amount: 150, date: '07/11/2024', status: 'Vencido', phone: '(11) 66666-6666', paymentMethod: 'Boleto' },
  ]);

  const [newCharge, setNewCharge] = useState({
    client: '',
    type: '',
    amount: '',
    paymentMethod: '',
    installments: '1'
  });

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const monthlyRevenue = transactions.filter(t => t.status === 'Pago').reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = 28150;
  const profit = monthlyRevenue - monthlyExpenses;
  const profitPercentage = ((profit / monthlyRevenue) * 100).toFixed(1);

  const pendingAmount = transactions.filter(t => t.status === 'Pendente').reduce((sum, t) => sum + t.amount, 0);
  const overdueAmount = transactions.filter(t => t.status === 'Vencido').reduce((sum, t) => sum + t.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return 'bg-green-100 text-green-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Parcial': return 'bg-blue-100 text-blue-800';
      case 'Vencido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateTransactionStatus = (id: string, newStatus: string) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    ));
    toast({
      title: "Status atualizado",
      description: `Transação #${id} marcada como ${newStatus}`,
    });
  };

  const createCharge = () => {
    if (!newCharge.client || !newCharge.type || !newCharge.amount) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const charge = {
      id: String(transactions.length + 1).padStart(3, '0'),
      client: newCharge.client,
      type: newCharge.type,
      amount: parseFloat(newCharge.amount),
      date: new Date().toLocaleDateString(),
      status: 'Pendente',
      phone: '(11) 99999-9999', // Mock
      paymentMethod: newCharge.paymentMethod || 'A definir'
    };

    setTransactions(prev => [charge, ...prev]);
    setNewCharge({ client: '', type: '', amount: '', paymentMethod: '', installments: '1' });
    
    toast({
      title: "Cobrança criada",
      description: `Cobrança #${charge.id} criada para ${charge.client}`,
    });
  };

  const sendPaymentLink = (transaction: any) => {
    const message = `🏥 *CLÍNICA VETERINÁRIA*\n\n*Cobrança:* #${transaction.id}\n*Cliente:* ${transaction.client}\n*Serviço:* ${transaction.type}\n*Valor:* R$ ${transaction.amount.toFixed(2)}\n\nClique no link para pagar:\n[Link de Pagamento - Em Construção]\n\n_VetPrime - Sistema de Gestão_ 💙`;
    
    window.open(`https://wa.me/55${transaction.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <PageLayout title="Financeiro">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold">Gestão Financeira</h2>
            <p className="text-gray-600">Controle de receitas e despesas</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar transação..." 
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Vencido">Vencido</SelectItem>
                <SelectItem value="Parcial">Parcial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {monthlyRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Receita Mensal</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {monthlyExpenses.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Despesas Mensais</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {profit.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Lucro Líquido</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{profitPercentage}%</p>
                  <p className="text-sm text-gray-600">Margem de Lucro</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Nova Cobrança</CardTitle>
              <CardDescription>Criar nova cobrança para cliente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cliente *</label>
                  <Input 
                    placeholder="Nome do cliente" 
                    value={newCharge.client}
                    onChange={(e) => setNewCharge(prev => ({ ...prev, client: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Serviço *</label>
                  <Select value={newCharge.type} onValueChange={(value) => setNewCharge(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consulta">Consulta</SelectItem>
                      <SelectItem value="Cirurgia">Cirurgia</SelectItem>
                      <SelectItem value="Vacinação">Vacinação</SelectItem>
                      <SelectItem value="Internação">Internação</SelectItem>
                      <SelectItem value="Exame">Exame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Valor *</label>
                  <Input 
                    type="number" 
                    placeholder="0,00" 
                    value={newCharge.amount}
                    onChange={(e) => setNewCharge(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Forma de Pagamento</label>
                  <Select value={newCharge.paymentMethod} onValueChange={(value) => setNewCharge(prev => ({ ...prev, paymentMethod: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PIX">PIX</SelectItem>
                      <SelectItem value="Cartão">Cartão</SelectItem>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="Boleto">Boleto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={createCharge} className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Criar Cobrança
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contas a Receber</CardTitle>
              <CardDescription>Pendências financeiras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">R$ {overdueAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Em Atraso</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">R$ {pendingAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Pendente</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">R$ {monthlyRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Recebido este mês</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Transações Financeiras</CardTitle>
                <CardDescription>
                  {filteredTransactions.length} transação(ões) encontrada(s)
                  {searchTerm && ` para "${searchTerm}"`}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">#{transaction.id} - {transaction.type}</h3>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{transaction.client}</p>
                      <p className="text-xs text-gray-500">{transaction.date} • {transaction.paymentMethod}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <div className="text-left sm:text-right">
                      <p className="font-medium text-lg">R$ {transaction.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      {transaction.status !== 'Pago' && (
                        <>
                          <WhatsAppButton 
                            phone={transaction.phone}
                            message=""
                            size="sm"
                            onClick={() => sendPaymentLink(transaction)}
                            showIcon={true}
                            className="flex-1 sm:flex-none text-xs"
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateTransactionStatus(transaction.id, 'Pago')}
                            className="flex-1 sm:flex-none"
                          >
                            Marcar Pago
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredTransactions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhuma transação encontrada</p>
                  {searchTerm && (
                    <p className="text-sm mt-2">
                      Tente buscar por outro termo ou{' '}
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-blue-600 hover:underline"
                      >
                        limpar filtros
                      </button>
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Financeiro;
