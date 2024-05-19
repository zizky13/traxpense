import { Pressable, Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";

export default MyButton = ({ title, onPress, containerStyle, optionalColor, textStyle }) => {
  return (
    <View style={containerStyle}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.button,
            {
              backgroundColor: optionalColor || GlobalStyles.colors.primary500,
            },
          ]}
        >
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    margin: 3,
  },
  text: {
    color: GlobalStyles.colors.neutral900,
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },

  pressed: {
    backgroundColor: GlobalStyles.colors.neutral400,
    borderRadius: 10,
    opacity: 0.3,
  },
});
