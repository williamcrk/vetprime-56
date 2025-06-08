
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
      .insert([cirurgia])
      .select(`
        *,
        pets:paciente_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome),
        anestesistas:anestesista_id (nome)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('cirurgias')
      .select(`
        *,
        pets:paciente_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome),
        anestesistas:anestesista_id (nome)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => ({
      ...item,
      pets: item.pets && typeof item.pets === 'object' && !Array.isArray(item.pets) && 'name' in item.pets ? item.pets : null,
      veterinarios: item.veterinarios && typeof item.veterinarios === 'object' && !Array.isArray(item.veterinarios) && 'nome' in item.veterinarios ? item.veterinarios : null,
      anestesistas: item.anestesistas && typeof item.anestesistas === 'object' && !Array.isArray(item.anestesistas) && 'nome' in item.anestesistas ? item.anestesistas : null
    }));
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('cirurgias')
      .select(`
        *,
        pets:paciente_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome),
        anestesistas:anestesista_id (nome)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, cirurgia: Partial<Cirurgia>) {
    const { data, error } = await supabase
      .from('cirurgias')
      .update({ ...cirurgia, updated_at: new Date().toISOString() })
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
        hora_inicio: new Date().toISOString(),
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
        hora_fim: new Date().toISOString(),
        observacoes_pos,
        complicacoes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
