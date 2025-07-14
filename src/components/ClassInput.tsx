import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { BorderRadius, Spacing, Typography } from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";

const CLASS_OPTIONS = [
  { label: "Economy", value: "economy" },
  { label: "Business", value: "business" },
  { label: "First class", value: "first" },
];

interface ClassInputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
}

const ClassInput: React.FC<ClassInputProps> = ({
  value = "",
  onChange,
  label = "Class",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(value || "economy");

  const handleDone = () => {
    setModalVisible(false);
    onChange && onChange(selected);
  };

  const displayLabel =
    CLASS_OPTIONS.find((opt) => opt.value === selected)?.label ||
    "Select Class";

  return (
    <View style={{ marginBottom: Spacing.small }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons
          name="briefcase"
          size={20}
          color={Colors.darkGray}
          style={styles.icon}
        />
        <Text style={styles.inputText}>{displayLabel}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>Choose Class</Text>
            {CLASS_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={styles.classRow}
                onPress={() => setSelected(opt.value)}
                activeOpacity={0.7}
              >
                <Text style={styles.classLabel}>{opt.label}</Text>
                <View style={styles.radioOuter}>
                  {selected === opt.value && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleDone}
              activeOpacity={0.8}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily.poppinsRegular,
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.light.inputBorder,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.white,
    paddingVertical: Spacing.small,
    marginBottom: Spacing.medium,
  },
  icon: {
    marginRight: Spacing.small,
  },
  inputText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.black,
    fontFamily: Typography.fontFamily.poppinsRegular,
    fontWeight: Typography.fontWeight.semibold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.large,
    borderTopRightRadius: BorderRadius.large,
    padding: Spacing.large,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.blue,
    fontFamily:
      Typography.fontFamily.poppinsBold || Typography.fontFamily.poppinsRegular,
    marginBottom: Spacing.large,
  },
  classRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.medium,
    marginBottom: 2,
  },
  classLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily.poppinsRegular,
    fontWeight: Typography.fontWeight.medium,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.blue,
    borderWidth: 2,
    borderColor: Colors.success,
  },
  doneButton: {
    backgroundColor: Colors.yellow,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.medium,
    marginTop: Spacing.large,
    alignItems: "center",
  },
  doneText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.poppinsRegular,
  },
});

export default ClassInput;
