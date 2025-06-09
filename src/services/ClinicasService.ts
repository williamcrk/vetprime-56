
import { supabase } from '@/integrations/supabase/client';

export interface Clinica {
  id?: string;
  nome: string;
  cnpj?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

export const ClinicasService = {
  async create(clinica: Omit<Clinica, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('clinicas')
      .insert([clinica])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('clinicas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('clinicas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, clinica: Partial<Clinica>) {
    const { data, error } = await supabase
      .from('clinicas')
      .update({
        ...clinica,
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
      .from('clinicas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
