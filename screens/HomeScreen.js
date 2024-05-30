import { View, StyleSheet, FlatList, BackHandler, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../store/expense-context";
import CategoryGrid from "../components/CategoryGrid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, useDatabaseData, db } from "../firebase";
import { GlobalStyles } from "../constants/GlobalStyles";
import { ref } from "firebase/database";
import ProfileCard from "../components/ProfileCard";

export default HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const expenseCtx = useContext(ExpenseContext);
  const dbref = ref(db, "users/" + auth.currentUser?.uid);
  const dbdata = useDatabaseData(dbref);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = navigation.addListener("focus", () => {
      setIsLoading(true);
    });

    return unsub;
  }, [navigation]);

  useEffect(() => {
    if (dbdata) {
      setIsLoading(false);
    }
  }, [dbdata]);

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

  

  let categoriesData,
    path,
    data = [];

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
      <View style={styles.expenseListContainer}>
        <FlatList
          data={data}
          ListFooterComponent={
            <ProfileCard dbdata={dbdata} />
          }
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

  textStyle: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },

  expenseListContainer: {
    flex: 1,
  },


  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  username:{
    borderColor: GlobalStyles.colors.neutral500
  }
});
