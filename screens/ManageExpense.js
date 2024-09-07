import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';

function ManageExpense({ route, navigation }) {
    const expenseIdSelected = route.params.expenseId;
    const isEditing = expenseIdSelected !== 'NEW'


    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenseIdSelected === 'NEW' ? 'Add Expense' : 'Manage Expense',
        })
    }, [navigation]);

    function deleteExpense() {
        navigation.goBack();
     }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        navigation.goBack();
    }


    return <View style={styles.container}>
        <Text style={styles.titleText}>Manage Expenses Screen: {expenseIdSelected} </Text>
        <View style={styles.buttonContainer}>
            <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
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
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
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
    },
    button: {
        minWidth: 120,
        marginHorizontal:8,
    }
})