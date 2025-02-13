import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Pokemon } from "@features/pokemon/types";
import HeaderText from "./common/HeaderText";
import { useAppDispatch } from "../store";
import { PokemonDetailActions } from "../store/features/pokemonDetailSheet/slice";
import SubtitleText from "./common/SubtitleText";
import { NumberPadding } from "../utils/format";

export default function PokemonItem<T extends Pokemon>({ data }: { data: T }) {
  const dispatch = useAppDispatch()

  const handleViewDetail = () => {
    dispatch(PokemonDetailActions.showBottomSheet(data))
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
      ]}
      onPress={handleViewDetail}
    >
      <Image
        source={{
          uri: data.sprites.front_default,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <HeaderText>{data.name}</HeaderText>
        <SubtitleText>#{NumberPadding(data.id, 3)}</SubtitleText>
      </View>


    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  image: {
    height: 100,
    width: 100,
  },
  content: {
    flex: 1,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
