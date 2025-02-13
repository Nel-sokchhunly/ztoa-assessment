import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectActiveDetailPokemon, selectModalVisibility } from "@features/pokemonDetailSheet/selectors";
import { useAppDispatch } from "../store";
import { pokemonDetailActions } from "../store/features/pokemonDetailSheet/slice";
import HeaderText from "./common/HeaderText";
import { Plus } from "lucide-react-native";

export default function PokemonDetailSheet() {
  const dispatch = useAppDispatch()

  const modalVisibility = useSelector(selectModalVisibility)
  const detail = useSelector(selectActiveDetailPokemon)
  const ref = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (modalVisibility) {
      ref.current?.present()
    } else {
      ref.current?.dismiss()
    }
  }, [modalVisibility])

  const handleDismiss = () => {
    dispatch(pokemonDetailActions.hideBottomSheet())
  }

  const handleAddToCart = () => {
    console.log('add to cart', detail)
  }

  if (detail === null) return

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={BottomSheetBackdrop}
      snapPoints={['100%']}
      onDismiss={handleDismiss}
    >
      <BottomSheetView style={styles.view}>
        <View style={styles.header}>
          <Image
            source={{
              uri: detail.sprites.front_default
            }}
            style={styles.headerLogo}
          />
          <View style={styles.headerContent}>
            <View style={styles.headerTitle}>
              <HeaderText>{detail.name}</HeaderText>
            </View>
            <TouchableOpacity
              onPress={handleDismiss}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: 'red',
                  transform: 'rotate(45deg)'
                }}
              >
                <Plus size={24} />
              </View>
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity onPress={handleAddToCart}>
          <Text>Add To Cart</Text>
        </TouchableOpacity>

      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerLogo: {
    height: 100,
    width: 100,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 10
  },
  headerTitle: {
    flex: 1
  }
})
