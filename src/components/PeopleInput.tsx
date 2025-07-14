import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { BorderRadius, Spacing, Typography } from "@/constants/Metrics";
import { Ionicons } from "@expo/vector-icons";

interface PeopleInputProps {
  value?: { adults: number; children: number; babies: number };
  onChange?: (value: {
    adults: number;
    children: number;
    babies: number;
  }) => void;
  label?: string;
}

const defaultValue = { adults: 0, children: 0, babies: 0 };

const PeopleInput: React.FC<PeopleInputProps> = ({
  value = defaultValue,
  onChange,
  label = "Travellers",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const totalPassengers =
    localValue.adults + localValue.children + localValue.babies;

  const handleChange = (key: keyof typeof localValue, delta: number) => {
    setLocalValue((prev) => {
      const next = { ...prev, [key]: Math.max(0, prev[key] + delta) };
      return next;
    });
  };

  const handleDone = () => {
    setModalVisible(false);
    onChange && onChange(localValue);
  };

  return (
    <View style={{ marginBottom: Spacing.small }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons
          name="people"
          size={20}
          color={Colors.darkGray}
          style={styles.icon}
        />
        <Text
          style={[
            styles.inputText,
            { color: totalPassengers > 0 ? Colors.darkGray : Colors.gray },
          ]}
        >
          {totalPassengers > 0
            ? `${totalPassengers} Passenger${totalPassengers > 1 ? "s" : ""}`
            : "Select Travelers"}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>Choose Travelers</Text>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                Adults <Text style={styles.rowSubLabel}>(16y +)</Text>
              </Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => handleChange("adults", -1)}
                >
                  <Ionicons name="remove" size={20} color={Colors.gray} />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{localValue.adults}</Text>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => handleChange("adults", 1)}
                >
                  <Ionicons name="add" size={20} color={Colors.blue} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                Children <Text style={styles.rowSubLabel}>(2y - 16y)</Text>
              </Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => handleChange("children", -1)}
                >
                  <Ionicons name="remove" size={20} color={Colors.gray} />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{localValue.children}</Text>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => handleChange("children", 1)}
                >
                  <Ionicons name="add" size={20} color={Colors.blue} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                Baby <Text style={styles.rowSubLabel}>(bellow 2y)</Text>
              </Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => handleChange("babies", -1)}
                >
                  <Ionicons name="remove" size={20} color={Colors.gray} />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{localValue.babies}</Text>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => handleChange("babies", 1)}
                >
                  <Ionicons name="add" size={20} color={Colors.blue} />
                </TouchableOpacity>
              </View>
            </View>
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
    marginBottom: Spacing.medium,
    paddingVertical: Spacing.small,
  },
  icon: {
    marginRight: Spacing.small,
  },
  inputText: {
    fontSize: Typography.fontSize.sm,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.medium,
  },
  rowLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily.poppinsRegular,
    fontWeight: Typography.fontWeight.medium,
  },
  rowSubLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray,
    fontFamily: Typography.fontFamily.poppinsRegular,
    fontWeight: Typography.fontWeight.normal,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.inputBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.light.inputBorder,
  },
  counterValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily.poppinsRegular,
    fontWeight: Typography.fontWeight.bold,
    minWidth: 24,
    textAlign: "center",
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

export default PeopleInput;
