import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FilterSection = props => {
  const { title, onSelect, value } = props;

  renderFilters = filters => {
    return Object.keys(filters).map(filter => {
      return (
        <TouchableOpacity
          onPress={() => onSelect(filters[filter])}
          style={[
            styles.button,
            value === filters[filter] ? styles.active : null
          ]}
          key={filters[filter]}
        >
          <Text>{filter}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.section}>
      <Text> {title} </Text>
      <View style={styles.options}>{renderFilters(props.filters)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: { padding: 14, alignItems: "center", flex: 1 },
  section: {
    borderBottomColor: "#A5A5A5",
    borderBottomWidth: 0.5,
    margin: 20,
    justifyContent: "space-evenly",
    height: 100
  },
  options: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FF7667",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden"
  },
  active: {
    backgroundColor: "#FF7657"
  }
});

export default FilterSection;
