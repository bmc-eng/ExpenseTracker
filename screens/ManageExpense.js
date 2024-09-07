import { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';

function ManageExpense({ route, navigation }) {
    const expenseIdSelected = route.params.expenseId;

    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenseIdSelected === 'NEW' ? 'Add Expense' : 'Manage Expense',
        })
    }, [navigation]);
    

    return <View>
        <Text>Manage Expenses Screen: {expenseIdSelected} </Text>
    </View>
    
    
}

export default ManageExpense;