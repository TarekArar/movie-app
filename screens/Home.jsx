import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { MovieAPI } from "../apis/movieAPI";
import Movie from "../components/Movie";
import { useQuery } from "react-query";

export default function Home({ navigation }) {
  const { data, error, isLoading } = useQuery("movies", () =>
    MovieAPI.getMovies(28)
  );

  const movies = data?.data.items;

  return isLoading ? (
    <Text>Loading ...</Text>
  ) : error ? (
    <Text>{JSON.stringify(error)}</Text>
  ) : (
    <ScrollView>
      <View style={styles.moviesContainer}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            {...movie}
            showDetails={() => navigation.navigate("Movie", { id: movie.id })}
          />
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
    gap: 15,
    paddingTop: 20,
  },
});
