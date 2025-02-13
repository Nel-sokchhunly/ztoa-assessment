import { View, Text, StyleSheet } from "react-native";
import HeaderText from "../component/common/HeaderText";
import { Link } from "expo-router";

export default function CheckoutPage() {

  return (
    <View style={styles.container}>
      <HeaderText>You're checked out!</HeaderText>

      <Link style={styles.returnBtn} href='/'>
        <Text style={styles.returnText}>
          Return to Store
        </Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  returnBtn: {
    marginTop: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FCCF00',
  },
  returnText: {
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
    fontSize: 16,
  },

})
