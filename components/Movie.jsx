import { View, Text, Image, StyleSheet, Button } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IMAGE_BASE_URI } from "../constants";

export default function Movie(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.showDetails}>
        <Image
          style={styles.image}
          source={{ uri: IMAGE_BASE_URI + props.poster_path }}
        />
      </TouchableOpacity>
      <View style={styles.details}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <Text style={styles.releaseData}>
            {props.release_date.split("-")[0]} | En Action, Fantasy
          </Text>
        </View>
        <View>
          <Text style={styles.rate}>{props.vote_average}</Text>
          <Text style={styles.public}>Public</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
    gap: 10,
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    height: 190,
    justifyContent: "space-between",
    gap: 5,
    color: "#8C8C8C",
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: "bold",
  },
  releaseData: {
    marginTop: 5,
    color: "#8C8C8C",
    fontSize: 14,
  },
  rate: {
    color: "#8C8C8C",
    fontWeight: "bold",
  },
  public: {
    color: "#8C8C8C",
  },
});
