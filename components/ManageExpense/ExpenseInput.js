import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpenseInput({ name, textInputOptions }) {

    return <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <TextInput
            style={[styles.textInput, name === 'Description:' && styles.multiline]}
            {...textInputOptions} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: GlobalStyles.colors.primary200,
        fontSize: 16,
        padding: 10
    },
    textInput: {
        backgroundColor: GlobalStyles.colors.primary200,
        color: GlobalStyles.colors.primary800,
        fontSize: 16,
        borderRadius: 8,
        marginTop: 3,
        marginBottom: 10,
        marginHorizontal: 10,
        padding: 10,
    },
    multiline: {
        minHeight: 100,
    }
})

export default ExpenseInput;