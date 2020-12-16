import React, { Component, useContext, useEffect } from "react";
import { View, StyleSheet, StatusBar, FlatList } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  ChampionshipsContext,
  ChampionshipsProvider,
} from "../config/provider/ChampionshipsProvider";

import { ItemChampionship } from "./championshipElements";

async function Data() {
  const response = await fetch("http://192.168.1.117:3000/campionati", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ arg: [], idUt: global.user.id }),
  });
  const data = await response.json();
  return data;
}

const AllChampionships = ({ navigation }) => {
  const champ = useContext(ChampionshipsContext);

  useEffect(() => {
    Data().then((data) => {
      champ.setAll(data);
    });
  }, []);

  useEffect(() => {
    if (champ.need2Update == true) {
      Data().then((data) => {
        champ.setAll(data);
      });
    }
  }, [champ.need2Update]);

  const renderItem = ({ item }) => (
    <ItemChampionship
      title={item.nome}
      logo={item.logo}
      partecipanti={item.pilotiIscritti.length}
      id={item.id}
      navigation={navigation}
    />
  );

  return (
    <View>
      <FlatList
        data={champ.champData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const PrefChampionships = ({ navigation }) => {
  const champ = useContext(ChampionshipsContext);

  const renderItem = ({ item }) => (
    <View>
      {champ.pref.includes(parseInt(item.id, 10)) ? (
        <ItemChampionship
          title={item.nome}
          logo={item.logo}
          partecipanti={item.pilotiIscritti.length}
          id={item.id}
          navigation={navigation}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
  return (
    <View>
      <FlatList
        data={champ.champData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const HomeScreenTab = createMaterialTopTabNavigator();

const HomeScreen = ({ route }) => (
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

export default ({ navigation }) => {
  return <HomeScreen />;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  background2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
