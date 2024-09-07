import { Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

function IconButton ({icon, size, color, onClick}) {
    return <Pressable
    onPress={onClick}
  >
    <View style={styles.addButton}>
      <Ionicons name={icon} focused={true} size={size} color={color} />
    </View>

  </Pressable>
}

export default IconButton;

const styles = StyleSheet.create({
    addButton: {
      paddingRight: 20
    }
  })