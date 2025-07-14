import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Spacing, Typography } from "@/constants/Metrics";

interface LocationInputProps {
  label: string;
  value: string;
  selectedAirport?: string;
  selectedCode?: string;
  style?: any;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  selectedAirport = "",
  selectedCode = "",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.inputText}>{value}</Text>
      {selectedAirport && selectedCode && (
        <Text style={styles.airportInfo}>
          {selectedAirport} ({selectedCode})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginVertical: Spacing.small,
    flex: 1,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    color: Colors.darkGray,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.poppinsRegular,
  },
  inputText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.black,
    fontFamily: Typography.fontFamily.poppinsRegular,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 2,
  },
  airportInfo: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray,
    fontFamily: Typography.fontFamily.poppinsRegular,
  },
});

export default LocationInput;
