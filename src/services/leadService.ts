import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, query, orderBy, getCountFromServer, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Lead } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const createLead = async (data: Partial<Lead>) => {
  try {
    console.log("Enviando lead para Firebase:", data);
    const leadsRef = collection(db, 'leads');
    const docRef = await addDoc(leadsRef, {
      nome: data.nome,
      empresa: data.empresa || "",
      telefone: data.telefone,
      email: data.email || "",
      tipoProjeto: data.tipoProjeto,
      mensagem: data.mensagem || "",
      status: 'Novo',
      origem: 'Site',
      ultimoContato: null,
      createdAt: serverTimestamp()
    });
    console.log("Lead salvo com sucesso:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro real Firebase:", error);
    handleFirestoreError(error, OperationType.CREATE, 'leads');
  }
};

export const getLeads = async (): Promise<Lead[]> => {
  try {
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString()
    })) as Lead[];
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'leads');
    return [];
  }
};

export const subscribeToLeads = (callback: (leads: Lead[]) => void) => {
  const leadsRef = collection(db, 'leads');
  const q = query(leadsRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const leads = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString()
    })) as Lead[];
    callback(leads);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'leads');
  });
};

export const updateLeadStatus = async (id: string, status: string) => {
  try {
    const leadRef = doc(db, 'leads', id);
    await updateDoc(leadRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `leads/${id}`);
  }
};

import { createCliente } from './clientService';

export const convertLeadToClient = async (lead: Lead) => {
  try {
    const clientId = await createCliente({
      nome: lead.nome,
      empresa: lead.empresa || "",
      telefone: lead.telefone,
      email: lead.email || "",
      origemLeadId: lead.id || "",
      status: "Ativo",
      observacoes: `Lead convertido via Admin.\nMensagem original: ${lead.mensagem || ''}`
    });
    
    if (clientId && lead.id) {
      await updateLeadStatus(lead.id, 'Fechado');
    }
    
    return clientId;
  } catch (error) {
    console.error("Erro ao converter lead para cliente:", error);
    throw error;
  }
};

export const getLeadStats = async () => {

  try {
    const leadsRef = collection(db, 'leads');
    const totalSnapshot = await getCountFromServer(leadsRef);
    const novosQuery = query(leadsRef, where('status', '==', 'Novo'));
    const novosSnapshot = await getCountFromServer(novosQuery);
    const propostasQuery = query(leadsRef, where('status', '==', 'Proposta Enviada'));
    const propostasSnapshot = await getCountFromServer(propostasQuery);

    return {
      totalLeads: totalSnapshot.data().count,
      leadsNovos: novosSnapshot.data().count,
      propostasEnviadas: propostasSnapshot.data().count
    };
  } catch (error) {
    console.error("Error fetching stats fallback to 0");
    return { totalLeads: 0, leadsNovos: 0, propostasEnviadas: 0 };
  }
};
