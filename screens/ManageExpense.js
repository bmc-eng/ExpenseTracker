import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense, deleteExpenseFromDB } from '../utils/http';

function ManageExpense({ route, navigation }) {
    const expenseIdSelected = route.params.expenseId;
    const isEditing = expenseIdSelected !== 'NEW'

    const expensesCtx = useContext(ExpensesContext);

    const selectedExpense = expensesCtx.expenses.find((expense) => {
        return expense.id === expenseIdSelected;
    })

    console.log(selectedExpense);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenseIdSelected === 'NEW' ? 'Add Expense' : 'Manage Expense',
        })
    }, [navigation]);

    async function deleteExpense() {
        expensesCtx.deleteExpense(expenseIdSelected);
        await deleteExpenseFromDB(expenseIdSelected);
        Alert.alert("Expense deleted");
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        //const confirmDate = new Date('2024-09-08');
        console.log(isEditing)
        if (isEditing) {
            expensesCtx.updateExpense(expenseIdSelected,expenseData);
            await updateExpense(expenseIdSelected, expenseData);
        } else {
            //const newExpense = { description: 'Test expense', amount: 19.99, date: confirmDate }
            const id = await storeExpense(expenseData);
            expensesCtx.addExpense({...expenseData, id: id});
        }
        navigation.goBack();
    }


    return <View style={styles.container}>
        <Text style={styles.titleText}>Your Expense</Text>
        <View style={styles.form}>
            <ExpenseForm
                buttonName={isEditing ? 'Update' : 'Add'}
                cancelHandler={cancelHandler}
                onSubmit={confirmHandler}
                expenseData = {selectedExpense}
            />
        </View>
        {isEditing && (
            <View style={styles.deleteContainer}>
                <IconButton
                    icon='trash'
                    onClick={deleteExpense}
                    color={GlobalStyles.colors.error500}
                    size='36'
                />
            </View>
        )
        }
    </View>

}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        backgroundColor: GlobalStyles.colors.primary800,
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        paddingBottom: 40,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',

    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
        topMargin: 60,
    },
    form: {
        flex: 1,
    }
})