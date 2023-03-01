import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MovieAPI } from "../apis/movieAPI";
import { useQuery } from "react-query";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";
import Loading from "../components/Loading";
import MoviesList from "../components/MoviesList";
import Pagination from "../components/Pagination";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({ navigation }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 100);
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery(
    ["movies", debouncedSearch, page],
    () => MovieAPI.getMovies(debouncedSearch, page)
  );

  const movies = data?.data?.results.slice(0, 10);
  const total_pages = data?.data?.total_pages;

  const onSearch = (text) => {
    setPage(1);
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Movies"
        value={search}
        onChange={onSearch}
        onClear={() => onSearch("")}
      />
      <ScrollView style={styles.moviesScrollContainer}>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Text>{JSON.stringify(error)}</Text>
        ) : (
          <MoviesList movies={movies} navigate={navigation.navigate} />
        )}

        <Pagination
          pagesNumber={
            total_pages > 1000
              ? Math.floor(total_pages / 100)
              : total_pages || 0
          }
          active={page}
          onSelect={setPage}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  moviesScrollContainer: {},
});
