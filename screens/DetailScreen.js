import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { auth, db, useDatabaseData } from "../firebase";
import { ref, onValue, remove, get, set } from "firebase/database";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/GlobalStyles";
import dayjs from "dayjs";

export default DetailScreen = ({ route }) => {
  const { category, path } = route.params;
  const [expenses, setExpenses] = useState([]);
  const userId = auth.currentUser?.uid;
  const dbdata = useDatabaseData(ref(db, "users/" + userId));
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
  const renderedDataByDate = expenses.sort(
    (a, b) => dayjs(b.date, "M/DD/YYYY") - dayjs(a.date, "M/DD/YYYY")
  );

  const addScreenHandler = () => {
    if (path === "AddIncome") {
      navigation.navigate("AddIncome", { cat: category });
    } else if (path === "AddExpense") {
      navigation.navigate("AddExpense", { cat: category });
    }
  };

  const rupiahConverter = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const deleteHandler = async (id) => {
    try {
      // Fetch the amount of the record
      const recordRef = ref(db, "users/" + userId + "/expenses/" + id);
      const recordSnapshot = await get(recordRef);
      const record = recordSnapshot.val();
      const amount = record ? record.amount : 0;
      let newBalance = 0,
        newIncomeSummary = 0,
        newOutcomeSummary = 0;

      //FETCH EXPENSES
      const expensesRef = ref(db, "users/" + userId + "/expenses");
      const expensesSnapshot = await get(expensesRef);
      const expenses = expensesSnapshot.val();

      // If the current record is the only one, add a placeholder record
      // PREVENTS e error
      if (expenses && Object.keys(expenses).length === 1) {
        const placeholderRef = ref(
          db,
          "users/" + userId + "/expenses/placeholder"
        );
        await set(placeholderRef, { amount: 0 });
      }

      // Subtract the amount from the current balance and update the balance in the database
      if (path === "AddIncome") {
        //check current path, if its income, then we subtract the current balance to amount
        newBalance = dbdata.balance - amount;
        newIncomeSummary = dbdata.incomeSummary - amount;
      } else if (path === "AddExpense") {
        //otherwise
        newBalance = dbdata.balance + amount;
        newOutcomeSummary = dbdata.outcomeSummary - amount;
      }
      await set(ref(db, "users/" + userId + "/balance"), newBalance);
      await set(
        ref(db, "users/" + userId + "/incomeSummary"),
        newIncomeSummary
      );
      await set(
        ref(db, "users/" + userId + "/outcomeSummary"),
        newOutcomeSummary
      );

      // Remove the record
      await remove(recordRef);
    } catch (error) {
      console.error(error);
    }
  };

  const editHandler = (id) => {
    navigation.navigate("AddIncome", { id: id });
  };

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>{category}</Text>
      </View>
      <MyButton
        textStyle={{ color: GlobalStyles.colors.neutral100 }}
        optionalColor={GlobalStyles.colors.primary300}
        title="Add Record"
        onPress={addScreenHandler}
      />

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
                textStyle={{ color: GlobalStyles.colors.neutral100 }}
                optionalColor={GlobalStyles.colors.primary300}
                onPress={() => {
                  editHandler(item.id);
                }}
              />
              <MyButton
                title="Delete"
                textStyle={{ color: GlobalStyles.colors.neutral100 }}
                optionalColor={GlobalStyles.colors.error}
                onPress={() => deleteHandler(item.id)}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recordContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 5,
    marginVertcial: 10,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.neutral300,
  },

  dateText: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },

  recordDetails: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  recordText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: GlobalStyles.colors.neutral800,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  title: {
    fontFamily: "Montserrat-Black",
    fontSize: 20,
    margin: 10,
  },
});
