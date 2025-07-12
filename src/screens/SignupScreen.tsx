import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { APP_CONSTANTS } from '../constants/appConstants';
import { signUp } from '../services/authService';
import { getAuthErrorMessage } from '../utils/authErrors';
import FormInput from '../components/FormInput';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/theme';
import CustomButton from '../components/CustomButton';
import { signupSchema, SignupFormData } from '../schemas/authSchema';
import Toast from '../components/Toast';

const SignupScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  React.useEffect(() => {
    if (toast && toast.message) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      const result = await signUp(data);
      if (!result.success) {
        setToast({ message: result.error || APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
      } else {
        setToast({ message: 'Account created successfully! You can now sign in.', type: 'success' });
        // Navigate to login after a short delay
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setToast({ message: APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = React.useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join SkyBook to start booking flights</Text>
          </View>

          <View style={styles.form}>
            <FormInput
              testID="display-name-input"
              control={control}
              name="displayName"
              label="Full Name"
              placeholder="Enter your full name"
              autoCapitalize="words"
              error={errors.displayName?.message}
            />
            <FormInput
              testID="email-input"
              control={control}
              name="email"
              label={APP_CONSTANTS.EMAIL_LABEL}
              placeholder={APP_CONSTANTS.EMAIL_PLACEHOLDER}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email?.message}
            />
            <FormInput
              testID="password-input"
              control={control}
              name="password"
              label={APP_CONSTANTS.PASSWORD_LABEL}
              placeholder={APP_CONSTANTS.PASSWORD_PLACEHOLDER}
              secureTextEntry
              error={errors.password?.message}
            />
            <FormInput
              testID="confirm-password-input"
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry
              error={errors.confirmPassword?.message}
            />
            <CustomButton
              testID="sign-up-button"
              title="Create Account"
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity testID="login-link" onPress={goToLogin}>
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {toast && (
        <Toast
          testID="toast-message"
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING[5],
    paddingVertical: SPACING[6],
  },
  titleContainer: {
    marginBottom: SPACING[8],
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginTop: SPACING[1],
  },
  form: {
    gap: SPACING[4],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING[6],
  },
  footerText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  footerLink: {
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: SPACING[1],
  },
});

export default SignupScreen; 
