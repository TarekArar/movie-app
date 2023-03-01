import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function HeaderTabs({ tabs, onSelect, activeTab }) {
  return (
    <View>
      <ScrollView horizontal>
        {tabs?.map(({ id, name }) => (
          <HeaderButton
            key={id}
            title={name}
            onPress={() => {
              onSelect(id);
            }}
            isActive={activeTab === id}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const HeaderButton = ({ title, isActive = false, onPress }) => (
  <TouchableOpacity
    style={[styles.headerButton, isActive ? styles.active : null]}
    onPress={onPress}
  >
    <Text
      style={[styles.HeaderButtonText, isActive ? styles.activeText : null]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  headerButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: "black",
    marginHorizontal: 5,
  },
  HeaderButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  active: {
    backgroundColor: "blue",
  },
  activeText: {
    color: "white",
  },
});
