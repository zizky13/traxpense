import { Text, View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SummaryCard from "../components/SummaryCard";

export default ReportScreen = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
        <SummaryCard />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  graphStyle: {
    margin: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
});
