import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy, serverTimestamp, getCountFromServer, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { handleFirestoreError, OperationType } from "./leadService";

export interface Cliente {
  id?: string;
  createdAt?: any;
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  origemLeadId: string;
  status: string; // Ativo, Inativo, Em Implantação, Suporte
  observacoes: string;
}

export const createCliente = async (data: Partial<Cliente>) => {
  try {
    const clientesRef = collection(db, 'clientes');
    const docRef = await addDoc(clientesRef, {
      ...data,
      status: data.status || 'Ativo',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    handleFirestoreError(error, OperationType.CREATE, 'clientes');
  }
};

export const getClientes = async (): Promise<Cliente[]> => {
  try {
    const q = query(collection(db, 'clientes'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Cliente));
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    // Ignore error in view for now
    return [];
  }
};

export const updateClienteStatus = async (id: string, status: string) => {
  try {
    const docRef = doc(db, 'clientes', id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error("Erro ao atualizar status do cliente:", error);
  }
};

export const updateClienteObservacoes = async (id: string, observacoes: string) => {
  try {
    const docRef = doc(db, 'clientes', id);
    await updateDoc(docRef, { observacoes });
  } catch (error) {
    console.error("Erro ao atualizar observações do cliente:", error);
  }
};

export const getClientStats = async () => {
  try {
    const clientesRef = collection(db, 'clientes');
    const ativosQuery = query(clientesRef, where('status', '==', 'Ativo'));
    const ativosSnapshot = await getCountFromServer(ativosQuery);
    return {
      clientesAtivos: ativosSnapshot.data().count
    };
  } catch (error) {
    console.error("Erro ao buscar stats de clientes:", error);
    return { clientesAtivos: 0 };
  }
};

