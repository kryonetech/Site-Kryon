import React, { useEffect, useState } from "react";
import { Users, FileText, CheckCircle, Activity, UserCheck, Send } from "lucide-react";
import { getLeadStats } from "../../services/leadService";
import { getProjectStats } from "../../services/projectService";
import { getClientStats } from "../../services/clientService";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    leadsNovos: 0,
    clientesAtivos: 0,
    projetosAtivos: 0,
    propostasEnviadas: 0,
    projetosEntregues: 0
  });
  const [loading, setLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    Promise.all([
      getLeadStats(),
      getProjectStats(),
      getClientStats()
    ]).then(([leadStats, projStats, clientStats]) => {
      setStats({
        totalLeads: leadStats?.totalLeads || 0,
        leadsNovos: leadStats?.leadsNovos || 0,
        clientesAtivos: clientStats?.clientesAtivos || 0,
        projetosAtivos: projStats?.projetosAtivos || 0,
        propostasEnviadas: leadStats?.propostasEnviadas || 0,
        projetosEntregues: projStats?.projetosEntregues || 0
      });
      
      const hasError = (leadStats as any)?.error || (clientStats as any)?.error || (projStats as any)?.error;
      if (hasError && hasError.code === 'permission-denied') {
        setPermissionError(true);
      }
      
      setLoading(false);
    }).catch(err => {
      console.error(err);
      if (err.message && err.message.includes('Missing or insufficient permissions')) {
        setPermissionError(true);
      }
      setLoading(false);
    });
  }, []);

  const cards = [
    { title: "Total de Leads", value: stats.totalLeads, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Leads Novos", value: stats.leadsNovos, icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Propostas Enviadas", value: stats.propostasEnviadas, icon: Send, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Clientes Ativos", value: stats.clientesAtivos, icon: UserCheck, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Projetos em Andamento", value: stats.projetosAtivos, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Projetos Entregues", value: stats.projetosEntregues, icon: CheckCircle, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard Central</h1>
      
      {permissionError && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-xl flex items-start gap-4">
          <div className="mt-1"><Activity className="w-5 h-5" /></div>
          <div>
            <h3 className="font-semibold text-amber-400 mb-1">Acesso ao Banco de Dados Negado</h3>
            <p className="text-sm opacity-90 leading-relaxed mb-3">
              Não foi possível carregar os dados. Isso geralmente acontece porque as regras do Firestore não estão publicadas ou seu email não tem permissão.
            </p>
            <div className="text-xs bg-black/20 p-3 rounded font-mono text-amber-200 overflow-x-auto whitespace-pre">
              Regras necessárias:{"\n\n"}
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && 
             (request.auth.token.email == 'kryonetech@gmail.com' ||
             (exists(/databases/$(database)/documents/admins/$(request.auth.token.email)) &&
              get(/databases/$(database)/documents/admins/$(request.auth.token.email)).data.ativo == true));
    }

    match /{document=**} { allow read, write: if false; }
    match /leads/{leadId} { allow create: if true; allow read, update, delete: if isAdmin(); }
    match /clientes/{clienteId} { allow read, write: if isAdmin(); }
    match /projects/{projectId} { allow read, write: if isAdmin(); }
    match /admins/{adminId} { allow read: if isAdmin(); allow write: if false; }
    match /users/{userId} { allow read, write: if isAdmin(); }
  }
}`}
            </div>
          </div>
        </div>
      )}

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
