/**
 * Centralized color palette for the app. Add all project colors here for consistency.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#ccc",
    card: "#fff",
    shadow: "#000",
    inputBg: "#f7f7f7",
    inputBorder: "#ccc",
    suggestionBorder: "#eee",
    button: "#007AFF",
    placeholder: "#bbb",
    secondaryBg: "#f2f2f2",
    gradientStart: "#a8edea",
    gradientEnd: "#fed6e3",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    border: "#333",
    card: "#23272b",
    shadow: "#000",
    inputBg: "#23272b",
    inputBorder: "#333",
    suggestionBorder: "#333",
    button: "#007AFF",
    placeholder: "#bbb",
    secondaryBg: "#23272b",
    gradientStart: "#23272b", // fallback for dark
    gradientEnd: "#151718", // fallback for dark
  },
  // Universal colors
  white: "#fff",
  black: "#000",
  lightBlue: "#b4c5e4",
  blue: "#3066BE",
  darkBlue: "#090C9B",
  gray: "#CECECE",
  darkGray: "#2A292E",
  pink: "#fed6e3",
  yellow: "#DAA210",

  // Semantic colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
};
