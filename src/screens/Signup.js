import React, {useState} from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import * as EmailValidator from "email-validator";

export default function Signup (props){
  const [formData, setFormData] = useState({})

  const onChangeText = (key, val) => {
    setFormData({ ...formData, [key]: val });
  };

  onSignUp = () => {
    let { username, password, email, phone_number } = formData;
    if (!username || !password || !email || !phone_number)
      return alert("Please fill all the details");

    if (!EmailValidator.validate(email)) {
      return alert("Enter a valid Email");
    }

    AsyncStorage.setItem(email, JSON.stringify(formData)).then(() => {
      alert("Successfully signed up");
      props.navigation.navigate("Login");
    });
  };

    return (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              value={formData.username}
              label="Username"
              theme={{ colors: { primary: "#128ef2" } }}
              mode={"outlined"}
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={(val) => onChangeText("username", val)}
            />
            <TextInput
              style={styles.input}
              value={formData.password}
              label="Password"
              theme={{ colors: { primary: "#128ef2" } }}
              mode={"outlined"}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(val) => onChangeText("password", val)}
            />
            <TextInput
              style={styles.input}
              value={formData.email}
              label="Email"
              theme={{ colors: { primary: "#128ef2" } }}
              mode={"outlined"}
              autoCapitalize="none"
              onChangeText={(val) => onChangeText("email", val)}
            />
            <TextInput
              style={styles.input}
              value={formData.phone_number}
              label="Phone Number"
              theme={{ colors: { primary: "#128ef2" } }}
              mode={"outlined"}
              autoCapitalize="none"
              onChangeText={(val) => onChangeText("phone_number", val)}
            />
            <Button
              mode="outlined"
              color="#128ef2"
              style={{
                borderRadius: 50,
                borderColor: "#128ef2",
                borderWidth: 1,
                backgroundColor: "#fff",
                marginBottom: 5,
              }}
              onPress={onSignUp}
            >
              {"Sign Up"}
            </Button>
          </View>
    );
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 55,
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
