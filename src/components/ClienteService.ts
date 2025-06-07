
import { supabase } from '@/integrations/supabase/client';

export interface Cliente {
  id?: string;
  nome: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  data_nascimento?: string;
  observacoes?: string;
  is_active?: boolean;
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const ClienteService = {
  async create(cliente: Omit<Cliente, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('tutores')
      .insert([cliente])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('tutores')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('tutores')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, cliente: Partial<Cliente>) {
    const { data, error } = await supabase
      .from('tutores')
      .update({ ...cliente, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('tutores')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  }
};
