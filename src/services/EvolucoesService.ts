
import { supabase } from '@/integrations/supabase/client';

export interface Evolucao {
  id?: string;
  paciente_id: string;
  internamento_id?: string;
  data_evolucao: string;
  temperatura?: number;
  peso?: number;
  frequencia_cardiaca?: number;
  frequencia_respiratoria?: number;
  pressao_arterial?: string;
  comportamento?: string;
  apetite?: string;
  hidratacao?: string;
  mucosas?: string;
  observacoes?: string;
  medicamentos?: string;
  procedimentos?: string;
  veterinario_id?: string;
  status?: 'estavel' | 'observacao' | 'critico' | 'alta';
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
  internamentos?: {
    motivo: string;
    data_entrada: string;
  } | null;
}

export const EvolucoesService = {
  async create(evolucao: Omit<Evolucao, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('evolucoes')
      .insert([evolucao])
      .select(`
        *,
        pets:paciente_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome),
        internamentos:internamento_id (motivo, data_entrada)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('evolucoes')
      .select(`
        *,
        pets:paciente_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome),
        internamentos:internamento_id (motivo, data_entrada)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => ({
      ...item,
      pets: item.pets && typeof item.pets === 'object' && !Array.isArray(item.pets) && 'name' in item.pets ? item.pets : null,
      veterinarios: item.veterinarios && typeof item.veterinarios === 'object' && !Array.isArray(item.veterinarios) && 'nome' in item.veterinarios ? item.veterinarios : null,
      internamentos: item.internamentos && typeof item.internamentos === 'object' && !Array.isArray(item.internamentos) && 'motivo' in item.internamentos ? item.internamentos : null
    }));
  },

  async getByPaciente(pacienteId: string) {
    const { data, error } = await supabase
      .from('evolucoes')
      .select(`
        *,
        veterinarios:veterinario_id (nome),
        internamentos:internamento_id (motivo, data_entrada)
      `)
      .eq('paciente_id', pacienteId)
      .order('data_evolucao', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getByInternamento(internamentoId: string) {
    const { data, error } = await supabase
      .from('evolucoes')
      .select(`
        *,
        pets:paciente_id (name, especie),
        veterinarios:veterinario_id (nome)
      `)
      .eq('internamento_id', internamentoId)
      .order('data_evolucao', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async update(id: string, evolucao: Partial<Evolucao>) {
    const { data, error } = await supabase
      .from('evolucoes')
      .update({ ...evolucao, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
