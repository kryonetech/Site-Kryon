import React, { useEffect, useState } from "react";
import { getProjects } from "../../services/projectService";
import { Project } from "../../types";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Projetos Ativos</h1>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-6 text-center text-slate-400">
        {loading ? "Carregando..." : projects.length === 0 ? "Nenhum projeto registrado no CRM ainda." : "Exibindo projetos"}
      </div>
    </div>
  );
}
