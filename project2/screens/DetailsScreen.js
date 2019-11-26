import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { getMovie } from "../api";

export class DetailsScreen extends Component {
  state = {
    movie: null
  };
  fetchMovie = async () => {
    const imdbId = this.props.navigation.getParam("movieId");
    const movie = await getMovie(imdbId);
    this.setState({
      movie
    });
  };

  componentDidMount() {
    this.fetchMovie();
  }

  renderRatings = ratings => {
    return ratings.map(rating => {
      return (
        <View style={styles.paddingBottom10} key={rating.Source}>
          <Text>
            {rating.Source} ({rating.Value})
          </Text>
          <Text
            style={{
              backgroundColor:
                "#" + ((Math.random() * 0xffffff) << 0).toString(16),
              width: rating.Value.includes("%")
                ? rating.Value
                : `${eval("8.2/10") * 100}%`
            }}
          ></Text>
        </View>
      );
    });
  };

  render() {
    const { movie } = this.state;
    if (!movie) {
      return (
        <ActivityIndicator
          style={styles.loadingContainer}
          size="large"
          color="#0000ff"
        />
      );
    }
    return (
      movie && (
        <ScrollView style={styles.detailsContainer}>
          <Image style={styles.poster} source={{ uri: movie.Poster }} />
          <Text style={styles.title}>
            {movie.Title}({movie.Year})
          </Text>
          <Text style={styles.paddingBottom10}>
            {movie.Rated}, {movie.Runtime}
          </Text>
          <Text style={styles.paddingBottom10}>{movie.Plot}</Text>
          {this.renderRatings(movie.Ratings)}
        </ScrollView>
      )
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  detailsContainer: {
    paddingHorizontal: 10
  },
  poster: {
    width: "100%",
    height: 250
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  paddingBottom10: {
    paddingBottom: 10
  }
});

export default DetailsScreen;
