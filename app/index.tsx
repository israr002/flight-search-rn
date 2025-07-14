import { useAutocomplete } from "@/api/flightApi";
import AutocompleteDropdown from "@/components/AutoCompleteDropdown";
import DateRangePicker from "@/components/DateRangePicker";
import CustomButton from "@/components/CustomButton";
import LocationInput from "@/components/LocationInput";
import SwapButton from "@/components/SwapButton";
import FormInput from "@/components/FormInput";
import PeopleInput from "@/components/PeopleInput";
import ClassInput from "@/components/ClassInput";
import FilterCard from "@/components/FilterCard";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { BorderRadius, scale, Spacing, Typography } from "@/constants/Metrics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { handleSignOut } from "@/services/authService";
import Toast from "@/components/Toast";

const { width, height } = Dimensions.get("window");

type SuggestionItem = { id: string; name: string; code: string; entityId: string };

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { control } = useForm();
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [debouncedFromQuery, setDebouncedFromQuery] = useState("");
  const [debouncedToQuery, setDebouncedToQuery] = useState("");
  const [fromSelected, setFromSelected] = useState<SuggestionItem | null>(null);
  const [toSelected, setToSelected] = useState<SuggestionItem | null>(null);
  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);
  const [tripType, setTripType] = useState<"oneway" | "round">("round");
  const [departDate, setDepartDate] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [people, setPeople] = useState({ adults: 1, children: 0, babies: 0 });
  const [flightClass, setFlightClass] = useState("economy");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Debounce logic for autocomplete queries
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFromQuery(fromQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [fromQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedToQuery(toQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [toQuery]);

  const { data: fromSuggestions = [] } = useAutocomplete(debouncedFromQuery);
  const { data: toSuggestions = [] } = useAutocomplete(debouncedToQuery);

  const onSearch = () => {
    if (!fromQuery || !toQuery || !departDate) {
      setToast({
        message: "Please fill in all required fields",
        type: "error",
      });
      return;
    }

    setToast({
      message: `Searching flights from ${fromQuery} to ${toQuery} on ${departDate}`,
      type: "success",
    });
  };

  const swapFromTo = () => {
    const tempQuery = fromQuery;
    setFromQuery(toQuery);
    setToQuery(tempQuery);
    const tempSelected = fromSelected;
    setFromSelected(toSelected);
    setToSelected(tempSelected);
  };

  const onSignOut = async () => {
    try {
      setIsSigningOut(true);
      const result = await handleSignOut();
      if (result.success) {
        router.replace("/login");
      } else {
        setToast({ message: result.error || "Sign out failed", type: "error" });
      }
    } catch (error) {
      console.error("Sign out error:", error);
      setToast({ message: "Sign out failed", type: "error" });
    } finally {
      setIsSigningOut(false);
    }
  };

  const onSearchFlights = () => {
    if (!fromSelected || !toSelected || !departDate) {
      setToast({
        message: "Please fill in all required fields",
        type: "error",
      });
      return;
    }
    router.push({
      pathname: "/flight-list",
      params: {
        originSkyId: fromSelected.code,
        destinationSkyId: toSelected.code,
        originEntityId: fromSelected.entityId,
        destinationEntityId: toSelected.entityId,
        date: departDate,
        returnDate: tripType === "round" ? returnDate : undefined,
        adults: people.adults,
        childrens: people.children,
        infants: people.babies,
        cabinClass: flightClass,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Background Container - 30% */}
      <ImageBackground
        source={require("../assets/images/world-map.png")}
        style={styles.backgroundContainer}
        imageStyle={styles.backgroundImage}
      >
          {/* Header */}
          <View
            style={[styles.header, { paddingTop: insets.top + Spacing.small }]}
          >
            <View style={styles.headerContent}>
              <Image
                source={require("../assets/icon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.brandText}>VIETNAM AIRLINES</Text>
            </View>
            <TouchableOpacity onPress={onSignOut} style={styles.signOutButton}>
              <Ionicons name="log-out-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* Trip Type Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, tripType === "round" && styles.activeTab]}
              onPress={() => setTripType("round")}
            >
              <Text
                style={[
                  styles.tabText,
                  tripType === "round" && styles.activeTabText,
                ]}
              >
                Round trip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, tripType === "oneway" && styles.activeTab]}
              onPress={() => setTripType("oneway")}
            >
              <Text
                style={[
                  styles.tabText,
                  tripType === "oneway" && styles.activeTabText,
                ]}
              >
                One-Way
              </Text>
            </TouchableOpacity>
          </View>
      </ImageBackground>

      {/* White Card Container - 75% */}
      <View style={styles.cardContainer}>
        <FilterCard
          fromQuery={fromQuery}
          setFromQuery={setFromQuery}
          toQuery={toQuery}
          setToQuery={setToQuery}
          fromSelected={fromSelected}
          setFromSelected={setFromSelected}
          toSelected={toSelected}
          setToSelected={setToSelected}
          fromSuggestions={fromSuggestions}
          toSuggestions={toSuggestions}
          fromFocused={fromFocused}
          setFromFocused={setFromFocused}
          toFocused={toFocused}
          setToFocused={setToFocused}
          swapFromTo={swapFromTo}
          tripType={tripType}
          setTripType={setTripType}
          departDate={departDate}
          setDepartDate={setDepartDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          people={people}
          setPeople={setPeople}
          flightClass={flightClass}
          setFlightClass={setFlightClass}
          onSearchFlights={onSearchFlights}
          // Override the value and onSelect logic for both fields:
          fromValue={fromQuery}
          onFromSelect={(item) => {
            setFromSelected(item);
            setFromQuery(item.name);
            setFromFocused(false);
          }}
          toValue={toQuery}
          onToSelect={(item) => {
            setToSelected(item);
            setToQuery(item.name);
            setToFocused(false);
          }}
        />
      </View>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onHide={() => setToast(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  // Background Container - 25%
  backgroundContainer: {
    height: "25%", // 25% of screen height
    width: "100%",
    overflow: "hidden",
    backgroundColor: Colors.blue,
    borderBottomLeftRadius: BorderRadius.large,
    borderBottomRightRadius: BorderRadius.large,
    paddingHorizontal: Spacing.medium,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    opacity: 1,
    resizeMode: "cover",
    borderBottomLeftRadius: BorderRadius.large,
    borderBottomRightRadius: BorderRadius.large,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Spacing.small,
    paddingBottom: Spacing.medium,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: Spacing.small,
  },
  brandText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 1,
  },
  signOutButton: {
    padding: Spacing.small,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: Spacing.medium,
  },
  tab: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    marginRight: Spacing.medium,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
  },
  tabText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: Typography.fontWeight.bold,
  },

  // Card Container - 70%
  cardContainer: {
    flex: 1, // Takes remaining space (70%)
    backgroundColor: Colors.white,
    //borderTopLeftRadius: BorderRadius.xlarge,
    //borderTopRightRadius: BorderRadius.xlarge,
    //marginTop: -BorderRadius.xlarge, // Overlap with background
    paddingTop: Spacing.large,
    paddingHorizontal: Spacing.medium,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.large,
    padding: Spacing.large,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: Spacing.medium,
    marginTop: -20,
  },
  cardTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.blue,
    marginBottom: Spacing.small,
  },
  cardSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.darkGray,
  },
  locationSection: {
    position: "relative",
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: scale(16),
    borderRadius: BorderRadius.xlarge,
  },
  locationRow: {
    // flexDirection: "row",
    // alignItems: "center",
  },
  airplaneIcon: {
    marginRight: Spacing.small,
  },
  horizontalLine: {
    borderColor: Colors.gray,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginHorizontal: Spacing.large,
  },
  buttonContainer: {
    marginTop: Spacing.medium,
  },
  selectedInfo: {
    fontSize: Typography.fontSize.sm,
    color: Colors.darkGray,
    marginTop: Spacing.small,
    marginLeft: Spacing.large,
  },
});
 