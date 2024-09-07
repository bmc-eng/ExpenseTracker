import { createContext, useReducer } from "react";

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
        date: new Date('2024-09-02')
    },
    {
        id: 'e6',
        description: 'another book',
        amount: 12.50,
        date: new Date('2024-09-05')
    }
]


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date} ) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses
        case 'DELETE':
            return state.filter(() => expense.id !== action.payload);
        default:
            return state;
    }
}


function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, TEST_EXPENSES);

    function addExpense({expenseData}){
        dispatch({type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, expenseData: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };
    
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;