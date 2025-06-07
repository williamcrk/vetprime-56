
import { supabase } from '@/integrations/supabase/client';

export interface Servico {
  id?: string;
  nome: string;
  descricao?: string;
  preco: number;
  duracao_minutos?: number;
  comissao_percentual?: number;
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const ServicosService = {
  async create(servico: Omit<Servico, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('servicos')
      .insert([servico])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, servico: Partial<Servico>) {
    const { data, error } = await supabase
      .from('servicos')
      .update({ ...servico, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('servicos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
