import PokemonItem from "@/src/component/PokenmonItem";
import { selectAllPokemon } from "@/src/store/features/pokemon/selectors";
import { FlatList, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function StorePage() {
  const pokemon = useSelector(selectAllPokemon);

  if (!pokemon) return null; // TODO: handle later
  return (
    <View style={styles.container}>
      <FlatList
        data={pokemon.data}
        renderItem={({ item }) => <PokemonItem data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  }
})
