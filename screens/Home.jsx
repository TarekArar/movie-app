import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { MovieAPI } from "../apis/movieAPI";
import useFetch from "../hooks/useFetch";
import Movie from "../components/Movie";

export default function Home() {
  const { data, isLoading, error } = useFetch(MovieAPI.getMovies);

  const movies = data?.results || [];

  return isLoading ? (
    <Text>Loading ...</Text>
  ) : error ? (
    <Text>{JSON.stringify(error)}</Text>
  ) : (
    <ScrollView>
      <View style={styles.moviesContainer}>
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  moviesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    paddingTop: 20,
  },
});
