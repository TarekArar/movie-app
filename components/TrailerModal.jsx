import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { WebView } from "react-native-webview";
import { useQuery } from "react-query";
import { MovieAPI } from "../apis/movieAPI";
import Loading from "./Loading";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const TrailerModal = ({ isOpen, close, movieId }) => {
  const { data, isLoading, error } = useQuery(["movie-videos", movieId], () =>
    MovieAPI.getMovieVideos(movieId)
  );

  const trailer = data?.data?.results?.find((el) => el.type == "Trailer");

  return (
    <Modal animationType="slide" visible={isOpen} onRequestClose={close}>
      <View style={styles.container}>
        <Pressable onPress={close} style={styles.buttonClose}>
          <AntDesign name="closecircle" size={24} color="black" />
        </Pressable>
        <View style={styles.centeredView}>
          {isLoading ? (
            <Loading />
          ) : (
            <View style={styles.videoContainer}>
              <WebView
                source={{
                  uri: `https://www.youtube.com/embed/${trailer?.key}`,
                }}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    height: 300,
    width: "100%",
  },

  buttonClose: {
    marginTop: 60,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TrailerModal;
