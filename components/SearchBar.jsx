import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SearchBar({ placeholder, value, onChange, onClear }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
      />
      <AntDesign
        name="closecircleo"
        size={20}
        color="black"
        onPress={onClear}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  input: {
    width: "80%",
  },
});
