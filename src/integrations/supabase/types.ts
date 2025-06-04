export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agendamentos: {
        Row: {
          created_at: string | null
          data_hora: string
          id: string
          observacoes: string | null
          pet_id: string | null
          servico_id: string | null
          status: string | null
          updated_at: string | null
          veterinario_id: string | null
        }
        Insert: {
          created_at?: string | null
          data_hora: string
          id?: string
          observacoes?: string | null
          pet_id?: string | null
          servico_id?: string | null
          status?: string | null
          updated_at?: string | null
          veterinario_id?: string | null
        }
        Update: {
          created_at?: string | null
          data_hora?: string
          id?: string
          observacoes?: string | null
          pet_id?: string | null
          servico_id?: string | null
          status?: string | null
          updated_at?: string | null
          veterinario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agendamentos_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_veterinario_id_fkey"
            columns: ["veterinario_id"]
            isOneToOne: false
            referencedRelation: "veterinarios"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          created_at: string
          id: string
          is_return: boolean
          notes: string | null
          pet_id: string
          reminder_sent: boolean
          return_date: string | null
          service_type: string
          status: string
          tutor_id: string
          veterinarian_id: string | null
        }
        Insert: {
          appointment_date: string
          created_at?: string
          id?: string
          is_return?: boolean
          notes?: string | null
          pet_id: string
          reminder_sent?: boolean
          return_date?: string | null
          service_type: string
          status?: string
          tutor_id: string
          veterinarian_id?: string | null
        }
        Update: {
          appointment_date?: string
          created_at?: string
          id?: string
          is_return?: boolean
          notes?: string | null
          pet_id?: string
          reminder_sent?: boolean
          return_date?: string | null
          service_type?: string
          status?: string
          tutor_id?: string
          veterinarian_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_appointments_pet_id"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_appointments_tutor_id"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutores"
            referencedColumns: ["id"]
          },
        ]
      }
      atendimentos: {
        Row: {
          agendamento_id: string | null
          anamnese: string | null
          created_at: string | null
          data_hora: string
          diagnostico: string | null
          id: string
          observacoes: string | null
          pet_id: string | null
          status: string | null
          tratamento: string | null
          updated_at: string | null
          veterinario_id: string | null
        }
        Insert: {
          agendamento_id?: string | null
          anamnese?: string | null
          created_at?: string | null
          data_hora: string
          diagnostico?: string | null
          id?: string
          observacoes?: string | null
          pet_id?: string | null
          status?: string | null
          tratamento?: string | null
          updated_at?: string | null
          veterinario_id?: string | null
        }
        Update: {
          agendamento_id?: string | null
          anamnese?: string | null
          created_at?: string | null
          data_hora?: string
          diagnostico?: string | null
          id?: string
          observacoes?: string | null
          pet_id?: string | null
          status?: string | null
          tratamento?: string | null
          updated_at?: string | null
          veterinario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "atendimentos_agendamento_id_fkey"
            columns: ["agendamento_id"]
            isOneToOne: false
            referencedRelation: "agendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_veterinario_id_fkey"
            columns: ["veterinario_id"]
            isOneToOne: false
            referencedRelation: "veterinarios"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_items: {
        Row: {
          created_at: string | null
          created_by: string
          description: string
          id: string
          patient_id: string
          quantity: number
          service_type: string
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description: string
          id?: string
          patient_id: string
          quantity: number
          service_type: string
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string
          id?: string
          patient_id?: string
          quantity?: number
          service_type?: string
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "billing_items_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      comissoes: {
        Row: {
          created_at: string | null
          data_pagamento: string | null
          financeiro_id: string | null
          id: string
          percentual: number
          status: string | null
          updated_at: string | null
          valor_base: number
          valor_comissao: number
          veterinario_id: string | null
        }
        Insert: {
          created_at?: string | null
          data_pagamento?: string | null
          financeiro_id?: string | null
          id?: string
          percentual: number
          status?: string | null
          updated_at?: string | null
          valor_base: number
          valor_comissao: number
          veterinario_id?: string | null
        }
        Update: {
          created_at?: string | null
          data_pagamento?: string | null
          financeiro_id?: string | null
          id?: string
          percentual?: number
          status?: string | null
          updated_at?: string | null
          valor_base?: number
          valor_comissao?: number
          veterinario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comissoes_financeiro_id_fkey"
            columns: ["financeiro_id"]
            isOneToOne: false
            referencedRelation: "financeiro"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comissoes_veterinario_id_fkey"
            columns: ["veterinario_id"]
            isOneToOne: false
            referencedRelation: "veterinarios"
            referencedColumns: ["id"]
          },
        ]
      }
      financeiro: {
        Row: {
          atendimento_id: string | null
          created_at: string | null
          data_pagamento: string | null
          forma_pagamento: string | null
          id: string
          nfse_codigo_verificacao: string | null
          nfse_numero: string | null
          pagseguro_transaction_id: string | null
          parcelas: number | null
          status: string | null
          tutor_id: string | null
          updated_at: string | null
          valor_total: number
        }
        Insert: {
          atendimento_id?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          forma_pagamento?: string | null
          id?: string
          nfse_codigo_verificacao?: string | null
          nfse_numero?: string | null
          pagseguro_transaction_id?: string | null
          parcelas?: number | null
          status?: string | null
          tutor_id?: string | null
          updated_at?: string | null
          valor_total: number
        }
        Update: {
          atendimento_id?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          forma_pagamento?: string | null
          id?: string
          nfse_codigo_verificacao?: string | null
          nfse_numero?: string | null
          pagseguro_transaction_id?: string | null
          parcelas?: number | null
          status?: string | null
          tutor_id?: string | null
          updated_at?: string | null
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "financeiro_atendimento_id_fkey"
            columns: ["atendimento_id"]
            isOneToOne: false
            referencedRelation: "atendimentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financeiro_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutores"
            referencedColumns: ["id"]
          },
        ]
      }
      internacoes: {
        Row: {
          atendimento_id: string | null
          created_at: string | null
          data_entrada: string
          data_saida: string | null
          id: string
          motivo: string
          observacoes: string | null
          pet_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          atendimento_id?: string | null
          created_at?: string | null
          data_entrada: string
          data_saida?: string | null
          id?: string
          motivo: string
          observacoes?: string | null
          pet_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          atendimento_id?: string | null
          created_at?: string | null
          data_entrada?: string
          data_saida?: string | null
          id?: string
          motivo?: string
          observacoes?: string | null
          pet_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "internacoes_atendimento_id_fkey"
            columns: ["atendimento_id"]
            isOneToOne: false
            referencedRelation: "atendimentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "internacoes_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      internments: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          notes: string | null
          patient_id: string
          start_date: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          start_date?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          start_date?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "internments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      itens_financeiro: {
        Row: {
          created_at: string | null
          financeiro_id: string | null
          id: string
          produto_id: string | null
          quantidade: number
          servico_id: string | null
          tipo: string
          valor_total: number
          valor_unitario: number
        }
        Insert: {
          created_at?: string | null
          financeiro_id?: string | null
          id?: string
          produto_id?: string | null
          quantidade?: number
          servico_id?: string | null
          tipo: string
          valor_total: number
          valor_unitario: number
        }
        Update: {
          created_at?: string | null
          financeiro_id?: string | null
          id?: string
          produto_id?: string | null
          quantidade?: number
          servico_id?: string | null
          tipo?: string
          valor_total?: number
          valor_unitario?: number
        }
        Relationships: [
          {
            foreignKeyName: "itens_financeiro_financeiro_id_fkey"
            columns: ["financeiro_id"]
            isOneToOne: false
            referencedRelation: "financeiro"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_financeiro_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_financeiro_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      itens_prescricao: {
        Row: {
          created_at: string | null
          id: string
          observacoes: string | null
          posologia: string
          prescricao_id: string | null
          produto_id: string | null
          quantidade: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          observacoes?: string | null
          posologia: string
          prescricao_id?: string | null
          produto_id?: string | null
          quantidade: number
        }
        Update: {
          created_at?: string | null
          id?: string
          observacoes?: string | null
          posologia?: string
          prescricao_id?: string | null
          produto_id?: string | null
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "itens_prescricao_prescricao_id_fkey"
            columns: ["prescricao_id"]
            isOneToOne: false
            referencedRelation: "prescricoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_prescricao_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_applications: {
        Row: {
          applied_at: string
          applied_by: string
          created_at: string | null
          dosage: number
          id: string
          internment_id: string
          medication_id: string
          notes: string | null
        }
        Insert: {
          applied_at?: string
          applied_by: string
          created_at?: string | null
          dosage: number
          id?: string
          internment_id: string
          medication_id: string
          notes?: string | null
        }
        Update: {
          applied_at?: string
          applied_by?: string
          created_at?: string | null
          dosage?: number
          id?: string
          internment_id?: string
          medication_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medication_applications_internment_id_fkey"
            columns: ["internment_id"]
            isOneToOne: false
            referencedRelation: "internments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_applications_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          cost_per_unit: number
          created_at: string | null
          expiry_date: string | null
          id: string
          min_stock_level: number
          name: string
          price_per_unit: number
          stock_quantity: number
          unit: string
          updated_at: string | null
        }
        Insert: {
          cost_per_unit: number
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          min_stock_level?: number
          name: string
          price_per_unit: number
          stock_quantity?: number
          unit: string
          updated_at?: string | null
        }
        Update: {
          cost_per_unit?: number
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          min_stock_level?: number
          name?: string
          price_per_unit?: number
          stock_quantity?: number
          unit?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      monitoramento_internacao: {
        Row: {
          created_at: string | null
          data_hora: string
          frequencia_cardiaca: number | null
          frequencia_respiratoria: number | null
          id: string
          internacao_id: string | null
          observacoes: string | null
          pressao_arterial: string | null
          temperatura: number | null
          veterinario_id: string | null
        }
        Insert: {
          created_at?: string | null
          data_hora: string
          frequencia_cardiaca?: number | null
          frequencia_respiratoria?: number | null
          id?: string
          internacao_id?: string | null
          observacoes?: string | null
          pressao_arterial?: string | null
          temperatura?: number | null
          veterinario_id?: string | null
        }
        Update: {
          created_at?: string | null
          data_hora?: string
          frequencia_cardiaca?: number | null
          frequencia_respiratoria?: number | null
          id?: string
          internacao_id?: string | null
          observacoes?: string | null
          pressao_arterial?: string | null
          temperatura?: number | null
          veterinario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monitoramento_internacao_internacao_id_fkey"
            columns: ["internacao_id"]
            isOneToOne: false
            referencedRelation: "internacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoramento_internacao_veterinario_id_fkey"
            columns: ["veterinario_id"]
            isOneToOne: false
            referencedRelation: "veterinarios"
            referencedColumns: ["id"]
          },
        ]
      }
      movimentacao_estoque: {
        Row: {
          atendimento_id: string | null
          created_at: string | null
          data_movimentacao: string | null
          id: string
          motivo: string | null
          prescricao_id: string | null
          produto_id: string | null
          quantidade: number
          tipo: string
          usuario_id: string | null
        }
        Insert: {
          atendimento_id?: string | null
          created_at?: string | null
          data_movimentacao?: string | null
          id?: string
          motivo?: string | null
          prescricao_id?: string | null
          produto_id?: string | null
          quantidade: number
          tipo: string
          usuario_id?: string | null
        }
        Update: {
          atendimento_id?: string | null
          created_at?: string | null
          data_movimentacao?: string | null
          id?: string
          motivo?: string | null
          prescricao_id?: string | null
          produto_id?: string | null
          quantidade?: number
          tipo?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movimentacao_estoque_atendimento_id_fkey"
            columns: ["atendimento_id"]
            isOneToOne: false
            referencedRelation: "atendimentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacao_estoque_prescricao_id_fkey"
            columns: ["prescricao_id"]
            isOneToOne: false
            referencedRelation: "prescricoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacao_estoque_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      pets: {
        Row: {
          cor: string | null
          created_at: string | null
          data_nascimento: string | null
          especie: string
          foto_url: string | null
          id: string
          microchip: string | null
          name: string
          observacoes: string | null
          peso: number | null
          raca: string | null
          sexo: string | null
          tutor_id: string | null
          updated_at: string | null
        }
        Insert: {
          cor?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          especie: string
          foto_url?: string | null
          id?: string
          microchip?: string | null
          name: string
          observacoes?: string | null
          peso?: number | null
          raca?: string | null
          sexo?: string | null
          tutor_id?: string | null
          updated_at?: string | null
        }
        Update: {
          cor?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          especie?: string
          foto_url?: string | null
          id?: string
          microchip?: string | null
          name?: string
          observacoes?: string | null
          peso?: number | null
          raca?: string | null
          sexo?: string | null
          tutor_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_pets_tutor_id"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutores"
            referencedColumns: ["id"]
          },
        ]
      }
      prescricoes: {
        Row: {
          atendimento_id: string | null
          created_at: string | null
          data_prescricao: string | null
          id: string
          observacoes: string | null
          updated_at: string | null
        }
        Insert: {
          atendimento_id?: string | null
          created_at?: string | null
          data_prescricao?: string | null
          id?: string
          observacoes?: string | null
          updated_at?: string | null
        }
        Update: {
          atendimento_id?: string | null
          created_at?: string | null
          data_prescricao?: string | null
          id?: string
          observacoes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescricoes_atendimento_id_fkey"
            columns: ["atendimento_id"]
            isOneToOne: false
            referencedRelation: "atendimentos"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos: {
        Row: {
          categoria: string | null
          codigo: string | null
          created_at: string | null
          descricao: string | null
          estoque_atual: number | null
          estoque_minimo: number | null
          fabricante: string | null
          id: string
          nome: string
          preco_custo: number
          preco_venda: number
          unidade: string | null
          updated_at: string | null
        }
        Insert: {
          categoria?: string | null
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          estoque_atual?: number | null
          estoque_minimo?: number | null
          fabricante?: string | null
          id?: string
          nome: string
          preco_custo: number
          preco_venda: number
          unidade?: string | null
          updated_at?: string | null
        }
        Update: {
          categoria?: string | null
          codigo?: string | null
          created_at?: string | null
          descricao?: string | null
          estoque_atual?: number | null
          estoque_minimo?: number | null
          fabricante?: string | null
          id?: string
          nome?: string
          preco_custo?: number
          preco_venda?: number
          unidade?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      servicos: {
        Row: {
          comissao_percentual: number | null
          created_at: string | null
          descricao: string | null
          duracao_minutos: number | null
          id: string
          nome: string
          preco: number
          updated_at: string | null
        }
        Insert: {
          comissao_percentual?: number | null
          created_at?: string | null
          descricao?: string | null
          duracao_minutos?: number | null
          id?: string
          nome: string
          preco: number
          updated_at?: string | null
        }
        Update: {
          comissao_percentual?: number | null
          created_at?: string | null
          descricao?: string | null
          duracao_minutos?: number | null
          id?: string
          nome?: string
          preco?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      tutores: {
        Row: {
          cep: string | null
          cidade: string | null
          cpf: string | null
          created_at: string | null
          data_nascimento: string | null
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          is_active: boolean
          nome: string
          observacoes: string | null
          telefone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cep?: string | null
          cidade?: string | null
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          is_active?: boolean
          nome: string
          observacoes?: string | null
          telefone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cep?: string | null
          cidade?: string | null
          cpf?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          is_active?: boolean
          nome?: string
          observacoes?: string | null
          telefone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          image: string | null
          name: string | null
          token_identifier: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          image?: string | null
          name?: string | null
          token_identifier: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          image?: string | null
          name?: string | null
          token_identifier?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      veterinarios: {
        Row: {
          comissao_percentual: number | null
          created_at: string | null
          crmv: string
          email: string | null
          especialidade: string | null
          foto_url: string | null
          id: string
          nome: string
          telefone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comissao_percentual?: number | null
          created_at?: string | null
          crmv: string
          email?: string | null
          especialidade?: string | null
          foto_url?: string | null
          id?: string
          nome: string
          telefone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comissao_percentual?: number | null
          created_at?: string | null
          crmv?: string
          email?: string | null
          especialidade?: string | null
          foto_url?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
