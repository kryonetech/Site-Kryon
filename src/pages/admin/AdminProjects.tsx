import React, { useEffect, useState } from "react";
import { getProjects, updateProjectStatus, createProject } from "../../services/projectService";
import { Project } from "../../types";

const STATUS_OPTS = [
  "Planejamento",
  "Desenvolvimento",
  "Teste",
  "Homologação",
  "Entregue",
  "Suporte"
] as const;

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  // New project form state
  const [newProject, setNewProject] = useState({
    cliente: "",
    nomeProjeto: "",
    tipoProjeto: "",
    previsaoEntrega: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus } : p));
      await updateProjectStatus(id, newStatus);
    } catch(err) {
      console.error(err);
      fetchProjects();
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.cliente || !newProject.nomeProjeto) return;
    
    try {
      await createProject({
        clienteId: "manual", // Simplified for manual creation
        cliente: newProject.cliente,
        nomeProjeto: newProject.nomeProjeto,
        tipoProjeto: newProject.tipoProjeto,
        previsaoEntrega: newProject.previsaoEntrega,
        status: "Planejamento",
        descricao: "",
        valorEstimado: 0,
        dataInicio: new Date().toISOString(),
        observacoes: ""
      });
      setIsCreating(false);
      setNewProject({ cliente: "", nomeProjeto: "", tipoProjeto: "", previsaoEntrega: "" });
      fetchProjects();
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gestão de Projetos</h1>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          {isCreating ? "Cancelar" : "Novo Projeto"}
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Cliente</label>
            <input type="text" required value={newProject.cliente} onChange={e => setNewProject({...newProject, cliente: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500" placeholder="Nome do Cliente" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Nome do Projeto</label>
            <input type="text" required value={newProject.nomeProjeto} onChange={e => setNewProject({...newProject, nomeProjeto: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500" placeholder="Sistema ERP" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Tipo</label>
            <input type="text" value={newProject.tipoProjeto} onChange={e => setNewProject({...newProject, tipoProjeto: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500" placeholder="SaaS" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Previsão Entrega</label>
            <div className="flex space-x-2">
              <input type="date" value={newProject.previsaoEntrega} onChange={e => setNewProject({...newProject, previsaoEntrega: e.target.value})} className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500" />
              <button type="submit" className="bg-cyan-500 text-slate-950 px-3 py-2 rounded-lg text-sm font-medium">Salvar</button>
            </div>
          </div>
        </form>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Projeto</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Previsão</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Carregando projetos...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhum projeto encontrado.
                  </td>
                </tr>
              ) : (
                projects.map(project => (
                  <tr key={project.id} className="hover:bg-slate-800/50 transition-colors text-slate-300">
                    <td className="px-6 py-4 font-medium text-white">
                      {project.cliente || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {project.nomeProjeto || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {project.tipoProjeto || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {project.previsaoEntrega ? new Date(project.previsaoEntrega).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={project.status || "Planejamento"}
                        onChange={(e) => handleStatusChange(project.id!, e.target.value)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none focus:ring-1 focus:ring-brand-primary appearance-none cursor-pointer bg-slate-950 text-white`}
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
