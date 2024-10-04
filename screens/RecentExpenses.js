import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/dates';
import { fetchExpenses } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    const [period, setPeriod] = useState(7)
    const [isFetching, setFetchingState] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function getExpenses (){
            setFetchingState(true)
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error){
                setError("Could not fetch expenses");
            }
            setFetchingState(false);
            
        }
        getExpenses();
    }, []) ;

    function errorHandler(){
        setError(null);
    }

    if (error && !isFetching){
        return <ErrorOverlay message={error} errorHandler={errorHandler}/>
    }

    function changePeriodicity(){
        console.log("called periodicity change")
        if (period === 7) {
            setPeriod(30);
        } else {
            setPeriod(7)
        }
    }

    if (isFetching){
        return <LoadingOverlay/>
    }

    const recentExpenses = expensesCtx.expenses.filter((expenses) => {
        const today = new Date();
        const dateXDaysAgo = getDateMinusDays(today, period)
        return expenses.date > dateXDaysAgo;
    });

    let expensePeriod = "Last " + period + " Days"
    const fallbackText = "No expenses in the last " + period  + " days" 


    return <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod={expensePeriod}
        fallbackText={fallbackText} 
        onPress={changePeriodicity}/>;
}

export default RecentExpenses;