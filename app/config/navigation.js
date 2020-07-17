import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/homeScreen";
import ChampionshipScreen from "../screens/championshipScreen";
import RaceScreen from "../screens/raceScreen";
import GalleryScreen from "../screens/galleryScreen";
import CalendarScreen from "../screens/calendarScreen";
import UserScreen from "../screens/userDetailScreen";
import LogInScreen from "../screens/loginScreen";

const ChampionshipStack = createStackNavigator();
const ChampionshipStackScreen = () => (
  <ChampionshipStack.Navigator>
    <ChampionshipStack.Screen name="HomeScreen" component={HomeScreen} />
    <ChampionshipStack.Screen
      name="ChampionshipScreen"
      component={ChampionshipScreen}
    />
    <ChampionshipStack.Screen name="RaceScreen" component={RaceScreen} />
  </ChampionshipStack.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreens = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="LogIn" component={LogInScreen}></AuthStack.Screen>
    <AuthStack.Screen
      name="AppTabs"
      component={AppTabsScreen}
    ></AuthStack.Screen>
  </AuthStack.Navigator>
);

const AppTabs = createMaterialTopTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator
    tabBarPosition="bottom"
    tabBarOptions={{
      showIcon: "true",
      showLabel: false,
      iconStyle: {
        alignItems: "center",
        flex: 1,
        maxHeight: 50,
        maxWidth: 50,
        height: 50,
        width: 50,
      },
    }}
  >
    <AppTabs.Screen
      name="Galleria"
      component={GalleryScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-images" size={50} />,
      }}
    ></AppTabs.Screen>
    <AppTabs.Screen
      name="Calendario"
      component={CalendarScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-calendar" size={50} />,
      }}
    ></AppTabs.Screen>
    <AppTabs.Screen
      name="Campionati"
      component={ChampionshipStackScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-trophy" size={50} />,
      }}
    ></AppTabs.Screen>
    <AppTabs.Screen
      name="User"
      component={UserScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-person" size={50} />,
      }}
    ></AppTabs.Screen>
  </AppTabs.Navigator>
);

export default ({ route }) => {
  return (
    <NavigationContainer>
      <AuthStackScreens />
    </NavigationContainer>
  );
};
