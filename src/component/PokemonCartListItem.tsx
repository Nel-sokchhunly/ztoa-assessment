import { View, Image, StyleSheet, Text } from "react-native";
import HeaderText from "./common/HeaderText";
import SubtitleText from "./common/SubtitleText";
import { NumberPadding } from "../utils/format";
import { PokemonCartItem } from "@features/shoppingCart/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAppDispatch } from "../store";
import { ShoppingCartActions } from "../store/features/shoppingCart/slice";

const pokeball = require('@/assets/images/pokeball.png')

export default function PokemonCartListItem({ data }: { data: PokemonCartItem }) {
  const dispatch = useAppDispatch()

  const handleToggleCheck = () => {
    dispatch(ShoppingCartActions.toggleSelectItemInCart(data.id))
  }

  return (
    <View style={styles.wrapper}>
      <BouncyCheckbox
        style={styles.checkBox}
        disableText
        isChecked={data.selected}
        useBuiltInState={false}
        onPress={handleToggleCheck}
      />
      <View
        style={[
          styles.container,
        ]}
      >
        <Image
          source={{
            uri: data.sprites.front_default,
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <View style={styles.description}>
            <HeaderText>{data.name}</HeaderText>
            <SubtitleText>#{NumberPadding(data.id, 3)}</SubtitleText>
          </View>
          <View>
            <HeaderText>x{data.amount}</HeaderText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
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
    height: 40,
    width: 40,
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  description: {
    flex: 1,
  },
  checkBox: {
    marginLeft: 10,
  },

});
