import React from "react";
import { View, StyleSheet } from "react-native";
import AutocompleteDropdown from "./AutoCompleteDropdown";
import DateRangePicker from "./DateRangePicker";
import CustomButton from "./CustomButton";
import SwapButton from "./SwapButton";
import PeopleInput from "./PeopleInput";
import ClassInput from "./ClassInput";
import { Colors } from "@/constants/Colors";
import { BorderRadius, Spacing, Typography } from "@/constants/Metrics";

export type SuggestionItem = { id: string; name: string; code: string; entityId: string };

interface FilterCardProps {
  fromQuery: string;
  setFromQuery: (q: string) => void;
  toQuery: string;
  setToQuery: (q: string) => void;
  fromSelected: SuggestionItem | null;
  setFromSelected: (item: SuggestionItem | null) => void;
  toSelected: SuggestionItem | null;
  setToSelected: (item: SuggestionItem | null) => void;
  fromSuggestions: SuggestionItem[];
  toSuggestions: SuggestionItem[];
  fromFocused: boolean;
  setFromFocused: (b: boolean) => void;
  toFocused: boolean;
  setToFocused: (b: boolean) => void;
  swapFromTo: () => void;
  tripType: "oneway" | "round";
  setTripType: (t: "oneway" | "round") => void;
  departDate: string | null;
  setDepartDate: (d: string | null) => void;
  returnDate: string | null;
  setReturnDate: (d: string | null) => void;
  people: { adults: number; children: number; babies: number };
  setPeople: (p: { adults: number; children: number; babies: number }) => void;
  flightClass: string;
  setFlightClass: (c: string) => void;
  onSearchFlights: () => void;
  buttonTitle?: string;
  fromValue?: string;
  onFromSelect?: (item: SuggestionItem) => void;
  toValue?: string;
  onToSelect?: (item: SuggestionItem) => void;
}

const FilterCard: React.FC<FilterCardProps> = ({
  fromQuery,
  setFromQuery,
  toQuery,
  setToQuery,
  fromSelected,
  setFromSelected,
  toSelected,
  setToSelected,
  fromSuggestions,
  toSuggestions,
  fromFocused,
  setFromFocused,
  toFocused,
  setToFocused,
  swapFromTo,
  tripType,
  setTripType,
  departDate,
  setDepartDate,
  returnDate,
  setReturnDate,
  people,
  setPeople,
  flightClass,
  setFlightClass,
  onSearchFlights,
  buttonTitle = "Search Flights",
  fromValue,
  onFromSelect,
  toValue,
  onToSelect,
}) => {
  console.log("fromSuggestion", fromSuggestions);
  return (
    <View style={styles.card}>
      <AutocompleteDropdown
        value={fromValue !== undefined ? fromValue : fromSelected?.name || ""}
        onChange={setFromQuery}
        suggestions={fromSuggestions}
        placeholder="From (city or airport)"
        focused={fromFocused}
        onFocus={() => setFromFocused(true)}
        onBlur={() => setFromFocused(false)}
        onSelect={
          onFromSelect
            ? onFromSelect
            : (item) => {
                setFromQuery(item.code);
                setFromSelected(item);
                setFromFocused(false);
              }
        }
        iconName="flight-takeoff"
        label="From"
      />
      <AutocompleteDropdown
        value={toValue !== undefined ? toValue : toSelected?.name || ""}
        onChange={setToQuery}
        suggestions={toSuggestions}
        placeholder="To (city or airport)"
        focused={toFocused}
        onFocus={() => setToFocused(true)}
        onBlur={() => setToFocused(false)}
        onSelect={
          onToSelect
            ? onToSelect
            : (item) => {
                setToQuery(item.code);
                setToSelected(item);
                setToFocused(false);
              }
        }
        iconName="flight-land"
        label="To"
      />
      <SwapButton onPress={swapFromTo} />
      <DateRangePicker
        departDate={departDate}
        returnDate={tripType === "round" ? returnDate : null}
        onDatesChange={(depart: any, ret: any) => {
          setDepartDate(depart);
          setReturnDate(ret);
        }}
        roundTrip={tripType === "round"}
      />
      <PeopleInput value={people} onChange={setPeople} />
      <ClassInput value={flightClass} onChange={setFlightClass} />
      <View style={styles.buttonContainer}>
        <CustomButton
          title={buttonTitle}
          onPress={onSearchFlights}
          variant="primary"
          size="large"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: -70,
  },
  buttonContainer: {
    marginTop: Spacing.medium,
  },
});

export default FilterCard;
