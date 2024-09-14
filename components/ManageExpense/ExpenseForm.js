import { StyleSheet, View } from "react-native";
import ExpenseInput from "./ExpenseInput";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";


function ExpenseForm({ cancelHandler, confirmHandler, buttonName }) {
    return <View style={styles.container}>
        <View style={styles.topRow}>
            <ExpenseInput
                name='Date:'
                textInputOptions={{
                    autoComplete: 'off',
                    keyboardType: 'numbers-and-punctuation',
                    placeholder: 'YYYY-MM-DD'
                }} />
            <ExpenseInput name='Amount:'
                textInputOptions={{
                    keyboardType: 'decimal',
                    placeholder: '0.00',
                    inputMode: 'decimal',
                }} />
        </View>
        <View style={styles.bottomRow}>
            <ExpenseInput name='Description:' textInputOptions={{
                multiline: true,
            }} />
        </View>
        <View style={styles.buttonContainer}>
            <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.button} onPress={confirmHandler}>{buttonName}</Button>
        </View>
        

    </View>
}

export default ExpenseForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //borderColor: 'white',
        //borderWidth: 1
    },
    topRow: {
        flexDirection: 'row',
    },
    bottomRow: {
        flex:1,
        minHeight: 40,
        maxHeight: 160
    },
    buttonContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        topMargin:60
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
})