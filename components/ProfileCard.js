import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MyButton from "../components/MyButton";
import { signOut } from "firebase/auth";
import Cards from "../components/Cards";
import { GlobalStyles } from "../constants/GlobalStyles";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default ProfileCard = ({ dbdata }) => {
  const navigation = useNavigation();

  const signOutUser = async () => {
    try {
      await signOut(auth);
      alert("User signed out successfully!");
      navigation.navigate("Start");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.profilecontainer}>
      <Cards additionalStyle={styles.summaryContainer}>
        <View style={styles.nameCardContainer}>
          <Cards>
            <Text style={styles.textStyle}>Hello, {dbdata.username} </Text>
          </Cards>
          <MyButton
            optionalColor={GlobalStyles.colors.error}
            textStyle={{
              color: GlobalStyles.colors.neutral100,
              fontSize: 12,
            }}
            title="Sign Out"
            onPress={signOutUser}
          />
        </View>

        <Text style={styles.textStyle}>Total Balance</Text>
        <Text>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(dbdata.balance)}
        </Text>
      </Cards>
    </View>
  );
};

const styles = StyleSheet.create({
  profilecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nameCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: GlobalStyles.colors.neutral500,
    backgroundColor: GlobalStyles.colors.neutral100,
    margin: 3,
    flex: 1,
  },

  textStyle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: GlobalStyles.colors.neutral800,
  },
});
