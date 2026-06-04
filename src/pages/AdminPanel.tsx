import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router";
import { LayoutDashboard, Users, FolderKanban, Activity, Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Admin Sub-pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminLeads from "./admin/AdminLeads";
import AdminProjects from "./admin/AdminProjects";
import AdminUsers from "./admin/AdminUsers";

// Simple UI wrapper for Admin Area
export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menu = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Leads", href: "/admin/leads", icon: Users },
    { label: "Projetos", href: "/admin/projects", icon: FolderKanban },
    { label: "Equipe", href: "/admin/users", icon: Activity },
  ];

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
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/" className="flex items-center justify-center gap-2 w-full py-3 text-sm text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 flex items-center px-4 md:px-8 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-slate-400">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-brand-primary font-bold text-sm">
              AD
            </div>
            <span className="text-sm font-medium hidden sm:block text-slate-300">Admin</span>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="users" element={<AdminUsers />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
