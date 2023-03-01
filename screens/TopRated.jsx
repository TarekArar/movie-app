import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { MovieAPI } from "../apis/movieAPI";
import HeaderTabs from "../components/HeaderTabs";
import Loading from "../components/Loading";
import MoviesList from "../components/MoviesList";
import { ScrollView } from "react-native-gesture-handler";

export default function TopRated({ navigation }) {
  const [selected, setSelected] = useState(28);

  const { data } = useQuery("genres", MovieAPI.getGenres);
  const { data: moviesRes, isLoading } = useQuery(["movies", selected], () =>
    MovieAPI.getMoviesByGenre(selected)
  );
  const movies = moviesRes?.data?.items?.slice(0, 5);

  return (
    <View>
      <HeaderTabs
        tabs={data?.data?.genres}
        onSelect={setSelected}
        activeTab={selected}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <MoviesList movies={movies} navigate={navigation.navigate} />
        </ScrollView>
      )}
    </View>
  );
}
