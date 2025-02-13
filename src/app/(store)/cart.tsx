import { selectAllSelectedStatus, selectCartAsList, selectSelectedItems } from "@features/shoppingCart/selectors";
import { Alert, TouchableOpacity, FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import HeaderText from "@/src/component/common/HeaderText";
import PokemonCartListItem from "@/src/component/PokemonCartListItem";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAppDispatch } from "@/src/store";
import { ShoppingCartActions } from "@/src/store/features/shoppingCart/slice";
import SubtitleText from "@/src/component/common/SubtitleText";


export default function CartPage() {
  const dispatch = useAppDispatch()

  const cart = useSelector(selectCartAsList)
  const isAllSelected = useSelector(selectAllSelectedStatus)
  const selectedItems = useSelector(selectSelectedItems)

  const isCartEmpty = cart.length === 0
  const isSelectedEmpty = selectedItems.length === 0

  const handleSelectAll = () => {
    dispatch(ShoppingCartActions.toggleSelectAll())
  }

  const handleRemovingItems = () => {
    const ids = selectedItems.map(item => item.id)
    Alert.alert(
      "Are you sure?",
      undefined,
      [
        { text: "Dismiss", style: "cancel" },
        {
          text: "Proceed",
          style: "destructive",
          onPress: () => dispatch(ShoppingCartActions.removeFromCartByIds(ids))
          ,
        },
      ]
    );
  }

  return (
    <View
      style={styles.container}
    >
      <HeaderText>Shopping Cart</HeaderText>

      {!isCartEmpty && (
        <>
          <View style={styles.header}>
            <View style={styles.selectAll}>
              <BouncyCheckbox
                disableText
                isChecked={isAllSelected}
                useBuiltInState={false}
                onPress={() => handleSelectAll()}
                style={{
                  marginRight: 10
                }}
              />
              <HeaderText>Select All</HeaderText>
            </View>

            {!isSelectedEmpty && (
              <TouchableOpacity onPress={handleRemovingItems} >
                <Text style={styles.removeBtn}>Clear</Text>
              </TouchableOpacity>
            )}

          </View>

          <FlatList
            data={cart}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <PokemonCartListItem data={item} />}
          />

        </>
      )}


      {isCartEmpty && (
        <View style={styles.cartEmpty}>
          <SubtitleText>Opss! Cart is Empty</SubtitleText>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.actionCheckout,
            (isCartEmpty || isSelectedEmpty) && {
              opacity: 0.5
            }
          ]}
          disabled={isCartEmpty || isSelectedEmpty}
          onPress={() => { }}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectAll: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  actions: {
    display: 'flex',
    padding: 10,
  },
  actionCheckout: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FCCF00',
  },
  checkoutText: {
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeBtn: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16
  },
  cartEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
