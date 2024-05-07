import { Text, View, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import MyButton from "../components/MyButton";
import { GlobalStyles } from "../constants/GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import { ref, push } from "firebase/database";
import { auth, db } from "../firebase";
import { useRoute } from "@react-navigation/native";

export default AddRecord = () => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const route = useRoute();
  const cat = route.params.cat;
  const userId = auth.currentUser?.uid;

  const trimDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  useEffect(() => {
    if (cat !== 'By Date')
    setCategory(cat);
  }, [cat]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (event.type === "set") {
      setDate(currentDate);
      console.log(date);
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
      date: date.toLocaleDateString(),
    }).then(() => {
      alert("Record added successfully!");
      setDescription("");
      setAmount(0);
      setCategory("");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Add Record of {cat}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Amount"
        onChangeText={(text) => setAmount(Number(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Description"
        onChangeText={setDescription}
      />
      {route.name === "AddExpense" && cat === "By Date" && (
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
      )}
      {(route.name === "AddIncome" && cat === "By Date") && (
        <Picker selectedValue={category} onValueChange={setCategory}>
          <Picker.Item label="Add new income" value="Add new income" />
          <Picker.Item label="Savings" value="Savings" />
          <Picker.Item label="Paycheck" value="Paycheck" />
          <Picker.Item label="Bonus" value="Bonus" />
          <Picker.Item label="Interest" value="Interest" />
        </Picker>
      )}

      <View style={styles.dateSelector}>
        <Text>Date: {date ? date.toLocaleDateString() : "No date selected"}</Text>
        {cat !== "By Date" && (<MyButton
          optionalColor={GlobalStyles.colors.accent400}
          title="Set Date"
          onPress={showDatepicker}
        />)}
      </View>
      <MyButton title="Add" onPress={addRecord} />
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
