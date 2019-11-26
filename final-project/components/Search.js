import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import constants from "../const";
import Constants from "expo-constants";

const Search = props => {
  return (
    <View style={styles.header}>
      <View style={styles.search}>
        <RNPickerSelect
          placeholder={{ label: "Select a state" }}
          items={constants.US_STATES.map(state => ({
            label: state.state,
            value: state.stateCode
          }))}
          style={{
            inputIOS: {
              fontSize: 16,
              color: "black"
            }
          }}
          onValueChange={value => {
            props.onSearch(value);
          }}
          value={props.value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    flex: 1,
    margin: 10
  },
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    backgroundColor: "rgba(255,255,255, 2)",
    borderRadius: 10,
    marginTop: Constants.statusBarHeight,
    margin: 10
  }
});

export default Search;
