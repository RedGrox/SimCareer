import React from "react";
import { View, Text, StyleSheet, Button, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const UserDetailTab = createMaterialTopTabNavigator();
const UserDetail = () => (
  <UserDetailTab.Navigator>
    <UserDetailTab.Screen
      name="Info"
      component={InfoScreen}
    ></UserDetailTab.Screen>
    <UserDetailTab.Screen
      name="Palmares"
      component={PalmaresScreen}
    ></UserDetailTab.Screen>
  </UserDetailTab.Navigator>
);

const InfoScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <Text>Info</Text>
    </View>
  );
};

const PalmaresScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <Text>Palmares</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default () => {
  return <UserDetail />;
};
