import { View, Text, Image, StyleSheet } from "react-native";
import { Pokemon } from "@features/pokemon/types";

export default function PokemonItem({ data }: { data: Pokemon }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: data.sprites.front_default,
        }}
        style={styles.image}
      />
      <Text>{data.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
  },
});
