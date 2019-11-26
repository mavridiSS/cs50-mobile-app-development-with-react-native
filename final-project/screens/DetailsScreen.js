import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Card from "../components/Card";

export default class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("park").name,
    headerStyle: {
      backgroundColor: "#FF7657"
    },
    headerTitleStyle: {
      color: "white"
    }
  });

  renderEntranceFees = fees => {
    return fees.map(fee => (
      <View
        style={{
          flexDirection: "row"
        }}
        key={fee.title}
      >
        <Text>{fee.description}</Text>
        <Text>{+fee.cost}</Text>
      </View>
    ));
  };

  render() {
    const park = this.props.navigation.getParam("park");
    return (
      <View style={styles.container}>
        <Card title={"Directions"} body={park.directionsInfo} />
        <Card title={"Information"} body={park.description} />
        {park.entranceFees.length > 0 && (
          <Card
            title={"Entrance fees"}
            body={() => this.renderEntranceFees(park.entranceFees)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236, 240, 241, 0.50)"
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
