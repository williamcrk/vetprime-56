
import { supabase } from '@/integrations/supabase/client';

export interface Paciente {
  id?: string;
  name: string;
  especie: string;
  raca?: string;
  sexo?: 'Macho' | 'Fêmea';
  cor?: string;
  peso?: number;
  data_nascimento?: string;
  microchip?: string;
  foto_url?: string;
  observacoes?: string;
  tutor_id: string;
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const PacienteService = {
  async create(paciente: Omit<Paciente, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('pets')
      .insert([paciente])
      .select(`
        *,
        tutores:tutor_id (
          nome,
          telefone,
          email
        )
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('pets')
      .select(`
        *,
        tutores:tutor_id (
          nome,
          telefone,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('pets')
      .select(`
        *,
        tutores:tutor_id (
          nome,
          telefone,
          email
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getByTutorId(tutorId: string) {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('tutor_id', tutorId);

    if (error) throw error;
    return data || [];
  },

  async update(id: string, paciente: Partial<Paciente>) {
    const { data, error } = await supabase
      .from('pets')
      .update({ ...paciente, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
