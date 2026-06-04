import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

const ALLOWED_EMAILS = ['kryonetech@gmail.com'];

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        // Verify against hardcoded list
        if (ALLOWED_EMAILS.includes(user.email)) {
          // Alternatively, try to fetch from admins collection
          try {
            const adminDoc = await getDoc(doc(db, 'admins', user.email));
            if (adminDoc.exists() && adminDoc.data().ativo === true) {
              setIsAuthenticated(true);
            } else {
              // Fallback to internal list if collection fails but email matches
              setIsAuthenticated(true);
            }
          } catch (error: any) {
            if (error?.code !== 'permission-denied') {
              console.error('Error fetching admin record:', error);
            }
            // Fallback: allow if in ALLOWED_EMAILS
            setIsAuthenticated(true);
          }
        } else {
          // Unauthorized email
          setIsAuthenticated(false);
          await auth.signOut();
          if (location.pathname !== '/admin/login') {
            navigate('/admin/login?error=unauthorized', { replace: true });
          }
        }
      } else {
        // Not logged in
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && location.pathname !== '/admin/login') {
        navigate('/admin/login', { replace: true });
      } else if (isAuthenticated && location.pathname === '/admin/login') {
        navigate('/admin', { replace: true });
      }
    }
  }, [loading, isAuthenticated, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Prevent rendering children if not authenticated and not on login page
  if (!isAuthenticated && location.pathname !== '/admin/login') {
    return null;
  }

  return <>{children}</>;
}
