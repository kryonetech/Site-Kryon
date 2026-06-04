import React, { useEffect, useState } from "react";
import { getClientes, createCliente, updateClienteStatus, updateClienteObservacoes, Cliente } from "../../services/clientService";
import { Plus, X } from "lucide-react";

const STATUS_OPTS = [
  "Ativo",
  "Inativo",
  "Em Implantação",
  "Suporte"
] as const;

export default function AdminClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  
  // New client form state
  const [newClient, setNewClient] = useState({
    nome: "",
    empresa: "",
    telefone: "",
    email: "",
    status: "Ativo",
    observacoes: ""
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      setPermissionError(false);
      const data = await getClientes();
      setClientes(data);
    } catch(err: any) {
      if (err.message && err.message.includes('permission-denied')) {
        setPermissionError(true);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setClientes(clientes.map(c => c.id === id ? { ...c, status: newStatus } : c));
      await updateClienteStatus(id, newStatus);
    } catch(err) {
      console.error(err);
      fetchClientes();
    }
  };

  const handleObsChange = async (id: string, newObs: string) => {
    try {
      setClientes(clientes.map(c => c.id === id ? { ...c, observacoes: newObs } : c));
      await updateClienteObservacoes(id, newObs);
    } catch(err) {
      console.error(err);
      fetchClientes();
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createCliente(newClient);
      setIsCreating(false);
      setNewClient({
        nome: "",
        empresa: "",
        telefone: "",
        email: "",
        status: "Ativo",
        observacoes: ""
      });
      await fetchClientes();
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Gestão de Clientes</h1>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg hover:shadow-lg hover:shadow-brand-primary/25 transition-all text-sm font-medium w-full sm:w-auto"
        >
          {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isCreating ? "Cancelar" : "Novo Cliente"}
        </button>
      </div>

      {isCreating && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Cadastrar Novo Cliente</h2>
          <form onSubmit={handleCreateClient} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Nome do Cliente *</label>
                <input
                  required
                  type="text"
                  value={newClient.nome}
                  onChange={(e) => setNewClient({...newClient, nome: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Empresa</label>
                <input
                  type="text"
                  value={newClient.empresa}
                  onChange={(e) => setNewClient({...newClient, empresa: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary"
                  placeholder="Nome da empresa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">E-mail</label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary"
                  placeholder="email@empresa.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Telefone / WhatsApp *</label>
                <input
                  required
                  type="tel"
                  value={newClient.telefone}
                  onChange={(e) => setNewClient({...newClient, telefone: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Status Base</label>
                <select
                  value={newClient.status}
                  onChange={(e) => setNewClient({...newClient, status: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary appearance-none"
                >
                  {STATUS_OPTS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-1">Observações Iniciais</label>
                <textarea
                  value={newClient.observacoes}
                  onChange={(e) => setNewClient({...newClient, observacoes: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary resize-none h-24"
                  placeholder="Detalhes adicionais sobre o cliente..."
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? "Salvando..." : "Salvar Cliente"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4">Nome / Empresa</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Observações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {permissionError ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    <div className="inline-flex bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-xl text-left gap-3 max-w-2xl w-full">
                      <div className="font-semibold text-sm">
                        Permissão Negada. Atualize as regras do Firestore no Console do Firebase (Firestore Database &gt; Rules) para prosseguir.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Carregando clientes...
                  </td>
                </tr>
              ) : clientes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                clientes.map(cliente => (
                  <tr key={cliente.id} className="hover:bg-slate-800/50 transition-colors text-slate-300">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{cliente.nome}</div>
                      <div className="text-xs text-slate-500">{cliente.empresa || "-"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{cliente.telefone}</div>
                      <div className="text-xs text-slate-500">{cliente.email || "-"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={cliente.status || "Ativo"}
                        onChange={(e) => handleStatusChange(cliente.id!, e.target.value)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium focus:outline-none focus:ring-1 focus:ring-brand-primary appearance-none cursor-pointer bg-slate-950 text-white`}
                      >
                        {STATUS_OPTS.map(opt => (
                          <option key={opt} value={opt} className="bg-slate-900 text-white">{opt}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      {cliente.createdAt ? new Date(cliente.createdAt.seconds ? cliente.createdAt.toDate() : cliente.createdAt).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="text"
                        value={cliente.observacoes || ""}
                        onChange={(e) => setClientes(clientes.map(c => c.id === cliente.id ? { ...c, observacoes: e.target.value } : c))}
                        onBlur={(e) => handleObsChange(cliente.id!, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:border-cyan-500"
                        placeholder="Adicionar obs..."
                      />
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
