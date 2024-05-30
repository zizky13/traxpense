import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useReducer, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import MyButton from "../components/MyButton";
import { GlobalStyles } from "../constants/GlobalStyles";
import { set, ref } from "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default SignUpScreen = () => {
  const navigation = useNavigation();
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    balance: 0,
    emailValidMessage: "",
    passwordValidMessage: "",
    confirmPasswordValidMessage: "",
    balanceValidMessage: "Balance cannot be empty",
    usernameValidMessage: "Username cannot be empty",
    userID: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "EMAIL":
        return { ...state, email: action.payload };
      case "PASSWORD":
        return { ...state, password: action.payload };
      case "CONFIRM_PASSWORD":
        return { ...state, confirmPassword: action.payload };
      case "USERNAME":
        return { ...state, username: action.payload };
      case "BALANCE":
        return { ...state, balance: action.payload };
      case "EMAIL_VALID_MESSAGE":
        return { ...state, emailValidMessage: action.payload };
      case "PASSWORD_VALID_MESSAGE":
        return { ...state, passwordValidMessage: action.payload };
      case "CONFIRM_PASSWORD_VALID_MESSAGE":
        return { ...state, confirmPasswordValidMessage: action.payload };
      case "BALANCE_VALID_MESSAGE":
        return { ...state, balanceValidMessage: action.payload };
      case "USERNAME_VALID_MESSAGE":
        return { ...state, usernameValidMessage: action.payload };
      case "USER_ID":
        return { ...state, userID: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollViewRef = useRef();

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "USER_ID", payload: user.uid });

        set(ref(db, "users/" + user.uid), {
          balance: state.balance,
          username: state.username,
          password: state.password,
          expenses: "",
          incomeSummary: 0,
          outcomeSummary: 0,
        });

        Alert.alert(
          "Success",
          "User created successfully!",
          [{ text: "OK", onPress: () => navigation.navigate("Home") }],
          { cancelable: false }
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const emailHandler = (email) => {
    dispatch({ type: "EMAIL", payload: email });
    if ((email.includes("@") && email.includes(".")) || email === "") {
      dispatch({ type: "EMAIL_VALID_MESSAGE", payload: "" });
    } else {
      dispatch({
        type: "EMAIL_VALID_MESSAGE",
        payload: "Invalid email format",
      });
    }
  };

  const passwordHandler = (password) => {
    dispatch({ type: "PASSWORD", payload: password });
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(password) && password !== "") {
      dispatch({
        type: "PASSWORD_VALID_MESSAGE",
        payload:
          "Password must contain at least 6 characters, one letter, one number and one special character",
      });
    } else {
      dispatch({ type: "PASSWORD_VALID_MESSAGE", payload: "" });
    }
  };

  const confirmPasswordHandler = (confirmPassword) => {
    dispatch({ type: "CONFIRM_PASSWORD", payload: confirmPassword });
    if (confirmPassword !== state.password && confirmPassword !== "") {
      dispatch({
        type: "CONFIRM_PASSWORD_VALID_MESSAGE",
        payload: "Passwords do not match",
      });
    } else {
      dispatch({ type: "CONFIRM_PASSWORD_VALID_MESSAGE", payload: "" });
    }
  };

  const usernameHandler = (username) => {
    dispatch({ type: "USERNAME", payload: username });
    if (username === "") {
      dispatch({
        type: "USERNAME_VALID_MESSAGE",
        payload: "Username cannot be empty",
      });
    } else if (username.includes(" ")) {
      dispatch({
        type: "USERNAME_VALID_MESSAGE",
        payload: "Username cannot contain spaces",
      });
    } else if (username.length > 16) {
      dispatch({
        type: "USERNAME_VALID_MESSAGE",
        payload: "Username cannot be more than 16 characters",
      });
    } else {
      dispatch({ type: "USERNAME_VALID_MESSAGE", payload: "" });
    }
  };

  const rupiahConvert = (text) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(text);
  };

  const balanceHandler = (balance) => {
    dispatch({ type: "BALANCE", payload: balance });
    if (balance < 0) {
      dispatch({
        type: "BALANCE_VALID_MESSAGE",
        payload: "Balance cannot be negative",
      });
    } else if (balance === "") {
      dispatch({
        type: "BALANCE_VALID_MESSAGE",
        payload: "Balance cannot be empty",
      });
    } else if (isNaN(balance)) {
      dispatch({
        type: "BALANCE_VALID_MESSAGE",
        payload: "Balance must be a number",
      });
    } else {
      dispatch({ type: "BALANCE_VALID_MESSAGE", payload: "" });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -300}
    >
      <SafeAreaView>
        <ScrollView ref={scrollViewRef}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>Create Account</Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={emailHandler}
                keyboardType="email-address"
              />
              {state.emailValidMessage !== "" && (
                <View style={styles.errorContainer}>
                  <Text style={{ color: "red" }}>
                    {state.emailValidMessage}
                  </Text>
                </View>
              )}
              <View style={styles.passwordContainer}>
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={passwordHandler}
                    secureTextEntry
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    onChangeText={confirmPasswordHandler}
                    secureTextEntry
                  />
                </View>
              </View>
              {state.passwordValidMessage !== "" && (
                <View style={styles.errorContainer}>
                  <Text style={{ color: "red" }}>
                    {state.passwordValidMessage}
                  </Text>
                </View>
              )}
              {state.confirmPasswordValidMessage !== "" && (
                <View style={styles.errorContainer}>
                  <Text style={{ color: "red" }}>
                    {state.confirmPasswordValidMessage}
                  </Text>
                </View>
              )}
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={usernameHandler}
              />
              {state.usernameValidMessage !== "" && (
                <View style={styles.errorContainer}>
                  <Text style={{ color: "red" }}>
                    {state.usernameValidMessage}
                  </Text>
                </View>
              )}
              <TextInput
                style={styles.input}
                placeholder="Balance"
                value={rupiahConvert(state.balance)}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, "");
                  balanceHandler(Number(numericText));
                }}
                keyboardType="numeric"
              />
              {state.balanceValidMessage !== "" && (
                <View style={styles.errorContainer}>
                  <Text style={{ color: "red" }}>
                    {state.balanceValidMessage}
                  </Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.buttonContainer}>
            <MyButton
              title="Sign Up"
              textStyle={{ color: GlobalStyles.colors.neutral100 }}
              optionalColor={GlobalStyles.colors.primary200}
              onPress={() => signUp(state.email, state.password)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.neutral100,
  },

  input: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.neutral500,
    borderRadius: 10,
    padding: 8,
    margin: 8,
  },

  buttonContainer: {
    margin: 8,
    spaceBetween: 8,
  },

  errorContainer: {
    marginHorizontal: 8,
  },

  passwordContainer: {
    flexDirection: "row",
  },

  headingContainer:{
    margin: 8,
  },

  heading: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
  }
});
