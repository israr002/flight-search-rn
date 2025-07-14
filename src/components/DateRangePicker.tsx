import { scale, Spacing } from "@/constants/Metrics";
import { format } from "date-fns";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Typography } from "@/constants/Metrics";

interface Props {
  departDate: string | null;
  returnDate: string | null;
  onDatesChange: (depart: string | null, returnDate: string | null) => void;
  roundTrip?: boolean;
}

const DateRangePicker = ({
  departDate,
  returnDate,
  onDatesChange,
  roundTrip = true,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [selecting, setSelecting] = useState<"depart" | "return">("depart");

  const [tempDepart, setTempDepart] = useState<string | null>(departDate);
  const [tempReturn, setTempReturn] = useState<string | null>(returnDate);

  const openPicker = (type: "depart" | "return") => {
    setSelecting(type);
    setVisible(true);
  };


  const handleDateSelect = (day: any) => {
    const selected = day.dateString;

    if (!roundTrip) {
      setTempDepart(selected);
    } else {
      if (selecting === "depart") {
        setTempDepart(selected);
        if (tempReturn && selected > tempReturn) {
          setTempReturn(null);
        }
        setSelecting("return");
      } else {
        if (tempDepart && selected >= tempDepart) {
          setTempReturn(selected);
        } else {
          setTempDepart(selected);
          setTempReturn(null);
          setSelecting("return");
        }
      }
    }
  };

  const confirmSelection = () => {
    onDatesChange(tempDepart, roundTrip ? tempReturn : null);
    setVisible(false);
  };

  const getMarkedDates = () => {
    if (!tempDepart) return {};

    const marked: any = {
      [tempDepart]: {
        startingDay: true,
        color: Colors.blue,
        textColor: Colors.white,
      },
    };

    if (roundTrip && tempReturn) {
      const start = new Date(tempDepart);
      const end = new Date(tempReturn);
      let date = new Date(start);

      while (date <= end) {
        const dateStr = format(date, "yyyy-MM-dd");
        marked[dateStr] = {
          ...marked[dateStr],
          color: Colors.lightBlue,
          textColor: Colors.white,
        };
        date.setDate(date.getDate() + 1);
      }

      marked[tempDepart].startingDay = true;
      marked[tempReturn].endingDay = true;
    }

    return marked;
  };

  return (
    <View style={{ marginBottom: Spacing.small }}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Depart</Text>
          <TouchableOpacity
            onPress={() => openPicker("depart")}
            style={styles.dateButton}
          >
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={Colors.darkGray}
              style={styles.icon}
            />
            <Text
              style={[
                styles.dateText,
                departDate ? styles.selectedDate : styles.unselectedDate,
              ]}
            >
              {departDate
                ? format(new Date(departDate), "dd/MM/yy")
                : "Choose date"}
            </Text>
          </TouchableOpacity>
          <View style={styles.underline} />
        </View>
        {roundTrip && (
          <View style={styles.col}>
            <Text style={styles.label}>Return</Text>
            <TouchableOpacity
              onPress={() => openPicker("return")}
              style={styles.dateButton}
            >
              <MaterialIcons
                name="calendar-today"
                size={20}
                color={Colors.darkGray}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.dateText,
                  returnDate ? styles.selectedDate : styles.unselectedDate,
                ]}
              >
                {returnDate
                  ? format(new Date(returnDate), "dd/MM/yy")
                  : "Choose date"}
              </Text>
            </TouchableOpacity>
            <View style={styles.underline} />
          </View>
        )}
      </View>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.calendarWrapper}>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={getMarkedDates()}
              markingType="period"
              minDate={format(new Date(), "yyyy-MM-dd")}
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={confirmSelection}
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
  row: {
    flexDirection: "row",
    gap: Spacing.large,
  },
  col: {
    flex: 1,
    marginVertical: Spacing.medium,
  },
  label: {
    fontSize: Typography.fontSize.xs,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily.poppinsRegular,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.small,
  },
  icon: {
    marginRight: Spacing.small,
  },
  dateText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.poppinsRegular,
  },
  selectedDate: {
    color: Colors.darkGray,
  },
  unselectedDate: {
    color: Colors.gray,
  },
  underline: {
    height: 1,
    backgroundColor: Colors.gray,
  },
  button: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    borderWidth: 1,
    borderColor: Colors.blue,
    height: scale(50),
    justifyContent: "center",
  },
  text: {
    color: Colors.darkGray,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: Spacing.medium,
  },
  calendarWrapper: {
    backgroundColor: Colors.white,
    overflow: "hidden",
  },
  doneButton: {
    padding: Spacing.medium,
    alignItems: "center",
    backgroundColor: Colors.blue,
  },
  doneText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: scale(14),
  },
});

export default DateRangePicker;
