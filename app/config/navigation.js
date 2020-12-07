import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/homeScreen2";
import ChampionshipScreen from "../screens/championshipScreen";
import RaceScreen from "../screens/raceScreen";
import GalleryScreen from "../screens/galleryScreen";
import CalendarScreen from "../screens/calendarScreen";
import UserScreen from "../screens/userDetailScreen";
import LogInScreen from "../screens/loginScreen";
import { Dimensions } from "react-native";

import { ChampionshipsProvider } from "../config/provider/ChampionshipsProvider";

const ChampionshipStack = createStackNavigator();
const ChampionshipStackScreen = () => (
  <ChampionshipsProvider>
    <ChampionshipStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChampionshipStack.Screen name="HomeScreen" component={HomeScreen} />
      <ChampionshipStack.Screen
        name="ChampionshipScreen"
        component={ChampionshipScreen}
      />
      <ChampionshipStack.Screen name="RaceScreen" component={RaceScreen} />
    </ChampionshipStack.Navigator>
  </ChampionshipsProvider>
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
    initialRouteName="Campionati"
    initialLayout={{ width: Dimensions.get("window").width }}
    tabBarPosition="bottom"
    swipeEnabled={false}
    lazy={true}
    tabBarOptions={{
      showIcon: "true",
      showLabel: false,
      iconStyle: {
        alignItems: "center",
        flex: 1,
        maxHeight: 40,
        maxWidth: 40,
        height: 40,
        width: 40,
      },
    }}
  >
    <AppTabs.Screen
      name="Galleria"
      component={GalleryScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-images" size={40} />,
      }}
    ></AppTabs.Screen>
    <AppTabs.Screen
      name="Calendario"
      component={CalendarScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-calendar" size={40} />,
      }}
    ></AppTabs.Screen>
    <AppTabs.Screen
      name="Campionati"
      component={ChampionshipStackScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-trophy" size={40} />,
      }}
    ></AppTabs.Screen>
    <AppTabs.Screen
      name="User"
      component={UserScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-person" size={40} />,
      }}
    ></AppTabs.Screen>
  </AppTabs.Navigator>
);

export default ({ route }) => {
  return (
    <NavigationContainer style={{ flex: 1 }}>
      <AuthStackScreens />
    </NavigationContainer>
  );
};
