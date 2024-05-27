import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SummaryCard from "../components/SummaryCard";
// import { vertexAI } from "../firebase";
// import { getGenerativeModel } from "firebase/vertexai-preview";

export default ReportScreen = () => {

  // const model = getGenerativeModel(vertexAI, {
  //   model: "gemini-1.5-pro-preview-0409",
  // });
  // const prompt = "Tell me signature dish of Indonesia";

  // useEffect(() => {
  //   model.generateContent(prompt).then((result) => {
  //     setData(result.response.text);
  //   });
  // }, []);

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
