import { Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

function IconButton ({icon, onClick}) {
    return <Pressable
    onPress={onClick}
  >
    <View style={styles.addButton}>
      <Ionicons name='add' focused={true} size='30' color='#fff' />
    </View>

  </Pressable>
}

export default IconButton;

const styles = StyleSheet.create({
    addButton: {
      paddingRight: 20
    }
  })