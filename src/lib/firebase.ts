import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Ensure the auth domain is correct and not using custom domains that aren't authorized
let authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
if (!authDomain || authDomain === 'kryonetech.com' || authDomain === 'www.kryonetech.com') {
  authDomain = 'site-kryon.firebaseapp.com';
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'site-kryon',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log("Firebase Auth Domain:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log("Firebase Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("Active Auth Domain used:", authDomain);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
