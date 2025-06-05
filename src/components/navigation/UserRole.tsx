
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'super_admin' | 'admin' | 'veterinarian' | 'receptionist' | 'dev';

export const useUserRole = () => {
  return useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Para desenvolvimento, sempre retorna perfil DEV
      if (process.env.NODE_ENV === 'development') {
        return {
          role: 'dev' as UserRole,
          clinic_id: 'dev-clinic-id'
        };
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role, clinic_id')
        .eq('id', user.id)
        .single();

      return profile;
    },
  });
};
