import { Provider as ReduxProvider } from "react-redux";
import { Stack } from "expo-router";
import { store, persistor } from "@src/store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import StoreHeader from "../component/header/StoreHeader";

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "white" }}>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  header: () => <StoreHeader />,
                }}
              />
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
