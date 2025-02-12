import { Provider as ReduxProvider } from "react-redux";
import { Stack } from "expo-router";
import { store, persistor } from "@src/store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "white" }}>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="index" />
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
