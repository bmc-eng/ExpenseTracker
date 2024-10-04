import { Alert, StyleSheet, View } from "react-native";
import ExpenseInput from "./ExpenseInput";
import Button from "../UI/Button";
import { useState } from "react";


function ExpenseForm({ cancelHandler, onSubmit, buttonName, expenseData }) {

    const todaysDate = new Date()
    const [formState, setFormState] = useState({
        amount: expenseData  ? expenseData.amount.toString() : '',
        date: expenseData  ? expenseData.date.toISOString().slice(0, 10) : todaysDate.toISOString().slice(0,10),
        description: expenseData  ? expenseData.description : ''
    });

    function formChangeHandler(identifier, value) {
        setFormState((curInputValues) => {
            return {
                ...curInputValues,
                [identifier]: value
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +formState.amount,
            date: new Date(formState.date),
            description: formState.description
        }

        // validate the expenses
        const isValidAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const isValidDate = expenseData.date.toString() !== 'Invalid Date';
        const isValidDescription = expenseData.description.length > 0;

        if (!isValidAmount || !isValidDate || !isValidDescription) {
            Alert.alert("Please enter in valid expense data.")
            return
        }
        onSubmit(expenseData)
    }

    return <View style={styles.container}>
        <View style={styles.topRow}>
            <ExpenseInput
                name='Date:'
                textInputOptions={{
                    autoComplete: 'off',
                    keyboardType: 'numbers-and-punctuation',
                    placeholder: 'YYYY-MM-DD',
                    onChangeText: formChangeHandler.bind(this, 'date'),
                    value: formState.date
                }} />
            <ExpenseInput name='Amount:'
                textInputOptions={{
                    keyboardType: 'decimal',
                    placeholder: '0.00',
                    inputMode: 'decimal',
                    onChangeText: formChangeHandler.bind(this, 'amount'),
                    value: formState.amount
                }} />
        </View>
        <View style={styles.bottomRow}>
            <ExpenseInput name='Description:' textInputOptions={{
                multiline: true,
                onChangeText: formChangeHandler.bind(this, 'description'),
                value: formState.description
            }} />
        </View>
        <View style={styles.buttonContainer}>
            <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{buttonName}</Button>
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
        flex: 1,
        minHeight: 40,
        maxHeight: 160
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        topMargin: 60
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
})