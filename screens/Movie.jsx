import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Modal,
  Button,
  Pressable,
} from "react-native";
import React, { useMemo, useState } from "react";
import { MovieAPI } from "../apis/movieAPI";
import { IMAGE_BASE_URI } from "../constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import TrailerModal from "../components/TrailerModal";
import { AntDesign } from "@expo/vector-icons";

export default function Movie({ route, navigation }) {
  const { id } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: movieResponse,
    isLoading,
    error,
  } = useQuery(["movie-details", id], () => MovieAPI.getMovie(id));

  const movie = useMemo(() => movieResponse?.data, [movieResponse]);

  const { data: actorsResponse } = useQuery(["movie-actors", id], () =>
    MovieAPI.getMovieCrew(id)
  );

  const actors = useMemo(() => actorsResponse?.data?.crew, [actorsResponse]);

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Text>{JSON.stringify(error)}</Text>
  ) : (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: `${IMAGE_BASE_URI}${movie.backdrop_path}`,
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{movie.title}</Text>
          <Pressable onPress={() => setModalVisible(true)} style={styles.icon}>
            <AntDesign
              name="play"
              size={40}
              color="red"
              onPress={() => setModalVisible(true)}
            />
          </Pressable>
        </View>
      </ImageBackground>

      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.title}>Duration</Text>
          <Text style={styles.text}>
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
          </Text>
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
          {actors?.map((actor, idx) => (
            <View key={idx} style={styles.actor}>
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

      <TrailerModal
        movieId={id}
        isOpen={modalVisible}
        close={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
  },
  name: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    maxWidth: "80%",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    flexDirection: "row",

    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  icon: {
    position: "absolute",
    bottom: -15,
    right: 15,
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
    flexWrap: "wrap",
  },
  title: {
    fontSize: 20,
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
    // height: 60,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  actorImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  actorName: {
    textAlign: "center",
  },
});
