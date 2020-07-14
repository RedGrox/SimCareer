import React from "react";
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
        onPress={() => alert("todo")}
        //navigation.navigate("logIn", { user: true })
      />
      <Button title="SignUp" onPress={() => navigation.push("SignUp")} />
    </View>
  );
};
