
import { supabase } from '@/integrations/supabase/client';

export interface Financeiro {
  id?: string;
  valor_total: number;
  status?: string;
  forma_pagamento?: string;
  data_pagamento?: string;
  parcelas?: number;
  tutor_id?: string;
  atendimento_id?: string;
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
  // Relações
  tutores?: {
    nome: string;
  };
}

export interface ItemFinanceiro {
  id?: string;
  financeiro_id?: string;
  tipo: string;
  produto_id?: string;
  servico_id?: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  created_at?: string;
  // Relações
  produtos?: {
    nome: string;
    preco_venda: number;
  };
  servicos?: {
    nome: string;
    preco: number;
  };
}

export const FinanceiroService = {
  async create(financeiro: Omit<Financeiro, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('financeiro')
      .insert([financeiro])
      .select(`
        *,
        tutores:tutor_id (nome)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('financeiro')
      .select(`
        *,
        tutores:tutor_id (nome)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async update(id: string, financeiro: Partial<Financeiro>) {
    const { data, error } = await supabase
      .from('financeiro')
      .update({ ...financeiro, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addItem(item: Omit<ItemFinanceiro, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('itens_financeiro')
      .insert([item])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getItems(financeiroId: string) {
    const { data, error } = await supabase
      .from('itens_financeiro')
      .select(`
        *,
        produtos:produto_id (nome, preco_venda),
        servicos:servico_id (nome, preco)
      `)
      .eq('financeiro_id', financeiroId);

    if (error) throw error;
    return data || [];
  }
};
