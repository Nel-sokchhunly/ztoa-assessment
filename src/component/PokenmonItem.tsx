import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Pokemon } from "@features/pokemon/types";
import HeaderText from "./common/HeaderText";
import { useAppDispatch } from "../store";
import { pokemonDetailActions } from "../store/features/pokemonDetailSheet/slice";

export default function PokemonItem({ data }: { data: Pokemon }) {
  const dispatch = useAppDispatch()

  const handleViewDetail = () => {
    dispatch(pokemonDetailActions.showBottomSheet(data))
  }

  return (
    <View style={[
      styles.container,

    ]}>
      <Image
        source={{
          uri: data.sprites.front_default,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <HeaderText>{data.name}</HeaderText>

        <TouchableOpacity onPress={handleViewDetail}>
          <Text>Detail</Text>
        </TouchableOpacity>

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    padding: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
  image: {
    height: 100,
    width: 100,
  },
  content: {
    flex: 1,
    height: '100%',
  },
});
