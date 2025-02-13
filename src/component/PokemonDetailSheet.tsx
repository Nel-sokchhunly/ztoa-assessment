import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectActiveDetailPokemon, selectModalVisibility } from "@features/pokemonDetailSheet/selectors";
import { useAppDispatch } from "../store";
import { pokemonDetailActions } from "../store/features/pokemonDetailSheet/slice";
import HeaderText from "./common/HeaderText";
import SubtitleText from "./common/SubtitleText";
import { NumberPadding } from "../utils/format";
import { FlatList } from "react-native-gesture-handler";
import { toast } from "@backpackapp-io/react-native-toast";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

const pokeball = require('@/assets/images/pokeball.png')

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
    toast('Added to cart!', {
      duration: 3000
    }) // TODO: not working
    ref.current?.dismiss()
    console.log('add to cart', detail)
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

          <View style={styles.priceWrapper}>
            <HeaderText>Price:</HeaderText>

            <View style={styles.price} >
              <SubtitleText style={styles.priceText}>{detail.price}</SubtitleText>
              <Image
                source={pokeball}
                style={{
                  width: 16,
                  height: 16
                }}
                resizeMode="contain"
              />
            </View>
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
  },
  abilityCart: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
    padding: 20,
    marginHorizontal: 10
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
  priceWrapper: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
    alignItems: 'flex-end'
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  priceText: {
    fontSize: 16,
    color: 'black',
    marginRight: 5,
  }
})
