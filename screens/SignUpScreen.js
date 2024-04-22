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
} from "react-native";
import { useReducer } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import MyButton from "../components/MyButton";
import { GlobalStyles } from "../constants/GlobalStyles";
import { set, ref } from "firebase/database";

export default SignUpScreen = () => {
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    balance: 0,
    emailValidMessage: "",
    passwordValidMessage: "",
    confirmPasswordValidMessage: "",
    balanceValidMessage: "",
    usernameValidMessage: "",
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
        });
        
        alert("User created successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });

  };
  const emailHandler = (email) => {
    dispatch({ type: "EMAIL", payload: email });
    if (email.includes("@") && email.includes(".") || email === "") {
      dispatch({ type: "EMAIL_VALID_MESSAGE", payload: "" });
    } else {
      dispatch({ type: "EMAIL_VALID_MESSAGE", payload: "Invalid email format" });
    }
  };

  const passwordHandler = (password) => {
    dispatch({ type: "PASSWORD", payload: password })
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
      dispatch({ type: "USERNAME_VALID_MESSAGE", payload: "Username cannot be empty" });
    } else if (username.includes(" ")){
      dispatch({ type: "USERNAME_VALID_MESSAGE", payload: "Username cannot contain spaces" });      
    } else {
      dispatch({ type: "USERNAME_VALID_MESSAGE", payload: "" });
    }
  };

  const balanceHandler = (balance) => {
    dispatch({ type: "BALANCE", payload: balance });
    if (balance < 0) {
      dispatch({ type: "BALANCE_VALID_MESSAGE", payload: "Balance cannot be negative" });
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
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email here"
              value={state.email}
              onChangeText={emailHandler}
            />
            {state.emailValidMessage !== "" && (
              <Text>{state.emailValidMessage}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter your password here"
              value={state.password}
              onChangeText={passwordHandler}
              secureTextEntry
            />
            {state.passwordValidMessage !== "" && (
              <Text>{state.passwordValidMessage}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Confirm your password here"
              value={state.confirmPassword}
              onChangeText={confirmPasswordHandler}
              secureTextEntry
            />
            {state.confirmPasswordValidMessage !== "" && <Text>{state.confirmPasswordValidMessage}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Enter your username here"
              value={state.usename}
              onChangeText={usernameHandler}
            />
            {state.usernameValidMessage !== "" && <Text>{state.usernameValidMessage}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Enter your balance here"
              value={state.balance}
              onChangeText={balanceHandler}
              keyboardType="numeric"
            />
            {state.balanceValidMessage !== "" && (
              <Text>{state.balanceValidMessage}</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <MyButton
          title="Sign Up"
          onPress={() => signUp(state.email, state.password)}
        />
      </View>
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
    borderRadius: 10,
    padding: 8,
    margin: 8,
  },

  buttonContainer: {
    margin: 8,
    spaceBetween: 8,
  },
});
