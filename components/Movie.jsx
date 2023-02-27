import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const IMAGE_URI = "https://image.tmdb.org/t/p/original";

export default function Movie(props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: IMAGE_URI + props.poster_path }}
      />
      <Text>{props.original_title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7cb48f",
    width: 120,
    height: 180,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 130,
    borderRadius: 10,
  },
});
