import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet
} from "react-native";
import NationalPark from "../components/NationalPark";

export default function NationalParksList(props) {
  const [page, setPage] = useState(0);
  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      props.onLoadMoreData(page);
    }
  }, [page]);

  getMoreData = () => {
    if (page < props.maxPages) {
      setPage(prevPage => prevPage + 1);
    }
  };
  return props.isLoading && page === 0 ? (
    <ActivityIndicator size={"large"} style={styles.loading} />
  ) : (
    <View
      style={{
        flex: 1
      }}
    >
      <FlatList
        onEndReachedThreshold={0}
        onEndReached={this.getMoreData}
        data={props.data}
        ref={props.listRef}
        ListEmptyComponent={() => (
          <View style={styles.emptyListText}>
            <Text>No items match your settings.</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListFooterComponent={() => {
          if (props.isLoading) {
            return <ActivityIndicator size={"small"} style={styles.loading} />;
          }
          return null;
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => props.onPress(item)}>
            <NationalPark data={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listEnd: {
    textAlign: "center",
    fontSize: 18
  },
  loading: { flex: 1, justifyContent: "center", color: "#000" },
  itemSeparator: {
    height: 2,
    width: "100%",
    backgroundColor: "#A5A5A5"
  },
  emptyListText: { flex: 1, justifyContent: "center", alignItems: "center" }
});
