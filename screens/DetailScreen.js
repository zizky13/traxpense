import { View, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { auth, db } from "../firebase";
import { ref, onValue } from "firebase/database";

export default DetailScreen = ({ route }) => {
  const { category } = route.params;
  const [expenses, setExpenses] = useState([]);
  const userId = auth.currentUser?.uid;

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

  return (
    <View>
      <Text>{category} Screen</Text>
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
