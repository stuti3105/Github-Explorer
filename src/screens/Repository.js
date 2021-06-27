import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import api from "../../services/api";

import IssueItem from "../components/IssueItem";

export default function Repository({ route }) {
  const [data, setData] = useState("");
  debugger;

  useEffect(() => {
    let mounted = true;
    api
      .get(`/repos/${route.params.full_name}/issues?q=state:open&per_page=5`)
      .then(({ data }) => {
        debugger;
        mounted && setData(data);
      })
      .catch((err) => {});

    return () => (mounted = false);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {data === "" ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20 }}>Loading open Issues...</Text>
        </View>
      ) : data.length ? (
        <FlatList
          data={data}
          renderItem={({ item }) => <IssueItem items={item} />}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20 }}>No opened Issues</Text>
        </View>
      )}
    </View>
  );
}

//https://api.github.com/repos/smartnsoft/flappy_search_bar/pulls?page=1
//https://api.github.com/repos/smartnsoft/flappy_search_bar/issues?per_page=5
