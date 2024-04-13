import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";

export default CatogryGrid = ({ onPress, title, color }) => {
    return (
      <View style={[styles.gridItem, { backgroundColor: color }]}>
        <Pressable
          android_ripple={{ color: "#CCC" }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={onPress}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </Pressable>
      </View>
    );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 8,
    height: 150,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: GlobalStyles.colors.neutral900,
  },
});