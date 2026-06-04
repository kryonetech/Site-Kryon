import { collection, getDocs, query, orderBy, getCountFromServer, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Project } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const getProjects = async (): Promise<Project[]> => {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'projects');
    return [];
  }
};

export const getProjectStats = async () => {
  try {
    const projectsRef = collection(db, 'projects');
    const totalSnapshot = await getCountFromServer(projectsRef);
    const entreguesQuery = query(projectsRef, where('status', '==', 'Entregue'));
    const entreguesSnapshot = await getCountFromServer(entreguesQuery);
    
    return {
      projetosAtivos: totalSnapshot.data().count - entreguesSnapshot.data().count,
      projetosEntregues: entreguesSnapshot.data().count,
    };
  } catch (error) {
    console.error("Error fetching project stats returning fallback");
    return { projetosAtivos: 0, projetosEntregues: 0 };
  }
}
