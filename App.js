import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview({ navigation }) {

  function manageExpenseClicked() {
    navigation.navigate("ManageExpense", {
      expenseId: "NEW"
    })
  }

  return <BottomTabs.Navigator screenOptions={{
    headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
  }}>
    <BottomTabs.Screen
      name="RecentExpenses"
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' focused={true} size={size} color={color} />,
        headerRight: () => (
          <IconButton icon='add' onClick={manageExpenseClicked} color='#fff' size='30' />
        ),
      }} />
    <BottomTabs.Screen
      name="AllExpenses"
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />,
        headerRight: () => (
          <IconButton icon='add' onClick={manageExpenseClicked} color='#fff' size='30'/>
        )
      }} />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='ExpensesOverview'
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white',
            headerBackTitle: 'Back'
          }}>
          <Stack.Screen name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{ presentation: 'modal' }} />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
      <StatusBar style="light" />
    </>
  );
}



