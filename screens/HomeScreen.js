import { View, Text, StyleSheet, FlatList, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Cards from "../components/Cards";
import { useContext, useEffect } from "react";
import SummaryCard from "../components/SummaryCard";
import { ExpenseContext } from "../store/expense-context";
import CategoryGrid from "../components/CategoryGrid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth, useDatabaseData, db } from "../firebase";
import { GlobalStyles } from "../constants/GlobalStyles";
import { ref } from "firebase/database";

export default HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const expenseCtx = useContext(ExpenseContext);
  const dbref = ref(db, "users/" + auth.currentUser?.uid);
  const dbdata = useDatabaseData(dbref);

  useEffect(() => {
    const backAction = () => {
      return true; // This will prevent the back action
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Remove the event listener when the component unmounts
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      alert("User signed out successfully!");
      navigation.navigate("Start");
    } catch (error) {
      alert(error.message);
    }
  };

  let categoriesData, path, data = [];

  if (route.name === "Income") {
    categoriesData = expenseCtx.expenses[2]; // or whatever index corresponds to income data
    add = "Add Income";
    path = "AddIncome";
    data = categoriesData.incomes.map((income, index) => ({
      title: income,
      color: categoriesData.incomesColor[index],
    }));
  } else if (route.name === "Expense") {
    categoriesData = expenseCtx.expenses[1]; // or whatever index corresponds to expense data
    add = "Add Expense";
    path = "AddExpense";
    data = categoriesData.categories.map((category, index) => ({
      title: category,
      color: categoriesData.categoriesColor[index],
    }));
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.profilecontainer}>
        <Cards additionalStyle={styles.username}>
          <Text>Hello, {dbdata.username}</Text>
        </Cards>
        <MyButton
          style={styles.button}
          title="Sign Out"
          onPress={signOutUser}
        />
      </View>
      <View style={styles.summaryContainer}>
        <SummaryCard />
      </View>

      <View style={styles.expenseListContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CategoryGrid
              title={item.title}
              color={item.color}
              onPress={() => {
                navigation.navigate("Detail", {
                  category: item.title,
                  path: path,
                });
              }}
            />
          )}
          keyExtractor={(item) => item.title}
          numColumns={2}
          inverted={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },

  summaryContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: GlobalStyles.colors.neutral500,
    backgroundColor: GlobalStyles.colors.neutral100,
    margin: 3,
  },

  expenseListContainer: {
    flex: 1,
  },

  profilecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
