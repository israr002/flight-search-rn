import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing, Typography, Shadows } from '@/constants/Metrics';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onHide?: () => void;
  testID?: string;
}

const Toast: React.FC<ToastProps> = ({ message, type, onHide, testID }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(4000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  }, [fadeAnim, onHide]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return Colors.success;
      case 'error':
        return Colors.error;
      case 'warning':
        return Colors.warning;
      default:
        return Colors.light.secondaryBg;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return Colors.white;
      case 'error':
        return Colors.white;
      case 'warning':
        return Colors.white;
      default:
        return Colors.light.text;
    }
  };

  return (
    <Animated.View
      testID={testID}
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        { opacity: fadeAnim },
      ]}
    >
      <Text style={[styles.text, { color: getTextColor() }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: Spacing.medium,
    right: Spacing.medium,
    padding: Spacing.small,
    borderRadius: BorderRadius.medium,
    ...Shadows.medium,
    zIndex: 1000,
  },
  text: {
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
  },
});

export default Toast; 
 