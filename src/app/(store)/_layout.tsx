import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Store, ShoppingCart } from "lucide-react-native";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#0075BE",


      }}

    >
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color }) => <Store color={color} size="24" />
      }} />
      <Tabs.Screen name="cart" options={{
        title: "Cart",
        tabBarIcon: ({ color }) => <ShoppingCart color={color} size="24" />
      }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0
  }
})
