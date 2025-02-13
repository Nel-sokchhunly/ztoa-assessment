import { Provider as ReduxProvider } from "react-redux";
import { Stack } from "expo-router";
import { store, persistor } from "@src/store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import StoreHeader from "../component/header/StoreHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Toasts } from '@backpackapp-io/react-native-toast'

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "white" }}>
          <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'grey' }}>
            <SafeAreaView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <Stack

                  screenOptions={{
                    header: () => <StoreHeader />
                  }}>
                  <Stack.Screen
                    name="(store)"
                  />
                  <Stack.Screen
                    name="checkout"
                  />
                </Stack>
              </BottomSheetModalProvider>
            </SafeAreaView>
            <Toasts />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
