import {Text } from 'react-native';

function ManageExpense({route, navigation}) {
    const expenseIdSelected = route.params.expenseId;

    navigation.setOptions({
        title: expenseIdSelected === 'NEW' ? "Add Expense" : "Manage Expense"
    })

    return <Text>Manage Expenses Screen: {expenseIdSelected}</Text>;
}

export default ManageExpense;