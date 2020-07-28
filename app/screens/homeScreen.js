import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  background2: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});

const HomeScreenTab = createMaterialTopTabNavigator();
const HomeScreen = () => (
  <HomeScreenTab.Navigator style={{ paddingTop: StatusBar.currentHeight }}>
    <HomeScreenTab.Screen
      name="All"
      component={AllChampionships}
    ></HomeScreenTab.Screen>
    <HomeScreenTab.Screen
      name="Pref"
      component={PrefChampionships}
    ></HomeScreenTab.Screen>
  </HomeScreenTab.Navigator>
);

const AllChampionships = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <Text>All</Text>
    </View>
  );
};

const PrefChampionships = ({ navigation }) => {
  return (
    <View style={styles.background2}>
      <Text>Pref</Text>
    </View>
  );
};

export default ({ navigation }) => {
  return <HomeScreen />;
};
