import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "@/firebaseConfig"; // Initialize Firebase
import { useFonts } from "expo-font";
import AuthWrapper from "@/components/AuthWrapper";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../src/assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null; // or a loading indicator
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <StatusBar style="light" backgroundColor="transparent" translucent />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="home" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="flight-list" />
          </Stack>
        </AuthWrapper>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
 