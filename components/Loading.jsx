import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#0000ff" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
