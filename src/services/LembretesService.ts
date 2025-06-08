
import { supabase } from '@/integrations/supabase/client';

export interface Lembrete {
  id?: string;
  pet_id?: string;
  tutor_id?: string;
  tipo: 'vacina' | 'retorno' | 'consulta' | 'medicamento' | 'outro';
  titulo: string;
  mensagem: string;
  data_envio: string;
  canal?: 'whatsapp' | 'email' | 'sms';
  status?: 'agendado' | 'enviado' | 'cancelado';
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
  tutores?: {
    nome: string;
    telefone?: string;
    email?: string;
  } | null;
}

export const LembretesService = {
  async create(lembrete: Omit<Lembrete, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('lembretes')
      .insert([{
        pet_id: lembrete.pet_id,
        tutor_id: lembrete.tutor_id,
        tipo: lembrete.tipo,
        titulo: lembrete.titulo,
        mensagem: lembrete.mensagem,
        data_envio: lembrete.data_envio,
        canal: lembrete.canal || 'whatsapp',
        status: lembrete.status || 'agendado',
        clinic_id: lembrete.clinic_id
      }])
      .select(`
        *,
        pets:pet_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        tutores:tutor_id (nome, telefone, email)
      `)
      .single();

    if (error) throw error;
    return this.transformData(data);
  },

  async getAll() {
    const { data, error } = await supabase
      .from('lembretes')
      .select(`
        *,
        pets:pet_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        tutores:tutor_id (nome, telefone, email)
      `)
      .order('data_envio', { ascending: true });

    if (error) throw error;
    
    return (data || []).map(item => this.transformData(item));
  },

  async update(id: string, lembrete: Partial<Lembrete>) {
    const { data, error } = await supabase
      .from('lembretes')
      .update({ 
        ...lembrete, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async marcarComoEnviado(id: string) {
    return this.update(id, { status: 'enviado' });
  },

  async getPendentes() {
    const { data, error } = await supabase
      .from('lembretes')
      .select(`
        *,
        pets:pet_id (
          name, 
          especie,
          tutores:tutor_id (nome, telefone)
        ),
        tutores:tutor_id (nome, telefone, email)
      `)
      .eq('status', 'agendado')
      .lte('data_envio', new Date().toISOString())
      .order('data_envio', { ascending: true });

    if (error) throw error;
    
    return (data || []).map(item => this.transformData(item));
  },

  transformData(item: any): Lembrete {
    return {
      id: item.id,
      pet_id: item.pet_id,
      tutor_id: item.tutor_id,
      tipo: item.tipo,
      titulo: item.titulo,
      mensagem: item.mensagem,
      data_envio: item.data_envio,
      canal: item.canal,
      status: item.status,
      clinic_id: item.clinic_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      pets: item.pets && typeof item.pets === 'object' && !Array.isArray(item.pets) && 'name' in item.pets ? item.pets : null,
      tutores: item.tutores && typeof item.tutores === 'object' && !Array.isArray(item.tutores) && 'nome' in item.tutores ? item.tutores : null
    };
  }
};
