import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function galleryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>gallery Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default galleryScreen;
