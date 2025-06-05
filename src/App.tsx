import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Agenda from "./pages/Agenda";
import AgendaInteligente from "./pages/AgendaInteligente";
import MultiClinicas from "./pages/MultiClinicas";
import Pacientes from "./pages/Pacientes";
import Clientes from "./pages/Clientes";
import NovaConsulta from "./pages/NovaConsulta";
import Internamentos from "./pages/Internamentos";
import Prontuarios from "./pages/Prontuarios";
import PrescricaoDigital from "./pages/PrescricaoDigital";
import Financeiro from "./pages/Financeiro";
import PainelFinanceiro from "./pages/PainelFinanceiro";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import Cirurgias from "./pages/Cirurgias";
import Vacinas from "./pages/Vacinas";
import Estoque from "./pages/Estoque";
import EstoqueAvancado from "./pages/EstoqueAvancado";
import Fornecedores from "./pages/Fornecedores";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda-inteligente" element={<AgendaInteligente />} />
          <Route path="/multi-clinicas" element={<MultiClinicas />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/consulta" element={<NovaConsulta />} />
          <Route path="/internamentos" element={<Internamentos />} />
          <Route path="/painel-internamento" element={<PainelInternamento />} />
          <Route path="/prontuarios" element={<Prontuarios />} />
          <Route path="/prescricao-digital" element={<PrescricaoDigital />} />
          <Route path="/cirurgias" element={<Cirurgias />} />
          <Route path="/vacinas" element={<Vacinas />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/painel-financeiro" element={<PainelFinanceiro />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/estoque-avancado" element={<EstoqueAvancado />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          
          {/* Super Admin Routes */}
          <Route path="/super-admin/dashboard" element={<Dashboard />} />
          <Route path="/super-admin/clinicas" element={<MultiClinicas />} />
          <Route path="/super-admin/usuarios" element={<Clientes />} />
          <Route path="/super-admin/cobranca" element={<PainelFinanceiro />} />
          <Route path="/super-admin/relatorios" element={<Relatorios />} />
          <Route path="/super-admin/configuracoes" element={<Configuracoes />} />
          
          {/* Professional Routes */}
          <Route path="/veterinarios" element={<Clientes />} />
          <Route path="/atendentes" element={<Clientes />} />
          <Route path="/escalas" element={<Agenda />} />
          <Route path="/comissoes" element={<PainelFinanceiro />} />
          <Route path="/servicos" element={<Configuracoes />} />
          <Route path="/exames" element={<Prontuarios />} />
          <Route path="/evolucoes" element={<Prontuarios />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
