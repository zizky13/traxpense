import { Text, View, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";
import MyButton from "../components/MyButton";
import { GlobalStyles } from "../constants/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default StartScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("User is signed in with uid: ", uid);
      navigation.navigate("Home");
    }
  });

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("User signed in successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("User created successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
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
      <MyButton
        style={styles.button}
        title="Sign In"
        onPress={() => createUser(email, password)}
      />
      <MyButton
        style={styles.button}
        title="Get Started!"
        onPress={() => login(email, password)}
      />
    </View>
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
    minWidth: 150,
  },
});
