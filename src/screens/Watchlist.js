import React from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";

import RepoItem from "../components/RepoItem";

function watchlist(props) {
  debugger;
  let data = props.store.watchList;

  return data.length ? (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <RepoItem
          items={item}
          onListItemPress={() => props.navigation.navigate("Repository", item)}
        />
      )}
    />
  ) : (
    <View />
  );
}

const mapStateToProps = (state) => {
  return { store: state };
};

export default connect(mapStateToProps)(watchlist);
