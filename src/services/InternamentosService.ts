
import { supabase } from '@/integrations/supabase/client';

export interface Internamento {
  id?: string;
  paciente_id: string;
  motivo: string;
  status?: string;
  data_entrada: string;
  data_saida?: string;
  diagnostico?: string;
  tratamento?: string;
  observacoes?: string;
  veterinario_id?: string;
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

export const InternamentosService = {
  async create(internamento: Omit<Internamento, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('internamentos')
      .insert([internamento])
      .select(`
        *,
        pets:paciente_id (
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
      .from('internamentos')
      .select(`
        *,
        pets:paciente_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('internamentos')
      .select(`
        *,
        pets:paciente_id (
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

  async update(id: string, internamento: Partial<Internamento>) {
    const { data, error } = await supabase
      .from('internamentos')
      .update({ ...internamento, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async finalizarInternamento(id: string) {
    const { data, error } = await supabase
      .from('internamentos')
      .update({ 
        status: 'Finalizado',
        data_saida: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
