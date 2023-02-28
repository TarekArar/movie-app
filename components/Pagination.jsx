import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function Pagination({ pagesNumber, onSelect, active }) {
  return (
    <ScrollView horizontal style={styles.pages}>
      {Array.from(Array(pagesNumber).keys()).map((el) => (
        <TouchableOpacity
          key={el}
          style={[styles.pageNumber, active == el + 1 ? styles.active : null]}
          onPress={() => onSelect(el + 1)}
        >
          <Text style={[styles.textNumber]}>{el + 1} </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  active: {
    color: "red",
  },
});
