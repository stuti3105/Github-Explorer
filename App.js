import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import { reducers } from "./src/reducers/watchlist";
import { isSignedIn } from "./src/screens/auth";

const store = createStore(reducers);

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }

  componentDidMount() {
    isSignedIn()
      .then((res) => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch((err) => alert("An error occurred"));
  }

  onSuccessLogin = () => {
    this.setState({ signedIn: true });
  };

  onLogOut=()=> {
    this.setState({ signedIn: false });
  }

  render() {
    return this.state.checkedSignIn ? (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {this.state.signedIn ? (
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
                initialParams={{ onLogOut: this.onLogOut }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  initialParams={{ onSuccessLogin: this.onSuccessLogin }}
                />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    ) : null;
  }
}
