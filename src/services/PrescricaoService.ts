
import { supabase } from '@/integrations/supabase/client';

export interface Receita {
  id?: string;
  pet_id?: string;
  veterinario_id?: string;
  data_prescricao?: string;
  observacoes?: string;
  status?: string;
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ItemReceita {
  id?: string;
  receita_id?: string;
  medicamento: string;
  dosagem: string;
  frequencia: string;
  duracao: string;
  instrucoes?: string;
  created_at?: string;
}

export const PrescricaoService = {
  async create(receita: Omit<Receita, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('receitas')
      .insert([receita])
      .select(`
        *,
        pets:pet_id (name, especie),
        veterinarios:veterinario_id (nome)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('receitas')
      .select(`
        *,
        pets:pet_id (name, especie),
        veterinarios:veterinario_id (nome)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addItem(item: Omit<ItemReceita, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('itens_receita')
      .insert([item])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getItems(receitaId: string) {
    const { data, error } = await supabase
      .from('itens_receita')
      .select('*')
      .eq('receita_id', receitaId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async update(id: string, receita: Partial<Receita>) {
    const { data, error } = await supabase
      .from('receitas')
      .update({ ...receita, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
