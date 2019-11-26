import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import MovieList from "../components/MovieList";
import { searchMovies } from "../api";

function debounce(fn, time) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), time);
  };
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieTitle: "",
      movies: [],
      currentPage: 1,
      maxPages: 1
    };

    this.getMoviesDebounced = debounce(this.getMovies, 500);
  }

  onMovieTextChange = movieTitle => {
    this.setState({ movieTitle, currentPage: 1 });

    this.getMoviesDebounced(movieTitle);
  };

  getMovies = async movieTitle => {
    const result = await searchMovies(movieTitle, this.state.currentPage);
    this.setState({
      movies: result.movies,
      maxPages: Math.ceil(result.totalResults / 10)
    });
  };

  loadNextPage = async () => {
    if (this.state.currentPage < this.state.maxPages) {
      const result = await searchMovies(
        this.state.movieTitle,
        this.state.currentPage + 1
      );
      this.setState({
        movies: [...this.state.movies, ...result.movies],
        currentPage: this.state.currentPage + 1
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.movieTitle}
            onChangeText={this.onMovieTextChange}
            placeholder="Search movies"
            returnKeyType="search"
            placeholderTextColor="rgba(255,255,255, 0.7)"
          />
        </View>
        <MovieList data={this.state.movies} loadNextPage={this.loadNextPage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498db",
    padding: 20
  },
  inputContainer: {
    paddingBottom: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255, 0.2)",
    color: "#FFF",
    paddingHorizontal: 10
  }
});

export default HomeScreen;
