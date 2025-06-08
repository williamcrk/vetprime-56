
import { supabase } from '@/integrations/supabase/client';

export interface ItemPrescricao {
  id?: string;
  medicamento: string;
  dosagem: string;
  frequencia: string;
  duracao: string;
  instrucoes?: string;
}

export interface Prescricao {
  id?: string;
  paciente_id: string;
  veterinario_id?: string;
  data_prescricao: string;
  observacoes?: string;
  status?: 'ativa' | 'finalizada' | 'cancelada';
  clinic_id?: string;
  created_at?: string;
  updated_at?: string;
  itens?: ItemPrescricao[];
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

export const PrescricoesService = {
  async create(prescricao: Omit<Prescricao, 'id' | 'created_at' | 'updated_at'>) {
    const { data: prescricaoData, error: prescricaoError } = await supabase
      .from('receitas')
      .insert([{
        pet_id: prescricao.paciente_id,
        veterinario_id: prescricao.veterinario_id,
        data_prescricao: prescricao.data_prescricao,
        observacoes: prescricao.observacoes,
        status: prescricao.status || 'ativa',
        clinic_id: prescricao.clinic_id
      }])
      .select()
      .single();

    if (prescricaoError) throw prescricaoError;

    // Adicionar itens da receita se existirem
    if (prescricao.itens && prescricao.itens.length > 0) {
      const itensToInsert = prescricao.itens.map(item => ({
        receita_id: prescricaoData.id,
        medicamento: item.medicamento,
        dosagem: item.dosagem,
        frequencia: item.frequencia,
        duracao: item.duracao,
        instrucoes: item.instrucoes
      }));

      const { error: itensError } = await supabase
        .from('itens_receita')
        .insert(itensToInsert);

      if (itensError) throw itensError;
    }

    return this.getById(prescricaoData.id);
  },

  async getAll() {
    const { data, error } = await supabase
      .from('receitas')
      .select(`
        *,
        pets:pet_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome),
        itens_receita (
          id,
          medicamento,
          dosagem,
          frequencia,
          duracao,
          instrucoes
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => this.transformData(item));
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('receitas')
      .select(`
        *,
        pets:pet_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        veterinarios:veterinario_id (nome),
        itens_receita (
          id,
          medicamento,
          dosagem,
          frequencia,
          duracao,
          instrucoes
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return this.transformData(data);
  },

  async update(id: string, prescricao: Partial<Prescricao>) {
    const { data, error } = await supabase
      .from('receitas')
      .update({ 
        ...prescricao, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  transformData(item: any): Prescricao {
    return {
      id: item.id,
      paciente_id: item.pet_id,
      veterinario_id: item.veterinario_id,
      data_prescricao: item.data_prescricao || item.created_at,
      observacoes: item.observacoes,
      status: item.status,
      clinic_id: item.clinic_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      itens: item.itens_receita || [],
      pets: item.pets && typeof item.pets === 'object' && !Array.isArray(item.pets) && 'name' in item.pets ? item.pets : null,
      veterinarios: item.veterinarios && typeof item.veterinarios === 'object' && !Array.isArray(item.veterinarios) && 'nome' in item.veterinarios ? item.veterinarios : null
    };
  }
};
