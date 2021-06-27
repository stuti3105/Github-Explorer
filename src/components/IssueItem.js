import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Surface } from "react-native-paper";

import Icon from "react-native-vector-icons/AntDesign";

export default function issueItem({ items }) {
  getDate = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let dateObject = new Date(items.created_at);
    let date = dateObject.getDate();
    let month = monthNames[dateObject.getMonth()];
    let year = dateObject.getFullYear();
    return date + " " + month + " " + year;
  };

  return (
    <Surface
      style={{
        width: "100%",
        height: 120,
        justifyContent: "center",
        padding: 10,
        margin: 8,
        backgroundColor: '#ffff',
        elevation: 4
      }}
    >
      <Text style={{fontSize: 18, fontWeight:'bold', marginBottom: 5}}>{items.title}</Text>
      <Text>{`#${items.number} opened on ${getDate()} by ${
        items.user.login
      }`}</Text>
    </Surface>
  );
}
