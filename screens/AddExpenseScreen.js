import { Text, View, Button, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import MyButton from "../components/MyButton";
import Cards from "../components/Cards";
import { GlobalStyles } from "../constants/GlobalStyles";
import { set } from "firebase/database";
import { db } from "../firebase";

export default AddExpenseScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());

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

  const addRecord = () => {}

  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.textInput} placeholder="Amount" />
      <TextInput style={styles.textInput} placeholder="Description" />
      <TextInput style={styles.textInput} placeholder="Category" />
      <View style={styles.dateSelector}>
        <Text>
          Date: {date ? date.toLocaleString() : "No date selected"}
        </Text>
        <MyButton optionalColor={GlobalStyles.colors.accent400} title="Set Date" onPress={showDatepicker} />
      </View>
      <MyButton title="Add Expense" onPress={addRecord} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },

  textInput:{
    borderWidth:1,
    borderRadius: 10,
    padding: 8,
    margin: 8
  },

  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 8,
  },
});
