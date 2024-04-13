import { useContext } from "react";
import Cards from "./Cards";
import { Text, StyleSheet } from "react-native";
import { ExpenseContext } from "../store/expense-context";


export default SummaryCard = ({ incomeSummary, outcomeSummary }) => {
  const expenseCtx = useContext(ExpenseContext);
  // const endBalance = expenseCtx.balance - 3177000;
  
  return (
    <>
      <Cards additionalStyle={styles.additional}>
        <Text>Savings Summary</Text>
        <Text>Your total savings this month is: </Text>
        {/* <Text>{expenseCtx.balance - endBalance}</Text> */}
      </Cards>
    </>
  );
};

const styles = StyleSheet.create({
  additional: {
    backgroundColor: "pink",
    height: 100,
  },
})
