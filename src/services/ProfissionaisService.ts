
import { supabase } from '@/integrations/supabase/client';

export interface Profissional {
  id?: string;
  nome: string;
  crmv: string;
  especialidade?: string;
  email?: string;
  telefone?: string;
  foto_url?: string;
  comissao_percentual?: number;
  user_id?: string;
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const ProfissionaisService = {
  async create(profissional: Omit<Profissional, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('veterinarios')
      .insert([profissional])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('veterinarios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('veterinarios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, profissional: Partial<Profissional>) {
    const { data, error } = await supabase
      .from('veterinarios')
      .update({ ...profissional, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('veterinarios')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
