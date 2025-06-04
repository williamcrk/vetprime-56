
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Calendar, 
  Users, 
  PlusCircle, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Settings,
  Dog,
  Cat,
  Heart,
  Pill,
  Scissors,
  Shield,
  Package,
  Truck,
  Building2,
  Brain,
  MessageCircle,
  Calculator,
  QrCode,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Multi-Clínicas",
      url: "/multi-clinicas", 
      icon: Building2,
    },
    {
      title: "Agenda Inteligente",
      url: "/agenda-inteligente",
      icon: Brain,
    },
    {
      title: "Pacientes",
      url: "/pacientes",
      icon: Heart,
    },
    {
      title: "Clientes",
      url: "/clientes",
      icon: Users,
    },
  ];

  const clinicalItems = [
    {
      title: "Nova Consulta",
      url: "/consulta",
      icon: PlusCircle,
    },
    {
      title: "Internamentos",
      url: "/internamentos",
      icon: Pill,
    },
    {
      title: "Prontuários",
      url: "/prontuarios",
      icon: FileText,
    },
    {
      title: "Prescrição Digital",
      url: "/prescricao-digital",
      icon: MessageCircle,
    },
    {
      title: "Cirurgias",
      url: "/cirurgias",
      icon: Scissors,
    },
    {
      title: "Vacinas",
      url: "/vacinas",
      icon: Shield,
    },
  ];

  const managementItems = [
    {
      title: "Painel Financeiro",
      url: "/painel-financeiro",
      icon: TrendingUp,
    },
    {
      title: "Relatórios",
      url: "/relatorios",
      icon: BarChart3,
    },
    {
      title: "Estoque Avançado",
      url: "/estoque-avancado",
      icon: QrCode,
    },
    {
      title: "Fornecedores",
      url: "/fornecedores",
      icon: Truck,
    },
    {
      title: "Configurações",
      url: "/configuracoes",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center relative">
            <Dog className="w-3 h-3 text-white absolute -left-0.5" />
            <Cat className="w-3 h-3 text-white absolute -right-0.5" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            VetPrime
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Clínico</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {clinicalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Gestão</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-2 text-sm text-gray-500">
          <p>Dr. João Silva</p>
          <p className="text-xs">Veterinário CRMV-SP 12345</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
