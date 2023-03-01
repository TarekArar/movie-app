import { View, StyleSheet } from "react-native";
import React from "react";
import Movie from "./Movie";

export default function MoviesList({ movies, navigate }) {
  return (
    <View style={styles.container}>
      {movies?.map((movie) => (
        <Movie
          key={movie.id}
          {...movie}
          showDetails={() => navigate("Movie", { id: movie.id })}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
    paddingTop: 20,
  },
});
