import Cards from "./Cards";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View, ImageBackground } from "react-native";
import { auth, db, useDatabaseData } from "../firebase";
import { ref, set } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";

//DATA NEEDED: total income, total outcome, starting balance, end balance

export default SummaryCard = () => {
  const dbref = ref(db, "users/" + auth.currentUser?.uid);
  const dbdata = useDatabaseData(dbref);
  const [incomeSummary, setIncomeSummary] = useState(0);
  const [outcomeSummary, setOutcomeSummary] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    setIncomeSummary(dbdata.incomeSummary);
    setOutcomeSummary(dbdata.outcomeSummary);
    setSavings(dbdata.incomeSummary - dbdata.outcomeSummary);
  }, [dbdata]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.savingContainer}>
        <Cards additionalStyle={styles.additional}>
          <MaterialIcons name="savings" size={48} color="black" />
            <Text>Total savings:</Text>
            <Text>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(savings)}
            </Text>
        </Cards>
      </View>

      <View style={styles.innerSummaryContainer}>
        <Cards>
          <MaterialIcons name="arrow-circle-down" size={36} color="green" />
          <Text>Income:</Text>
          <Text>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(incomeSummary)}
          </Text>
        </Cards>

        <Cards>
          <MaterialIcons name="arrow-circle-up" size={36} color="red" />
          <Text>Outcome:</Text>
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
    backgroundColor: "pink",
    height: 160,
    width: 380,
    padding: 8
  },

  button: {
    borderRadius: 10,
    margin: 8,
  },

  innerSummaryContainer: {
    flexDirection: "row",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
