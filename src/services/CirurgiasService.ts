
import { supabase } from '@/integrations/supabase/client';

export interface Cirurgia {
  id?: string;
  paciente_id: string;
  procedimento: string;
  data_cirurgia: string;
  hora_inicio?: string;
  hora_fim?: string;
  status?: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  veterinario_id?: string;
  anestesista_id?: string;
  sala?: string;
  observacoes_pre?: string;
  observacoes_pos?: string;
  complicacoes?: string;
  medicamentos?: string;
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
  anestesistas?: {
    nome: string;
  } | null;
}

export const CirurgiasService = {
  async create(cirurgia: Omit<Cirurgia, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('cirurgias')
      .insert([{
        pet_id: cirurgia.paciente_id,
        tipo_cirurgia: cirurgia.procedimento,
        data_agendada: cirurgia.data_cirurgia,
        status: cirurgia.status || 'agendada',
        veterinario_id: cirurgia.veterinario_id,
        observacoes: cirurgia.observacoes_pre,
        complicacoes: cirurgia.complicacoes,
        clinic_id: cirurgia.clinic_id
      }])
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
    return this.transformData(data);
  },

  async getAll() {
    const { data, error } = await supabase
      .from('cirurgias')
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
    
    return (data || []).map(item => this.transformData(item));
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('cirurgias')
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
    return this.transformData(data);
  },

  async update(id: string, cirurgia: Partial<Cirurgia>) {
    const { data, error } = await supabase
      .from('cirurgias')
      .update({ 
        ...cirurgia, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async iniciarCirurgia(id: string) {
    const { data, error } = await supabase
      .from('cirurgias')
      .update({ 
        status: 'em_andamento',
        data_realizada: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async concluirCirurgia(id: string, observacoes_pos?: string, complicacoes?: string) {
    const { data, error } = await supabase
      .from('cirurgias')
      .update({ 
        status: 'concluida',
        observacoes: observacoes_pos,
        complicacoes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  transformData(item: any): Cirurgia {
    return {
      id: item.id,
      paciente_id: item.pet_id,
      procedimento: item.tipo_cirurgia || '',
      data_cirurgia: item.data_agendada || item.created_at,
      status: item.status,
      veterinario_id: item.veterinario_id,
      sala: item.sala,
      observacoes_pre: item.observacoes,
      complicacoes: item.complicacoes,
      clinic_id: item.clinic_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      pets: item.pets && typeof item.pets === 'object' && !Array.isArray(item.pets) && 'name' in item.pets ? item.pets : null,
      veterinarios: item.veterinarios && typeof item.veterinarios === 'object' && !Array.isArray(item.veterinarios) && 'nome' in item.veterinarios ? item.veterinarios : null
    };
  }
};
