import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { MovieAPI } from "../apis/movieAPI";
import { IMAGE_BASE_URI } from "../constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "react-query";

export default function Movie({ route }) {
  const { id } = route.params;

  const {
    data: movieResponse,
    isLoading,
    error,
  } = useQuery(["movie-details", id], () => MovieAPI.getMovie(id));

  const movie = movieResponse?.data;

  const { data: actorsResponse } = useQuery(["movie-actors", id], () =>
    MovieAPI.getMovieCrew(id)
  );

  const actors = actorsResponse?.data?.crew;

  return isLoading ? (
    <Text>Loading...</Text>
  ) : error ? (
    <Text>{JSON.stringify(error)}</Text>
  ) : (
    <ScrollView>
      <ImageBackground
        style={styles.image}
        source={{
          uri: `${IMAGE_BASE_URI}${movie.backdrop_path}`,
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{movie.title}</Text>
        </View>
      </ImageBackground>

      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.title}>Duration</Text>
          <Text style={styles.text}>02h 15m</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.title}>Genre</Text>
          <Text style={styles.text}>
            {movie.genres.map((el, idx) => (
              <>
                {el.name}
                {idx == movie.genres.length - 1 ? "" : ", "}
              </>
            ))}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.title}>Languages</Text>
          <Text style={styles.text}>
            {" "}
            {movie.spoken_languages.map((el, idx) => (
              <>
                {el.name}
                {idx == movie.spoken_languages.length - 1 ? "" : ", "}
              </>
            ))}
          </Text>
        </View>
      </View>

      <View style={styles.overview}>
        <Text style={styles.title}>Overview</Text>
        <Text style={styles.text}>{movie.overview}</Text>
      </View>

      <View style={styles.actorsContainer}>
        <Text style={styles.title}>Actors</Text>

        <ScrollView horizontal style={styles.actorsList}>
          {actors?.map((actor) => (
            <View style={styles.actor}>
              <Image
                style={styles.actorImage}
                source={{
                  uri: `${IMAGE_BASE_URI}${actor.profile_path}`,
                }}
              />
              <Text style={styles.actorName}>{actor.original_name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 220,
  },
  name: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    justifyContent: "flex-end",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
  },
  infoItem: {
    gap: 5,
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    color: "#8C8C8C",
    fontSize: 14,
  },
  overview: {
    paddingHorizontal: 25,
  },
  actorsContainer: {
    padding: 25,
  },
  actorsList: {
    paddingVertical: 25,
    gap: 10,
    flexDirection: "row",
  },
  actor: {
    width: 80,
    height: 60,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  actorImage: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  actorName: {
    textAlign: "center",
  },
});
