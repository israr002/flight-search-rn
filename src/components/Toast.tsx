import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme/theme';

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
        return COLORS.status.successLight;
      case 'error':
        return COLORS.status.errorLight;
      case 'warning':
        return COLORS.status.warningLight;
      default:
        return COLORS.gray[100];
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return COLORS.success;
      case 'error':
        return COLORS.error;
      case 'warning':
        return COLORS.warning;
      default:
        return COLORS.text.primary;
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
    left: SPACING[4],
    right: SPACING[4],
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.base,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  text: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Toast; 
