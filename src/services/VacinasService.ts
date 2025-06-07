
import { supabase } from '@/integrations/supabase/client';

export interface Vacinacao {
  id?: string;
  vacina: string;
  data_aplicacao?: string;
  data_vencimento?: string;
  lote?: string;
  status?: string;
  observacoes?: string;
  paciente_id?: string;
  veterinario_id?: string;
  produto_id?: string;
  preco?: number;
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
  // Relações
  pets?: {
    name: string;
    especie: string;
  } | null;
  veterinarios?: {
    nome: string;
  } | null;
  produtos?: {
    nome: string;
  } | null;
}

export const VacinasService = {
  async create(vacinacao: Omit<Vacinacao, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('vacinacoes')
      .insert([vacinacao])
      .select(`
        *,
        pets:paciente_id (name, especie),
        veterinarios:veterinario_id (nome),
        produtos:produto_id (nome)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('vacinacoes')
      .select(`
        *,
        pets:paciente_id (name, especie),
        veterinarios:veterinario_id (nome),
        produtos:produto_id (nome)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getByPaciente(pacienteId: string) {
    const { data, error } = await supabase
      .from('vacinacoes')
      .select(`
        *,
        veterinarios:veterinario_id (nome),
        produtos:produto_id (nome)
      `)
      .eq('paciente_id', pacienteId)
      .order('data_aplicacao', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async update(id: string, vacinacao: Partial<Vacinacao>) {
    const { data, error } = await supabase
      .from('vacinacoes')
      .update({ ...vacinacao, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
