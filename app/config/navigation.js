import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/homeScreen";
import ChampionshipScreen from "../screens/championshipScreen";
import RaceScreen from "../screens/raceScreen";
import GalleryScreen from "../screens/galleryScreen";
import CalendarScreen from "../screens/calendarScreen";
import UserScreen from "../screens/userDetailScreen";
import LogInScreen from "../screens/loginScreen";
import SignUpScreen from "../screens/signUpScreen";

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
  <AuthStack.Navigator>
    <AuthStack.Screen name="LogIn" component={LogInScreen}></AuthStack.Screen>
    <AuthStack.Screen name="SignUp" component={SignUpScreen}></AuthStack.Screen>
  </AuthStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen
      name="Galleria"
      component={GalleryScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-images" size={props.size} />,
      }}
    ></AppTabs.Screen>
    <AppTabs.Screen
      name="Calendario"
      component={CalendarScreen}
      options={{
        tabBarIcon: (props) => (
          <Ionicons name="md-calendar" size={props.size} />
        ),
      }}
    ></AppTabs.Screen>
    <AppTabs.Screen
      name="Campionati"
      component={ChampionshipStackScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-trophy" size={props.size} />,
      }}
    ></AppTabs.Screen>
    <AppTabs.Screen
      name="User"
      component={UserScreen}
      options={{
        tabBarIcon: (props) => <Ionicons name="md-person" size={props.size} />,
      }}
    ></AppTabs.Screen>
  </AppTabs.Navigator>
);

export default ({ route }) => {
  const [user, setUser] = React.useState({});
  /* if (route.params?.user) {
    setUser();
  } */
  return (
    <NavigationContainer>
      {user ? <AppTabsScreen /> : <AuthStackScreens />}
    </NavigationContainer>
  );
};
