import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

function ManageExpense({ route, navigation }) {
    const expenseIdSelected = route.params.expenseId;
    const isEditing = expenseIdSelected !== 'NEW'

    const expensesCtx = useContext(ExpensesContext);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenseIdSelected === 'NEW' ? 'Add Expense' : 'Manage Expense',
        })
    }, [navigation]);

    function deleteExpense() {
        expensesCtx.deleteExpense(expenseIdSelected);
        alert("Expense deleted");
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expenseData) {
        //const confirmDate = new Date('2024-09-08');
        console.log(isEditing)
        if (isEditing) {
            expensesCtx.updateExpense(expenseIdSelected,expenseData);
        } else {
            //const newExpense = { description: 'Test expense', amount: 19.99, date: confirmDate }
            expensesCtx.addExpense(expenseData);
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