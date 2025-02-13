import { selectCartAsList } from "@features/shoppingCart/selectors";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import HeaderText from "@/src/component/common/HeaderText";
import PokemonCartListItem from "@/src/component/PokemonCartListItem";

export default function CartPage() {
  const cart = useSelector(selectCartAsList)


  console.log(cart)
  return (
    <View
      style={styles.container}
    >
      <HeaderText>Shopping Cart</HeaderText>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonCartListItem data={item} />}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  headerWrapper: {

  }
})
