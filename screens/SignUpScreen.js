import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import MyButton from "../components/MyButton";
import { GlobalStyles } from "../constants/GlobalStyles";

export default SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [balance, setBalance] = useState(0);
  const [emailValidMessage, setEmailValidMessage] = useState("");
  const [passwordValidMessage, setPasswordValidMessage] = useState("");

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("User created successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const emailHandler = (email) => {
    setEmail(email);
    if (email.includes("@") && email.includes(".")) {
      setEmailValidMessage("");
    } else {
      setEmailValidMessage("Please enter a valid email address");
    }
  };

  const passwordHandler = (password) => {
    setPassword(password);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordValidMessage(
        "Password must be at least 6 characters long and contain at least one letter, one number, and one special character"
      );
    } else {
      setPasswordValidMessage("");
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
              value={email}
              onChangeText={emailHandler}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password here"
              value={password}
              onChangeText={passwordHandler}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm your password here"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your username here"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your balance here"
              value={balance}
              onChangeText={setBalance}
            />
            <Text>{emailValidMessage}</Text>
            <Text>{passwordValidMessage}</Text>
            <MyButton title="Sign Up" onPress={() => signUp(email, password)} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
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
});
