import { View, Text, StyleSheet, FlatList } from "react-native";
import Cards from "../components/Cards";
import { useContext } from "react";
import SummaryCard from "../components/SummaryCard";
import { ExpenseContext } from "../store/expense-context";
import CategoryGrid from "../components/CategoryGrid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"

export default HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const expenseCtx = useContext(ExpenseContext);
  
  const signOutUser = async () => {
    try {
      await signOut(auth);
      alert("User signed out successfully!");
      navigation.navigate("Start");
    } catch (error) {
      alert(error.message);
    }
  };

  let categoriesData;
  let data = [];
  if (route.name === "Income") {
    categoriesData = expenseCtx.expenses[2]; // or whatever index corresponds to income data
    data = categoriesData.incomes.map((income, index) => ({
      title: income,
      color: categoriesData.incomesColor[index],
    }));
  } else if (route.name === "Expense") {
    categoriesData = expenseCtx.expenses[1]; // or whatever index corresponds to expense data
    data = categoriesData.categories.map((category, index) => ({
      title: category,
      color: categoriesData.categoriesColor[index],
    }));
  }

  

  return (
    <View style={styles.outerContainer}>
      <View style={styles.summaryContainer}>
        <SummaryCard />
        <View style={styles.innerSummaryContainer}>
          <CategoryGrid title="Sign Out" color="white" onPress={signOutUser} />
          <Cards>
            <Text>Income Summary</Text>
          </Cards>
          <Cards>
            <Text>Outcome Summary</Text>
          </Cards>
        </View>
      </View>

      <View style={styles.expenseListContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CategoryGrid
              title={item.title}
              color={item.color}
              onPress={() => {
                navigation.navigate("Detail", { category: item.title });
              }}
            />
          )}
          keyExtractor={(item) => item.title}
          numColumns={2}
          inverted={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },

  summaryContainer: {
    backgroundColor: "blue",
  },

  innerSummaryContainer: {
    flexDirection: "row",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  expenseListContainer: {
    flex: 1,
  },
});
