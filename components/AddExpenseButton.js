import { Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

function AddExpenseButton () {
    return <Pressable
    onPress={() => alert('This is a button!')}
  >
    <View style={styles.addButton}>
      <Ionicons name='add' focused={true} size='30' color='#fff' />
    </View>

  </Pressable>
}

export default AddExpenseButton;

const styles = StyleSheet.create({
    addButton: {
      paddingRight: 20
    }
  })