// components/AutocompleteDropdown.tsx

import { MaterialIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { scale, Spacing, Typography } from "../constants/Metrics";

type SuggestionItem = {
  id: string;
  name: string;
  code: string;
  entityId: string;
  suggestionTitle?: string;
};

type Props = {
  value: string;
  onChange: (text: string) => void;
  suggestions: SuggestionItem[];
  placeholder: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onSelect: (item: SuggestionItem) => void;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  label: string;
};

const AutocompleteDropdown = ({
  value,
  onChange,
  suggestions,
  placeholder,
  focused,
  onFocus,
  onBlur,
  onSelect,
  iconName,
  label,
}: Props) => {
  return (
    <View style={{ marginBottom: Spacing.small }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        {iconName && (
          <MaterialIcons
            name={iconName}
            size={20}
            color={Colors.darkGray}
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray}
          value={value}
          onChangeText={onChange}
          autoCapitalize="characters"
          onFocus={onFocus}
          onBlur={() => setTimeout(onBlur, 100)}
        />
      </View>

      {focused && suggestions.length > 0 && (
        <ScrollView
          style={styles.suggestions}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
          {suggestions.map((item, index) => (
            <TouchableOpacity
              key={item.id || item.code || index}
              style={styles.suggestionItem}
              onPress={() => onSelect(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.suggestionItemText}>
                {item.suggestionTitle || item.name}
              </Text>
              <Text style={styles.suggestionItemSubText}>
                {item.name} ({item.code})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    paddingBottom: Spacing.xsmall,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.small,
    backgroundColor: Colors.white,
    fontSize: Typography.fontSize.sm,
    color: Colors.darkGray,
  },
  icon: {
    marginRight: Spacing.small,
  },
  suggestions: {
    maxHeight: scale(140),
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    zIndex: 10,
    marginTop: -Spacing.small,
  },
  suggestionItem: {
    padding: Spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  suggestionItemText: {
    fontSize: scale(14),
    color: Colors.darkGray,
  },
  suggestionItemSubText: {
    fontSize: scale(12),
    color: Colors.gray,
  },
  label: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.darkGray,
    fontFamily: Typography.fontFamily.poppinsRegular,
    marginTop: Spacing.medium,
  },
});

export default AutocompleteDropdown;
