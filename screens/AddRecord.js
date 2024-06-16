import { Text, View, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import MyButton from "../components/MyButton";
import { GlobalStyles } from "../constants/GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import { ref, push, update, set, get } from "firebase/database";
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
  const itemId = route.params.id;

  if (itemId) {
    //check if this is edit operation
    useEffect(() => {
      get(ref(db, "users/" + userId + "/expenses/" + itemId))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setAmount(snapshot.val().amount);
            setDescription(snapshot.val().description);
            setCategory(snapshot.val().category);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, [itemId, userId]);
  }

  const trimDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    if (cat !== "By Date") setCategory(cat);
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
    const newRecordRef = push(ref(db, "users/" + userId + "/expenses"), {
      description: description,
      amount: amount,
      category: category,
      date: date.toLocaleDateString(),
    });

    newRecordRef.then(() => {
      update(newRecordRef, { id: newRecordRef.key });
      alert("Record added successfully!");
      setDescription("");
      setAmount(0);
      setCategory("");
    });

    get(ref(db, "users/" + userId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let totalExpenses = 0;
          let totalIncome = 0;
          const expenses = snapshot.val().expenses;
          for (let key in expenses) {
            if (
              expenses[key].category === "Savings" ||
              expenses[key].category === "Paycheck" ||
              expenses[key].category === "Bonus" ||
              expenses[key].category === "Interest"
            ) {
              totalIncome += expenses[key].amount;
              console.log("Income: ", totalIncome);
            } else {
              totalExpenses += expenses[key].amount;
              console.log("Expenses: ", totalExpenses);
            }
          }

          if (route.name === "AddIncome") {
            update(ref(db, "users/" + userId), {
              incomeSummary: totalIncome,
              balance: snapshot.val().balance + amount,
            });
          } else {
            update(ref(db, "users/" + userId), {
              outcomeSummary: totalExpenses,
              balance: snapshot.val().balance - amount,
            });
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editRecord = async () => {
    const previousAmountRef = ref(
      db,
      "users/" + userId + "/expenses/" + itemId + "/amount"
    );
    const snapshot = await get(previousAmountRef);
    const previousAmount = snapshot.val();
    console.log("Previous amount: ", previousAmount);

    const editRecordRef = set(
      ref(db, "users/" + userId + "/expenses/" + itemId),
      {
        description: description,
        amount: amount,
        category: category,
        date: date.toLocaleDateString(),
      }
    );

    await editRecordRef;

    alert("Record edited successfully!");
    setDescription("");
    setAmount(0);
    setCategory("");

    const userRef = ref(db, "users/" + userId);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      let totalExpenses = 0;
      let totalIncome = 0;
      const expenses = userSnapshot.val().expenses;
      for (let key in expenses) {
        if (
          expenses[key].category === "Savings" ||
          expenses[key].category === "Paycheck" ||
          expenses[key].category === "Bonus" ||
          expenses[key].category === "Interest"
        ) {
          totalIncome += expenses[key].amount;
          console.log("Income: ", totalIncome);
        } else {
          totalExpenses += expenses[key].amount;
          console.log("Expenses: ", totalExpenses);
        }
      }

      if (route.name === "AddIncome") {
        update(userRef, {
          incomeSummary: totalIncome,
          balance: userSnapshot.val().balance - previousAmount + amount,
        });
      } else {
        update(userRef, {
          outcomeSummary: totalExpenses,
          balance: userSnapshot.val().balance - previousAmount + amount,
        });
      }
    } else {
      console.log("No data available");
    }
  };

  const rupiahConvert = (text) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Add Record of {cat}</Text>
      <TextInput
        style={styles.textInput}
        value={rupiahConvert(amount)}
        placeholder="Amount"
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, "");
          setAmount(Number(numericText));
        }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      {(route.name === "AddExpense" && cat === "By Date") || itemId ? (
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
      ) : null}

      {(route.name === "AddIncome" && cat === "By Date") || itemId ? (
        <Picker selectedValue={category} onValueChange={setCategory}>
          <Picker.Item label="Add new income" value="Add new income" />
          <Picker.Item label="Savings" value="Savings" />
          <Picker.Item label="Paycheck" value="Paycheck" />
          <Picker.Item label="Bonus" value="Bonus" />
          <Picker.Item label="Interest" value="Interest" />
        </Picker>
      ) : null}

      <View style={styles.dateSelector}>
        <Text>
          Date: {date ? date.toLocaleDateString() : "No date selected"}
        </Text>
        {cat !== "By Date" && (
          <MyButton
            optionalColor={GlobalStyles.colors.accent400}
            title="Set Date"
            textStyle={{ color: GlobalStyles.colors.neutral100 }}
            onPress={showDatepicker}
          />
        )}
      </View>
      {itemId ? (
        <MyButton
          title="Edit"
          onPress={editRecord}
          optionalColor={GlobalStyles.colors.primary300}
          textStyle={{ color: GlobalStyles.colors.neutral100 }}
        />
      ) : (
        <MyButton
          title="Add"
          onPress={addRecord}
          optionalColor={GlobalStyles.colors.primary300}
          textStyle={{ color: GlobalStyles.colors.neutral100 }}
        />
      )}
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
