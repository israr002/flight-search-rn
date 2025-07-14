import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { router } from 'expo-router';
import { APP_CONSTANTS } from '@/constants/appConstants';
import { signInWithEmail } from '@/services/authService';
import FormInput from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { Spacing, Typography } from '@/constants/Metrics';
import CustomButton from '@/components/CustomButton';
import { authSchema, AuthFormData } from '@/schemas/authSchema';
import Toast from '@/components/Toast';

type LoginFormData = z.infer<typeof authSchema>;

export default function LoginScreen() {
  const [isEmailLoading, setIsEmailLoading] = useState(false);
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
  } = useForm<LoginFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      setIsEmailLoading(true);
      const result = await signInWithEmail(data.email, data.password);
      if (!result.success) {
        setToast({ message: result.error || APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
      } else {
        router.replace('/');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setToast({ message: APP_CONSTANTS.UNKNOWN_ERROR, type: 'error' });
    } finally {
      setIsEmailLoading(false);
    }
  };

  const goToSignup = React.useCallback(() => {
    router.push('/signup');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{APP_CONSTANTS.LOGIN_TITLE}</Text>
          <Text style={styles.subtitle}>
            {APP_CONSTANTS.LOGIN_SUBTITLE}
          </Text>
        </View>

        <View style={styles.form}>
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
          <CustomButton
            testID="sign-in-button"
            title={APP_CONSTANTS.SIGN_IN_BUTTON}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            isLoading={isEmailLoading}
            disabled={isEmailLoading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{APP_CONSTANTS.NO_ACCOUNT_TEXT}</Text>
          <TouchableOpacity testID="signup-link" onPress={goToSignup}>
            <Text style={styles.footerLink}>{APP_CONSTANTS.SIGN_UP_LINK}</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.large,
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
    marginTop: Spacing.large,
  },
  footerText: {
    color: Colors.light.text,
    fontSize: Typography.fontSize.base,
  },
  footerLink: {
    color: Colors.blue,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.small,
  },
}); 
