import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useEffect, useState, useContext } from "react";
import MyButton from "../components/MyButton";
import { GlobalStyles } from "../constants/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import "../firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { ExpenseContext } from "../store/expense-context";

export default StartScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const expenseCtx = useContext(ExpenseContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    console.log("User is signed in with uid: ", expenseCtx.userId);
    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, []);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("User signed in successfully!");
        const user = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Traxpense</Text>
        <Text style={styles.subtitleText}>Manage your expense wisely</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <MyButton
          style={styles.button}
          optionalColor={GlobalStyles.colors.primary200}
          title="Login"
          textStyle={{ color: GlobalStyles.colors.neutral100 }}
          onPress={() => login(email, password)}
        />
        <Text>Or</Text>
        <MyButton
          style={styles.button}
          optionalColor={GlobalStyles.colors.accent200}
          title="Sign Up"
          textStyle={{ color: GlobalStyles.colors.neutral100 }}
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.neutral100,
  },

  button: {
    minWidth: 100,
    margin: 8,
  },

  titleText: {
    fontFamily: "Inter-Bold",
    fontSize: 48,
  },

  subtitleText: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    margin: 8,
    minWidth: 300,
  },
});
