import Cards from "./Cards";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { auth, db, useDatabaseData } from "../firebase";
import { ref } from "firebase/database";
import { Feather, Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/GlobalStyles";

//DATA NEEDED: total income, total outcome, starting balance, end balance

export default SummaryCard = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const dbref = ref(db, "users/" + auth.currentUser?.uid);
  const dbdata = useDatabaseData(dbref);
  const [incomeSummary, setIncomeSummary] = useState(0);
  const [outcomeSummary, setOutcomeSummary] = useState(0);
  const [savings, setSavings] = useState(0);
  const savingsPercentage = incomeSummary !== 0 ? (savings / incomeSummary) * 100 : 0;
  
  const styles = StyleSheet.create({
    outerContainer: {
      justifyContent: "center",
    },
    
    box:{
      marginVertical: 12,
      width: "100%",
      height: 10,
      backgroundColor: "black",
      borderRadius: 12,
    },

    boxDalam:{
      height: "100%",
      backgroundColor: "red",
      borderRadius: 2,
    },

    graphStyle: {
      margin: 8,
      borderRadius: 16,
    },

    savingContainer: {
      justifyContent: "center",
      alignItems: "center",
    },

    additional: {
      height: windowHeight * 0.17,
      width: windowWidth * 0.93,
      padding: 8,
      borderWidth: 1,
      borderColor: GlobalStyles.colors.neutral200,
      elevation: 8,
      margin: 4,
      marginHorizontal: 8,
    },

    balanceContainer: {
      height: windowHeight * 0.1,
      width: windowWidth * 0.93,
      padding: 8,
      borderWidth: 1,
      borderColor: GlobalStyles.colors.neutral200,
      elevation: 8,
    },

    additionalIncomeOutcome: {
      borderWidth: 2,
      borderColor: GlobalStyles.colors.neutral200,
      elevation: 8,
    },

    button: {
      borderRadius: 10,
      margin: 8,
    },

    innerSummaryContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom: 8,
    },

    textHeadingStyle: {
      fontFamily: "Montserrat-Black",
      fontSize: 20,
    },

    textStyle: {
      fontFamily: "Inter-Regular",
      fontSize: 16,
    },
  });
  const startingBalance = dbdata.balance;

  useEffect(() => {
    if (
      typeof dbdata.incomeSummary === "number" &&
      typeof dbdata.outcomeSummary === "number"
    ) {
      setIncomeSummary(dbdata.incomeSummary);
      setOutcomeSummary(dbdata.outcomeSummary);
      setSavings(dbdata.incomeSummary - dbdata.outcomeSummary);
    }
  }, [dbdata]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.savingContainer}>
        <Cards additionalStyle={styles.additional}>
          <Ionicons name="wallet" size={36} color="black" />
          <Text style={styles.textHeadingStyle}>Total savings:</Text>
          <Text style={styles.textStyle}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(savings)}
          </Text>
          <Text style={[styles.textStyle, { fontSize: 12 }]}>
            Saved this month by: {savingsPercentage}%
          </Text>
        </Cards>
      </View>

        <Cards additionalStyle={styles.additionalIncomeOutcome}>
          <Feather name="chevrons-down" size={36} color="green" />
          <Text style={styles.textHeadingStyle}>Income:</Text>
          <Text style={[styles.textStyle, { fontSize: 14 }]}>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(incomeSummary)}
          </Text>
        </Cards>
        <Cards additionalStyle={styles.additionalIncomeOutcome}>
          <Feather name="chevrons-up" size={36} color="red" />
          <Text style={styles.textHeadingStyle}>Outcome:</Text>
          <Text style={[styles.textStyle, { fontSize: 14 }]}>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(outcomeSummary)}
          </Text>
          <View style={styles.box}>
            <View style = {[styles.boxDalam, { width: `${40}%`}]}></View>
          </View>
        </Cards>
    </View>
  );
};
