import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Typography } from '@/constants/Metrics';

interface TripTypeTabsProps {
  tripType: "oneway" | "round";
  setTripType: (type: "oneway" | "round") => void;
  variant?: "light" | "dark"; // light for home screen (white text), dark for modal (dark text)
}

const TripTypeTabs: React.FC<TripTypeTabsProps> = ({
  tripType,
  setTripType,
  variant = "light"
}) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tab,
          tripType === "oneway" && (variant === "light" ? styles.activeTabLight : styles.activeTabDark)
        ]}
        onPress={() => setTripType("oneway")}
      >
        <Text
          style={[
            variant === "light" ? styles.tabTextLight : styles.tabTextDark,
            tripType === "oneway" && (variant === "light" ? styles.activeTabTextLight : styles.activeTabTextDark),
          ]}
        >
          One-Way
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          tripType === "round" && (variant === "light" ? styles.activeTabLight : styles.activeTabDark)
        ]}
        onPress={() => setTripType("round")}
      >
        <Text
          style={[
            variant === "light" ? styles.tabTextLight : styles.tabTextDark,
            tripType === "round" && (variant === "light" ? styles.activeTabTextLight : styles.activeTabTextDark),
          ]}
        >
          Round trip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    marginBottom: Spacing.medium,
  },
  tab: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    marginRight: Spacing.medium,
  },
  
  // Light variant (for home screen with blue background)
  activeTabLight: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
  },
  tabTextLight: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  activeTabTextLight: {
    color: Colors.white,
    fontWeight: Typography.fontWeight.bold,
  },
  
  // Dark variant (for modal with white background)
  activeTabDark: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.blue,
  },
  tabTextDark: {
    color: Colors.darkGray,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  activeTabTextDark: {
    color: Colors.blue,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default TripTypeTabs; 
