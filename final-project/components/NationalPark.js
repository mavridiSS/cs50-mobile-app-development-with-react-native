import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { renderEntranceFees } from "../utils";
const { width } = Dimensions.get("window");

export default function NationalPark({ data }) {
  const randomPictureNumber = Math.floor(Math.random() * data.images.length);
  const image = data.images[randomPictureNumber];
  return (
    <View style={styles.container}>
      {data.images.length ? (
        <Image
          style={styles.image}
          source={{
            uri: image.url
          }}
        />
      ) : null}
      <View style={styles.containerBody}>
        <View style={styles.flex}>
          <Text style={styles.name}>{data.name}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.description}>
            {data.description.slice(0, 50)}
          </Text>
        </View>
        <View style={styles.parkInfoContainer}>
          <View style={styles.parkInfo}>
            <FontAwesome name="location-arrow" size={12} color="#FF7667" />
            <Text style={[styles.entranceFees, styles.distanceFrom]}>
              {`${data.distanceFromUserLocation.toFixed(1)}miles`}
            </Text>
          </View>
          <View style={styles.parkInfo}>
            <Ionicons name="ios-pricetag" size={12} color="black" />
            <Text style={styles.entranceFees}>
              {renderEntranceFees(data.entranceFeesRange)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width,
    paddingVertical: 14
  },
  containerBody: {
    flexDirection: "column",
    flex: 2,
    justifyContent: "space-between"
  },
  image: {
    flex: 1,
    width: 80,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 10
  },
  name: { fontSize: 16, fontWeight: "600" },
  description: { textAlign: "left", color: "grey" },
  parkInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15
  },
  entranceFees: { marginLeft: 5 },
  distanceFrom: { color: "#FF7667" },
  parkInfoContainer: {
    flex: 1,
    flexDirection: "row"
  }
});
