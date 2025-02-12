import { Provider as ReduxProvider } from "react-redux";
import { Stack } from "expo-router";
import store from "@src/store";

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ReduxProvider>
  );
}
