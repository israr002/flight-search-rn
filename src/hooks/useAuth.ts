import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { saveUserToStorage, getUserFromStorage, clearUserFromStorage } from '@/services/authPersistence';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedUserLoaded, setStoredUserLoaded] = useState(false);

  useEffect(() => {
    // First, try to load user from storage
    const loadStoredUser = async () => {
      try {
        const storedUser = await getUserFromStorage();
        if (storedUser) {
          setIsAuthenticated(true);
          setUser(storedUser as any);
        }
        setStoredUserLoaded(true);
      } catch (error) {
        console.error('useAuth: Error loading stored user:', error);
        setStoredUserLoaded(true);
      }
    };

    loadStoredUser();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
        setIsAuthenticated(true);
        await saveUserToStorage(currentUser);
      } else {
        // User is signed out - clear everything
        setUser(null);
        setIsAuthenticated(false);
        await clearUserFromStorage();
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading: isLoading || !storedUserLoaded,
    isAuthenticated,
    storedUserLoaded,
  };
}; 
