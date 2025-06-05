
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, QrCode, AlertTriangle, Calendar, Pill, DollarSign, Calculator, Search, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EstoqueAvancado = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [medications, setMedications] = useState([
    {
      id: '1',
      name: 'Antibiótico Amoxicilina',
      totalML: 1000,
      usedML: 300,
      availableML: 700,
      pricePerML: 0.10,
      minStock: 200,
      expiryDate: '2025-06-15',
      status: 'Normal',
      batch: 'LOT001',
      supplier: 'Fornecedor A'
    },
    {
      id: '2',
      name: 'Anti-inflamatório',
      totalML: 500,
      usedML: 450,
      availableML: 50,
      pricePerML: 0.20,
      minStock: 100,
      expiryDate: '2024-12-20',
      status: 'Crítico',
      batch: 'LOT002',
      supplier: 'Fornecedor B'
    },
    {
      id: '3',
      name: 'Vacina V10',
      totalML: 300,
      usedML: 100,
      availableML: 200,
      pricePerML: 1.50,
      minStock: 50,
      expiryDate: '2025-03-10',
      status: 'Normal',
      batch: 'LOT003',
      supplier: 'Fornecedor C'
    }
  ]);

  const [doseCalculator, setDoseCalculator] = useState({
    selectedMedicationId: '',
    mlToUse: 0,
    patientName: '',
    clientName: ''
  });

  const [newMedication, setNewMedication] = useState({
    name: '',
    totalML: '',
    pricePerML: '',
    minStock: '',
    expiryDate: '',
    batch: '',
    supplier: ''
  });

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateDoseCost = (medication: any, mlUsed: number) => {
    return (medication.pricePerML * mlUsed).toFixed(2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Baixo': return 'bg-yellow-100 text-yellow-800';
      case 'Crítico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const applyMedication = () => {
    const selectedMed = medications.find(m => m.id === doseCalculator.selectedMedicationId);
    if (!selectedMed || !doseCalculator.mlToUse || !doseCalculator.patientName) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha medicamento, ML a aplicar e nome do paciente",
        variant: "destructive"
      });
      return;
    }

    if (doseCalculator.mlToUse > selectedMed.availableML) {
      toast({
        title: "Estoque insuficiente",
        description: `Disponível apenas ${selectedMed.availableML}ML`,
        variant: "destructive"
      });
      return;
    }

    // Atualizar estoque
    setMedications(prev => prev.map(med => {
      if (med.id === selectedMed.id) {
        const newUsedML = med.usedML + doseCalculator.mlToUse;
        const newAvailableML = med.availableML - doseCalculator.mlToUse;
        let newStatus = 'Normal';
        
        if (newAvailableML <= med.minStock * 0.5) {
          newStatus = 'Crítico';
        } else if (newAvailableML <= med.minStock) {
          newStatus = 'Baixo';
        }

        return {
          ...med,
          usedML: newUsedML,
          availableML: newAvailableML,
          status: newStatus
        };
      }
      return med;
    }));

    const cost = calculateDoseCost(selectedMed, doseCalculator.mlToUse);
    
    toast({
      title: "Medicação aplicada",
      description: `${doseCalculator.mlToUse}ML de ${selectedMed.name} aplicado em ${doseCalculator.patientName}. Custo: R$ ${cost}`,
    });

    // Limpar formulário
    setDoseCalculator({
      selectedMedicationId: '',
      mlToUse: 0,
      patientName: '',
      clientName: ''
    });
  };

  const addMedication = () => {
    if (!newMedication.name || !newMedication.totalML || !newMedication.pricePerML) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, quantidade total e preço por ML",
        variant: "destructive"
      });
      return;
    }

    const medication = {
      id: String(medications.length + 1),
      name: newMedication.name,
      totalML: parseFloat(newMedication.totalML),
      usedML: 0,
      availableML: parseFloat(newMedication.totalML),
      pricePerML: parseFloat(newMedication.pricePerML),
      minStock: parseFloat(newMedication.minStock) || 100,
      expiryDate: newMedication.expiryDate,
      status: 'Normal',
      batch: newMedication.batch || 'N/A',
      supplier: newMedication.supplier || 'N/A'
    };

    setMedications(prev => [medication, ...prev]);
    setNewMedication({
      name: '',
      totalML: '',
      pricePerML: '',
      minStock: '',
      expiryDate: '',
      batch: '',
      supplier: ''
    });

    toast({
      title: "Medicamento adicionado",
      description: `${medication.name} adicionado ao estoque`,
    });
  };

  const criticalStockCount = medications.filter(m => m.status === 'Crítico').length;
  const expiringCount = medications.filter(m => {
    const expiry = new Date(m.expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiry <= threeMonthsFromNow;
  }).length;
  
  const totalStockValue = medications.reduce((sum, med) => sum + (med.availableML * med.pricePerML), 0);

  return (
    <PageLayout title="Estoque Avançado com Controle ML">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold">Controle Inteligente por ML</h2>
            <p className="text-gray-600">Gestão precisa de medicamentos com cálculo automático de custos</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input 
                placeholder="Buscar medicamento..." 
                className="pl-9 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <QrCode className="w-4 h-4 mr-2" />
              QR Scanner
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{medications.length}</p>
                  <p className="text-sm text-gray-600">Medicamentos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{criticalStockCount}</p>
                  <p className="text-sm text-gray-600">Estoque Crítico</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{expiringCount}</p>
                  <p className="text-sm text-gray-600">Próximo ao Vencimento</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">R$ {totalStockValue.toFixed(0)}</p>
                  <p className="text-sm text-gray-600">Valor Total Estoque</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Aplicar Medicação</CardTitle>
              <CardDescription>Calcule o custo e aplique medicamentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Paciente *</label>
                  <Input 
                    placeholder="Nome do paciente"
                    value={doseCalculator.patientName}
                    onChange={(e) => setDoseCalculator(prev => ({ ...prev, patientName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cliente</label>
                  <Input 
                    placeholder="Nome do cliente"
                    value={doseCalculator.clientName}
                    onChange={(e) => setDoseCalculator(prev => ({ ...prev, clientName: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Medicamento *</label>
                <Select 
                  value={doseCalculator.selectedMedicationId} 
                  onValueChange={(value) => setDoseCalculator(prev => ({ ...prev, selectedMedicationId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Escolher medicamento..." />
                  </SelectTrigger>
                  <SelectContent>
                    {medications.filter(m => m.availableML > 0).map((med) => (
                      <SelectItem key={med.id} value={med.id}>
                        {med.name} - {med.availableML}ML disponível
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">ML a Aplicar *</label>
                <Input 
                  type="number" 
                  placeholder="Ex: 10"
                  value={doseCalculator.mlToUse || ''}
                  onChange={(e) => setDoseCalculator(prev => ({ ...prev, mlToUse: parseFloat(e.target.value) || 0 }))}
                />
              </div>

              {doseCalculator.selectedMedicationId && doseCalculator.mlToUse > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  {(() => {
                    const selectedMed = medications.find(m => m.id === doseCalculator.selectedMedicationId);
                    if (!selectedMed) return null;
                    const cost = calculateDoseCost(selectedMed, doseCalculator.mlToUse);
                    const remainingML = selectedMed.availableML - doseCalculator.mlToUse;
                    return (
                      <div>
                        <h3 className="font-medium text-blue-800">Cálculo da Aplicação</h3>
                        <p className="text-sm text-blue-600">
                          {doseCalculator.mlToUse}ML × R$ {selectedMed.pricePerML.toFixed(2)}/ML = R$ {cost}
                        </p>
                        <p className="text-xs text-blue-500 mt-1">
                          Estoque após aplicação: {remainingML}ML
                        </p>
                        {remainingML < selectedMed.minStock && (
                          <p className="text-xs text-red-500 mt-1">
                            ⚠️ Estoque ficará abaixo do mínimo ({selectedMed.minStock}ML)
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              <Button 
                onClick={applyMedication} 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!doseCalculator.selectedMedicationId || !doseCalculator.mlToUse || !doseCalculator.patientName}
              >
                <Pill className="w-4 h-4 mr-2" />
                Aplicar Medicação
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adicionar Medicamento</CardTitle>
              <CardDescription>Cadastrar novo medicamento no estoque</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Medicamento *</label>
                <Input 
                  placeholder="Ex: Antibiótico Amoxicilina"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Quantidade Total (ML) *</label>
                  <Input 
                    type="number" 
                    placeholder="1000"
                    value={newMedication.totalML}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, totalML: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preço por ML *</label>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="0.10"
                    value={newMedication.pricePerML}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, pricePerML: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Estoque Mínimo (ML)</label>
                  <Input 
                    type="number" 
                    placeholder="100"
                    value={newMedication.minStock}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, minStock: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data de Vencimento</label>
                  <Input 
                    type="date"
                    value={newMedication.expiryDate}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, expiryDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Lote</label>
                  <Input 
                    placeholder="LOT001"
                    value={newMedication.batch}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, batch: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Fornecedor</label>
                  <Input 
                    placeholder="Nome do fornecedor"
                    value={newMedication.supplier}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, supplier: e.target.value }))}
                  />
                </div>
              </div>

              <Button 
                onClick={addMedication} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar ao Estoque
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Medicamentos em Estoque</CardTitle>
            <CardDescription>
              {filteredMedications.length} medicamento(s) encontrado(s)
              {searchTerm && ` para "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMedications.map((medication) => (
                <div key={medication.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Pill className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{medication.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span>R$ {medication.pricePerML.toFixed(2)}/ML</span>
                        <span>Lote: {medication.batch}</span>
                        <span>Vence: {medication.expiryDate}</span>
                        <span>Fornecedor: {medication.supplier}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-right">
                          <p className="text-lg font-bold">{medication.availableML}ML</p>
                          <p className="text-xs text-gray-500">de {medication.totalML}ML</p>
                        </div>
                        <div className="w-16 h-16 relative">
                          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={medication.status === 'Crítico' ? '#ef4444' : medication.status === 'Baixo' ? '#f59e0b' : '#10b981'}
                              strokeWidth="3"
                              strokeDasharray={`${(medication.availableML / medication.totalML) * 100}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {Math.round((medication.availableML / medication.totalML) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={getStatusColor(medication.status)}>
                        {medication.status}
                      </Badge>
                      <p className="text-sm font-medium mt-1">
                        R$ {(medication.availableML * medication.pricePerML).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Valor disponível</p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setDoseCalculator(prev => ({ ...prev, selectedMedicationId: medication.id }))}
                      >
                        Usar
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => toast({ title: "Em construção", description: "Função de reposição será implementada" })}
                      >
                        Repor
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredMedications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum medicamento encontrado</p>
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

export default EstoqueAvancado;
