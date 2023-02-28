import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { MovieAPI } from "../apis/movieAPI";
import Movie from "../components/Movie";
import { useQuery } from "react-query";
import SearchBar from "../components/SearchBar";
import { TouchableOpacity } from "react-native-gesture-handler";
import useDebounce from "../hooks/useDebounce";
import Loading from "../components/Loading";

export default function Home({ navigation }) {
  const [search, setSearch] = useState("");
  // using debouncing while searching to prevent so many calls
  const debouncedSearch = useDebounce(search, 100);
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery(
    ["movies", debouncedSearch, page],
    () => MovieAPI.getMovies(debouncedSearch, page)
  );

  const movies = data?.data?.results.slice(0, 10);
  const total_pages = data?.data?.total_pages;

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Movies"
        value={search}
        onChange={setSearch}
        onClear={() => setSearch("")}
      />
      <ScrollView style={styles.moviesScrollContainer}>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Text>{JSON.stringify(error)}</Text>
        ) : (
          <View style={styles.moviesContainer}>
            {movies?.map((movie) => (
              <Movie
                key={movie.id}
                {...movie}
                showDetails={() =>
                  navigation.navigate("Movie", { id: movie.id })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>

      <ScrollView horizontal style={styles.pages}>
        {Array.from(
          Array(
            // stupid approach to avoid huge lists
            total_pages > 1000
              ? Math.floor(total_pages / 100)
              : total_pages || 0
          ).keys()
        ).map((el) => (
          <TouchableOpacity
            key={el}
            style={[styles.pageNumber, page == el + 1 ? styles.active : null]}
            onPress={() => setPage(el + 1)}
          >
            <Text style={[styles.textNumber]}>{el + 1} </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  moviesScrollContainer: {
    marginBottom: 40,
  },
  moviesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
    paddingTop: 20,
  },
  pages: {
    gap: 5,
    position: "absolute",
    bottom: 10,
  },
  pageNumber: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  textNumber: {
    color: "blue",
    fontSize: 18,
  },
});
