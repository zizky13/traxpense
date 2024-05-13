import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";


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
  const renderedDataByDate = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const addScreenHandler = () => {
    if (path === "AddIncome") {
      navigation.navigate("AddIncome", { cat: category });
    } else if (path === "AddExpense") {
      navigation.navigate("AddExpense", { cat: category });
    }
  }

  const rupiahConverter = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  }

  const deleteHandler = (id) => {
    remove(ref(db, "users/" + userId + "/expenses/" + id));
  }

  const editHandler = (id) => {
    navigation.navigate("AddIncome", { id: id });
  }

  return (
    <View>
      <Text>{category} Screen</Text>
      <MyButton title="Add Record" onPress={addScreenHandler} />
      {category === "By Date" ? (
        <FlatList
          data={renderedDataByDate}
          renderItem={({ item }) => (
            <View style={styles.recordContainer}>
              <Text style={styles.dateText}>{item.date}</Text>

              <TouchableOpacity style={styles.recordDetails}>
                <Text style={styles.recordText}>
                  {rupiahConverter(item.amount)}
                </Text>
                <Text style={styles.recordText}>{item.description}</Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <MyButton
                  title="Edit"
                  onPress={() => {
                    editHandler(item.id);
                  }}
                />
                <MyButton
                  title="Delete"
                  onPress={() => deleteHandler(item.id)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={renderedData}
          renderItem={({ item }) => (
            <View style={styles.recordContainer}>
              <Text style={styles.dateText}>{item.date}</Text>

              <TouchableOpacity style={styles.recordDetails}>
                <Text style={styles.recordText}>
                  {rupiahConverter(item.amount)}
                </Text>
                <Text style={styles.recordText}>{item.description}</Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <MyButton
                  title="Edit"
                  onPress={() => {
                    editHandler(item.id);
                  }}
                />
                <MyButton
                  title="Delete"
                  onPress={() => deleteHandler(item.id)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  recordContainer: {
    flexDirection: "row",
    flex:1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 5,
    marginVertcial: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },

  dateText: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },

  recordDetails: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8
  },

  recordText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
})