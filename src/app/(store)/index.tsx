import HeaderText from "@/src/component/common/HeaderText";
import SubtitleText from "@/src/component/common/SubtitleText";
import PokemonDetailSheet from "@/src/component/PokemonDetailSheet";
import PokemonItem from "@/src/component/PokenmonItem";
import { useAppDispatch } from "@/src/store";
import { getPokemons } from "@/src/store/features/pokemon/actions";
import { selectAllPokemon, selectInitailizeState } from "@/src/store/features/pokemon/selectors";
import { PokemonActions } from "@/src/store/features/pokemon/slice";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function StorePage() {
  const dispatch = useAppDispatch()

  const pokemon = useSelector(selectAllPokemon);
  const initStatus = useSelector(selectInitailizeState)

  const handleRefetchData = () => {
    dispatch(getPokemons({}))
  }

  if (initStatus === 'idle' || initStatus === 'pending') {

    return (
      <View style={styles.pendingContainer}>
        <HeaderText>Loading...</HeaderText>
        <SubtitleText>Fetching pokemon data</SubtitleText>
      </View>
    )
  }

  if (initStatus === 'failed') {
    return (
      <View style={styles.failedContainer}>
        <HeaderText>Opss! Something Went Wrong!</HeaderText>

        <TouchableOpacity onPress={handleRefetchData}>
          Reload
        </TouchableOpacity>
      </View>
    )
  }

  if (pokemon === null) return
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
  pendingContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  failedContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
