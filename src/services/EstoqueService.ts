
import { supabase } from '@/integrations/supabase/client';

export interface Produto {
  id?: string;
  nome: string;
  categoria?: string;
  codigo?: string;
  descricao?: string;
  unidade?: string;
  fabricante?: string;
  preco_custo: number;
  preco_venda: number;
  estoque_atual?: number;
  estoque_minimo?: number;
  data_validade?: string;
  lote?: string;
  fornecedor_id?: string;
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const EstoqueService = {
  async create(produto: Omit<Produto, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('produtos')
      .insert([produto])
      .select(`
        *,
        fornecedores:fornecedor_id (nome)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('produtos')
      .select(`
        *,
        fornecedores:fornecedor_id (nome)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async update(id: string, produto: Partial<Produto>) {
    const { data, error } = await supabase
      .from('produtos')
      .update({ ...produto, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateStock(id: string, quantidade: number, tipo: 'entrada' | 'saida') {
    // Primeiro, buscar o estoque atual
    const { data: produto, error: fetchError } = await supabase
      .from('produtos')
      .select('estoque_atual')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    const novoEstoque = tipo === 'entrada' 
      ? (produto.estoque_atual || 0) + quantidade
      : (produto.estoque_atual || 0) - quantidade;

    // Atualizar o estoque
    const { data, error } = await supabase
      .from('produtos')
      .update({ estoque_atual: novoEstoque, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Registrar a movimentação
    await supabase
      .from('movimentacao_estoque')
      .insert([{
        produto_id: id,
        tipo,
        quantidade,
        motivo: `${tipo === 'entrada' ? 'Entrada' : 'Saída'} manual no estoque`,
        data_movimentacao: new Date().toISOString()
      }]);

    return data;
  }
};
