import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Users, UserCheck, FolderKanban, LogOut, Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

// Admin Sub-pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminLeads from "./admin/AdminLeads";
import AdminClientes from "./admin/AdminClientes";
import AdminProjects from "./admin/AdminProjects";
import AdminAITest from "./admin/AdminAITest";
import { Bot } from "lucide-react";

// Simple UI wrapper for Admin Area
export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error") === "unauthorized") {
      setLoginError("Acesso não autorizado.");
      // Clean up the URL
      navigate('/admin/login', { replace: true });
    }
  }, [location.search, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      setLoginError("");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Wait for ProtectedAdminRoute to handle redirect naturally
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/unauthorized-domain') {
        setLoginError("O domínio atual precisa ser autorizado no Firebase (Authentication > Settings > Authorized domains). Adicione: " + window.location.hostname);
      } else {
        setLoginError("Erro ao fazer login com o Google.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const menu = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Leads", href: "/admin/leads", icon: Users },
    { label: "Clientes", href: "/admin/clientes", icon: UserCheck },
    { label: "Projetos", href: "/admin/projects", icon: FolderKanban },
    { label: "Teste IA", href: "/admin/ai-test", icon: Bot }
  ];

  if (location.pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-2xl font-display font-bold text-white mb-2">Painel de Acesso</h1>
            <p className="text-slate-400 text-sm">Realize autenticação segura utilizando sua conta administrativa.</p>
          </div>

          <div className="space-y-6 relative z-10">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="flex items-center justify-center w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-medium rounded-lg transition-colors border border-slate-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              {isLoggingIn ? 'Entrando...' : 'Entrar com Google'}
            </button>
            {loginError && <p className="mt-2 text-sm text-red-400 text-center">{loginError}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-slate-900 border-r border-slate-800 w-64 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <span className="text-xl font-bold font-display text-white">KRYON <span className="text-brand-primary">CRM</span></span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menu.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href))
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button onClick={handleLogout} className="flex flex-row items-center justify-center gap-2 w-full py-3 text-sm text-red-400 hover:text-red-300 bg-slate-800/20 hover:bg-slate-800/50 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            Sair
          </button>
          
          <Link to="/" className="flex items-center justify-center gap-2 w-full py-3 text-sm text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-display font-medium text-slate-200">Painel Administrativo</span>
          </div>
          
          <div className="flex flex-row items-center gap-3">
            <span className="text-sm font-medium hidden sm:block text-slate-300">Usuário: Admin</span>
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <Routes>
            <Route path="login" element={<div className="hidden" />} />
            <Route path="/" element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="clientes" element={<AdminClientes />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="ai-test" element={<AdminAITest />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

