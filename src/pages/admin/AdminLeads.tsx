import React, { useEffect, useState } from "react";
import { getLeads, updateLeadStatus } from "../../services/leadService";
import { Lead } from "../../types";

const STATUS_OPTS = [
  "Novo", 
  "Em Análise", 
  "Contato Realizado", 
  "Proposta Enviada", 
  "Negociação", 
  "Fechado", 
  "Perdido"
] as const;

const STATUS_COLORS: Record<string, string> = {
  "Novo": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Em Análise": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Contato Realizado": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Proposta Enviada": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "Negociação": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Fechado": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  "Perdido": "bg-slate-500/10 text-slate-400 border-slate-500/20"
};

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(data);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Optimistic update
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus as any } : l));
      await updateLeadStatus(id, newStatus);
    } catch(err) {
      console.error(err);
      fetchLeads(); // Revert
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gestão de Leads</h1>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4">Nome / Empresa</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Projeto</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Carregando leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhum lead encontrado.
                  </td>
                </tr>
              ) : (
                leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors text-slate-300">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{lead.nome}</div>
                      <div className="text-xs text-slate-500">{lead.empresa || "-"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{lead.telefone}</div>
                      <div className="text-xs text-slate-500">{lead.email || "-"}</div>
                    </td>
                    <td className="px-6 py-4 max-w-[200px] truncate" title={lead.tipoProjeto}>
                      {lead.tipoProjeto}
                    </td>
                    <td className="px-6 py-4">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id!, e.target.value)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none focus:ring-1 focus:ring-brand-primary appearance-none cursor-pointer ${STATUS_COLORS[lead.status] || STATUS_COLORS["Novo"]}`}
                      >
                        {STATUS_OPTS.map(opt => (
                          <option key={opt} value={opt} className="bg-slate-900 text-white">{opt}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
