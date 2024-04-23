import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { LoadFonts } from "./assets/fonts/LoadFonts";
import * as SplashScreen from "expo-splash-screen";
import DetailScreen from "./screens/DetailScreen";
import HomeScreen from "./screens/HomeScreen";
import StartScreen from "./screens/StartScreen";
import ExpenseContextProvider from "./store/expense-context";
import SignUpScreen from "./screens/SignUpScreen";
import AddRecord from "./screens/AddRecord";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NewHome = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
      }}>
      <Tab.Screen name="Expense" component={HomeScreen} />
      <Tab.Screen name="Income" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts
        await LoadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <ExpenseContextProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Home" component={NewHome} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="AddExpense" component={AddRecord} />
          <Stack.Screen name="AddIncome" component={AddRecord} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpenseContextProvider>
  );
}
