import { View, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { auth, db } from "../firebase";
import { ref, onValue } from "firebase/database";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default DetailScreen = ({ route }) => {
  const { category, path } = route.params;
  const [expenses, setExpenses] = useState([]);
  const userId = auth.currentUser?.uid;
  const navigation = useNavigation();

  useEffect(() => {
    const expensesRef = ref(db, "users/" + userId + "/expenses");
    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      const expensesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setExpenses(expensesArray);
    });
  }, []);
  const renderedData = expenses.filter((item) => item.category === category);
  
  const addScreenHandler = () => {
    if (path === "AddIncome") {
      navigation.navigate("AddIncome", { cat: category });
    } else if (path === "AddExpense") {
      navigation.navigate("AddExpense", { cat: category });
    }
  }

  return (
    <View>
      <Text>{category} Screen</Text>
      <MyButton title="Add Record" onPress={addScreenHandler} />
      <FlatList
        data={renderedData}
        renderItem={({ item }) => (
          <Cards>
            <Text>{item.amount}</Text>
            <Text>{item.description}</Text>
          </Cards>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
