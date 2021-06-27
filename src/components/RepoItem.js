import React from 'react'
import { Image, View, Text , TouchableOpacity} from 'react-native'
import { Surface } from 'react-native-paper';

import Icon from "react-native-vector-icons/AntDesign";


export default function repoItem({items, onIconPress, onListItemPress}){
    debugger
    return (
      <TouchableOpacity onPress={onListItemPress}>
        <Surface
          style={{
            height: 100,
            flex: 10,
            backgroundColor: "#ffff",
            elevation: 4,
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              padding: 10,
              flex: 9,
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: items.owner["avatar_url"] }}
              style={{ height: 50, width: 50 }}
            />
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20 }}>{items["full_name"]}</Text>
              <Text>{items["language"]}</Text>
            </View>
          </View>
          <TouchableOpacity style={{flex: 1, height: 100, justifyContent: 'center'}} onPress={onIconPress}>
            <Icon name="eyeo" size={20} />
          </TouchableOpacity>
        </Surface>
      </TouchableOpacity>
    );
}