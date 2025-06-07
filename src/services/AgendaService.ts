
import { supabase } from '@/integrations/supabase/client';

export interface AgendaEvento {
  id?: string;
  titulo: string;
  data_inicio: string;
  data_fim: string;
  tipo: string;
  pet_id?: string;
  tutor_id?: string;
  veterinario_id?: string;
  status?: string;
  observacoes?: string;
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
  // Relações
  pets?: {
    name: string;
    especie: string;
  };
  tutores?: {
    nome: string;
  };
  veterinarios?: {
    nome: string;
  };
}

export const AgendaService = {
  async create(evento: Omit<AgendaEvento, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('agenda_eventos')
      .insert([evento])
      .select(`
        *,
        pets:pet_id (name, especie),
        tutores:tutor_id (nome),
        veterinarios:veterinario_id (nome)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('agenda_eventos')
      .select(`
        *,
        pets:pet_id (name, especie),
        tutores:tutor_id (nome),
        veterinarios:veterinario_id (nome)
      `)
      .order('data_inicio', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async update(id: string, evento: Partial<AgendaEvento>) {
    const { data, error } = await supabase
      .from('agenda_eventos')
      .update({ ...evento, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('agenda_eventos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
