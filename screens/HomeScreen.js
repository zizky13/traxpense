import { View, Text, StyleSheet, FlatList } from "react-native";
import Cards from "../components/Cards";
import { useContext } from "react";
import SummaryCard from "../components/SummaryCard";
import { ExpenseContext } from "../store/expense-context";
import CategoryGrid from "../components/CategoryGrid";
import { useNavigation } from "@react-navigation/native";



export default HomeScreen = () => {
  const navigation = useNavigation();
  const expenseCtx = useContext(ExpenseContext);
  const categoriesData = expenseCtx.expenses[1];
  const data = categoriesData.categories.map((category, index) => ({ //map through the categories
    title: category, //return an object with title and color
    color: categoriesData.categoriesColor[index],
  }));

  return (
    <View style={styles.outerContainer}>
      <View style={styles.summaryContainer}>
        <SummaryCard />
        <View style={styles.innerSummaryContainer}>
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "red",
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
    backgroundColor: "yellow",
    flex: 1,
  },
});
