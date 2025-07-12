import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme/theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  testID?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  isLoading = false,
  icon,
  testID,
}) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
    disabled && styles.disabledButton,
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'primary' ? styles.primaryText : styles.secondaryText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      testID={testID}
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? COLORS.white : COLORS.primary} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={textStyle}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING[3],
    paddingHorizontal: SPACING[4],
    borderRadius: BORDER_RADIUS.base,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.gray[300],
    borderColor: COLORS.gray[300],
  },
  buttonText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: '600',
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.primary,
  },
  disabledText: {
    color: COLORS.gray[500],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: SPACING[2],
  },
});

export default CustomButton; 
