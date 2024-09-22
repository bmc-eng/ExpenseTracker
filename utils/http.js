import axios from "axios";

const BACKEND_URL = "https://react-native-expense-fb495-default-rtdb.firebaseio.com/"

export function storeExpense(expenseData) {
    axios.post(BACKEND_URL + 'expenses.json', expenseData);
}