/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Solution {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Plan {
  id: string;
  name: string;
  highlightText: string;
  description: string;
  features: string[];
  ctaLabel: string;
  popular?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  needs: string[];
  message: string;
}

export interface Lead {
  id?: string;
  createdAt: any;
  nome: string;
  empresa?: string;
  telefone: string;
  email?: string;
  tipoProjeto: string;
  mensagem: string;
  status: 'Novo' | 'Em Análise' | 'Contato Realizado' | 'Proposta Enviada' | 'Negociação' | 'Fechado' | 'Perdido';
  origem: 'Site' | 'WhatsApp' | 'Facebook' | 'Instagram' | 'Google' | 'Indicação' | 'Outro';
  ultimoContato?: any;
}

export interface Project {
  id?: string;
  createdAt: any;
  clienteId: string;
  leadId?: string;
  nomeProjeto: string;
  cliente: string;
  descricao: string;
  tipoProjeto: string;
  valorEstimado: number;
  status: 'Planejamento' | 'Desenvolvimento' | 'Teste' | 'Homologação' | 'Entregue' | 'Suporte' | string;
  dataInicio?: any;
  previsaoEntrega?: any;
  observacoes?: string;
}

export interface User {
  id?: string;
  createdAt: any;
  nome: string;
  email: string;
  cargo: string;
  role: 'admin' | 'vendas' | 'operacao';
  ativo: boolean;
}
