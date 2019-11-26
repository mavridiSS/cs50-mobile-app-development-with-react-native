import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = props => {
  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader]}>
        <Text style={styles.cardHeaderTile}></Text>
        <Text style={styles.cardHeaderTitle}>{props.title}</Text>
      </View>
      <View style={styles.cardBody}>
        {typeof props.body === "string" ? (
          <Text>{props.body}</Text>
        ) : (
          props.body()
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardHeaderTile: {
    backgroundColor: "#FF7657",
    width: 10,
    height: "50%",
    marginRight: 20
  },
  cardHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5
  },
  cardHeaderTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600"
  },
  cardBody: {
    flex: 4,
    margin: 15
  },
  card: {
    margin: 10,
    flex: 1,
    backgroundColor: "white"
  }
});

export default Card;
