import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectActiveDetailPokemon, selectModalVisibility } from "@features/pokemonDetailSheet/selectors";
import { useAppDispatch } from "../store";
import { PokemonDetailActions } from "../store/features/pokemonDetailSheet/slice";
import HeaderText from "./common/HeaderText";
import SubtitleText from "./common/SubtitleText";
import { NumberPadding } from "../utils/format";
import { FlatList } from "react-native-gesture-handler";
import { ShoppingCartActions } from "../store/features/shoppingCart/slice";
import { showMessage } from "react-native-flash-message";


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
    dispatch(PokemonDetailActions.hideBottomSheet())
  }

  const handleAddToCart = () => {
    if (!detail) {
      showMessage({
        message: 'Ops! There is no data...',
        type: 'danger'
      })
      return
    }

    dispatch(ShoppingCartActions.addToCart(detail))
    showMessage({
      message: 'Added To Cart!',
      type: 'success'
    })
    ref.current?.dismiss()
  }


  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  if (detail === null) return
  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={renderBackdrop}
      onDismiss={handleDismiss}
    >
      <BottomSheetView style={styles.view}>
        <View style={styles.header}>
          <View style={styles.headerLogoWrapper}>
            <Image
              source={{
                uri: detail.sprites.front_default
              }}
              style={styles.headerLogo}
            />
          </View>
          <View style={styles.headerContent}>
            <HeaderText style={styles.headerText}>{detail.name}</HeaderText>
            <SubtitleText>#{NumberPadding(detail.id, 3)}</SubtitleText>
          </View>

          <View >
            <HeaderText style={{ marginLeft: 10, marginBottom: 10 }}>Abilities</HeaderText>
            <FlatList
              data={detail.abilities}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.abilityCart}>
                  <SubtitleText >{item.ability.name}</SubtitleText>
                </View>
              )}
              style={styles.abilityScroll}
            />
          </View>
        </View>


        {/*Actions*/}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionAddToCart} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionDismiss} onPress={handleDismiss}>
            <Text style={styles.dismissText}>Close</Text>
          </TouchableOpacity>
        </View>


      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
  },
  header: {
    flex: 1,
    display: 'flex',
  },
  headerLogoWrapper: {
    width: '100%',
    alignItems: 'center'

  },

  headerLogo: {
    height: 200,
    width: 200,
  },
  headerContent: {
    width: '100%',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 32,
  },

  abilityScroll: {
    width: '100%',
    flexDirection: 'row',
    marginRight: 10
  },
  abilityCart: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
    padding: 20,
    marginLeft: 10
  },

  actions: {
    display: 'flex',
    padding: 10,
  },
  actionAddToCart: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FCCF00',
  },
  addToCartText: {
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionDismiss: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  dismissText: {
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
