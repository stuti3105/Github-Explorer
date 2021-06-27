import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

import { connect } from "react-redux";

import { Button } from "react-native-paper";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Feather";

import api from "../../services/api";
import RepoItem from "../components/RepoItem";
import Watchlist from "./Watchlist";
import RepoScreen from "./Repository";

const Stack = createStackNavigator();

function SearchScreen(props) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const onSearch = async () => {
    setSearchText("");
    api
      .get(`/search/repositories?q={${searchText}}}{&page,per_page,sort,order}`)
      .then(({ data }) => {
        debugger;
        setData(data.items);
      });
  };

  const onIconPress = (item) => {
    props.dispatch({ type: "add", item });
  };

  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
      <View
        style={{
          padding: 8,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{ borderWidth: 1, width: "80%" , height:40}}
          value={searchText}
          placeholder="Search for the repository"
          onChangeText={setSearchText}
        />
        <Button color='black' onPress={() => onSearch()}>Search</Button>
      </View>
      {data.length ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <RepoItem
              items={item}
              onIconPress={() => onIconPress(item)}
              onListItemPress={() =>
                props.navigation.navigate("Repository", item)
              }
            />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20 }}>Search Repositories</Text>
        </View>
      )}
    </View>
  );
}

const mapStateToProps = (state) => {
  return { store: state };
};

const ComposedSearchScreen = connect(mapStateToProps)(SearchScreen);

export default function home({route}) {
  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#4c4c4c",
        },
      }}
    >
      <Stack.Screen
        name="SearchScreen"
        component={ComposedSearchScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Menu
              ref={this.setMenuRef}
              button={
                <Icon name="more-vertical" size={20} onPress={this.showMenu} />
              }
              style={{marginRight: 5}}
            >
              <MenuItem onPress={() => navigation.navigate("Watchlist")}>
                Go to watchlist
              </MenuItem>
              <MenuDivider />
              <MenuItem onPress={route.params.onLogOut}>Log Out</MenuItem>
            </Menu>
          ),
        })}
      />
      <Stack.Screen name="Watchlist" component={Watchlist} />
      <Stack.Screen
        name="Repository"
        component={RepoScreen}
        options={{
          headerTitle: "Issues",
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
}

//https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}
//https://api.github.com/search/repositories?q={helloworld}{&page,per_page,sort,order}
