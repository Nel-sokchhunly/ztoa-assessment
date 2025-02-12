import { Provider as ReduxProvider } from "react-redux";
import { Stack } from "expo-router";
import { store, persistor } from "@src/store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </PersistGate>
    </ReduxProvider>
  );
}
