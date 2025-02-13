import { View, Image, StyleSheet, Text } from "react-native";
import HeaderText from "./common/HeaderText";
import SubtitleText from "./common/SubtitleText";
import { NumberPadding } from "../utils/format";
import { PokemonCartItem } from "@features/shoppingCart/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAppDispatch } from "../store";
import { ShoppingCartActions } from "../store/features/shoppingCart/slice";

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
          <HeaderText>{data.name}</HeaderText>
          <SubtitleText>#{NumberPadding(data.id, 3)}</SubtitleText>

          <Text>Price: {data.price}</Text>
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
  },
  content: {
    flex: 1,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    margin: 10,
  }
});
