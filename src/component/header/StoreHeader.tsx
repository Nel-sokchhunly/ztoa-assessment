import { Image, StyleSheet, View } from "react-native";

const Logo = require("@/assets/images/pokemon-logo.png");

export default function StoreHeader() {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 5,
  },
  logo: {
    height: 50,
    width: "auto",
  },
});
