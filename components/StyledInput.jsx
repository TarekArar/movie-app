import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function StyledInput(props) {
  return (
    <View style={styles.inputView}>
      <TextInput
        placeholderTextColor="#003f5c"
        style={styles.inputText}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    width: "80%",
    backgroundColor: "#ECF2FF",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
  },
});
