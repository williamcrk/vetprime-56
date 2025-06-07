
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { Menu } from 'lucide-react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-3 md:p-6 bg-gray-50">
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <SidebarTrigger className="md:hidden p-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle menu</span>
            </SidebarTrigger>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PageLayout;
