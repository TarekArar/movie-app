import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useAuthContext } from "../contexts/auth";

export default function Favorites({ navigation }) {
  const { user } = useAuthContext();
  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Hi {user.email},</Text>
          <Text> Favorited movies will appear here </Text>
        </>
      ) : (
        <>
          <Text>To Add Items to Favorites please login</Text>
          <Button title="Log In" onPress={() => navigation.navigate("Login")} />
        </>
      )}
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
