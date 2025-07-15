import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useSegments, usePathname } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { user, isLoading, isAuthenticated, storedUserLoaded } = useAuth();
  const segments = useSegments();
  const pathname = usePathname();
  const [initialAuthCheck, setInitialAuthCheck] = useState(false);

  useEffect(() => {
    if (isLoading || !storedUserLoaded) {
      return; // Wait for stored user to be loaded
    }

    // Add a small delay to ensure auth state is fully settled
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        // User is not logged in, redirect to login if not already there
        if (pathname !== '/' && pathname !== '/signup') {
          router.replace('/');
        }
      } else {
        // User is logged in, redirect to home if on auth screens
        if (pathname === '/' || pathname === '/signup') {
          router.replace('/home');
        }
      }
      
      setInitialAuthCheck(true);
    }, 100); // Reduced delay for faster response

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, pathname, storedUserLoaded]);

  // Show loading screen while checking auth state
  if (isLoading || !storedUserLoaded || !initialAuthCheck) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../assets/animations/plane.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
});

export default AuthWrapper; 
