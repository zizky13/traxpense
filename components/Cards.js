import { View, StyleSheet } from "react-native";

export default Cards = ({children, additionalStyle}) => {
    return (
        <View style={[styles.container, additionalStyle]}>
        {children}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});