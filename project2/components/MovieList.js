import React, { Component } from "react";
import { FlatList, View } from "react-native";
import MovieItem from "./MovieItem";
import { withNavigation } from "react-navigation";

export class MovieList extends Component {
  onSelect = movieId => {
    this.props.navigation.navigate("Details", {
      movieId
    });
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.props.data}
          renderItem={({ item }) => (
            <MovieItem item={item} onSelect={this.onSelect} />
          )}
          initialNumToRender={10}
          onEndReached={() => {
            this.props.loadNextPage();
          }}
          onEndReachedThreshold={0}
          keyExtractor={item => item.imdbID}
        />
      </View>
    );
  }
}

export default withNavigation(MovieList);
