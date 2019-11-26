import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MovieItem = ({ item, onSelect }) => (
  <TouchableOpacity style={styles.item} onPress={() => onSelect(item.imdbID)}>
    <View>
      <Text style={styles.title}>{item.Title}</Text>
      <Text style={styles.title}>
        {item.Year}({item.Type})
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    height: 50,
    paddingBottom: 5
  },
  title: {
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default MovieItem;
