import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { BorderRadius, scale, Spacing } from "@/constants/Metrics";

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  formattedPrice: string;
  logoUrl: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  // Round trip data
  returnFlight?: {
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
    airline: string;
    flightNumber: string;
    logoUrl: string;
  };
  isRoundTrip: boolean;
}

interface FlightCardProps {
  flight: Flight;
  onPress: (flightId: string) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.ticketCard}
      activeOpacity={0.93}
      onPress={() => onPress(flight.id)}
    >
      {/* Top Row */}
      <View style={styles.ticketTopRow}>
        <View style={styles.airlineInfo}>
          {flight.logoUrl ? (
            <Image source={{ uri: flight.logoUrl }} style={styles.airlineLogo} />
          ) : null}
          <View>
            <Text style={styles.ticketTopText}>{flight.airline}</Text>
            <Text style={styles.flightNumberText}>{flight.flightNumber}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{flight.formattedPrice}</Text>
        </View>
      </View>

      {/* Main Row: Codes and Cities */}
      <View style={styles.ticketMainRow}>
        <View style={styles.ticketCodeBlock}>
          <Text style={styles.ticketCode}>{flight.fromCode}</Text>
          <Text style={styles.ticketCity}>{flight.fromCity}</Text>
        </View>
        <View>
          <View style={styles.ticketPlaneBlock}>
            <View style={styles.ticketLineDot} />
            <View style={styles.ticketDashedLine} />
            <MaterialIcons
              name="flight"
              size={22}
              color={Colors.blue}
              style={{ marginHorizontal: 2 }}
            />
            <View style={styles.ticketDashedLine} />
            <View style={styles.ticketLineDot} />
          </View>
          <View style={styles.ticketDurationPill}>
            <Text style={styles.ticketDurationText}>{flight.duration}</Text>
          </View>
        </View>
        <View style={styles.ticketCodeBlock}>
          <Text style={styles.ticketCode}>{flight.toCode}</Text>
          <Text style={styles.ticketCity}>{flight.toCity}</Text>
        </View>
      </View>

      {/* Bottom Row: Times */}
      <View style={styles.ticketBottomRow}>
        <View style={styles.ticketTimeBlock}>
          <MaterialIcons
            name="flight-takeoff"
            size={20}
            color={Colors.blue}
          />
          <Text style={styles.ticketTimeText}>{flight.departureTime}</Text>
        </View>
        <View style={styles.ticketTimeBlock}>
          <MaterialIcons
            name="flight-land"
            size={20}
            color={Colors.blue}
          />
          <Text style={styles.ticketTimeText}>{flight.arrivalTime}</Text>
        </View>
      </View>

      {/* Return Flight Section for Round Trip */}
      {flight.isRoundTrip && flight.returnFlight && (
        <View style={styles.returnFlightSection}>
          <View style={styles.returnFlightDivider} />
          <Text style={styles.returnFlightLabel}>Return Flight</Text>
          
          {/* Return Flight Info */}
          <View style={styles.ticketTopRow}>
            <View style={styles.airlineInfo}>
              {flight.returnFlight.logoUrl ? (
                <Image source={{ uri: flight.returnFlight.logoUrl }} style={styles.airlineLogo} />
              ) : null}
              <View>
                <Text style={styles.ticketTopText}>{flight.returnFlight.airline}</Text>
                <Text style={styles.flightNumberText}>{flight.returnFlight.flightNumber}</Text>
              </View>
            </View>
            <Text style={styles.durationText}>{flight.returnFlight.duration}</Text>
          </View>

          {/* Return Flight Route */}
          <View style={styles.ticketMainRow}>
            <View style={styles.ticketCodeBlock}>
              <Text style={styles.ticketCode}>{flight.toCode}</Text>
              <Text style={styles.ticketCity}>{flight.toCity}</Text>
            </View>
            <View>
              <View style={styles.ticketPlaneBlock}>
                <View style={styles.ticketLineDot} />
                <View style={styles.ticketDashedLine} />
                <MaterialIcons
                  name="flight"
                  size={22}
                  color={Colors.blue}
                  style={{ marginHorizontal: 2 }}
                />
                <View style={styles.ticketDashedLine} />
                <View style={styles.ticketLineDot} />
              </View>
              <View style={styles.ticketDurationPill}>
                <Text style={styles.ticketDurationText}>
                  {flight.returnFlight.stops === 0 ? "Non-stop" : `${flight.returnFlight.stops} stop${flight.returnFlight.stops > 1 ? 's' : ''}`}
                </Text>
              </View>
            </View>
            <View style={styles.ticketCodeBlock}>
              <Text style={styles.ticketCode}>{flight.fromCode}</Text>
              <Text style={styles.ticketCity}>{flight.fromCity}</Text>
            </View>
          </View>

          {/* Return Flight Times */}
          <View style={styles.ticketBottomRow}>
            <View style={styles.ticketTimeBlock}>
              <MaterialIcons
                name="flight-takeoff"
                size={20}
                color={Colors.blue}
              />
              <Text style={styles.ticketTimeText}>{flight.returnFlight.departureTime}</Text>
            </View>
            <View style={styles.ticketTimeBlock}>
              <MaterialIcons
                name="flight-land"
                size={20}
                color={Colors.blue}
              />
              <Text style={styles.ticketTimeText}>{flight.returnFlight.arrivalTime}</Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ticketCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    padding: Spacing.small,
    marginBottom: Spacing.medium,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  ticketTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xsmall,
  },
  ticketTopText: {
    fontSize: scale(13),
    color: Colors.darkGray,
    fontWeight: "600",
    opacity: 0.85,
  },
  ticketMainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.small,
  },
  ticketCodeBlock: {
    alignItems: "center",
  },
  ticketCode: {
    fontSize: scale(24),
    fontWeight: "bold",
    color: Colors.blue,
    letterSpacing: 1,
  },
  ticketCity: {
    fontSize: scale(11),
    color: Colors.darkGray,
    opacity: 0.7,
    marginTop: -2,
    textAlign: "center",
  },
  ticketPlaneBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ticketDashedLine: {
    width: scale(14),
    height: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: Colors.blue,
    opacity: 0.4,
  },
  ticketLineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.blue,
    opacity: 0.7,
  },
  ticketDurationPill: {
    backgroundColor: Colors.light.secondaryBg,
    borderRadius: BorderRadius.small,
    paddingHorizontal: Spacing.small,
    paddingVertical: 2,
    alignSelf: "center",
  },
  ticketDurationText: {
    fontSize: scale(10),
    color: Colors.blue,
    fontWeight: "600",
    textAlign: "center",
  },
  ticketBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.small,
  },
  ticketTimeBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticketTimeText: {
    fontSize: scale(14),
    color: Colors.darkGray,
    marginLeft: Spacing.xsmall,
    fontWeight: "600",
  },
  airlineInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  airlineLogo: {
    width: 28,
    height: 28,
    marginRight: Spacing.small,
    borderRadius: BorderRadius.small,
  },
  flightNumberText: {
    fontSize: scale(10),
    color: Colors.gray,
    marginTop: 1,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: Colors.blue,
  },
  returnFlightSection: {
    marginTop: Spacing.small,
    paddingTop: Spacing.small,
  },
  returnFlightDivider: {
    height: 1,
    backgroundColor: Colors.gray,
    marginVertical: Spacing.small,
    opacity: 0.3,
  },
  returnFlightLabel: {
    fontSize: scale(12),
    fontWeight: "600",
    color: Colors.darkGray,
    marginBottom: Spacing.xsmall,
    textAlign: "center",
  },
  durationText: {
    fontSize: scale(12),
    color: Colors.blue,
    fontWeight: "600",
  },
});

export default FlightCard; 
 