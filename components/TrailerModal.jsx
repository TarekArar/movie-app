import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { WebView } from "react-native-webview";
import { useQuery } from "react-query";
import { MovieAPI } from "../apis/movieAPI";
import Loading from "./Loading";

const TrailerModal = ({ isOpen, close, movieId }) => {
  const { data, isLoading, error } = useQuery(["movie-videos", movieId], () =>
    MovieAPI.getMovieVideos(movieId)
  );

  const trailer = data?.data?.results?.find((el) => el.type == "Trailer");

  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        close();
      }}
    >
      <View style={styles.centeredView}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => close()}
        >
          <Text style={styles.textStyle}>Close</Text>
        </Pressable>
        {isLoading ? (
          <Loading />
        ) : (
          <View style={styles.videoContainer}>
            <WebView
              source={{ uri: `https://www.youtube.com/embed/${trailer?.key}` }}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  videoContainer: {
    height: 300,
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TrailerModal;
