import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { fetchNationalParks, updateUserLocation } from "../store/actions";
import Map from "../components/Map";
import NationalParksList from "../components/NationalParksList";
import { getParksComputed } from "../store/selectors";
import Search from "../components/Search";
import constants from "../const";
import { getStateFromCode } from "../utils";

const mapStateToProps = state => ({
  parks: getParksComputed(state),
  settings: state.settings,
  maxPages: state.maxPages,
  isLoading: state.isLoading,
  userLocation: state.userLocation
});

function HomeScreen(props) {
  const listRef = useRef(null);

  onSelectPark = park => {
    props.navigation.navigate("Details", { park });
  };

  onSearch = stateCode => {
    props.updateUserLocation(getStateFromCode(stateCode));
    props.fetchNationalParks({
      stateCode: stateCode,
      merge: false,
      page: 0
    });
  };

  onLoadMoreData = page => {
    const stateCode = props.userLocation.stateCode;
    props.fetchNationalParks({
      stateCode: stateCode,
      merge: true,
      page
    });
  };

  getRegion = location => {
    if (location) {
      return {
        ...location,
        ...constants.DEFAULT_DELTAS
      };
    }
  };

  return (
    <View style={styles.container}>
      <Map
        region={getRegion(props.userLocation)}
        listRef={listRef}
        data={props.parks}
      />
      <Search
        value={props.userLocation ? props.userLocation.stateCode : null}
        onSearch={onSearch}
      />
      {props.userLocation && (
        <NationalParksList
          onLoadMoreData={onLoadMoreData}
          listRef={listRef}
          data={props.parks}
          onPress={onSelectPark}
          maxPages={props.maxPages}
          isLoading={props.isLoading}
          userLocation={props.userLocation}
        />
      )}
    </View>
  );
}

export default connect(mapStateToProps, {
  fetchNationalParks,
  updateUserLocation
})(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
