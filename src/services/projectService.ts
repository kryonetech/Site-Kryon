import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, query, orderBy, getCountFromServer, where, onSnapshot } from 'firebase/firestore';
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
  const isPermissionDenied = (error as any)?.code === 'permission-denied';
  
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  }
  
  if (!isPermissionDenied) {
    console.error('Firestore Error: ', JSON.stringify(errInfo));
  }
  
  throw new Error(JSON.stringify(errInfo));
}

export const createProject = async (data: Partial<Project>) => {
  try {
    const projectsRef = collection(db, 'projects');
    const docRef = await addDoc(projectsRef, {
      ...data,
      status: data.status || 'Planejamento',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'projects');
  }
};

export const updateProjectStatus = async (id: string, status: string) => {
  try {
    const projectRef = doc(db, 'projects', id);
    await updateDoc(projectRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `projects/${id}`);
  }
};

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
  } catch (error: any) {
    if (error?.code !== 'permission-denied') {
      console.error("Error fetching project stats returning fallback", error);
    }
    return { projetosAtivos: 0, projetosEntregues: 0 };
  }
}
