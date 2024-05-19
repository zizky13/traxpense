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
  const savingsPercentage = Math.round((savings / incomeSummary) * 100);
  const styles = StyleSheet.create({
    outerContainer: {
      justifyContent: "center",
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
      height: windowHeight * 0.2,
      width: windowWidth * 0.93,
      padding: 8,
      borderWidth: 1,
      borderColor: GlobalStyles.colors.neutral200,
      elevation: 8,
    },
  
    additionalIncomeOutcome: {
      width: windowWidth * 0.435,
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

      <View style={styles.innerSummaryContainer}>
        <Cards additionalStyle={styles.additionalIncomeOutcome}>
          <Feather name='chevrons-down' size={36} color="green" />
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
          <Feather name="chevrons-up" size={36} color="red"/>
          <Text style={styles.textHeadingStyle}>Outcome:</Text>
          <Text style={[styles.textStyle, { fontSize: 14 }]}>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(outcomeSummary)}
          </Text>
        </Cards>
      </View>
    </View>
  );
};

