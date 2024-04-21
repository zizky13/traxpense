import { Text, View, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { useState, useContext, useEffect } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import MyButton from "../components/MyButton";
import { GlobalStyles } from "../constants/GlobalStyles";
import { ExpenseContext } from "../store/expense-context";
import { Picker } from "@react-native-picker/picker";
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../firebase";

export default AddExpenseScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const exspenseCtx = useContext(ExpenseContext);
  const userId = exspenseCtx.userId;
  const expenseRef = ref(db, "users/" + userId + "/expenses");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (event.type === "set") {
      setDate(currentDate);
      console.log(currentDate);
    }
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const addRecord = () => {
    push(ref(db, "users/" + userId + "/expenses"), {
      description: description,
      amount: amount,
      category: category,
    }).then(() => {
      alert("Record added successfully!");
      setDescription("");
      setAmount(0);
      setCategory("");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Amount"
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Description"
        onChangeText={setDescription}
      />
      <Picker selectedValue={category} onValueChange={setCategory}>
        <Picker.Item label="Select a category" value="" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Gifts" value="Gifts" />
        <Picker.Item label="Health/medical" value="Health/medical" />
        <Picker.Item label="Home" value="Home" />
        <Picker.Item label="Transportation" value="Transportation" />
        <Picker.Item label="Personal" value="Personal" />
        <Picker.Item label="Pets" value="Pets" />
        <Picker.Item label="Utilities" value="Utilities" />
        <Picker.Item label="Travel" value="Travel" />
        <Picker.Item label="Debt" value="Debt" />
        <Picker.Item label="Loan" value="Loan" />
        <Picker.Item label="Others" value="Others" />
      </Picker>
      <View style={styles.dateSelector}>
        <Text>Date: {date ? date.toLocaleString() : "No date selected"}</Text>
        <MyButton
          optionalColor={GlobalStyles.colors.accent400}
          title="Set Date"
          onPress={showDatepicker}
        />
      </View>
      <MyButton title="Add Expense" onPress={addRecord} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    margin: 8,
  },

  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 8,
  },
});
