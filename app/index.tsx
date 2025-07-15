import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { router } from "expo-router";
import { APP_CONSTANTS } from "@/constants/appConstants";
import { signInWithEmail } from "@/services/authService";
import FormInput from "@/components/FormInput";
import { Colors } from "@/constants/Colors";
import { BorderRadius, Spacing, Typography } from "@/constants/Metrics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { authSchema, AuthFormData } from "@/schemas/authSchema";
import Toast from "@/components/Toast";

type LoginFormData = z.infer<typeof authSchema>;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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
        setToast({
          message: result.error || APP_CONSTANTS.UNKNOWN_ERROR,
          type: "error",
        });
      } else {
        setToast({
          message: "Login successful!",
          type: "success",
        });
        // AuthWrapper will handle navigation automatically when auth state changes
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setToast({ message: APP_CONSTANTS.UNKNOWN_ERROR, type: "error" });
    } finally {
      setIsEmailLoading(false);
    }
  };

  const goToSignup = React.useCallback(() => {
    router.push("/signup");
  }, []);

  // Animation for airplane
  const airplaneAnim = useRef(new Animated.Value(-300)).current; // Start off-screen left

  useEffect(() => {
    Animated.timing(airplaneAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Background - 40% */}
      <View style={[styles.backgroundContainer, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.brandText}>SkyBook</Text>
        </View>

        <Animated.Image
          source={require("../src/assets/images/airplane.png")}
          style={[
            styles.backgroundImage,
            { transform: [{ translateX: airplaneAnim }] },
          ]}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{APP_CONSTANTS.LOGIN_TITLE}</Text>
          <Text style={styles.subtitle}>{APP_CONSTANTS.LOGIN_SUBTITLE}</Text>
        </View>
      </View>

      {/* Form Container - 60% */}
      <View style={styles.formContainer}>
        <View style={styles.formCard}>
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
            <Text style={styles.footerText}>
              {APP_CONSTANTS.NO_ACCOUNT_TEXT}{" "}
            </Text>
            <TouchableOpacity testID="signup-link" onPress={goToSignup}>
              <Text style={styles.footerLink}>
                {APP_CONSTANTS.SIGN_UP_LINK}
              </Text>
            </TouchableOpacity>
          </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  // Background Container - 40%
  backgroundContainer: {
    height: "40%",
    width: "100%",
    backgroundColor: Colors.blue,
    borderBottomLeftRadius: BorderRadius.large,
    borderBottomRightRadius: BorderRadius.large,
    paddingHorizontal: Spacing.medium,
    //paddingBottom: Spacing.large,
  },

  backgroundImage: {
    height: 100,
    width: 350,
    opacity: 0.6,
    marginTop: Spacing.medium,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.large,
  },

  brandText: {
    color: Colors.white,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 1,
    fontFamily:
      Typography.fontFamily.poppinsBold || Typography.fontFamily.poppinsRegular,
  },

  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    textAlign: "center",
    fontFamily:
      Typography.fontFamily.poppinsBold || Typography.fontFamily.poppinsRegular,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginTop: Spacing.small,
    fontFamily: Typography.fontFamily.poppinsRegular,
  },

  // Form Container - 60%
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Spacing.large,
  },
  formCard: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    justifyContent: "center",
  },
  form: {
    gap: Spacing.medium,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
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
    fontFamily:
      Typography.fontFamily.poppinsBold || Typography.fontFamily.poppinsRegular,
    textDecorationLine: "underline",
  },
});
 