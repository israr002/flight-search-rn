// Redesigned FlightListScreen.tsx
import { useFlightSearch } from "@/api/flightApi";
import { Colors } from "@/constants/Colors";
import { BorderRadius, scale, Spacing } from "@/constants/Metrics";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FilterCard, { SuggestionItem } from "@/components/FilterCard";
import FlightListHeader from "@/components/FlightListHeader";
import FlightCard, { Flight } from "@/components/FlightCard";
import TripTypeTabs from "@/components/TripTypeTabs";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useAutocomplete } from "@/api/flightApi";

const FlightListScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const getParamString = (param: any): string => {
    if (Array.isArray(param)) return param[0] || "";
    return typeof param === "string" ? param : "";
  };

  // State for filter values (initialized from params)
  const [fromSelected, setFromSelected] = React.useState<SuggestionItem | null>(
    getParamString(params.originSkyId)
      ? {
          id: getParamString(params.originSkyId),
          name: getParamString(params.originName) || getParamString(params.originSkyId),
          code: getParamString(params.originSkyId),
          entityId: getParamString(params.originEntityId) || getParamString(params.originSkyId),
        }
      : null
  );
  const [toSelected, setToSelected] = React.useState<SuggestionItem | null>(
    getParamString(params.destinationSkyId)
      ? {
          id: getParamString(params.destinationSkyId),
          name: getParamString(params.destinationName) || getParamString(params.destinationSkyId),
          code: getParamString(params.destinationSkyId),
          entityId: getParamString(params.destinationEntityId) || getParamString(params.destinationSkyId),
        }
      : null
  );
  const [fromQuery, setFromQuery] = React.useState(getParamString(params.originName) || getParamString(params.originSkyId));
  const [toQuery, setToQuery] = React.useState(getParamString(params.destinationName) || getParamString(params.destinationSkyId));
  const [fromFocused, setFromFocused] = React.useState(false);
  const [toFocused, setToFocused] = React.useState(false);
  const [tripType, setTripType] = React.useState<"oneway" | "round">(
    getParamString(params.returnDate) ? "round" : "oneway"
  );
  const [departDate, setDepartDate] = React.useState(
    getParamString(params.date) || null
  );
  const [returnDate, setReturnDate] = React.useState(
    getParamString(params.returnDate) || null
  );
  const [people, setPeople] = React.useState({
    adults: params.adults ? Number(getParamString(params.adults)) : 1,
    children: params.childrens ? Number(getParamString(params.childrens)) : 0,
    babies: params.infants ? Number(getParamString(params.infants)) : 0,
  });
  const [flightClass, setFlightClass] = React.useState(
    getParamString(params.cabinClass) || "economy"
  );

  // Swap function for bottom sheet
  const swapFromTo = () => {
    const tempQuery = fromQuery;
    setFromQuery(toQuery);
    setToQuery(tempQuery);
    const tempSelected = fromSelected;
    setFromSelected(toSelected);
    setToSelected(tempSelected);
  };

  // Handle opening bottom sheet
  const handleEditPress = () => {
    setIsBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
  };

  // Handle closing bottom sheet
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  };

  // Handle search from bottom sheet
  const onSearchFromBottomSheet = () => {
    refetch();
    handleCloseBottomSheet();
  };



  // Bottom sheet for editing search parameters
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  
  // Debounced queries for autocomplete in bottom sheet
  const [debouncedFromQuery, setDebouncedFromQuery] = React.useState(fromQuery);
  const [debouncedToQuery, setDebouncedToQuery] = React.useState(toQuery);

  // Debouncing effects
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFromQuery(fromQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [fromQuery]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedToQuery(toQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [toQuery]);

  // Autocomplete suggestions for bottom sheet
  const { data: fromSuggestions = [] } = useAutocomplete(
    fromFocused ? debouncedFromQuery : ""
  );
  const { data: toSuggestions = [] } = useAutocomplete(
    toFocused ? debouncedToQuery : ""
  );

  const {
    data: itineraries = [],
    isLoading,
    isError,
    refetch,
  } = useFlightSearch({
    originSkyId: fromSelected?.code || "",
    destinationSkyId: toSelected?.code || "",
    originEntityId: getParamString(params.originEntityId) || fromSelected?.code || "",
    destinationEntityId: getParamString(params.destinationEntityId) || toSelected?.code || "",
    date: departDate || "",
    returnDate: tripType === "round" ? returnDate || undefined : undefined,
    adults: people.adults,
    childrens: people.children,
    infants: people.babies,
    cabinClass: flightClass,
  });

  // Handler for applying filter
  const onApplyFilter = () => {
    refetch();
  };

  // Map itineraries to Flight type for the UI
  const mappedFlights: Flight[] = Array.isArray(itineraries)
    ? itineraries.map((itinerary: any) => {
        const outboundLeg = itinerary.legs[0];
        const returnLeg = itinerary.legs[1]; // For round trip
        const isRoundTrip = itinerary.legs.length > 1;

        return {
          id: itinerary.id,
          airline: outboundLeg.carriers?.marketing?.[0]?.name || "",
          flightNumber: outboundLeg.segments?.[0]?.flightNumber || "",
          departureTime: outboundLeg.departure?.split("T")[1]?.slice(0, 5) || "",
          arrivalTime: outboundLeg.arrival?.split("T")[1]?.slice(0, 5) || "",
          duration: outboundLeg.durationInMinutes
            ? `${Math.floor(outboundLeg.durationInMinutes / 60)}h ${
                outboundLeg.durationInMinutes % 60
              }m`
            : "",
          stops: outboundLeg.stopCount,
          price: itinerary.price?.raw || 0,
          formattedPrice: itinerary.price?.formatted || "$0",
          logoUrl: outboundLeg.carriers?.marketing?.[0]?.logoUrl || "",
          fromCode: outboundLeg.origin?.id || "",
          fromCity: outboundLeg.origin?.city || "",
          toCode: outboundLeg.destination?.id || "",
          toCity: outboundLeg.destination?.city || "",
          isRoundTrip,
          returnFlight: isRoundTrip && returnLeg ? {
            departureTime: returnLeg.departure?.split("T")[1]?.slice(0, 5) || "",
            arrivalTime: returnLeg.arrival?.split("T")[1]?.slice(0, 5) || "",
            duration: returnLeg.durationInMinutes
              ? `${Math.floor(returnLeg.durationInMinutes / 60)}h ${
                  returnLeg.durationInMinutes % 60
                }m`
              : "",
            stops: returnLeg.stopCount,
            airline: returnLeg.carriers?.marketing?.[0]?.name || "",
            flightNumber: returnLeg.segments?.[0]?.flightNumber || "",
            logoUrl: returnLeg.carriers?.marketing?.[0]?.logoUrl || "",
          } : undefined,
        };
      })
    : [];

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <LottieView
          source={require("../src/assets/animations/plane.json")}
          autoPlay
          loop
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.statusText}>Error loading flights.</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!mappedFlights.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.statusText}>No flights found for your search.</Text>
      </View>
    );
  }
  console.log("fromSelected", fromSelected);
  return (
    <View style={styles.container}>
      <FlightListHeader
        fromCode={fromSelected?.code || "-"}
        toCode={toSelected?.code || "-"}
        fromDate={departDate || "-"}
        toDate={tripType === "round" ? returnDate || undefined : undefined}
        duration={mappedFlights[0]?.duration || "1h45m"}
        stops={
          mappedFlights[0]?.stops === 0
            ? "Non stop"
            : `${mappedFlights[0]?.stops} stop${
                mappedFlights[0]?.stops > 1 ? "s" : ""
              }`
        }
        summaryText={`${
          flightClass.charAt(0).toUpperCase() + flightClass.slice(1)
        } Class, ${people.adults} Adult${people.adults > 1 ? "s" : ""}${
          people.children > 0
            ? `, ${people.children} Child${people.children > 1 ? "ren" : ""}`
            : ""
        }${
          people.babies > 0
            ? `, ${people.babies} Baby${people.babies > 1 ? "ies" : "y"}`
            : ""
        }`}
        topPadding={insets.top}
        onEditPress={handleEditPress}
      />
      <FlatList
        style={styles.listContainer}
        data={mappedFlights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FlightCard
            flight={item}
            onPress={(flightId) =>
              router.push({
                pathname: "/FlightDetails",
                params: { id: flightId },
              })
            }
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Bottom Sheet for Editing Search */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['90%']}
        enablePanDownToClose={true}
        onClose={handleCloseBottomSheet}
        index={-1}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Edit Search</Text>
          
          {/* Trip Type Tabs */}
          <TripTypeTabs
            tripType={tripType}
            setTripType={setTripType}
            variant="dark"
          />
          
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
            onSearchFlights={onSearchFromBottomSheet}
            buttonTitle="Update Search"
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
            noNegativeMargin={true}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: Spacing.medium,
    backgroundColor: Colors.light.background,
  },
  listContainer: {
    paddingHorizontal: Spacing.medium,
  },
  title: {
    fontSize: scale(20),
    fontWeight: "bold",
    color: Colors.blue,
    textAlign: "center",
    marginVertical: Spacing.medium,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
    padding: Spacing.large,
  },
  statusText: {
    marginTop: Spacing.medium,
    color: Colors.gray,
    fontSize: scale(16),
  },
  retryButton: {
    marginTop: Spacing.medium,
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    backgroundColor: Colors.blue,
    borderRadius: BorderRadius.medium,
  },
  retryText: {
    color: Colors.white,
    fontWeight: "bold",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.xsmall,
  },
  metaText: {
    fontSize: scale(13),
    color: Colors.gray,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.large,
    padding: Spacing.medium,
    marginBottom: Spacing.medium,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xsmall,
  },
  airportCode: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: Colors.blue,
  },
  dateText: {
    fontSize: scale(14),
    color: Colors.darkGray,
    textAlign: "center",
    marginBottom: Spacing.medium,
  },
  paramRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paramText: {
    fontSize: scale(13),
    color: Colors.darkGray,
    fontWeight: "600",
  },
  filterButton: {
    padding: Spacing.xsmall,
  },
  cancelButton: {
    backgroundColor: Colors.white,
    alignSelf: "center",
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
    borderRadius: BorderRadius.xlarge,
    marginTop: Spacing.large,
  },
  cancelButtonText: {
    color: Colors.blue,
    fontWeight: "bold",
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.small,
  },
  bottomSheetTitle: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: Colors.blue,
    textAlign: "center",
    marginBottom: Spacing.medium,
  },

});

export default FlightListScreen;
