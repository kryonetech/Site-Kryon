import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, query, orderBy, getCountFromServer, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Lead } from '../types';

enum OperationType {
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

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const createLead = async (leadData: Partial<Lead>) => {
  try {
    console.log("Enviando lead para Firebase:", leadData);
    const leadsRef = collection(db, 'leads');
    const docRef = await addDoc(leadsRef, {
      ...leadData,
      createdAt: serverTimestamp(),
      status: 'Novo',
      origem: 'Site',
      ultimoContato: null
    });
    console.log("Lead salvo com sucesso:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao salvar lead no Firebase:", error);
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

export const getLeadStats = async () => {
  try {
    const leadsRef = collection(db, 'leads');
    const totalSnapshot = await getCountFromServer(leadsRef);
    const novosQuery = query(leadsRef, where('status', '==', 'Novo'));
    const novosSnapshot = await getCountFromServer(novosQuery);

    return {
      totalLeads: totalSnapshot.data().count,
      leadsNovos: novosSnapshot.data().count,
    };
  } catch (error) {
    console.error("Error fetching stats fallback to 0");
    return { totalLeads: 0, leadsNovos: 0 };
  }
};
