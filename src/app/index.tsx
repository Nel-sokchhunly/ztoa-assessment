import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectAllPokemon } from "@/src/store/features/pokemon/selectors";
import HeaderText from "@/src/component/common/HeaderText";
import PokemonItem from "../component/PokenmonItem";

export default function Index() {
  const pokemon = useSelector(selectAllPokemon);

  return (
    <View style={styles.container}>
      {pokemon && (
        <FlatList
          data={pokemon.data}
          renderItem={({ item }) => <PokemonItem data={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
});
