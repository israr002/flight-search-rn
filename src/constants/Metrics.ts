import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// Scale function for responsive design
export const scale = (size: number): number => {
  const baseWidth = 375; // iPhone X width as base
  return (width / baseWidth) * size;
};

export const Spacing = {
  xsmall: scale(4),
  small: scale(8),
  medium: scale(16),
  large: scale(24),
  xlarge: scale(32),
};

export const BorderRadius = {
  small: scale(4),
  medium: scale(8),
  large: scale(12),
  xlarge: scale(16),
};

// Typography constants
export const Typography = {
  fontFamily: {
    primary: Platform.select({
      ios: "SF Pro Display",
      android: "Roboto",
      default: "System",
    }),
    secondary: Platform.select({
      ios: "SF Pro Text",
      android: "Roboto",
      default: "System",
    }),
    poppinsRegular: "Poppins-Regular",
    poppinsBold: "Poppins-Bold",
  },
  fontSize: {
    xs: scale(12),
    sm: scale(14),
    base: scale(16),
    lg: scale(18),
    xl: scale(20),
    "2xl": scale(24),
    "3xl": scale(30),
    "4xl": scale(36),
  },
  fontWeight: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Shadow presets
export const Shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
