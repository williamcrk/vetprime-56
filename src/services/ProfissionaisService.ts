
import { supabase } from '@/integrations/supabase/client';

export interface Profissional {
  id?: string;
  nome: string;
  crmv?: string;
  especialidade?: string;
  email?: string;
  telefone?: string;
  comissao_percentual?: number;
  foto_url?: string;
  clinic_id?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const ProfissionaisService = {
  async create(profissional: Omit<Profissional, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('veterinarios')
      .insert([{
        nome: profissional.nome,
        crmv: profissional.crmv,
        especialidade: profissional.especialidade,
        email: profissional.email,
        telefone: profissional.telefone,
        comissao_percentual: profissional.comissao_percentual || 0,
        foto_url: profissional.foto_url,
        clinic_id: profissional.clinic_id,
        user_id: profissional.user_id
      }])
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
      .update({
        ...profissional,
        updated_at: new Date().toISOString()
      })
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
