import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    setExpenses: (expenses) => {},
    updateExpense: (id, {description, amount, date} ) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            return action.payload.reverse();
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id);
            
            const removedExpenses = state.filter((expense) => expense.id !== action.payload.id);
            const updatedItem = {'id': action.payload.id, ...action.payload.expenseData}
            const updatedExpenses = [updatedItem, ...removedExpenses]
            return updatedExpenses
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}


function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, expenseData: expenseData}});
        console.log(id);
        console.log(expenseData);
        console.log(expensesState);
    }

    function setExpenses(expenses) {
        dispatch({type:'SET', payload: expenses});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
        setExpenses: setExpenses
    };
    
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;