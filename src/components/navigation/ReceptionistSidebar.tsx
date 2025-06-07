
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  Home,
  Calendar,
  Users,
  Heart,
  CreditCard,
  TrendingUp,
  Package,
  Dog,
  Cat,
  Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReceptionistSidebar = () => {
  const navigate = useNavigate();

  const principalItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Agenda",
      url: "/agenda",
      icon: Calendar,
    },
  ];

  const atendimentoItems = [
    {
      title: "Clientes",
      url: "/clientes",
      icon: Users,
    },
    {
      title: "Pacientes",
      url: "/pacientes",
      icon: Heart,
    },
    {
      title: "Financeiro",
      url: "/financeiro",
      icon: CreditCard,
    },
    {
      title: "Painel Financeiro",
      url: "/painel-financeiro",
      icon: TrendingUp,
    },
    {
      title: "Estoque",
      url: "/estoque",
      icon: Package,
    },
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center relative shadow-lg">
            <Dog className="w-4 h-4 text-white absolute -left-0.5" />
            <Cat className="w-4 h-4 text-white absolute -right-0.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              VetPrime
            </span>
            <span className="text-xs text-gray-500">Sistema Veterinário</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 px-3 py-2">
            <Home className="w-4 h-4" />
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {principalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="w-full hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <button
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center gap-3 p-3 text-left"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 px-3 py-2">
            <Heart className="w-4 h-4" />
            Atendimento
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {atendimentoItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="w-full hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    <button
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center gap-3 p-3 text-left"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-700">Maria Santos</p>
            <p className="text-xs text-gray-500">Recepção</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ReceptionistSidebar;
