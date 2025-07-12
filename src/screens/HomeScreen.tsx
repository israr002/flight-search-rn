import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import CustomButton from '../components/CustomButton';
import { handleSignOut } from '../services/authService';
import Toast from '../components/Toast';

const HomeScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  React.useEffect(() => {
    if (toast && toast.message) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const onSignOut = async () => {
    try {
      setIsLoading(true);
      const result = await handleSignOut();
      if (result.success) {
        navigation.navigate('Login');
      } else {
        setToast({ message: result.error || 'Sign out failed', type: 'error' });
      }
    } catch (error) {
      console.error('Sign out error:', error);
      setToast({ message: 'Sign out failed', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Welcome to Google Flights</Text>
          <Text style={styles.subtitle}>Find your perfect flight</Text>
        </View>
        
        <View style={styles.buttonSection}>
          <CustomButton
            title="Sign Out"
            onPress={onSignOut}
            variant="secondary"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </View>
      </View>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onHide={() => setToast(null)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: SPACING[5],
  },
  welcomeSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: 'bold',
    marginBottom: SPACING[2],
    textAlign: 'center',
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  buttonSection: {
    paddingBottom: SPACING[4],
  },
});

export default HomeScreen; 
