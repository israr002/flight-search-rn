import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Spacing, Shadows, scale } from "@/constants/Metrics";

interface SwapButtonProps {
  onPress: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="swap-vertical" size={24} color={Colors.yellow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: Spacing.large,
    top: 88,
    backgroundColor: Colors.white,
    borderRadius: scale(100),
    padding: Spacing.small,
    ...Shadows.medium,
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.white,
  },
});

export default SwapButton;
