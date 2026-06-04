import React, { useEffect, useState } from "react";
import { Users, FileText, CheckCircle, Activity } from "lucide-react";
import { getLeadStats } from "../../services/leadService";
import { getProjectStats } from "../../services/projectService";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    leadsNovos: 0,
    propostasEnviadas: 0,
    projetosAtivos: 0,
    projetosEntregues: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getLeadStats(),
      getProjectStats()
    ]).then(([leadStats, projStats]) => {
      setStats({
        totalLeads: leadStats.totalLeads,
        leadsNovos: leadStats.leadsNovos,
        propostasEnviadas: 0, // Calculate this appropriately when status logic expands
        projetosAtivos: projStats.projetosAtivos,
        projetosEntregues: projStats.projetosEntregues
      });
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const cards = [
    { title: "Total de Leads", value: stats.totalLeads, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Leads Novos", value: stats.leadsNovos, icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Projetos Ativos", value: stats.projetosAtivos, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Projetos Entregues", value: stats.projetosEntregues, icon: CheckCircle, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard Central</h1>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center text-slate-500">Caregando métricas...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
                  <card.icon className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>
              <p className="text-sm font-medium text-slate-400 mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold text-white tracking-tight">{card.value}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
