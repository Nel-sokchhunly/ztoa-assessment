import PokemonDetailSheet from "@/src/component/PokemonDetailSheet";
import PokemonItem from "@/src/component/PokenmonItem";
import { selectAllPokemon } from "@/src/store/features/pokemon/selectors";
import { FlatList, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function StorePage() {
  const pokemon = useSelector(selectAllPokemon);

  if (!pokemon) return null; // TODO: handle later
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={pokemon.data}
          style={{ flex: 1 }}
          numColumns={2}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <PokemonItem data={item} />}
        />

      </View>
      <PokemonDetailSheet />
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,

  },
})
