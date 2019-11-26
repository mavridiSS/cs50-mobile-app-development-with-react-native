import React, { useRef } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import constants from "../const";
const { width } = Dimensions.get("window");

const Map = props => {
  const mapRef = useRef(null);

  renderParksAsMarkers = parks => {
    return parks.map((park, index) => {
      return (
        <Marker
          coordinate={park.latLongObject}
          title={park.name}
          description={park.description}
          onSelect={e =>
            props.listRef.current.scrollToIndex({
              index,
              viewOffset: 10
            })
          }
          key={park.id}
        />
      );
    });
  };
  return (
    <View style={styles.mapStyle}>
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        region={props.region}
        initialRegion={{
          ...constants.USA_DEFAULT_LOCATION
        }}
      >
        {this.renderParksAsMarkers(props.data)}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
    width
  }
});

export default Map;
