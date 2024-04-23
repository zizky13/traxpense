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
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text>Don't have account? Register here:</Text>
      <MyButton
        style={styles.button}
        title="Sign In"
        onPress={() => navigation.navigate("SignUp")}
      />
      <MyButton
        style={styles.button}
        title="Get Started!"
        onPress={() => login(email, password)}
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
    margin: 10,
    marginTop: 20,
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
