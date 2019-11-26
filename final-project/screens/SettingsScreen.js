import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { connect } from "react-redux";
import FilterSection from "../components/FilterSection";
import { updateSettings } from "../store/actions";
import constants from "../const";

const mapStateToProps = ({ settings }) => ({
  settings
});

function SettingsScreen(props) {
  const [settings, setSettings] = useState({});

  renderFilters = filters => {
    return Object.keys(filters).map(filter => {
      const filterObj = filters[filter];
      return (
        <FilterSection
          onSelect={value =>
            setSettings(prevState => ({
              ...prevState,
              [filter]: value
            }))
          }
          value={settings[filter]}
          key={filter}
          title={filterObj.title}
          filters={filterObj.values}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      {renderFilters(constants.FILTERS)}
      <View>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => props.updateSettings(settings)}
        >
          <Text>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default connect(mapStateToProps, { updateSettings })(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  applyButton: {
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#FF7657",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    height: 50
  }
});
