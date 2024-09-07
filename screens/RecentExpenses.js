import { useContext } from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/dates';

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expenses) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)
        return expenses.date > date7DaysAgo;
    });
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />;
}

export default RecentExpenses;