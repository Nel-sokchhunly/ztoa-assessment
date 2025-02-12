import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectAllPokemon } from "@/src/store/features/pokemon/selectors";

export default function Index() {
  const pokemon = useSelector(selectAllPokemon);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text>Items</Text>
      {pokemon && (
        <FlatList
          data={pokemon.data}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      )}
    </View>
  );
}
