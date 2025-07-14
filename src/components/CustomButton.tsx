import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import {
  BorderRadius,
  scale,
  Spacing,
  Typography,
  Shadows,
} from "@/constants/Metrics";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  testID?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  isLoading = false,
  icon,
  testID,
}) => {
  const getLoadingColor = () => {
    if (variant === "outline") return Colors.blue;
    return Colors.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        size === "small" && styles.small,
        size === "large" && styles.large,
        variant === "secondary" && styles.secondary,
        variant === "outline" && styles.outline,
        (disabled || isLoading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      testID={testID}
    >
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="small" color={getLoadingColor()} />
        ) : (
          <>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text
              style={[
                styles.text,
                size === "small" && styles.textSmall,
                size === "large" && styles.textLarge,
                variant === "outline" && styles.textOutline,
                (disabled || isLoading) && styles.textDisabled,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.yellow,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.large,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.medium,
  },

  small: {
    paddingVertical: scale(6),
    paddingHorizontal: Spacing.medium,
    minHeight: 36,
  },

  large: {
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.xlarge,
    minHeight: 52,
  },

  secondary: {
    backgroundColor: Colors.darkGray,
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.blue,
  },

  disabled: {
    backgroundColor: Colors.gray,
    borderColor: Colors.gray,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    marginRight: Spacing.small,
  },

  text: {
    fontFamily: Typography.fontFamily.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.white,
    textAlign: "center",
    letterSpacing: Typography.letterSpacing.wide,
  },

  textSmall: {
    fontSize: Typography.fontSize.sm,
  },

  textLarge: {
    fontSize: Typography.fontSize.lg,
  },

  textOutline: {
    color: Colors.blue,
  },

  textDisabled: {
    color: Colors.darkGray,
  },
});

export default CustomButton;
