import React from "react";

import { ImageBackground, View, StyleSheet, Text } from "react-native";

function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
      <Text> My first app</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
