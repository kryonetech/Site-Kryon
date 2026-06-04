import React, { useEffect, useState } from "react";
import { getClientes, updateClienteStatus, updateClienteObservacoes, Cliente } from "../../services/clientService";

const STATUS_OPTS = [
  "Ativo",
  "Inativo",
  "Em Implantação",
  "Suporte"
] as const;

export default function AdminClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const data = await getClientes();
      setClientes(data);
    } catch(err) {
      console.error(err);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gestão de Clientes</h1>
      </div>

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
              {loading ? (
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
