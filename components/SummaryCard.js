import Cards from "./Cards";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { auth, db, useDatabaseData } from "../firebase";
import { ref } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/GlobalStyles";

//DATA NEEDED: total income, total outcome, starting balance, end balance

export default SummaryCard = () => {
  const dbref = ref(db, "users/" + auth.currentUser?.uid);
  const dbdata = useDatabaseData(dbref);
  const [incomeSummary, setIncomeSummary] = useState(0);
  const [outcomeSummary, setOutcomeSummary] = useState(0);
  const [savings, setSavings] = useState(0);
  const savingsPercentage = (savings / incomeSummary) * 100;
  
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
          <MaterialIcons name="savings" size={48} color="black" />
          <Text style={{ fontFamily: "Inter-Bold" }}>Total savings:</Text>
          <Text>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(savings)}
          </Text>
          <Text>Saved this month by: {savingsPercentage}%</Text>
        </Cards>
      </View>

      <View style={styles.innerSummaryContainer}>
        <Cards additionalStyle={styles.additionalIncomeOutcome}>
          <MaterialIcons name="arrow-circle-down" size={36} color="green" />
          <Text style={{ fontFamily: "Inter-Bold" }}>Income:</Text>
          <Text>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(incomeSummary)}
          </Text>
        </Cards>

        <Cards additionalStyle={styles.additionalIncomeOutcome}>
          <MaterialIcons name="arrow-circle-up" size={36} color="red" />
          <Text style={{ fontFamily: "Inter-Bold" }}>Outcome:</Text>
          <Text>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(outcomeSummary)}
          </Text>
        </Cards>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: "center",
  },

  savingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  additional: {
    height: 160,
    width: 385,
    padding: 8,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.neutral500,
  },

  additionalIncomeOutcome: {
    width: 184,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.neutral500,
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
});
