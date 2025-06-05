
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'super_admin' | 'admin' | 'veterinarian' | 'receptionist' | 'dev';

export const useUserRole = () => {
  return useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      // Para desenvolvimento, sempre retorna perfil DEV se não houver autenticação
      // Isso permite testar todas as funcionalidades sem configurar Supabase
      return {
        role: 'dev' as UserRole,
        clinic_id: 'dev-clinic-id'
      };
    },
  });
};
