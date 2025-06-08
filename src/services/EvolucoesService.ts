
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
      .insert([{
        pet_id: evolucao.paciente_id,
        data_evolucao: evolucao.data_evolucao,
        temperatura: evolucao.temperatura,
        peso_atual: evolucao.peso,
        frequencia_cardiaca: evolucao.frequencia_cardiaca,
        frequencia_respiratoria: evolucao.frequencia_respiratoria,
        observacoes: evolucao.observacoes,
        veterinario_id: evolucao.veterinario_id,
        internacao_id: evolucao.internamento_id,
        clinic_id: evolucao.clinic_id,
        evolucao: evolucao.observacoes || 'Evolução registrada'
      }])
      .select(`
        *,
        pets:pet_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome),
        internacoes:internacao_id (motivo, data_entrada)
      `)
      .single();

    if (error) throw error;
    return this.transformData(data);
  },

  async getAll() {
    const { data, error } = await supabase
      .from('evolucoes')
      .select(`
        *,
        pets:pet_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome),
        internacoes:internacao_id (motivo, data_entrada)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => this.transformData(item));
  },

  async getByPaciente(pacienteId: string) {
    const { data, error } = await supabase
      .from('evolucoes')
      .select(`
        *,
        veterinarios:veterinario_id (nome),
        internacoes:internacao_id (motivo, data_entrada)
      `)
      .eq('pet_id', pacienteId)
      .order('data_evolucao', { ascending: false });

    if (error) throw error;
    return (data || []).map(item => this.transformData(item));
  },

  async getByInternamento(internamentoId: string) {
    const { data, error } = await supabase
      .from('evolucoes')
      .select(`
        *,
        pets:pet_id (name, especie),
        veterinarios:veterinario_id (nome)
      `)
      .eq('internacao_id', internamentoId)
      .order('data_evolucao', { ascending: false });

    if (error) throw error;
    return (data || []).map(item => this.transformData(item));
  },

  async update(id: string, evolucao: Partial<Evolucao>) {
    const { data, error } = await supabase
      .from('evolucoes')
      .update({ 
        ...evolucao, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  transformData(item: any): Evolucao {
    return {
      id: item.id,
      paciente_id: item.pet_id,
      internamento_id: item.internacao_id,
      data_evolucao: item.data_evolucao || item.created_at,
      temperatura: item.temperatura,
      peso: item.peso_atual,
      frequencia_cardiaca: item.frequencia_cardiaca,
      frequencia_respiratoria: item.frequencia_respiratoria,
      observacoes: item.observacoes || item.evolucao,
      veterinario_id: item.veterinario_id,
      clinic_id: item.clinic_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      pets: item.pets && typeof item.pets === 'object' && !Array.isArray(item.pets) && 'name' in item.pets ? item.pets : null,
      veterinarios: item.veterinarios && typeof item.veterinarios === 'object' && !Array.isArray(item.veterinarios) && 'nome' in item.veterinarios ? item.veterinarios : null,
      internamentos: item.internacoes && typeof item.internacoes === 'object' && !Array.isArray(item.internacoes) && 'motivo' in item.internacoes ? {
        motivo: item.internacoes.motivo,
        data_entrada: item.internacoes.data_entrada
      } : null
    };
  }
};
