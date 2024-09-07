import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/IconButton';
import { GlobalStyles } from '../constants/styles';

function ManageExpense({ route, navigation }) {
    const expenseIdSelected = route.params.expenseId;
    const isEditing = expenseIdSelected !== 'NEW'


    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenseIdSelected === 'NEW' ? 'Add Expense' : 'Manage Expense',
        })
    }, [navigation]);

    function deleteExpense() { }


    return <View style={styles.container}>
        <Text style={styles.titleText}>Manage Expenses Screen: {expenseIdSelected} </Text>
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
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
    titleText: {
        fontSize:16,
        fontWeight:'bold',
        color:'white'
    }
})