import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onSignIn } from "./auth";
import { TextInput, Button } from "react-native-paper";

export default function Login (props) {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//     };
//   }

const [email, setEmail] = useState('')
const [password, setPassword] = useState("");


signUp = () => {
    props.navigation.navigate("Signup");
  };

  onLogin = () => {
    AsyncStorage.getItem(email)
      .then((res) => {
        if (res !== null && password === JSON.parse(res).password) {
          onSignIn().then(() => props.route.params.onSuccessLogin());
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((err) => alert("Email is not registered"));
  };

    return (
      <View style={styles.container}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          theme={{ colors: { primary: "#128ef2" } }}
          mode={"outlined"}
          label={"email"}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          theme={{ colors: { primary: "#128ef2" } }}
          mode={"outlined"}
          label={"Password"}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          color={"#128ef2"}
          mode="outlined"
          style={{
            borderRadius: 50,
            borderColor: "#128ef2",
            borderWidth: 1,
            backgroundColor: "#fff",
            marginBottom: 5,
          }}
          onPress={() => onLogin()}
        >
          {"Login"}
        </Button>
        <Button
          mode="text"
          color={"#128ef2"}
          style={{ size: 20 }}
          onPress={() => signUp()}
        >
          {"Don't have an account? Sign Up "}
        </Button>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "70%",
    height: 44,
    padding: 10,
    marginBottom: 10,
  },
});
