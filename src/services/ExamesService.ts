
import { supabase } from '@/integrations/supabase/client';

export interface Exame {
  id?: string;
  tipo_exame: string;
  pet_id?: string;
  veterinario_id?: string;
  atendimento_id?: string;
  data_solicitacao?: string;
  data_resultado?: string;
  resultado?: string;
  interpretacao?: string;
  status?: string;
  observacoes?: string;
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
  // Relações
  pets?: {
    name: string;
    especie: string;
    tutores?: {
      nome: string;
      telefone?: string;
    };
  } | null;
  veterinarios?: {
    nome: string;
  } | null;
}

export const ExamesService = {
  async create(exame: Omit<Exame, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('exames')
      .insert([exame])
      .select(`
        *,
        pets:pet_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('exames')
      .select(`
        *,
        pets:pet_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => ({
      ...item,
      pets: item.pets && typeof item.pets === 'object' && !Array.isArray(item.pets) && 'name' in item.pets ? item.pets : null,
      veterinarios: item.veterinarios && typeof item.veterinarios === 'object' && !Array.isArray(item.veterinarios) && 'nome' in item.veterinarios ? item.veterinarios : null
    }));
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('exames')
      .select(`
        *,
        pets:pet_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, exame: Partial<Exame>) {
    const { data, error } = await supabase
      .from('exames')
      .update({ ...exame, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async adicionarResultado(id: string, resultado: string, interpretacao?: string) {
    const { data, error } = await supabase
      .from('exames')
      .update({ 
        resultado,
        interpretacao,
        data_resultado: new Date().toISOString(),
        status: 'concluido',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
