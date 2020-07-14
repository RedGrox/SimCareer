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
      <Text>SignUp</Text>
    </View>
  );
};
