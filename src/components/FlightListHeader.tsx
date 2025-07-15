import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { BorderRadius, scale, Spacing } from "@/constants/Metrics";

interface Props {
  fromCode: string;
  toCode: string;
  fromDate: string;
  toDate?: string;
  duration?: string;
  stops?: string;
  summaryText: string;
  topPadding?: number;
  onEditPress?: () => void;
}

const FlightListHeader: React.FC<Props> = ({
  fromCode,
  toCode,
  fromDate,
  toDate,
  duration = "1h45m",
  stops = "Non stop",
  summaryText,
  topPadding = 0,
  onEditPress,
}) => {
  console.log("props", fromCode, toCode, fromDate, toDate, summaryText);
  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        source={require("../assets/images/world-map.png")}
        style={[styles.bg, { paddingTop: topPadding }]}
        imageStyle={styles.bgImage}
      >
        <Text style={styles.title}>Select Flights</Text>
        <View style={styles.arcRow}>
          <View style={styles.codeBlock}>
            <Text style={styles.code}>{fromCode}</Text>
            <Text style={styles.date}>{fromDate}</Text>
          </View>
          <View style={styles.arcBlock}>
            <Svg width={120} height={50}>
              <Path
                d="M10 40 Q60 0 110 40"
                stroke={Colors.white}
                strokeWidth={2}
                fill="none"
                opacity={0.7}
              />
              <Circle cx={10} cy={40} r={4} fill={Colors.white} opacity={0.7} />
              <Circle
                cx={110}
                cy={40}
                r={4}
                fill={Colors.white}
                opacity={0.7}
              />
              <MaterialIcons
                name="flight"
                size={28}
                color={Colors.white}
                style={{ position: "absolute", left: 46, top: 7 }}
              />
            </Svg>
            <Text style={styles.duration}>{duration}</Text>
            <Text style={styles.stops}>{stops}</Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={styles.code}>{toCode}</Text>
            <Text style={styles.date}>{toDate || fromDate}</Text>
          </View>
        </View>
      </ImageBackground>
      {/* Pill summary card */}
      <View style={styles.pillCard}>
        <Text style={styles.pillText} numberOfLines={1}>
          {summaryText}
        </Text>
        {onEditPress && (
          <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
            <MaterialIcons name="edit" size={16} color={Colors.blue} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: Colors.blue,
    borderBottomLeftRadius: BorderRadius.large,
    borderBottomRightRadius: BorderRadius.large,
    overflow: "visible",
    paddingBottom: 32,
    marginBottom: 32,
  },
  bg: {
    width: "100%",
    height: 180,
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomLeftRadius: BorderRadius.large,
    borderBottomRightRadius: BorderRadius.large,
    overflow: "hidden",
  },
  bgImage: {
    width: "120%",
    height: "100%",
    opacity: 1,
    resizeMode: "cover",
    borderBottomLeftRadius: BorderRadius.large,
    borderBottomRightRadius: BorderRadius.large,
    marginLeft: "-10%",
  },
  title: {
    color: Colors.white,
    fontSize: scale(20),
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: Spacing.xsmall,
    textAlign: "center",
  },
  arcRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: Spacing.large,
    marginTop: Spacing.xsmall,
  },
  codeBlock: {
    alignItems: "center",
    minWidth: 60,
  },
  code: {
    color: Colors.white,
    fontSize: scale(24),
    fontWeight: "bold",
    letterSpacing: 2,
  },
  date: {
    color: Colors.white,
    fontSize: scale(12),
    marginTop: 2,
    opacity: 0.9,
  },
  arcBlock: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  duration: {
    color: Colors.white,
    fontSize: scale(13),
    fontWeight: "bold",
    marginTop: -8,
    textAlign: "center",
  },
  stops: {
    color: Colors.white,
    fontSize: scale(11),
    opacity: 0.8,
    textAlign: "center",
  },
  pillCard: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: -24,
    backgroundColor: Colors.white,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  pillText: {
    flex: 1,
    color: Colors.darkGray,
    fontSize: scale(14),
    fontWeight: "500",
  },
  pillFilterBtn: {
    marginLeft: 12,
    backgroundColor: Colors.light.secondaryBg,
    borderRadius: 20,
    padding: 8,
  },
  editButton: {
    padding: Spacing.xsmall,
    marginLeft: Spacing.small,
  },
});

export default FlightListHeader;
