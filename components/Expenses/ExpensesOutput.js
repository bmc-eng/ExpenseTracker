import { FlatList, Text, View } from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"

const TEST_EXPENSES = [
    {
        id: 'e1',
        description: 'a pair of shoes',
        amount: 59.99,
        date: new Date('2024-08-29')
    },
    {
        id: 'e2',
        description: 'a pair of trousers',
        amount: 98.54,
        date: new Date('2024-08-28')
    },
    {
        id: 'e3',
        description: 'some bananas',
        amount: 3.50,
        date: new Date('2024-08-20')
    },
    {
        id: 'e4',
        description: 'a membership to the gym',
        amount: 45.00,
        date: new Date('2024-08-26')
    },
    {
        id: 'e5',
        description: 'a book',
        amount: 24.99,
        date: new Date('2024-08-13')
    },
    {
        id: 'e6',
        description: 'another book',
        amount: 12.50,
        date: new Date('2024-08-10')
    }
]

function ExpensesOutput({expenses, expensesPeriod}) {
    return <View>
        <ExpensesSummary expenses={TEST_EXPENSES} periodName={expensesPeriod}/>
        <ExpensesList expenses={TEST_EXPENSES}/>
    </View>
}

export default ExpensesOutput