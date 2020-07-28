import React from "react";
import { View, Text, StyleSheet, Button, StatusBar, Image } from "react-native";

import BodyDetailUserScreen from "./bodyDetailUserScreen";

const userDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.headerUser}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: "contain",
              borderWidth: 1,
              height: "100%",
              width: "100%",
            }}
            source={require("../assets/helmetLogoPng.png")}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text>NickName</Text>
          <Image
            style={{
              flex: 1,
              position: "absolute",
              height: "15%",
              width: "15%",
              top: 10,
              right: 10,
            }}
            source={require("../assets/3Dot.png")}
          />
        </View>
      </View>
      <View style={styles.bodyUser}>
        <BodyDetailUserScreen />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#ebeae1",
    alignItems: "center",
    justifyContent: "center",
  },
  headerUser: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ebeae1",
  },
  bodyUser: {
    width: "100%",
    flex: 2,
    backgroundColor: "green",
  },
});
export default userDetailScreen;
