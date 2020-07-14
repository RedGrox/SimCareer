import React from "react";
import { CommonActions } from "@react-navigation/native";
import { View, Text, Button, StyleSheet } from "react-native";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ({ navigation }) => {
  return (
    <View style={styles.background}>
      <Button
        title="Login"
        onPress={() => {
          try {
            fetch("http://192.168.1.117:3000/utenti/login", {
              method: "POST",
              dataType: "json",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mail: "paolo@mail.com",
                password: "password",
              }),
            })
              .then((response) => response.json())
              .then((response) => {
                console.log(response);
                global.userId = Number(response.id);
                console.log(global.userId);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "AppTabs" }],
                  })
                );
              });
          } catch (error) {
            console.log(error);
          }
        }}
      />
      <Button title="SignUp" onPress={() => navigation.push("SignUp")} />
    </View>
  );
};
