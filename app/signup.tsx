import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { router } from 'expo-router';
import { APP_CONSTANTS } from '@/constants/appConstants';
import { signUp } from '@/services/authService';
import FormInput from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { Spacing, Typography } from '@/constants/Metrics';
import CustomButton from '@/components/CustomButton';
import { signupSchema, SignupFormData } from '@/schemas/authSchema';
import Toast from '@/components/Toast';

export default function SignupScreen() {
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
          router.replace('/');
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
    router.replace('/');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join SkyBook to start checking flights</Text>
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
            <Text style={styles.footerText}>Already have an account? </Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.large,
  },
  titleContainer: {
    marginBottom: Spacing.xlarge,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.light.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.light.text,
    textAlign: 'center',
    marginTop: Spacing.small,
  },
  form: {
    gap: Spacing.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginTop: Spacing.xlarge,
    paddingVertical: Spacing.medium,
  },
  footerText: {
    color: Colors.darkGray,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.poppinsRegular,
  },
  footerLink: {
    color: Colors.blue,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.poppinsBold || Typography.fontFamily.poppinsRegular,
    textDecorationLine: 'underline',
  },
}); 
 